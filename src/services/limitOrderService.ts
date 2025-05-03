import axios from 'axios';
import { ethers } from 'ethers';
import { EventEmitter } from 'events';
import { TokenInfo } from './tokenListService';

export interface LimitOrderParams {
    srcChainId?: number;
    srcTokenAddress: string;
    dstTokenAddress: string;
    srcAmount?: string;
    dstAmount?: string;
    walletAddress: string;
    expiration?: number;
    orderData?: any;
}

export interface PriceQuoteParams {
    srcTokenAddress: string;
    dstTokenAddress: string;
    amount: string;
    walletAddress: string;
    chainId?: number;
}

export interface LimitOrderQuote {
    quoteId: string;
    fromTokenAmount: string;
    toTokenAmount: string;
    fromToken: TokenInfo;
    toToken: TokenInfo;
    rate: string;
    expiresAt: number;
    presets?: any;
}

export interface LimitOrderStatus {
    orderHash: string;
    status: string;
    orderData: any;
    details?: any;
    transactions?: any[];
}

export enum OrderStatus {
    OPEN = 'open',
    FILLED = 'filled',
    CANCELED = 'canceled',
    EXPIRED = 'expired',
    UNKNOWN = 'unknown'
}

const POLL_INTERVAL = 15000; // 15 seconds

// Minimum amounts to avoid "insufficient amount" errors (in smallest unit)
const MIN_AMOUNT_BY_SYMBOL: Record<string, string> = {
    'ETH': '1000000000000000', // 0.001 ETH (in wei)
    'WETH': '1000000000000000', // 0.001 WETH
    'USDC': '1000000', // 1 USDC (with 6 decimals)
    'USDT': '1000000', // 1 USDT
    'DAI': '1000000000000000000', // 1 DAI (with 18 decimals)
    'DEFAULT': '1000000000000000' // Default minimum
};

class LimitOrderService extends EventEmitter {
    private activeOrders: Map<string, boolean> = new Map();
    private pollingIntervals: Map<string, NodeJS.Timeout> = new Map();

    constructor() {
        super();
    }

    // Get a quote for a limit order based on source amount
    async getQuote(params: PriceQuoteParams): Promise<LimitOrderQuote> {
        try {
            const { srcTokenAddress, dstTokenAddress, amount, walletAddress, chainId = 1 } = params;

            if (!srcTokenAddress || !dstTokenAddress || !amount || !walletAddress) {
                throw new Error('Missing required parameters for quote');
            }

            // Construct query parameters
            const queryParams = {
                fromTokenAddress: srcTokenAddress,
                toTokenAddress: dstTokenAddress,
                amount: amount,
                walletAddress: walletAddress,
                enableEstimate: true,
                isLedgerLive: false
            };

            // Call the API through our backend proxy
            const response = await axios.get(`/api/oneinch/quoter/receive`, { params: queryParams });

            if (!response.data || response.data.error) {
                throw new Error(response.data?.error?.description || 'Failed to get quote');
            }

            const quote = response.data;

            // Calculate exchange rate
            let rate = "0";
            if (quote.fromTokenAmount && quote.toTokenAmount) {
                const fromAmount = BigInt(quote.fromTokenAmount);
                const toAmount = BigInt(quote.toTokenAmount);

                if (fromAmount !== BigInt(0)) {
                    // Calculate with proper decimal handling
                    const rateValue = Number(toAmount) / Number(fromAmount);
                    rate = rateValue.toString();
                }
            }

            return {
                quoteId: quote.quoteId,
                fromTokenAmount: quote.fromTokenAmount,
                toTokenAmount: quote.toTokenAmount,
                fromToken: {
                    chainId: chainId,
                    address: params.srcTokenAddress,
                    name: '',  // These fields will be populated by UI when displaying
                    symbol: '',
                    decimals: 18  // Default to 18, UI can override with correct value
                },
                toToken: {
                    chainId: chainId,
                    address: params.dstTokenAddress,
                    name: '',  // These fields will be populated by UI when displaying
                    symbol: '',
                    decimals: 18  // Default to 18, UI can override with correct value
                },
                rate,
                expiresAt: Math.floor(Date.now() / 1000) + 60, // Quote typically valid for 1 minute
                presets: quote.presets
            };
        } catch (error) {
            console.error('Error getting limit order quote:', error);
            throw error;
        }
    }

