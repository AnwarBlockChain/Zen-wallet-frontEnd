'use client';

import type { Eip1193Provider } from 'ethers';
import { ethers } from 'ethers';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Token, useWalletTokens } from '@/hooks/useWalletTokens';
import SendTransactionTokenList from '../SendTransactionTokenList';
import { fetchTokenPrice } from '@/services/api';

interface SendTabProps {
    isConnected: boolean;
    address: string;
    userBalance: string;
    balanceLoading: boolean;
    walletSymbol: string;
}

// Define the shape of coin price data from API
interface CoinPrice {
    usd: number;
    usd_24h_change?: number;
}

// Add this helper function to format balance with 3 decimal places
const formatBalance = (balance: string | null | undefined) => {
    if (!balance) return '0.000';

    try {
        const numericBalance = parseFloat(balance);
        return numericBalance.toFixed(3);
    } catch (error) {
        return '0.000';
    }
};

// Add this helper function to truncate addresses and hashes
const truncateAddress = (address: string) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
};

// Add this helper function to copy text to clipboard
const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
        .then(() => toast.success('Copied to clipboard!'))
        .catch(err => toast.error('Failed to copy'));
};

// Get network name based on chain ID
const getNetworkName = (chainId: number) => {
    switch (chainId) {
        case 1: return "Ethereum";
        case 137: return "Polygon";
        case 8453: return "Base";
        case 10: return "Optimism";
        case 56: return "BNB Smart Chain";
        case 43114: return "Avalanche";
        case 42161: return "Arbitrum One";
        default: return "Ethereum";
    }
};

// Add network-specific colors
const networkColors: Record<number, { text: string, from: string, to: string }> = {
    1: { text: "text-blue-400", from: "from-blue-600", to: "to-blue-400" },              // Ethereum
    137: { text: "text-purple-400", from: "from-purple-600", to: "to-purple-400" },      // Polygon
    8453: { text: "text-blue-400", from: "from-blue-600", to: "to-teal-400" },           // Base
    10: { text: "text-red-400", from: "from-red-600", to: "to-red-400" },                // Optimism
    56: { text: "text-yellow-400", from: "from-yellow-600", to: "to-yellow-400" },       // BSC
    43114: { text: "text-red-400", from: "from-red-600", to: "to-red-400" },             // Avalanche
    42161: { text: "text-blue-400", from: "from-blue-600", to: "to-blue-400" },          // Arbitrum
};

const SUPPORTED_CHAINS = [
    {
        id: 1, name: "Ethereum",
        icon: "https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/info/logo.png",
        hex: "0x1"
    },
    {
        id: 137, name: "Polygon",
        icon: "https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/polygon/info/logo.png",
        hex: "0x89"
    },
    {
        id: 8453, name: "Base",
        icon: "https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/base/info/logo.png",
        hex: "0x2105"
    },
    {
        id: 10, name: "Optimism",
        icon: "https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/optimism/info/logo.png",
        hex: "0xa"
    },
    {
        id: 56, name: "BNB Smart Chain",
        icon: "https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/binance/info/logo.png",
        hex: "0x38"
    },
    {
        id: 43114, name: "Avalanche",
        icon: "https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/avalanche/info/logo.png",
        hex: "0xa86a"
    },
    {
        id: 42161, name: "Arbitrum One",
        icon: "https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/arbitrum/info/logo.png",
        hex: "0xa4b1"
    }
];

