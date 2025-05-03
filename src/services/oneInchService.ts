import axios from "axios";

interface OrdersParams {
    page: number;
    limit: number;
}

interface OrdersByMakerParams {
    page: number;
    limit: number;
    address: string;
}

// Define the type to match API expectations
export interface QuoteParams {
    fromTokenAddress: string;
    toTokenAddress: string;
    amount: string;
    permit?: string;
    takingFeeBps?: number;
    walletAddress: string; // Required by our API
    source?: string; // Recommended for tracking
    chainId?: number; // Network chain ID (defaults to 1 if not specified)
    enableEstimate?: boolean; // Whether to include price estimates
    srcChain?: number; // Source chain ID for cross-chain swaps
    dstChain?: number; // Destination chain ID for cross-chain swaps
}

// Interface for placing orders
export interface PlaceOrderParams {
    fromTokenAddress: string;
    toTokenAddress: string;
    amount: string;
    walletAddress: string;
    chainId?: number; // Network chain ID (defaults to 1 if not specified)
    permit?: string;
    receiver?: string;
    preset?: 'fast' | 'medium' | 'slow';
    nonce?: string | number;
    fee?: {
        takingFeeBps: number;
        takingFeeReceiver: string;
    };
    source?: string;
    // Cross-chain params
    srcChain?: number;
    dstChain?: number;
    enableEstimate?: boolean;
}

// Interface for creating an order
export interface CreateOrderParams {
    quote: any;
    walletAddress: string;
    source?: string;
}

// Interface for submitting a signed order
export interface SubmitOrderParams {
    order: any;
    signature: string;
    quoteId: string;
    walletAddress: string;
    chainId?: number; // Chain ID for the order (legacy)
    srcChainId?: number; // Source chain ID (required by 1inch API)
    extension?: string;
    hashLock?: string;
    source?: string;
    orderHash?: string;
}

// Interface for submitting a cross-chain order
export interface SubmitCrossChainOrderParams {
    order: {
        salt: string;
        makerAsset: string;
        takerAsset: string;
        maker: string;
        receiver: string;
        makingAmount: string;
        takingAmount: string;
        makerTraits: string;
    };
    signature: string;
    quoteId: string;
    srcChainId: number;
    extension?: string;
    secretHashes?: string[];
}

export type ActiveOrdersResponse = any;

// Enhanced types for token interactions
export interface TokenOptions {
    address: string;
    amount: string;
}

export interface BuildOrderParams {
    quote: any;
    secretsHashList?: string[];
    walletAddress?: string;
    srcChain?: number;
    dstChain?: number;
    amount?: string;
    srcTokenAddress?: string;
    dstTokenAddress?: string;
}

