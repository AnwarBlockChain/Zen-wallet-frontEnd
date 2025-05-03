import { ethers } from 'ethers';
import { TokenInfo } from './tokenListService';
import { EventEmitter } from 'events';
import axios from 'axios';

export interface SwapParams {
    fromToken: TokenInfo;
    toToken: TokenInfo;
    amount: string;
    userAddress: string;
    slippage?: number;
}

export interface SwapQuote {
    fromToken: TokenInfo;
    toToken: TokenInfo;
    fromAmount: string;
    toAmount: string;
    rate: string;
    priceImpact: string;
    routeDescription: string;
}

export enum OrderStatus {
    PENDING = 'pending',
    FULFILLED = 'fulfilled',
    CANCELLED = 'cancelled',
    FAILED = 'failed',
    UNKNOWN = 'unknown'
}

export interface OrderStatusUpdate {
    orderHash: string;
    status: OrderStatus;
    details?: any;
}

export class SwapService extends EventEmitter {
    private chainId: number;
    private activeOrders: Map<string, boolean> = new Map();

    constructor(chainId = 1, private provider?: ethers.Provider) {
        super();
        this.chainId = chainId;
    }

    /**
     * Get a quote for swapping tokens with 1inch
     */
    async getQuote(params: SwapParams): Promise<SwapQuote> {
        try {
            // Validate required parameters
            if (!params.fromToken?.address) {
                throw new Error('fromToken address is required');
            }

            if (!params.toToken?.address) {
                throw new Error('toToken address is required');
            }

            if (!params.userAddress) {
                throw new Error('userAddress is required');
            }

            // Enhanced amount validation
            if (!params.amount || params.amount === '0' || params.amount === '') {
                throw new Error('A valid non-zero amount is required');
            }

            // Try to parse the amount as a valid number to ensure it's valid
            try {
                const amountNum = Number(params.amount);
                if (isNaN(amountNum) || amountNum <= 0) {
                    throw new Error('Amount must be a positive number');
                }

                // Check for extremely small amounts that might fail
                const minAmount = 0.000001; // Minimum for most tokens

                // Check if this is potentially ETH or another native asset
                const isNativeAsset = params.fromToken.address.toLowerCase() === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';
                const recommendedEthMin = 0.001; // 0.001 ETH minimum recommended

                if (amountNum < minAmount) {
                    throw new Error(`Amount is too small. Minimum is approximately ${minAmount}`);
                } else if (isNativeAsset && amountNum < recommendedEthMin) {
                    console.warn(`Warning: Amount ${amountNum} ETH is below the recommended minimum of ${recommendedEthMin} ETH. Execution may fail.`);
                }
            } catch (e) {
                throw new Error('Invalid amount format');
            }

            // Call 1inch v5 quote API
            try {
                const quoteParams = {
                    fromTokenAddress: params.fromToken.address,
                    toTokenAddress: params.toToken.address,
                    amount: ethers.parseUnits(params.amount, params.fromToken.decimals).toString(),
                    fromAddress: params.userAddress,
                    slippage: params.slippage || 1, // Default 1%
                    disableEstimate: false,
                    chainId: this.chainId
                };

                const response = await axios.get('/api/oneinch/v5-quote', { params: quoteParams });
                const quote = response.data;

                if (!quote || !quote.toTokenAmount) {
                    throw new Error('Invalid quote response from 1inch');
                }

                // Calculate exchange rate
                const fromAmount = ethers.parseUnits(params.amount, params.fromToken.decimals);
                const toAmount = BigInt(quote.toTokenAmount);

                let rate = "0";
                if (fromAmount !== BigInt(0)) {
                    // Calculate exchange rate with proper decimal handling
                    const rateValue = (toAmount * BigInt(10) ** BigInt(18)) / fromAmount;
                    rate = ethers.formatUnits(rateValue, 18);
                }

                // Extract price impact if available or calculate an estimate
                let priceImpact = "0";
                if (quote.estimatedGas) {
                    // Simple estimation based on gas cost
                    const gasCost = Number(quote.estimatedGas) / 100000;
                    priceImpact = gasCost.toFixed(2);
                }

                // Extract route information
                let routeDescription = "1inch Swap";
                if (quote.protocols && quote.protocols.length > 0) {
                    try {
                        routeDescription = quote.protocols.map((p: any) =>
                            p[0][0].name
                        ).join(' → ');
                    } catch (e) {
                        console.warn('Could not parse route information:', e);
                    }
                }

                return {
                    fromToken: params.fromToken,
                    toToken: params.toToken,
                    fromAmount: params.amount,
                    toAmount: ethers.formatUnits(toAmount, params.toToken.decimals),
                    rate,
                    priceImpact,
                    routeDescription
                };
            } catch (apiError: any) {
                console.error('1inch API error:', apiError);

                // Try to extract specific error messages from the API response
                if (apiError.response && apiError.response.data) {
                    const errorData = apiError.response.data;
                    if (errorData.error) {
                        throw new Error(JSON.stringify({ error: errorData.error }));
                    }
                }

                // If we couldn't extract a specific error, rethrow the original
                throw apiError;
            }
        } catch (error) {
            console.error('Error getting swap quote:', error);
            throw error;
        }
    }

