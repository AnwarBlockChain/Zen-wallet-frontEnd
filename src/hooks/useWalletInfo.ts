import { useAppKitAccount } from "@reown/appkit/react";
// @ts-ignore
import { useBalance } from 'wagmi';
import { Address } from "viem";
import { useEffect, useState } from 'react';

interface WalletInfo {
    address: string | undefined;
    isConnected: boolean;
    balance: string;
    symbol: string;
    caipAddress: string | undefined;
    status: 'connected' | 'connecting' | 'disconnected' | 'reconnecting';
    embeddedWalletInfo: any; // Replace 'any' with proper type from @reown/appkit if available
    isLoading: boolean;
    refetchBalance: () => Promise<any>;
}

export const useWalletInfo = (): WalletInfo => {
    // Get wallet connection info from AppKit
    const {
        address,
        isConnected,
        caipAddress,
        status,
        embeddedWalletInfo
    } = useAppKitAccount();

    // State for formatted balance
    const [formattedBalance, setFormattedBalance] = useState<string>('0');
    const [symbol, setSymbol] = useState<string>('');

    // Get balance using wagmi
    const {
        data: balanceData,
        isLoading,
        refetch: refetchBalance
    } = useBalance({
        address: address as Address,
        enabled: !!address && isConnected,
    });

    // Update formatted balance when balance data changes
    useEffect(() => {
        if (balanceData) {
            setFormattedBalance(balanceData.formatted);
            setSymbol(balanceData.symbol);
        } else {
            setFormattedBalance('0');
            setSymbol('');
        }
    }, [balanceData]);

    return {
        address,
        isConnected,
        balance: formattedBalance,
        symbol,
        status,
        caipAddress,
        embeddedWalletInfo,
        isLoading,
        refetchBalance
    };
}; 