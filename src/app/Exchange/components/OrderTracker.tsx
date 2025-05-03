import React, { useEffect, useState } from 'react';
import { AlertCircle, Check, Clock, Loader, RefreshCw } from 'lucide-react';
import axios from 'axios';

interface OrderTrackerProps {
    externalOrderHash?: string;
    autoTrack?: boolean;
    lastPolledAt?: Date | null;
}

const OrderTracker: React.FC<OrderTrackerProps> = ({
    externalOrderHash,
    autoTrack = false,
    lastPolledAt = null
}) => {
    const [orderHash, setOrderHash] = useState<string | null>(externalOrderHash || null);
    const [orderStatus, setOrderStatus] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [lastUpdated, setLastUpdated] = useState<Date | null>(lastPolledAt);
    const [isPolling, setIsPolling] = useState<boolean>(autoTrack);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // Update lastUpdated when lastPolledAt changes
    useEffect(() => {
        if (lastPolledAt) {
            setLastUpdated(lastPolledAt);
        }
    }, [lastPolledAt]);

    // Function to check order status
    const checkOrderStatus = async (hash: string) => {
        if (!hash) return;

        setIsLoading(true);
        setErrorMessage(null);

        try {
            const response = await axios.get(`/api/oneinch/status?orderHash=${hash}`);
            setOrderStatus(response.data.status);
            setLastUpdated(new Date());

            // If order is in final state, stop polling
            const status = response.data.status?.toLowerCase();
            if (status === 'fulfilled' || status === 'completed' || status === 'failed' || status === 'cancelled') {
                setIsPolling(false);
            }

            return response.data;
        } catch (error) {
            console.error('Error checking order status:', error);
            if (axios.isAxiosError(error) && error.response) {
                setErrorMessage(`Status check failed: ${error.response.data?.error || error.message}`);
            } else {
                setErrorMessage('Failed to check order status');
            }
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    // Start/stop polling based on isPolling state
    useEffect(() => {
        let intervalId: NodeJS.Timeout | null = null;

        if (isPolling && orderHash) {
            // Initial check right away
            checkOrderStatus(orderHash);

            // Then set up interval for periodic checks
            intervalId = setInterval(() => {
                checkOrderStatus(orderHash);
            }, 10000); // Poll every 10 seconds
        }

        // Cleanup function
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [isPolling, orderHash]);

    // Update orderHash when externalOrderHash changes
    useEffect(() => {
        if (externalOrderHash && externalOrderHash !== orderHash) {
            setOrderHash(externalOrderHash);
            setIsPolling(autoTrack);
            // Reset status when a new order hash is received
            setOrderStatus(null);
            setLastUpdated(lastPolledAt || null);
            setErrorMessage(null);
        }
    }, [externalOrderHash, autoTrack, lastPolledAt]);

    // Handle manual refresh
    const handleManualRefresh = () => {
        if (orderHash) {
            checkOrderStatus(orderHash);
        }
    };

    // Toggle polling
    const togglePolling = () => {
        setIsPolling(prev => !prev);
    };

    // Format the timestamp
    const formatLastUpdated = () => {
        if (!lastUpdated) return 'Never';
        return lastUpdated.toLocaleTimeString();
    };

    // Calculate time since last update
    const getTimeSinceLastUpdate = () => {
        if (!lastUpdated) return '';

        const now = new Date();
        const diffSeconds = Math.floor((now.getTime() - lastUpdated.getTime()) / 1000);

        if (diffSeconds < 5) return 'just now';
        if (diffSeconds < 60) return `${diffSeconds} seconds ago`;
        if (diffSeconds < 120) return '1 minute ago';
        return `${Math.floor(diffSeconds / 60)} minutes ago`;
    };

    // If no order hash, don't render anything
    if (!orderHash) return null;

    return (
        <div className="mt-4 p-4 bg-white/5 rounded-lg border border-white/10 animate-fadeIn">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                    <span className="text-premium-white font-medium">Order Tracking</span>
                    {isPolling && (
                        <div className="ml-2 flex items-center text-blue-400 text-xs bg-blue-500/20 px-2 py-0.5 rounded-full">
                            <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                            Auto-refreshing
                        </div>
                    )}
                </div>
                <div className="flex space-x-2">
                    <button
                        onClick={togglePolling}
                        className={`p-1.5 rounded-md transition-colors ${isPolling
                            ? 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30'
                            : 'bg-white/10 text-light-gray hover:bg-white/20'
                            }`}
                        title={isPolling ? "Pause auto-refresh" : "Start auto-refresh"}
                    >
                        <Clock className="h-4 w-4" />
                    </button>
                    <button
                        onClick={handleManualRefresh}
                        disabled={isLoading}
                        className="p-1.5 rounded-md bg-white/10 text-light-gray hover:bg-white/20 transition-colors"
                        title="Manually refresh order status"
                    >
                        <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                    </button>
                </div>
            </div>

            <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-light-gray">Order Hash:</span>
                <span className="text-sm font-mono text-premium-white">
                    {orderHash.substring(0, 8)}...{orderHash.substring(orderHash.length - 6)}
                </span>
            </div>

            <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-light-gray">Status:</span>
                <div className="flex items-center">
                    {!orderStatus ? (
                        <span className="text-sm text-blue-400 flex items-center">
                            <Loader className="h-3 w-3 mr-1 animate-spin" />
                            Checking...
                        </span>
                    ) : orderStatus.toLowerCase() === 'pending' || orderStatus.toLowerCase() === 'processing' ? (
                        <span className="text-sm text-blue-400 flex items-center">
                            <Loader className="h-3 w-3 mr-1 animate-spin" />
                            {orderStatus}
                        </span>
                    ) : orderStatus.toLowerCase() === 'fulfilled' || orderStatus.toLowerCase() === 'completed' ? (
                        <span className="text-sm text-green-400 flex items-center">
                            <Check className="h-3 w-3 mr-1" />
                            {orderStatus}
                        </span>
                    ) : (
                        <span className="text-sm text-red-400 flex items-center">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            {orderStatus}
                        </span>
                    )}
                </div>
            </div>

            <div className="flex items-center justify-between">
                <span className="text-sm text-light-gray">Last updated:</span>
                <span className="text-sm text-premium-white">
                    {formatLastUpdated()}
                    {lastUpdated && <span className="text-xs text-light-gray ml-1">({getTimeSinceLastUpdate()})</span>}
                </span>
            </div>

            {errorMessage && (
                <div className="mt-2 text-xs text-red-400 bg-red-500/10 p-2 rounded">
                    <AlertCircle className="h-3 w-3 inline mr-1" />
                    {errorMessage}
                </div>
            )}
        </div>
    );
};

export default OrderTracker; 