    /**
     * Execute a swap using 1inch v5 API
     */
    async executeSwap(
        params: SwapParams,
        signer: ethers.Signer
    ): Promise<{ hash: string, orderHash?: string }> {
        try {
            // Basic validation
            if (!params.amount || params.amount === '0') {
                throw new Error(JSON.stringify({ error: 'Invalid Amount' }));
            }

            // Check if token is native ETH or needs approval
            const isNativeETH = params.fromToken.address.toLowerCase() === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';

            // If not native ETH, check and handle token approval
            if (!isNativeETH) {
                const hasAllowance = await this.checkAndApproveTokenIfNeeded(
                    params.fromToken,
                    params.userAddress,
                    params.amount,
                    signer
                );

                if (!hasAllowance) {
                    throw new Error('Token approval failed or was rejected');
                }
            }

            // Prepare swap parameters
            const swapParams = {
                fromTokenAddress: params.fromToken.address,
                toTokenAddress: params.toToken.address,
                amount: ethers.parseUnits(params.amount, params.fromToken.decimals).toString(),
                fromAddress: params.userAddress,
                slippage: params.slippage || 1,
                destReceiver: params.userAddress,
                referrerAddress: '0x0000000000000000000000000000000000000000',
                disableEstimate: false,
                chainId: this.chainId
            };

            // Get the swap transaction data
            const swapResponse = await axios.get('/api/oneinch/v5-swap', { params: swapParams });
            const swapData = swapResponse.data;

            if (!swapData || !swapData.tx) {
                throw new Error('Invalid swap transaction data from 1inch');
            }

            // Prepare the transaction
            const tx = {
                from: params.userAddress,
                to: swapData.tx.to,
                data: swapData.tx.data,
                value: swapData.tx.value || "0",
                gasPrice: swapData.tx.gasPrice || undefined,
                gasLimit: swapData.tx.gas || "500000" // Use gas from API or safe default
            };

            // Send the transaction
            const txResponse = await signer.sendTransaction(tx);
            const receipt = await txResponse.wait();

            // Return transaction hash and order hash if available
            return {
                hash: receipt.hash,
                orderHash: swapData.orderHash || undefined
            };
        } catch (error) {
            console.error('Swap error:', error);
            throw error;
        }
    }

    /**
     * Check if token approval is needed and approve if necessary
     */
    private async checkAndApproveTokenIfNeeded(
        token: TokenInfo,
        userAddress: string,
        amount: string,
        signer: ethers.Signer
    ): Promise<boolean> {
        try {
            // 1inch v5 Router address
            const ONEINCH_ROUTER = '0x1111111254EEB25477B68fb85Ed929f73A960582';

            // ERC20 ABI for approval functions
            const ERC20_ABI = [
                'function allowance(address owner, address spender) external view returns (uint256)',
                'function approve(address spender, uint256 amount) external returns (bool)'
            ];

            // Create contract instance
            const tokenContract = new ethers.Contract(token.address, ERC20_ABI, signer);

            // Check current allowance
            const currentAllowance = await tokenContract.allowance(userAddress, ONEINCH_ROUTER);
            const amountBN = ethers.parseUnits(amount, token.decimals);

            // If allowance is sufficient, return true
            if (currentAllowance.gte(amountBN)) {
                return true;
            }

            // Use max uint256 for unlimited approval
            const maxUint256 = '115792089237316195423570985008687907853269984665640564039457584007913129639935';

            // Send approve transaction
            const tx = await tokenContract.approve(ONEINCH_ROUTER, maxUint256);
            const receipt = await tx.wait();

            // Verify approval succeeded
            const newAllowance = await tokenContract.allowance(userAddress, ONEINCH_ROUTER);
            return newAllowance.gte(amountBN);
        } catch (error) {
            console.error('Error approving token:', error);
            return false;
        }
    }

    /**
     * Check token allowance for 1inch router
     */
    async checkAllowance(tokenAddress: string, userAddress: string, amount: string, decimals = 18): Promise<boolean> {
        if (!this.provider) {
            throw new Error('Provider not available for allowance check');
        }

        try {
            // 1inch v5 Router address
            const ONEINCH_ROUTER = '0x1111111254EEB25477B68fb85Ed929f73A960582';

            // Special case for native ETH - no approval needed
            if (tokenAddress.toLowerCase() === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
                return true;
            }

            // ERC20 ABI for allowance function
            const ERC20_ABI = [
                'function allowance(address owner, address spender) external view returns (uint256)'
            ];

            // Create contract instance
            const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, this.provider);

            // Check current allowance
            const currentAllowance = await tokenContract.allowance(userAddress, ONEINCH_ROUTER);
            const amountBN = ethers.parseUnits(amount, decimals);

            // Return true if allowance is sufficient
            return currentAllowance.gte(amountBN);
        } catch (error) {
            console.error('Error checking allowance:', error);
            return false;
        }
    }

}

export default SwapService; 