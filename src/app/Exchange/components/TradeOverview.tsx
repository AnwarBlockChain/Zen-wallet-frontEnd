import { AlertTriangle, ArrowRight, ArrowUpRight, BellRing, Check, Clock, ExternalLink, Loader, RefreshCw, Shield, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

interface TradeOverviewProps {
    onDismiss: () => void;
    onViewDetails?: () => void;
    onEnableNotifications?: () => void;
    onRefresh?: () => void;
    tradeType: string;
    status: string;
    shouldShowNotificationPrompt?: boolean;
    orderData?: any;
    orderHash?: string;
    isPolling?: boolean;
}

const TradeOverview: React.FC<TradeOverviewProps> = ({
    onDismiss,
    onViewDetails,
    onEnableNotifications,
    onRefresh,
    tradeType,
    status,
    shouldShowNotificationPrompt = false,
    orderData,
    orderHash,
    isPolling = false
}) => {
    const [showNotificationPrompt, setShowNotificationPrompt] = useState(shouldShowNotificationPrompt);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState<string>('');

    // Calculate and update the time remaining for pending orders
    useEffect(() => {
        if (!orderData?.details?.auctionStartDate || !orderData?.details?.auctionDuration) return;

        const calculateTimeRemaining = () => {
            const startTime = orderData.details.auctionStartDate * 1000;
            const duration = orderData.details.auctionDuration * 1000;
            const endTime = startTime + duration;
            const now = Date.now();

            if (now >= endTime) {
                setTimeRemaining('Auction ended');
                return;
            }

            const remainingMs = endTime - now;
            const minutes = Math.floor(remainingMs / 60000);
            const seconds = Math.floor((remainingMs % 60000) / 1000);

            setTimeRemaining(`${minutes}m ${seconds}s remaining`);
        };

        calculateTimeRemaining();
        const interval = setInterval(calculateTimeRemaining, 1000);

        return () => clearInterval(interval);
    }, [orderData]);

    // Enhanced polling indicator with last poll time
    const renderPollingIndicator = () => {
        if (!isPolling) return null;

        return (
            <div className="absolute top-14 right-4 text-blue-300 flex items-center text-xs">
                <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                Auto-refreshing
            </div>
        );
    };

    // Handle manual refresh with loading state
    const handleRefresh = () => {
        if (onRefresh) {
            setIsRefreshing(true);
            onRefresh();

            // Reset loading state after a short delay
            setTimeout(() => {
                setIsRefreshing(false);
            }, 1000);
        }
    };

    // Format order status display
    const getStatusDisplay = () => {
        const lowerStatus = status?.toLowerCase() || '';

        if (lowerStatus === 'pending' || lowerStatus === 'processing') {
            return (
                <span className="flex items-center bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm">
                    <RefreshCw className="h-4 w-4 mr-1 animate-spin" /> Processing
                </span>
            );
        } else if (lowerStatus === 'fulfilled' || lowerStatus === 'completed') {
            return (
                <span className="flex items-center bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm">
                    <Check className="h-4 w-4 mr-1" /> Completed
                </span>
            );
        } else if (lowerStatus === 'refunded') {
            return (
                <span className="flex items-center bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-full text-sm">
                    <ArrowRight className="h-4 w-4 mr-1" /> Refunded
                </span>
            );
        } else if (lowerStatus === 'failed' || lowerStatus === 'cancelled' || lowerStatus === 'expired') {
            return (
                <span className="flex items-center bg-red-500/20 text-red-300 px-3 py-1 rounded-full text-sm">
                    <AlertTriangle className="h-4 w-4 mr-1" /> {lowerStatus}
                </span>
            );
        } else {
            return (
                <span className="flex items-center bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-full text-sm">
                    <Clock className="h-4 w-4 mr-1" /> {status || 'Unknown'}
                </span>
            );
        }
    };

    // Get explorer URL for network
    const getExplorerUrl = (hash: string, chainId: number = 1) => {
        const explorers: Record<number, string> = {
            1: 'https://etherscan.io/tx/',
            137: 'https://polygonscan.com/tx/',
            56: 'https://bscscan.com/tx/',
            42161: 'https://arbiscan.io/tx/',
            10: 'https://optimistic.etherscan.io/tx/',
            43114: 'https://snowtrace.io/tx/'
        };

        return `${explorers[chainId] || explorers[1]}${hash}`;
    };

    // Check if this is a cross-chain transaction
    const isCrossChain = orderData?.details?.srcChainId !== orderData?.details?.dstChainId &&
        orderData?.details?.srcChainId &&
        orderData?.details?.dstChainId;

    // Format cached timestamp
    const formatCachedTime = (timestamp?: string): string => {
        if (!timestamp) return 'N/A';

        try {
            const date = new Date(timestamp);

            // Check if date is valid
            if (isNaN(date.getTime())) {
                return 'recently';
            }

            return date.toLocaleTimeString();
        } catch (err) {
            return 'recently';
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/80 backdrop-blur-sm p-4">
            <div className="w-full max-w-md bg-gray-900 rounded-2xl border border-gray-800 shadow-2xl overflow-hidden max-h-[70vh] flex flex-col">
                {/* Header */}
                <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-5 flex-shrink-0">
                    <button
                        onClick={onDismiss}
                        className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
                    >
                        <X className="h-6 w-6" />
                    </button>

                    {renderPollingIndicator()}

                    <div className="relative z-10">
                        <h2 className="text-white text-xl font-bold">{tradeType}</h2>
                        <div className="mt-2 flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-hide">
                            {getStatusDisplay()}

                            {orderHash && (
                                <span className="text-white/70 text-sm whitespace-nowrap">
                                    ID: {orderHash.substring(0, 6)}...{orderHash.substring(orderHash.length - 4)}
                                </span>
                            )}

                            {/* Add refresh button */}
                            {onRefresh && (status?.toLowerCase() === 'pending' || status?.toLowerCase() === 'processing') && (
                                <button
                                    onClick={handleRefresh}
                                    className="text-white/70 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors flex-shrink-0"
                                    title="Manually refresh status"
                                    disabled={isRefreshing}
                                >
                                    <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                                </button>
                            )}
                        </div>

                        {/* Show cross-chain badge if applicable */}
                        {isCrossChain && (
                            <div className="mt-2 bg-blue-500/20 text-blue-300 text-xs px-2 py-1 rounded-md inline-flex items-center">
                                <Shield className="h-3 w-3 mr-1" />
                                Cross-Chain Transaction
                            </div>
                        )}
                    </div>
                </div>

                {/* Order Summary - Scrollable Container */}
                <div className="p-5 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 200px)' }}>
                    <h3 className="text-premium-white font-medium mb-3">Order Summary</h3>

                    <div className="space-y-3">
                        {/* If we have orderData, display it */}
                        {orderData?.details ? (
                            <>
                                {/* Transaction Path with Networks (if cross-chain) */}
                                {isCrossChain && (
                                    <div className="bg-white/5 rounded-lg p-3">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                                                    {getNetworkIcon(orderData.details.srcChainId)}
                                                </div>
                                                <span className="ml-2 text-premium-white">
                                                    {getNetworkName(orderData.details.srcChainId)}
                                                </span>
                                            </div>

                                            <ArrowRight className="h-4 w-4 text-light-gray mx-2" />

                                            <div className="flex items-center">
                                                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                                                    {getNetworkIcon(orderData.details.dstChainId)}
                                                </div>
                                                <span className="ml-2 text-premium-white">
                                                    {getNetworkName(orderData.details.dstChainId)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Enhanced display of token values with additional information */}
                                <div className="bg-white/5 rounded-lg p-3">
                                    {/* Source Token Info */}
                                    <div className="mb-3">
                                        <div className="text-light-gray text-xs mb-1">From {getAssetName(orderData.details.order.makerAsset)}</div>
                                        <div className="text-premium-white font-medium text-lg">
                                            {formatAmount(orderData.details.order.makingAmount, 18)} {getAssetSymbol(orderData.details.order.makerAsset)}
                                        </div>
                                        {orderData.details.srcTokenPriceUsd && (
                                            <div className="text-light-gray text-xs">
                                                ≈ {formatCurrency(parseFloat(orderData.details.srcTokenPriceUsd) * parseFloat(formatAmount(orderData.details.order.makingAmount, 18)))}
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex justify-center my-1">
                                        <div className="bg-white/10 p-1 rounded-full">
                                            <ArrowRight className="h-4 w-4 text-light-gray" />
                                        </div>
                                    </div>

                                    {/* Destination Token Info */}
                                    <div className="mt-3">
                                        <div className="text-light-gray text-xs mb-1">To {getAssetName(orderData.details.takerAsset)}</div>
                                        <div className="text-premium-white font-medium text-lg">
                                            {formatAmount(orderData.details.order.takingAmount, 18)} {getAssetSymbol(orderData.details.takerAsset)}
                                        </div>
                                        {orderData.details.dstTokenPriceUsd && (
                                            <div className="text-light-gray text-xs">
                                                ≈ {formatCurrency(parseFloat(orderData.details.dstTokenPriceUsd) * parseFloat(formatAmount(orderData.details.order.takingAmount, 18)))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Order Status Progress */}
                                <div className="bg-white/5 rounded-lg p-3">
                                    <div className="mb-2 flex justify-between items-center">
                                        <span className="text-light-gray text-sm">Status</span>
                                        <span className="text-premium-white flex items-center">
                                            {status === 'pending' ? (
                                                <span className="text-blue-400 flex items-center">
                                                    <Loader className="animate-spin h-3.5 w-3.5 mr-1.5" />
                                                    Processing
                                                </span>
                                            ) : status === 'fulfilled' || status === 'completed' ? (
                                                <span className="text-green-400 flex items-center">
                                                    <Check className="h-3.5 w-3.5 mr-1.5" />
                                                    Completed
                                                </span>
                                            ) : status === 'refunded' ? (
                                                <span className="text-yellow-400 flex items-center">
                                                    <ArrowRight className="h-3.5 w-3.5 mr-1.5" />
                                                    Refunded
                                                </span>
                                            ) : (
                                                <span className="text-red-400 flex items-center">
                                                    <AlertTriangle className="h-3.5 w-3.5 mr-1.5" />
                                                    {status}
                                                </span>
                                            )}
                                        </span>
                                    </div>

                                    {/* Progress Steps for Cross-Chain */}
                                    {isCrossChain && (
                                        <div className="mt-3 pt-2 border-t border-white/10">
                                            <div className="relative">
                                                {/* Progress Line */}
                                                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-white/10"></div>

                                                {/* Step 1: Source Chain Transaction */}
                                                <div className="relative mb-3 pl-10">
                                                    <div className={`absolute left-0 w-8 h-8 rounded-full flex items-center justify-center 
                                                        ${orderData.details.fills?.[0]?.escrowEvents?.find((e: any) => e.side === 'src')
                                                            ? 'bg-green-500/20 text-green-400'
                                                            : 'bg-blue-500/20 text-blue-400'}`}
                                                    >
                                                        {orderData.details.fills?.[0]?.escrowEvents?.find((e: any) => e.side === 'src')
                                                            ? <Check className="h-4 w-4" />
                                                            : <Clock className="h-4 w-4" />
                                                        }
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-premium-white">Source Chain Transaction</p>
                                                        {orderData.details.fills?.[0]?.escrowEvents?.find((e: any) => e.side === 'src') ? (
                                                            <div className="flex items-center mt-1">
                                                                <a
                                                                    href={getExplorerUrl(
                                                                        orderData.details.fills[0].escrowEvents.find((e: any) => e.side === 'src').transactionHash,
                                                                        orderData.details.srcChainId
                                                                    )}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-xs text-blue-400 flex items-center hover:underline"
                                                                >
                                                                    View Transaction <ExternalLink className="h-3 w-3 ml-1" />
                                                                </a>
                                                            </div>
                                                        ) : (
                                                            <p className="text-xs text-light-gray mt-1">Waiting for source transaction...</p>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Step 2: Destination Chain Transaction */}
                                                <div className="relative pl-10">
                                                    <div className={`absolute left-0 w-8 h-8 rounded-full flex items-center justify-center
                                                        ${orderData.details.fills?.[0]?.escrowEvents?.find((e: any) => e.side === 'dst')
                                                            ? 'bg-green-500/20 text-green-400'
                                                            : 'bg-blue-500/20 text-blue-400'}`}
                                                    >
                                                        {orderData.details.fills?.[0]?.escrowEvents?.find((e: any) => e.side === 'dst')
                                                            ? <Check className="h-4 w-4" />
                                                            : <Clock className="h-4 w-4" />
                                                        }
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-premium-white">Destination Chain Transaction</p>
                                                        {orderData.details.fills?.[0]?.escrowEvents?.find((e: any) => e.side === 'dst') ? (
                                                            <div className="flex items-center mt-1">
                                                                <a
                                                                    href={getExplorerUrl(
                                                                        orderData.details.fills[0].escrowEvents.find((e: any) => e.side === 'dst').transactionHash,
                                                                        orderData.details.dstChainId
                                                                    )}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-xs text-blue-400 flex items-center hover:underline"
                                                                >
                                                                    View Transaction <ExternalLink className="h-3 w-3 ml-1" />
                                                                </a>
                                                            </div>
                                                        ) : (
                                                            <p className="text-xs text-light-gray mt-1">Waiting for destination transaction...</p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Time Remaining for Auction */}
                                    {status?.toLowerCase() === 'pending' && timeRemaining && (
                                        <div className="mt-3 pt-2 border-t border-white/10">
                                            <div className="flex justify-between items-center">
                                                <span className="text-light-gray text-xs">Auction Time</span>
                                                <span className="text-xs text-blue-400">{timeRemaining}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Timestamps */}
                                <div className="bg-white/5 rounded-lg p-3">
                                    {orderData.details.createdAt && (
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-light-gray text-sm">Created</span>
                                            <span className="text-premium-white">
                                                {formatTimestamp(orderData.details.createdAt)}
                                            </span>
                                        </div>
                                    )}

                                    {orderData.details.deadline && (
                                        <div className="flex justify-between items-center">
                                            <span className="text-light-gray text-sm">Deadline</span>
                                            <span className="text-premium-white">
                                                {formatTimestamp(orderData.details.deadline)}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Meta Information */}
                                {orderData._meta && (
                                    <div className="text-xs text-light-gray mt-2 px-1">
                                        Last updated: {formatCachedTime(orderData._meta.cachedAt)}
                                    </div>
                                )}
                            </>
                        ) : (
                            // Default content if no order data
                            <div className="bg-white/5 rounded-lg p-4 text-center text-light-gray">
                                <p>{isPolling ? "Loading order details..." : "Order details are currently unavailable."}</p>
                                <p className="text-sm mt-1">{isPolling ? "Please wait while we fetch the latest status." : "Check back later or view in your wallet history."}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="p-5 border-t border-gray-800 flex-shrink-0">
                    {showNotificationPrompt && onEnableNotifications && (
                        <div className="bg-blue-900/30 rounded-lg p-3 mb-4 flex items-start">
                            <BellRing className="h-5 w-5 text-blue-400 mt-0.5 mr-2 flex-shrink-0" />
                            <div>
                                <p className="text-blue-300 text-sm">Get notified when your transaction completes</p>
                                <button
                                    onClick={() => {
                                        onEnableNotifications?.();
                                        setShowNotificationPrompt(false);
                                    }}
                                    className="text-blue-400 hover:text-blue-300 text-xs font-medium mt-1"
                                >
                                    Enable Notifications
                                </button>
                            </div>
                            <button
                                onClick={() => setShowNotificationPrompt(false)}
                                className="ml-auto text-blue-400/50 hover:text-blue-400 transition-colors"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                    )}

                    <div className="flex gap-3">
                        <button
                            onClick={onDismiss}
                            className="flex-1 py-2.5 px-4 rounded-xl border border-white/20 text-premium-white hover:bg-white/10 transition-colors"
                        >
                            Close
                        </button>

                        {(status?.toLowerCase() === 'pending' || status?.toLowerCase() === 'processing') && onRefresh && (
                            <button
                                onClick={handleRefresh}
                                className="flex-1 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors flex items-center justify-center"
                                disabled={isRefreshing}
                            >
                                <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                                Refresh Status
                            </button>
                        )}

                        {onViewDetails && (status?.toLowerCase() === 'fulfilled' || status?.toLowerCase() === 'completed' || status?.toLowerCase() === 'refunded') && (
                            <button
                                onClick={onViewDetails}
                                className="flex-1 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors flex items-center justify-center"
                            >
                                View Details <ArrowUpRight className="ml-1 h-4 w-4" />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Format token amount
const formatTokenAmount = (amount: string | number, symbol: string, decimals: number = 6): string => {
    if (!amount) return `0 ${symbol}`;

    const num = typeof amount === 'string' ? parseFloat(amount) : amount;
    if (isNaN(num)) return `0 ${symbol}`;

    if (num < 0.000001) {
        return `<0.000001 ${symbol}`;
    }

    return `${num.toLocaleString('en-US', {
        maximumFractionDigits: decimals,
        minimumFractionDigits: decimals > 2 ? 2 : decimals
    })} ${symbol}`;
};

// Format amount from wei
const formatAmount = (amount: string, decimals: number = 18): string => {
    try {
        const parsed = ethers.formatUnits(amount, decimals);
        const num = parseFloat(parsed);

        // Format based on size
        if (num < 0.000001) return "<0.000001";
        if (num < 0.001) return num.toFixed(6);
        if (num < 1) return num.toFixed(4);
        if (num < 1000) return num.toFixed(2);

        return num.toLocaleString('en-US', {
            maximumFractionDigits: 2
        });
    } catch (e) {
        return amount;
    }
};

// Format currency values
const formatCurrency = (value: string | number, decimals: number = 2): string => {
    if (!value) return '$0.00';

    const num = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(num)) return '$0.00';

    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    }).format(num);
};

// Format timestamp to readable date
const formatTimestamp = (timestamp: string | number) => {
    if (!timestamp) return 'N/A';

    try {
        const date = new Date(timestamp);

        // Check if date is valid
        if (isNaN(date.getTime())) {
            return 'N/A';
        }

        return date.toLocaleString();
    } catch (err) {
        return 'N/A';
    }
};

// Get network name from chain ID
const getNetworkName = (chainId: number): string => {
    const networks: Record<number, string> = {
        1: 'Ethereum',
        56: 'BNB Chain',
        137: 'Polygon',
        42161: 'Arbitrum',
        10: 'Optimism',
        43114: 'Avalanche'
    };

    return networks[chainId] || `Chain ID ${chainId}`;
};

// Get network icon (simple text representation)
const getNetworkIcon = (chainId: number): string => {
    const icons: Record<number, string> = {
        1: 'ETH',
        56: 'BNB',
        137: 'MATIC',
        42161: 'ARB',
        10: 'OP',
        43114: 'AVAX'
    };

    return icons[chainId] || 'Chain';
};

// Helper for getting asset name
const getAssetName = (address: string): string => {
    // Common token addresses mapping
    const tokenNames: Record<string, string> = {
        '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2': 'Wrapped Ether',
        '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270': 'Wrapped Matic'
    };

    return tokenNames[address.toLowerCase()] || 'Token';
};

// Helper for getting asset symbol
const getAssetSymbol = (address: string): string => {
    // Common token addresses mapping
    const tokenSymbols: Record<string, string> = {
        '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2': 'WETH',
        '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270': 'WMATIC'
    };

    return tokenSymbols[address.toLowerCase()] || 'TOKEN';
};

export default TradeOverview;