// Service that uses our API routes to interact with 1inch
const oneInchService = {
    getQuote: async (params: QuoteParams) => {
        try {
            // Determine source and destination chain IDs
            const srcChain = typeof params.srcChain !== 'undefined' ? params.srcChain :
                (params.fromTokenAddress === '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48' ? 1 : // USDC on Ethereum
                    params.fromTokenAddress === '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270' ? 137 : // MATIC on Polygon
                        params.chainId || 1);

            const dstChain = typeof params.dstChain !== 'undefined' ? params.dstChain :
                (params.toTokenAddress === '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270' ? 137 : // MATIC on Polygon
                    params.toTokenAddress === '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48' ? 1 : // USDC on Ethereum
                        params.chainId || 1);

            // Simplify parameters to only include essential ones
            const fusionParams = {
                srcTokenAddress: params.fromTokenAddress,
                dstTokenAddress: params.toTokenAddress,
                amount: params.amount,
                walletAddress: params.walletAddress,
                enableEstimate: params.enableEstimate || true,
                source: params.source || '0xe26b9977',
                srcChain,
                dstChain
            };

            console.log('Requesting quote with params:', {
                ...fusionParams,
                amount: fusionParams.amount,
                srcChain,
                dstChain
            });

            // Use API route to avoid CORS
            const response = await axios.post('/api/oneinch/quoter/receive', fusionParams);
            return response.data;
        } catch (error) {
            console.error('Error getting quote:', error);

            // Enhanced error handling
            if (error.response?.data?.error) {
                throw {
                    message: error.response.data.error.message || 'API error',
                    response: error.response,
                    details: error.response.data.error
                };
            }

            throw error;
        }
    },

    // Following SDK v2 flow: createOrder
    createOrder: async (params: CreateOrderParams) => {
        try {
            // Use API route to get order data (matches SDK's createOrder)
            const response = await axios.post('/api/oneinch/orders/data', params);
            return response.data;
        } catch (error) {
            console.error('Error creating order:', error);
            throw error;
        }
    },

    // Following SDK v2 flow: submitOrder
    submitOrder: async (params: SubmitOrderParams) => {
        try {
            // Log the parameters being sent
            console.log('Submitting order with params:', {
                ...params,
                signature: params.signature ? params.signature.substring(0, 10) + '...' : 'not provided'
            });

            // Ensure srcChainId is included for all orders
            const payload = {
                ...params,
                srcChainId: params.srcChainId || params.chainId || 1, // Default to Ethereum if not provided
                extension: params.extension || '0x'
            };

            // Use API route for order submission
            const response = await axios.post('/api/oneinch/submit', payload);
            return response.data;
        } catch (error) {
            console.error('Error submitting order:', error);
            throw error;
        }
    },

    // Legacy method for backward compatibility
    placeOrder: async (params: PlaceOrderParams) => {
        try {
            // Prepare parameters for the fusion-plus API
            const orderParams = {
                fromTokenAddress: params.fromTokenAddress,
                toTokenAddress: params.toTokenAddress,
                amount: params.amount,
                walletAddress: params.walletAddress,
                srcChainId: params.srcChain || params.chainId || 1, // Required by 1inch API
                chainId: params.chainId || 1, // Keep for backward compatibility
                srcChain: params.srcChain || 1,
                dstChain: params.dstChain || 1,
                enableEstimate: params.enableEstimate || false,
                source: params.source || '0xe26b9977',
                extension: '0x' // Required by 1inch API
            };

            console.log('Placing order with params:', orderParams);

            // Use API route to avoid CORS
            const response = await axios.post('/api/oneinch/submit', orderParams);
            return response.data;
        } catch (error) {
            console.error('Error placing order:', error);
            throw error;
        }
    },

    getOrdersByMaker: async (params: OrdersByMakerParams) => {
        try {
            const response = await axios.post('/api/oneinch/orders-by-maker', params);
            return response.data;
        } catch (error) {
            console.error('Error getting orders by maker:', error);
            throw error;
        }
    },

    getOrderStatus: async (hash: string) => {
        try {
            const response = await axios.get(`/api/oneinch/order-status/${hash}`);
            return response.data;
        } catch (error) {
            console.error('Error getting order status:', error);
            throw error;
        }
    },

    // Build an order from a quote
    buildOrder: async (params: BuildOrderParams) => {
        try {
            // Extract parameters
            const { quote, secretsHashList = [], walletAddress, srcChain, dstChain, amount, srcTokenAddress, dstTokenAddress } = params;

            // Prepare request body
            const body = {
                quote,
                secretsHashList
            };

            // Prepare URL parameters
            const urlParams = new URLSearchParams();
            if (walletAddress) urlParams.append('walletAddress', walletAddress);
            if (srcChain) urlParams.append('srcChain', String(srcChain));
            if (dstChain) urlParams.append('dstChain', String(dstChain));
            if (amount) urlParams.append('amount', amount);
            if (srcTokenAddress) urlParams.append('srcTokenAddress', srcTokenAddress);
            if (dstTokenAddress) urlParams.append('dstTokenAddress', dstTokenAddress);

            // Build the URL with parameters
            const url = `/api/oneinch/quoter/build${urlParams.toString() ? `?${urlParams.toString()}` : ''}`;

            console.log('Building order from quote:', {
                quoteId: quote.quoteId || 'not provided',
                secretsHashList: secretsHashList.length
            });

            // Send the request to build the order
            const response = await axios.post(url, body);
            return response.data;
        } catch (error) {
            console.error('Error building order:', error);
            throw error;
        }
    },

    // Submit a cross-chain order
    submitCrossChainOrder: async (params: SubmitCrossChainOrderParams) => {
        try {
            console.log('Submitting cross-chain order with params:', {
                quoteId: params.quoteId,
                srcChainId: params.srcChainId,
                signature: params.signature ? params.signature.substring(0, 10) + '...' : 'not provided',
                secretHashes: params.secretHashes?.length || 0
            });

            // Ensure all required parameters are set
            const payload = {
                ...params,
                extension: params.extension || '0x'
            };

            // Use API route for cross-chain order submission
            const response = await axios.post('/api/oneinch/submit', payload);
            return response.data;
        } catch (error) {
            console.error('Error submitting cross-chain order:', error);
            throw error;
        }
    }
};

export default oneInchService; 