// Add this helper function to format blockchain errors
const formatTransactionError = (error: any): string => {
    // Convert error to string for parsing
    const errorString = String(error);

    // Check for common error patterns
    if (errorString.includes('execution reverted')) {
        if (errorString.includes('insufficient allowance')) {
            return 'This transaction requires token approval first.';
        } else if (errorString.includes('insufficient funds')) {
            return 'Insufficient funds to complete this transaction.';
        } else if (errorString.includes('gas required exceeds allowance')) {
            return 'Transaction requires more gas than allowed. Try increasing gas limit.';
        } else {
            // Generic revert error with cleaner formatting
            return 'Transaction rejected by the network. The token contract may have restrictions or you may need to adjust parameters.';
        }
    } else if (errorString.includes('user rejected')) {
        return 'Transaction was rejected in your wallet.';
    } else if (errorString.includes('replacement fee too low')) {
        return 'Gas price too low for replacing pending transaction. Try again with higher gas price.';
    } else if (errorString.includes('nonce too low')) {
        return 'Transaction nonce error. Try refreshing the page.';
    } else if (errorString.includes('underpriced')) {
        return 'Transaction underpriced. Try increasing gas price.';
    }

    // If no specific pattern is found, return a cleaner version of the error
    // Limit to 150 characters for display purposes
    return errorString.length > 150
        ? errorString.substring(0, 150) + '...'
        : errorString;
};

// Helper to convert chainId to Coingecko chain ID format
const getCoingeckoChainId = (chainIdHex: string): string => {
    switch (chainIdHex) {
        case '0x1': return 'ethereum';
        case '0x89': return 'polygon-pos';
        case '0x2105': return 'base';
        case '0xa': return 'optimistic-ethereum';
        case '0x38': return 'binance-smart-chain';
        case '0xa86a': return 'avalanche';
        case '0xa4b1': return 'arbitrum-one';
        default: return 'ethereum';
    }
};