    // Check if the amount is sufficient
    isSufficientAmount(amount: string, tokenSymbol: string, decimals: number): boolean {
        try {
            const minAmount = MIN_AMOUNT_BY_SYMBOL[tokenSymbol] || MIN_AMOUNT_BY_SYMBOL.DEFAULT;
            const amountInSmallestUnit = ethers.parseUnits(amount, decimals).toString();
            return BigInt(amountInSmallestUnit) >= BigInt(minAmount);
        } catch (error) {
            console.error('Error checking sufficient amount:', error);
            return false;
        }
    }

    // Get current market price for a token pair
    async getMarketPrice(srcTokenAddress: string, dstTokenAddress: string, chainId: number = 1): Promise<string> {
        try {
            const response = await axios.get(`/api/oneinch/intent/price`, {
                params: {
                    srcTokenAddress,
                    dstTokenAddress,
                    chainId
                }
            });

            if (!response.data || !response.data.price) {
                throw new Error('Invalid price response');
            }

            return response.data.price;
        } catch (error) {
            console.error('Error getting market price:', error);
            throw error;
        }
    }

    // Build order data for signing
    async buildOrder(params: LimitOrderParams): Promise<any> {
        try {
            if (!params.srcTokenAddress || !params.dstTokenAddress ||
                (!params.srcAmount && !params.dstAmount) || !params.walletAddress) {
                throw new Error('Missing required parameters for limit order');
            }

            // Call our backend API to prepare order data
            const response = await axios.post('/api/oneinch/intent', {
                srcChainId: params.srcChainId || 1,
                srcTokenAddress: params.srcTokenAddress,
                dstTokenAddress: params.dstTokenAddress,
                srcAmount: params.srcAmount,
                dstAmount: params.dstAmount,
                walletAddress: params.walletAddress,
                expiration: params.expiration || this.calculateExpiry(),
                orderData: params.orderData
            });

            return response.data;
        } catch (error) {
            console.error('Error building limit order:', error);
            throw error;
        }
    }

    // Sign and submit a limit order
    async submitSignedOrder(orderData: any, signature: string): Promise<any> {
        try {
            if (!orderData || !signature) {
                throw new Error('Order data and signature are required');
            }

            const response = await axios.post('/api/oneinch/intent', {
                ...orderData,
                signature
            });

            const result = response.data;

            // Start polling for status if we got an order hash
            if (result.orderHash) {
                this.startPollingStatus(result.orderHash, orderData.srcChainId || 1);
            }

            return result;
        } catch (error) {
            console.error('Error submitting limit order:', error);
            throw error;
        }
    }

    // Get order status
    async getOrderStatus(orderHash: string, chainId: number = 1): Promise<LimitOrderStatus> {
        try {
            const response = await axios.get(`/api/oneinch/intent`, {
                params: {
                    orderHash,
                    chainId
                }
            });

            return response.data;
        } catch (error) {
            console.error('Error fetching order status:', error);
            throw error;
        }
    }

    // Get all orders for a wallet
    async getAllOrders(walletAddress: string, chainId: number = 1, page: number = 1, limit: number = 20, status?: string): Promise<any> {
        try {
            const response = await axios.get(`/api/oneinch/intent/orders`, {
                params: {
                    walletAddress,
                    chainId,
                    page,
                    limit,
                    status
                }
            });

            return response.data;
        } catch (error) {
            console.error('Error fetching limit orders:', error);
            throw error;
        }
    }

    // Cancel a limit order
    async cancelOrder(orderHash: string, walletAddress: string, signature: string, chainId: number = 1): Promise<any> {
        try {
            const response = await axios.post('/api/oneinch/intent/cancel', {
                orderHash,
                walletAddress,
                signature,
                chainId
            });

            return response.data;
        } catch (error) {
            console.error('Error cancelling limit order:', error);
            throw error;
        }
    }

