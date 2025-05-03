import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useWalletInfo } from './useWalletInfo';

// Define minimal ERC20 ABI with only the functions we need
const erc20ABI = [
    // Get token balance
    {
        constant: true,
        inputs: [{ name: 'owner', type: 'address' }],
        name: 'balanceOf',
        outputs: [{ name: 'balance', type: 'uint256' }],
        type: 'function',
    },
    // Get token decimals
    {
        constant: true,
        inputs: [],
        name: 'decimals',
        outputs: [{ name: 'decimals', type: 'uint8' }],
        type: 'function',
    }
];

interface TokenBalance {
    address: string;
    balance: string;
    formattedBalance: string;
}

export function useTokenBalances(tokenAddresses: string[] = []) {
    const { address, isConnected } = useWalletInfo();
    const [balances, setBalances] = useState<Record<string, TokenBalance>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        // Skip if wallet not connected or no addresses provided
        if (!isConnected || !address || tokenAddresses.length === 0) {
            return;
        }

        const fetchBalances = async () => {
            setIsLoading(true);
            setError(null);

            try {
                // Create provider from window.ethereum
                const provider = new ethers.BrowserProvider(window.ethereum as any);

                // Fetch native token (ETH) balance
                const ethBalance = await provider.getBalance(address);
                const formattedEthBalance = ethers.formatEther(ethBalance);

                // Store ETH balance with a special key
                setBalances(prev => ({
                    ...prev,
                    'ETH': {
                        address: 'ETH',
                        balance: ethBalance.toString(),
                        formattedBalance: formattedEthBalance
                    }
                }));

                // Create a batch of promises to fetch token balances
                const balancePromises = tokenAddresses.map(async (tokenAddress) => {
                    try {
                        // Skip ETH since we already have it
                        if (tokenAddress === 'ETH') return null;

                        // Validate token address
                        if (!ethers.isAddress(tokenAddress)) {
                            console.warn(`Invalid token address: ${tokenAddress}`);
                            return null;
                        }

                        // Create contract instance
                        const tokenContract = new ethers.Contract(
                            tokenAddress,
                            erc20ABI,
                            provider
                        );

                        // Try to get balance with error handling
                        let balance;
                        try {
                            balance = await tokenContract.balanceOf(address);
                        } catch (balanceError) {
                            console.warn(`Could not fetch balance for token ${tokenAddress}:`, balanceError);
                            return {
                                address: tokenAddress,
                                balance: '0',
                                formattedBalance: '0'
                            };
                        }

                        // Try to get decimals, with fallback to 18
                        let decimals = 18; // Default to 18 decimals
                        try {
                            decimals = await tokenContract.decimals();
                        } catch (decimalsError) {
                            console.warn(`Could not fetch decimals for token ${tokenAddress}, using default of 18:`, decimalsError);
                        }

                        // Format the balance with proper decimals
                        const formattedBalance = ethers.formatUnits(balance, decimals);

                        return {
                            address: tokenAddress,
                            balance: balance.toString(),
                            formattedBalance
                        };
                    } catch (err) {
                        console.error(`Error processing token ${tokenAddress}:`, err);
                        return {
                            address: tokenAddress,
                            balance: '0',
                            formattedBalance: '0'
                        };
                    }
                });

                // Wait for all promises to resolve
                const results = await Promise.all(balancePromises);

                // Update state with the new balances
                const newBalances = { ...balances };
                results.forEach(result => {
                    if (result) {
                        newBalances[result.address] = result;
                    }
                });

                setBalances(newBalances);
            } catch (err) {
                console.error('Error fetching token balances:', err);
                setError(err instanceof Error ? err : new Error('Failed to fetch token balances'));
            } finally {
                setIsLoading(false);
            }
        };

        fetchBalances();

        // Set up a polling interval to refresh balances
        const intervalId = setInterval(fetchBalances, 30000); // Every 30 seconds

        return () => clearInterval(intervalId);
    }, [address, isConnected, tokenAddresses]);

    // Helper function to get a specific token balance
    const getBalance = (tokenAddress: string): TokenBalance | null => {
        return balances[tokenAddress] || null;
    };

    // Helper function to check if user has sufficient balance
    const hasSufficientBalance = (tokenAddress: string, amount: string, decimals: number): boolean => {
        try {
            const tokenBalance = balances[tokenAddress];
            if (!tokenBalance) return false;

            const amountBN = ethers.parseUnits(amount, decimals);
            const balanceBN = ethers.parseUnits(tokenBalance.formattedBalance, decimals);

            return balanceBN >= amountBN;
        } catch (err) {
            console.error('Error checking balance:', err);
            return false;
        }
    };

    return {
        balances,
        getBalance,
        hasSufficientBalance,
        isLoading,
        error
    };
} 