const SendTab = ({
    isConnected,
    address,
    userBalance,
    balanceLoading,
    walletSymbol
}: SendTabProps) => {
    const [recipientAddress, setRecipientAddress] = useState<string>('');
    const [amount, setAmount] = useState<string>('');
    const [isValidAddress, setIsValidAddress] = useState<boolean>(false);
    const [isValidAmount, setIsValidAmount] = useState<boolean>(false);
    const [isEstimatingGas, setIsEstimatingGas] = useState<boolean>(false);
    const [isSending, setIsSending] = useState<boolean>(false);
    const [gasEstimate, setGasEstimate] = useState<string | null>(null);
    const [transactionError, setTransactionError] = useState<string | null>(null);
    const [transactionSuccess, setTransactionSuccess] = useState<{ hash: string, chainId: number } | null>(null);
    const [currentChainIdHex, setCurrentChainIdHex] = useState<string>("0x1"); // Default to Ethereum mainnet
    const [showTokenModal, setShowTokenModal] = useState<boolean>(false);
    const [selectedToken, setSelectedToken] = useState<Token | null>(null);
    const [showChainDropdown, setShowChainDropdown] = useState<boolean>(false);
    const [isChangingChain, setIsChangingChain] = useState<boolean>(false);
    const [manualChainIdHex, setManualChainIdHex] = useState<string | null>(null);
    const [tokenPrice, setTokenPrice] = useState<CoinPrice | null>(null);
    const [isLoadingPrice, setIsLoadingPrice] = useState(false);

    // Modify the useWalletTokens hook call to use hex
    const {
        data: tokens = [],
        isLoading: tokensLoading,
        isError,
        error,
        refetch: refetchTokens
    } = useWalletTokens(address, manualChainIdHex || currentChainIdHex);

    // Set the first token (native token) as default when tokens are loaded
    useEffect(() => {
        if (tokens && tokens.length > 0 && !selectedToken) {
            setSelectedToken(tokens[0]);
        }
    }, [tokens, selectedToken]);

    // Validate ETH address format
    const validateAddress = useCallback((address: string) => {
        const isValid = /^0x[a-fA-F0-9]{40}$/.test(address);
        setIsValidAddress(isValid);
        return isValid;
    }, []);

    // Enhance validateAmount to check decimal precision
    const validateAmount = useCallback((value: string) => {
        if (!value || value === '0') {
            setIsValidAmount(false);
            return false;
        }

        try {
            const decimalParts = value.split('.');
            const hasExcessDecimals = selectedToken && decimalParts[1] &&
                decimalParts[1].length > selectedToken.decimals;

            // Show warning for precision issues but don't block the transaction
            if (hasExcessDecimals) {
                setTransactionError(`Note: ${selectedToken.symbol} only supports ${selectedToken.decimals} decimal places. Excess decimals will be ignored.`);
            } else if (transactionError && transactionError.includes('decimal places')) {
                // Clear the error if it was related to decimals
                setTransactionError(null);
            }

            const amountValue = parseFloat(value);
            // Use selected token balance if available, otherwise use native token balance
            const balanceValue = selectedToken
                ? parseFloat(selectedToken.balance)
                : parseFloat(userBalance || '0');

            const isValid = !isNaN(amountValue) && amountValue > 0 && amountValue <= balanceValue;
            setIsValidAmount(isValid);
            return isValid;
        } catch (err) {
            setIsValidAmount(false);
            return false;
        }
    }, [userBalance, selectedToken, transactionError]);

    // Enhanced handleAmountChange to restrict input based on token decimals
    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        // Only allow valid numeric input with decimal restriction
        if (value === '' || /^\d*\.?\d*$/.test(value)) {
            // Restrict decimal places based on token
            const parts = value.split('.');
            if (selectedToken && parts.length > 1 && parts[1].length > selectedToken.decimals) {
                // Don't update if exceeds token decimals
                return;
            }

            setAmount(value);
            validateAmount(value);
        }
    };

    // Handle address input change
    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setRecipientAddress(value);
        validateAddress(value);
        setTransactionError(null);
    };

    // Modified token selection to handle decimal display
    const handleSelectToken = (token: Token) => {
        setSelectedToken(token);

        // If there's an existing amount, format it according to the new token's precision
        if (amount) {
            try {
                const numericAmount = parseFloat(amount);
                if (!isNaN(numericAmount)) {
                    // Format with token's decimal precision
                    const formattedAmount = numericAmount.toFixed(token.decimals);
                    // Remove trailing zeros
                    const cleanedAmount = formattedAmount.replace(/\.?0+$/, '');
                    setAmount(cleanedAmount);
                    validateAmount(cleanedAmount);
                    return;
                }
            } catch (error) {
                // If formatting fails, just reset the amount
            }
        }

        // If no amount or formatting failed, just clear it
        setAmount('');
        setIsValidAmount(false);
    };

    // Add this for better MAX button functionality with token decimals
    const handleMaxAmount = () => {
        if (!selectedToken && !userBalance) return;

        if (selectedToken) {
            // Format with exact token precision
            const formattedBalance = ethers.formatUnits(selectedToken.balance, selectedToken.decimals);
            setAmount(formattedBalance);
            validateAmount(formattedBalance);
        } else if (userBalance) {
            // Native token (typically 18 decimals)
            setAmount(userBalance);
            validateAmount(userBalance);
        }
    };

    // Estimate gas using ethers
    const estimateGas = async () => {
        if (!isConnected || !isValidAddress || !isValidAmount) return;

        setIsEstimatingGas(true);
        setTransactionError(null);

        try {
            // Type assertion to tell TypeScript that window.ethereum is an Eip1193Provider
            const ethereum = window.ethereum as unknown as Eip1193Provider;

            // Now use ethereum instead of window.ethereum
            const provider = new ethers.BrowserProvider(ethereum);
            const signer = await provider.getSigner();

            // Create transaction request
            const tx = {
                to: recipientAddress,
                value: ethers.parseEther(amount)
            };

            // Estimate gas
            const estimatedGas = await provider.estimateGas(tx);
            setGasEstimate(estimatedGas.toString());
        } catch (error) {
            console.error('Gas estimation error:', error);
            setTransactionError(error instanceof Error ? error.message : 'Gas estimation failed');
        } finally {
            setIsEstimatingGas(false);
        }
    };

    // Get block explorer URL based on chain ID
    const getExplorerUrl = (chainId: number, txHash: string) => {
        switch (chainId) {
            case 1: // Ethereum Mainnet
                return `https://etherscan.io/tx/${txHash}`;
            case 137: // Polygon
                return `https://polygonscan.com/tx/${txHash}`;
            case 8453: // Base
                return `https://basescan.org/tx/${txHash}`;
            case 10: // Optimism
                return `https://optimistic.etherscan.io/tx/${txHash}`;
            case 56: // BNB Smart Chain
                return `https://bscscan.com/tx/${txHash}`;
            case 43114: // Avalanche
                return `https://snowtrace.io/tx/${txHash}`;
            case 42161: // Arbitrum One
                return `https://arbiscan.io/tx/${txHash}`;
            default:
                return `https://etherscan.io/tx/${txHash}`;
        }
    };

    // Update updateChainId function to set hex values
    const updateChainId = useCallback(async () => {
        if (window.ethereum) {
            try {
                const ethereum = window.ethereum as unknown as Eip1193Provider;
                const chainIdHex = await ethereum.request({ method: 'eth_chainId' });
                setCurrentChainIdHex(chainIdHex as string);
            } catch (error) {
                console.error("Error getting chain ID:", error);
                setCurrentChainIdHex("0x1"); // Default to Ethereum mainnet on error
            }
        }
    }, []);

    // Update the switchChain function (already passing hex values)
    const switchChain = async (chainHex: string) => {
        // New function that works without window.ethereum for all devices
        setIsChangingChain(true);
        try {
            console.log(`Updating selected chain to ${chainHex}`);
            toast.loading('Updating selected network...', { id: 'chain-switch' });

            // Get the chain configuration from our supported chains
            const chainConfig = SUPPORTED_CHAINS.find(chain => chain.hex === chainHex);
            if (!chainConfig) {
                toast.error('Unknown network configuration', { id: 'chain-switch' });
                return;
            }

            // Update state with new chain values
            setCurrentChainIdHex(chainHex);
            setManualChainIdHex(chainHex);
            setSelectedToken(null);
            setShowChainDropdown(false);

            // Force refetch tokens for selected chain
            setTimeout(() => {
                console.log('Fetching tokens for selected chain:', chainHex);
                refetchTokens();
            }, 500);

            toast.success(`Now viewing ${chainConfig.name} network`, { id: 'chain-switch' });
        } catch (error) {
            console.error('Error updating selected chain:', error);
            toast.error('Failed to update selected network', { id: 'chain-switch' });
        } finally {
            setIsChangingChain(false);
        }
    };

    // Update chain changed listener
    useEffect(() => {
        const handleChainChanged = (chainIdHex: string) => {
            console.log('Chain changed in wallet to:', chainIdHex);
            setCurrentChainIdHex(chainIdHex);
            setManualChainIdHex(chainIdHex);
            setSelectedToken(null);

            setTimeout(() => refetchTokens(), 500);
        };

        if (window.ethereum) {
            (window.ethereum as any).on('chainChanged', handleChainChanged);
        }

        return () => {
            if (window.ethereum) {
                (window.ethereum as any).removeListener('chainChanged', handleChainChanged);
            }
        };
    }, [refetchTokens]);

    // Add useEffect to fetch price when token changes
    useEffect(() => {
        const getTokenPrice = async () => {
            if (!selectedToken || !selectedToken.address) {
                setTokenPrice(null);
                return;
            }

            setIsLoadingPrice(true);

            try {
                const price = await fetchTokenPrice(
                    selectedToken.address,
                    manualChainIdHex || currentChainIdHex
                );
                setTokenPrice(price as unknown as CoinPrice);
            } catch (error) {
                console.error('Failed to get token price:', error);
                setTokenPrice(null);
            } finally {
                setIsLoadingPrice(false);
            }
        };

        getTokenPrice();
    }, [selectedToken, manualChainIdHex, currentChainIdHex]);

    // Calculate USD value of entered amount
    const calculateUsdValue = useCallback(() => {
        if (!amount || !tokenPrice?.usd) return null;

        try {
            const numericAmount = parseFloat(amount);
            if (isNaN(numericAmount) || numericAmount <= 0) return null;

            return (numericAmount * tokenPrice.usd).toFixed(2);
        } catch (error) {
            return null;
        }
    }, [amount, tokenPrice]);

    // Get USD value
    const usdValue = calculateUsdValue();

    // Send transaction using ethers
    const handleSendTransaction = async () => {
        if (!isConnected) {
            toast.error('Please connect your wallet first');
            return;
        }

        if (!isValidAddress) {
            toast.error('Please enter a valid recipient address');
            return;
        }

        if (!isValidAmount) {
            toast.error('Please enter a valid amount');
            return;
        }

        setIsSending(true);
        setTransactionError(null);
        setTransactionSuccess(null);

        try {
            // Type assertion to fix the error
            const ethereum = window.ethereum as unknown as Eip1193Provider;

            // Get provider and signer
            const provider = new ethers.BrowserProvider(ethereum);
            const signer = await provider.getSigner();
            const network = await provider.getNetwork();
            const chainId = Number(network.chainId);

            let tx;

            if (selectedToken && selectedToken.type === 'erc20') {
                // For ERC20 tokens, we need to create a contract instance and call transfer
                const erc20Abi = [
                    'function transfer(address to, uint amount) returns (bool)'
                ];
                const tokenContract = new ethers.Contract(
                    selectedToken.address,
                    erc20Abi,
                    signer
                );

                // Convert amount to token decimals and ensure proper precision
                const parsed = parseFloat(amount);
                const formatted = parsed.toFixed(selectedToken.decimals);
                const tokenAmount = ethers.parseUnits(formatted, selectedToken.decimals);

                tx = await tokenContract.transfer(recipientAddress, tokenAmount);
            } else {
                // For native token (ETH, MATIC, etc.)
                // Ethereum has 18 decimals as standard
                const parsed = parseFloat(amount);
                const formatted = parsed.toFixed(18);
                tx = await signer.sendTransaction({
                    to: recipientAddress,
                    value: ethers.parseEther(formatted)
                });
            }

            // Set transaction success data
            setTransactionSuccess({
                hash: tx.hash,
                chainId: chainId
            });

            toast.success('Transaction submitted!');

            // Clear form
            setAmount('');
            setRecipientAddress('');
            setIsValidAddress(false);
            setIsValidAmount(false);

        } catch (error) {
            console.error('Error sending transaction:', error);
            setTransactionError(formatTransactionError(error));
            toast.error('Transaction failed');
        } finally {
            setIsSending(false);
        }
    };

    // Update chain display in UI
    // In the JSX where we display the current chain
    const currentChainInfo = SUPPORTED_CHAINS.find(chain => chain.hex === currentChainIdHex) ||
        { id: 1, name: "Ethereum", icon: "/images/chains/ethereum.svg", hex: "0x1" };

    return (
        <div className="flex flex-col gap-4 md:gap-6 w-full">
            {transactionSuccess ? (
                <div className="bg-gradient-to-b from-premium-white/5 to-premium-white/2 backdrop-blur-sm p-4 md:p-8 rounded-2xl md:rounded-3xl shadow-xl border border-premium-white/10 transition-all duration-500 animate-fadeIn">
                    <div className="flex flex-col items-center text-center gap-4 md:gap-6">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full blur-xl"></div>
                            <div className="relative bg-gradient-to-r from-green-500/30 to-emerald-500/30 p-4 md:p-5 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 md:h-14 md:w-14 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl md:text-2xl font-bold text-premium-white mb-1 md:mb-2 tracking-tight">Transaction Confirmed</h3>
                            <p className="text-light-gray/80 text-xs md:text-sm">Your transaction has been submitted to the <span className={networkColors[currentChainInfo.id].text}>{getNetworkName(currentChainInfo.id)}</span> network</p>
                        </div>

                        <div className="bg-gradient-to-br from-premium-white/10 to-premium-white/5 p-3 md:p-4 rounded-xl md:rounded-2xl w-full backdrop-blur-sm border border-premium-white/5">
                            <p className="text-xs text-light-gray/70 mb-1 md:mb-2 uppercase tracking-wider font-medium">Transaction Hash</p>
                            <div className="flex items-center justify-between bg-premium-black/30 rounded-lg md:rounded-xl px-3 py-2 md:px-4 md:py-3 border border-premium-white/5">
                                <p className="text-blue-400 text-xs md:text-sm font-mono">{truncateAddress(transactionSuccess.hash)}</p>
                                <button
                                    onClick={() => copyToClipboard(transactionSuccess.hash)}
                                    className="bg-premium-white/5 hover:bg-premium-white/10 p-1.5 md:p-2 rounded-lg transition-all duration-300 hover:scale-105"
                                    title="Copy full hash"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 md:h-4 md:w-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div className="grid gap-3 md:gap-4 w-full">
                            <a
                                href={getExplorerUrl(currentChainInfo.id, transactionSuccess.hash)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`bg-gradient-to-r ${networkColors[currentChainInfo.id].from} ${networkColors[currentChainInfo.id].to} text-white font-medium py-3 md:py-4 px-4 md:px-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-${networkColors[currentChainInfo.id].from}/20 flex items-center justify-center gap-2 border border-white/10 text-sm md:text-base`}
                            >
                                <span>View on Block Explorer</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 md:h-4 md:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </a>

                            <button
                                onClick={() => setTransactionSuccess(null)}
                                className="text-light-gray hover:text-premium-white bg-premium-white/5 hover:bg-premium-white/10 py-3 md:py-4 px-4 md:px-6 rounded-xl transition-all duration-300 border border-premium-white/5 hover:border-premium-white/10 text-sm md:text-base"
                            >
                                Send another transaction
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-xl md:text-2xl font-bold text-premium-white">Send Transaction</h2>

                        <div className="relative">
                            <button
                                className={`flex items-center ${isChangingChain ? 'bg-premium-white/10' : 'bg-premium-white/5 hover:bg-premium-white/10'} px-3 md:px-4 py-1.5 md:py-2 rounded-xl transition-all`}
                                onClick={() => setShowChainDropdown(!showChainDropdown)}
                                disabled={isChangingChain}
                            >
                                {isChangingChain ? (
                                    <>
                                        <div className="h-4 w-4 rounded-full border-2 border-blue-500 border-t-transparent animate-spin mr-2"></div>
                                        <span className="text-premium-white text-sm">Switching...</span>
                                    </>
                                ) : (
                                    <>
                                        <img
                                            src={currentChainInfo.icon}
                                            alt={currentChainInfo.name}
                                            className="w-5 h-5 mr-2 rounded-full"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.style.display = 'none';
                                            }}
                                        />
                                        <span className="text-premium-white text-sm">{currentChainInfo.name}</span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-3 w-3 md:h-4 md:w-4 ml-1 md:ml-2 text-light-gray"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </>
                                )}
                            </button>

                            {showChainDropdown && (
                                <div className="absolute right-0 mt-2 w-48 md:w-56 bg-premium-black border border-premium-white/10 rounded-xl shadow-xl z-10 overflow-hidden">
                                    <div className="p-2 md:p-3 border-b border-premium-white/10">
                                        <h3 className="text-premium-white text-xs md:text-sm font-medium">Select Network</h3>
                                    </div>
                                    <div className="max-h-60 overflow-y-auto custom-scrollbar">
                                        {SUPPORTED_CHAINS.map(chain => (
                                            <button
                                                key={chain.id}
                                                className={`w-full flex items-center p-3 md:p-4 hover:bg-premium-white/5 transition-colors ${currentChainIdHex === chain.hex ? 'bg-premium-white/10' : ''}`}
                                                onClick={() => switchChain(chain.hex)}
                                                disabled={isChangingChain}
                                            >
                                                <img
                                                    src={chain.icon}
                                                    alt={chain.name}
                                                    className="w-6 h-6 mr-3 rounded-full"
                                                    onError={(e) => {
                                                        const target = e.target as HTMLImageElement;
                                                        target.style.display = 'none';
                                                    }}
                                                />
                                                <span className="text-premium-white text-sm">{chain.name}</span>
                                                {currentChainIdHex === chain.hex && (
                                                    <span className="ml-auto">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                        </svg>
                                                    </span>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="bg-premium-white/5 p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-sm border border-premium-white/10">
                        <div className="flex justify-between text-premium-white text-base md:text-lg font-medium mb-2">
                            <span>Recipient Address</span>
                        </div>
                        <div className="bg-premium-white/10 rounded-xl md:rounded-2xl p-3 md:p-4 transition-all focus-within:ring-2 focus-within:ring-blue-500/50">
                            <input
                                type="text"
                                placeholder="0x..."
                                value={recipientAddress}
                                onChange={handleAddressChange}
                                className="bg-transparent text-lg md:text-xl font-medium text-premium-white w-full focus:outline-none"
                            />
                            {recipientAddress && !isValidAddress && (
                                <p className="text-red-400 text-xs md:text-sm mt-2">Please enter a valid ETH address</p>
                            )}
                        </div>

                        <div className="flex justify-between text-premium-white text-base md:text-lg font-medium mb-2 mt-4 md:mt-6">
                            <span>Amount</span>
                            {isConnected && selectedToken && (
                                <span className="text-light-gray text-xs md:text-sm">
                                    Balance: {tokensLoading ? '...' : formatBalance(ethers.formatUnits(selectedToken.balance, selectedToken.decimals))} {selectedToken.symbol}
                                </span>
                            )}
                        </div>
                        <div className="bg-premium-white/10 rounded-xl md:rounded-2xl p-3 md:p-4 transition-all focus-within:ring-2 focus-within:ring-blue-500/50">
                            {/* Input field in its own row at full width */}
                            <div className="w-full mb-3 relative">
                                <input
                                    type="text"
                                    placeholder="0"
                                    value={amount}
                                    onChange={handleAmountChange}
                                    className="bg-transparent text-2xl md:text-4xl font-medium text-premium-white w-full focus:outline-none"
                                />
                                {selectedToken && (
                                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 text-xs text-light-gray/50 mr-2">
                                        {`max ${selectedToken.decimals} decimals`}
                                    </div>
                                )}
                            </div>

                            {/* MAX button and token selector in separate row */}
                            <div className="flex items-center justify-between gap-2 mt-1">
                                <button
                                    onClick={handleMaxAmount}
                                    className="text-blue-400 hover:text-blue-300 text-xs md:text-sm bg-blue-500/10 px-2 md:px-3 py-1 rounded-md md:rounded-lg transition-all hover:bg-blue-500/20"
                                    disabled={balanceLoading || !isConnected}
                                >
                                    MAX
                                </button>

                                <button
                                    className="flex items-center bg-dark-gray px-3 md:px-4 py-1.5 md:py-2 rounded-full hover:bg-dark-gray/80 transition-all text-sm md:text-base group relative overflow-hidden"
                                    onClick={() => setShowTokenModal(true)}
                                    disabled={tokensLoading}
                                >
                                    {(tokensLoading || (!walletSymbol && !selectedToken)) ? (
                                        <div className="flex items-center">
                                            <div className="w-4 h-4 md:w-5 md:h-5 mr-2 rounded-full bg-premium-white/10 animate-pulse"></div>
                                            <div className="h-4 w-12 bg-premium-white/10 rounded-md animate-pulse"></div>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 md:h-4 md:w-4 ml-1 md:ml-2 text-light-gray" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="absolute inset-0 bg-gradient-to-r from-premium-white/0 via-premium-white/5 to-premium-white/0 opacity-0 group-hover:opacity-100 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-1000"></div>
                                            {selectedToken && selectedToken.iconUrl ? (
                                                <img
                                                    src={selectedToken.iconUrl}
                                                    alt={selectedToken.symbol}
                                                    className="w-4 h-4 md:w-5 md:h-5 mr-2 rounded-full object-contain"
                                                    onError={(e) => {
                                                        const target = e.target as HTMLImageElement;
                                                        target.style.display = 'none';
                                                    }}
                                                />
                                            ) : selectedToken ? (
                                                <div className="w-4 h-4 md:w-5 md:h-5 mr-2 bg-blue-500/20 rounded-full flex items-center justify-center">
                                                    <span className="text-blue-400 text-xs">{selectedToken.symbol.substring(0, 2)}</span>
                                                </div>
                                            ) : (
                                                <div className="relative w-4 h-4 md:w-5 md:h-5 mr-2 rounded-full overflow-hidden">
                                                    <img
                                                        src={currentChainInfo.icon}
                                                        alt={walletSymbol}
                                                        className="w-full h-full object-cover rounded-full"
                                                        onError={(e) => {
                                                            const target = e.target as HTMLImageElement;
                                                            target.style.display = 'none';
                                                        }}
                                                    />
                                                    <div className="absolute inset-0 rounded-full ring-1 ring-premium-white/10"></div>
                                                </div>
                                            )}
                                            <span className="text-premium-white">{selectedToken ? selectedToken.symbol : walletSymbol}</span>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-3 w-3 md:h-4 md:w-4 ml-1 md:ml-2 text-light-gray group-hover:text-premium-white transition-colors duration-200"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </>
                                    )}
                                </button>
                            </div>

                            {amount && !isValidAmount && (
                                <p className="text-red-400 text-xs md:text-sm mt-2">
                                    {parseFloat(amount) > parseFloat(selectedToken?.balance || userBalance || '0')
                                        ? 'Insufficient balance'
                                        : 'Please enter a valid amount'}
                                </p>
                            )}
                        </div>
                    </div>

                    {transactionError && (
                        <div className="p-3 md:p-4 bg-red-500/20 border border-red-500/40 rounded-lg text-red-400 text-xs md:text-sm overflow-hidden">
                            <p className="break-words overflow-wrap-anywhere whitespace-normal">
                                {transactionError}
                            </p>
                        </div>
                    )}

                    <button
                        className={`w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-premium-white py-3 md:py-4 rounded-xl md:rounded-full text-base md:text-lg font-medium transition-all shadow-premium hover:shadow-lg hover:shadow-blue-500/20 border border-blue-500/50 ${(!isConnected || !isValidAddress || !isValidAmount || isSending)
                            ? 'opacity-70 cursor-not-allowed'
                            : ''
                            }`}
                        onClick={handleSendTransaction}
                        disabled={!isConnected || !isValidAddress || !isValidAmount || isSending}
                    >
                        {!isConnected
                            ? 'Connect Wallet'
                            : isSending
                                ? 'Sending...'
                                : !isValidAddress
                                    ? 'Enter Valid Address'
                                    : !isValidAmount
                                        ? 'Enter Valid Amount'
                                        : 'Send Transaction'}
                    </button>

                    {isConnected && isValidAddress && isValidAmount && (
                        <div className="mt-1 md:mt-2 text-light-gray text-xs md:text-sm space-y-1.5 md:space-y-2 bg-premium-white/5 p-3 md:p-4 rounded-lg md:rounded-xl">
                            <div className="flex justify-between">
                                <span>Estimated Gas:</span>
                                <span>{isEstimatingGas ? 'Calculating...' : gasEstimate ? `${ethers.formatUnits(gasEstimate, 'gwei')} gwei` : 'Will be estimated'}</span>
                            </div>

                            {/* Add USD value to transaction details */}
                            {usdValue && (
                                <div className="flex justify-between">
                                    <span>USD Value:</span>
                                    <span className="text-green-400">${usdValue}</span>
                                </div>
                            )}

                            <div className="flex justify-between">
                                <span>Network:</span>
                                <span className="text-blue-400">
                                    {currentChainInfo.name}
                                </span>
                            </div>
                        </div>
                    )}
                </>
            )}

            {/* Use the new SendTransactionTokenList component instead of the inline token dropdown */}
            <SendTransactionTokenList
                isOpen={showTokenModal}
                onClose={() => setShowTokenModal(false)}
                onSelectToken={handleSelectToken}
                tokens={tokens}
                isLoading={tokensLoading}
                error={error as Error | null}
                refetchTokens={refetchTokens}
                selectedToken={selectedToken}
            />
        </div>
    );
};

export default SendTab; 