    // Start polling for order status updates
    startPollingStatus(orderHash: string, chainId: number = 1): void {
        // Stop any existing polling for this order
        this.stopPollingStatus(orderHash);

        // Mark as active
        this.activeOrders.set(orderHash, true);

        // Start polling interval
        const intervalId = setInterval(async () => {
            if (this.activeOrders.get(orderHash)) {
                try {
                    const status = await this.getOrderStatus(orderHash, chainId);

                    // Emit status update event
                    this.emit('statusUpdate', {
                        orderHash,
                        status: status.status,
                        details: status
                    });

                    // If order reached final state, stop polling
                    if (this.isFinalStatus(status.status)) {
                        this.stopPollingStatus(orderHash);
                    }
                } catch (error) {
                    console.error(`Error polling status for order ${orderHash}:`, error);
                }
            } else {
                // If order is no longer active, stop polling
                this.stopPollingStatus(orderHash);
            }
        }, POLL_INTERVAL);

        // Store the interval ID
        this.pollingIntervals.set(orderHash, intervalId);
    }

    // Stop polling status for an order
    stopPollingStatus(orderHash: string): void {
        this.activeOrders.set(orderHash, false);

        const intervalId = this.pollingIntervals.get(orderHash);
        if (intervalId) {
            clearInterval(intervalId);
            this.pollingIntervals.delete(orderHash);
        }
    }

    // Helper function to check if status is final
    isFinalStatus(status: string): boolean {
        const finalStatuses = ['filled', 'canceled', 'expired', 'rejected'];
        return finalStatuses.includes(status.toLowerCase());
    }

    // Helper function to sign an order with EIP-712 typed data
    async signOrder(orderData: any, provider: any): Promise<string> {
        try {
            if (!orderData || !provider) {
                throw new Error('Order data and provider are required for signing');
            }

            const signer = await provider.getSigner();
            const address = await signer.getAddress();

            // Handle both direct typedData (from API) or convert order data to typedData
            const typedData = orderData.typedData || orderData;

            // Request signature using eth_signTypedData_v4
            const signature = await provider.send('eth_signTypedData_v4', [
                address,
                JSON.stringify(typedData)
            ]);

            return signature;
        } catch (error) {
            console.error('Error signing order:', error);
            throw error;
        }
    }

    // Helper function to calculate when an order expires
    calculateExpiry(days: number = 7): number {
        return Math.floor(Date.now() / 1000) + (days * 24 * 60 * 60); // Current time + days in seconds
    }

    // Format token values between human and blockchain representation
    formatTokenAmount(amount: string, decimals: number, toWei: boolean = true): string {
        try {
            if (toWei) {
                return ethers.parseUnits(amount, decimals).toString();
            } else {
                return ethers.formatUnits(amount, decimals);
            }
        } catch (error) {
            console.error('Error formatting token amount:', error);
            throw error;
        }
    }

    // Full flow to create and submit a limit order
    async createAndSubmitLimitOrder(params: {
        srcToken: TokenInfo,
        dstToken: TokenInfo,
        srcAmount: string,
        limitPrice: string,
        walletAddress: string,
        provider: any,
        expiryDays?: number
    }): Promise<any> {
        try {
            const { srcToken, dstToken, srcAmount, limitPrice, walletAddress, provider, expiryDays = 7 } = params;

            // Calculate destination amount based on limit price
            const srcAmountBN = ethers.parseUnits(srcAmount, srcToken.decimals);
            const limitPriceBN = ethers.parseUnits(limitPrice, 18); // Assuming price has 18 decimals
            const dstAmountBN = (srcAmountBN * limitPriceBN) / BigInt(10 ** 18);
            const dstAmount = ethers.formatUnits(dstAmountBN, dstToken.decimals);

            // Check if amount is sufficient
            if (!this.isSufficientAmount(srcAmount, srcToken.symbol, srcToken.decimals)) {
                throw new Error(`Amount too small. Minimum for ${srcToken.symbol} required.`);
            }

            // Prepare limit order params
            const orderParams: LimitOrderParams = {
                srcChainId: srcToken.chainId || 1,
                srcTokenAddress: srcToken.address,
                dstTokenAddress: dstToken.address,
                srcAmount: ethers.parseUnits(srcAmount, srcToken.decimals).toString(),
                walletAddress: walletAddress,
                expiration: this.calculateExpiry(expiryDays)
            };

            // Build order data for signing
            const orderData = await this.buildOrder(orderParams);

            // Sign the order
            const signature = await this.signOrder(orderData, provider);

            // Submit the signed order
            const result = await this.submitSignedOrder(orderData, signature);

            return result;
        } catch (error) {
            console.error('Error creating and submitting limit order:', error);
            throw error;
        }
    }
}

export default new LimitOrderService(); 