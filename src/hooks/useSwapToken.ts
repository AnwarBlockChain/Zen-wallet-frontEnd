import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    swapApproval,
    getSwapQuote,
    classicSwapQuote,
    swapTransaction,
    getLiveTokenPrices,
    getFusionQuote,
    executeFusionSwap
} from '../services/api';

export interface SwapParams {
    fromTokenAddress: string;
    toTokenAddress: string;
    amount: string;
    slippage?: number;
    fromAddress?: string;
    chainId?: number;
}

export interface QuoteParams {
    chainId: number,
    fromTokenAddress: string,
    toTokenAddress: string,
    amount: string,
    slippage?: number,
    fromAddress?: string
}

export interface TransactionParams extends SwapParams {
    quoteId?: string;
}

export interface TokenPrice {
    symbol: string;
    price: number;
    change24h?: number;
}

export interface ApprovalParams {
    fromTokenAddress: string;
    toTokenAddress?: string;
    amount: string;
    fromAddress?: string;
}

export interface FusionQuoteParams {
    srcChain: number;
    dstChain: number;
    srcTokenAddress: string;
    dstTokenAddress: string;
    amount: string;
    walletAddress?: string;
    enableEstimate?: boolean;
}

export interface FusionSwapParams {
    quoteId: string;
    preset: string;
    srcTokenAddress: string;
    dstTokenAddress: string;
    amount: string;
    walletAddress: string;
    srcChain: number;
    dstChain: number;
}

export const useSwapToken = () => {
    const queryClient = useQueryClient();


    // Get live token prices with base currency support
    // const useLiveTokenPrices = (symbols: string[], baseCurrency: string = 'USDC') => {
    //     return useQuery({
    //         queryKey: ['tokenPrices', symbols, baseCurrency],
    //         queryFn: async () => {
    //             // If only one token, we expect a single object response
    //             if (symbols.length === 1) {
    //                 return await getLiveTokenPrices(symbols, baseCurrency);
    //             }

    //             // For multiple tokens, we need to make individual requests and combine them
    //             const promises = symbols.map(symbol =>
    //                 getLiveTokenPrices([symbol], baseCurrency)
    //             );

    //             const results = await Promise.all(promises);
    //             return results; // This will be an array of token price objects
    //         },
    //         enabled: symbols.length > 0,
    //         refetchInterval: 15000, // Refresh every 15 seconds
    //         staleTime: 10000, // Consider data stale after 10 seconds
    //     });
    // };

    // Get swap quote with real-time pricing - modify this hook 
    const useSwapQuote = (params: QuoteParams, isClassicMode: boolean = true) => {
        return useQuery({
            queryKey: ['classicSwapQuote', params],
            queryFn: () => getSwapQuote(params),
            enabled: isClassicMode && !!params.chainId && !!params.fromTokenAddress &&
                !!params.toTokenAddress && !!params.amount && parseFloat(params.amount) > 0,
            refetchInterval: 30000, // Refresh quote every 30 seconds to keep it current
        });
    };

    // Approve swap
    const useSwapApproval = () => {
        return useMutation({
            mutationFn: swapApproval,
            onSuccess: (data) => {
                // Invalidate relevant queries after successful approval
                queryClient.invalidateQueries({ queryKey: ['classicSwapQuote'] });
                return data;
            },
        });
    };

    // Post swap quote
    const usePostSwapQuote = () => {
        return useMutation({
            mutationFn: (params: QuoteParams) => classicSwapQuote(params),
            onSuccess: (data) => {
                queryClient.invalidateQueries({ queryKey: ['classicSwapQuote'] });
                return data;
            },
        });
    };

    // Execute swap transaction
    const useSwapTransaction = () => {
        return useMutation({
            mutationFn: swapTransaction,
            onSuccess: (data) => {
                // Invalidate any relevant cached data
                queryClient.invalidateQueries({ queryKey: ['tokenPrices'] });
                queryClient.invalidateQueries({ queryKey: ['classicSwapQuote'] });
                queryClient.invalidateQueries({ queryKey: ['tokenBalance'] });
                return data;
            },
        });
    };

    // Get Fusion+ quote
    const useFusionQuote = (params: FusionQuoteParams) => {
        return useQuery({
            queryKey: ['fusionQuote', params],
            queryFn: () => getFusionQuote(params),
            enabled: !!params.srcChain && !!params.dstChain &&
                !!params.srcTokenAddress && !!params.dstTokenAddress &&
                !!params.amount && parseFloat(params.amount) > 0 &&
                params.srcChain !== params.dstChain, // Only enable if chains are different
            refetchInterval: 30000, // Refresh quote every 30 seconds
            refetchOnWindowFocus: false, // Don't refetch when window regains focus
            retry: 2, // Retry failed requests up to 2 times
            staleTime: 15000, // Consider data stale after 15 seconds
        });
    };

    // Execute Fusion+ swap
    const useFusionSwap = () => {
        return useMutation({
            mutationFn: (params: FusionSwapParams) => executeFusionSwap(params),
            onSuccess: (data) => {
                // Invalidate relevant queries
                queryClient.invalidateQueries({ queryKey: ['fusionQuote'] });
                queryClient.invalidateQueries({ queryKey: ['tokenPrices'] });
                queryClient.invalidateQueries({ queryKey: ['tokenBalance'] });
                return data;
            },
        });
    };

    return {
        useSwapQuote,
        useSwapApproval,
        usePostSwapQuote,
        useSwapTransaction,
        useFusionQuote,
        useFusionSwap,
    };
};

export default useSwapToken;
