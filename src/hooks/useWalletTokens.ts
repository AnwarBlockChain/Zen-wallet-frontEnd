import { useQuery } from '@tanstack/react-query';
import { fetchTokens } from '../services/api';

export interface Token {
    symbol: string;
    name: string;
    iconUrl?: string;
    balance: string;
    value: string;
    address: string;
    decimals: number;
    type: string;
    price: number;
}

export const useWalletTokens = (walletAddress: string | undefined, chainIdHex: string) => {

    return useQuery({
        queryKey: ['tokens', walletAddress, chainIdHex],
        queryFn: async () => {
            if (!walletAddress || !chainIdHex) return [];
            return fetchTokens(walletAddress, chainIdHex);
        },
        enabled: !!walletAddress && !!chainIdHex,
        staleTime: 60 * 1000, // 1 minute
        refetchOnWindowFocus: false
    });
}; 