// Import necessary dependencies
import React from 'react';

// Define transaction types
export type SwapTransactionType = 'swap' | 'wrap' | 'unwrap' | 'order';

// Define transaction interface
export interface SuccessTransaction {
    hash: string;
    sourceToken: string;
    sourceAmount: string;
    destinationToken: string;
    destinationAmount?: string;
    usdValue?: string;
    type: SwapTransactionType;
    orderHash?: string;
}

// Define component props
export interface SwapSummaryProps {
    transaction: SuccessTransaction;
    onClose: () => void;
}

export const SwapSummary: React.FC<SwapSummaryProps> = ({ transaction, onClose }) => {
    // Use a default chainId (1 for Ethereum Mainnet)
    const chainId: number = 1; // Default to Ethereum Mainnet

    // Get the appropriate explorer URL based on chainId
    const getExplorerUrl = () => {
        // Default to Ethereum Mainnet
        let baseUrl = process.env.NEXT_PUBLIC_BLOCK_EXPLORER_URL || 'https://etherscan.io';

        // Use chain-specific explorers
        if (chainId === 137) {
            baseUrl = 'https://polygonscan.com';
        } else if (chainId === 56) {
            baseUrl = 'https://bscscan.com';
        } else if (chainId === 10) {
            baseUrl = 'https://optimistic.etherscan.io';
        } else if (chainId === 42161) {
            baseUrl = 'https://arbiscan.io';
        }

        return baseUrl;
    };

    // Determine if we have a transaction hash or an order hash
    const isOrderHash = transaction.orderHash || (transaction.type === 'order' && transaction.hash);
    const orderHash = transaction.orderHash || (transaction.type === 'order' ? transaction.hash : null);

    // Generate the explorer link
    const explorerUrl = isOrderHash
        ? `https://1inch.io/orders/${orderHash}` // 1inch order URL
        : `${getExplorerUrl()}/tx/${transaction.hash}`; // Normal transaction URL

    // Format values for display
    const formattedSourceAmount = parseFloat(transaction.sourceAmount).toFixed(6);
    const formattedDestAmount = parseFloat(transaction.destinationAmount || '0').toFixed(6);

    // Format USD value if available
    const usdValue = transaction.usdValue
        ? `$${parseFloat(transaction.usdValue).toFixed(2)}`
        : 'N/A';

    // Determine action text based on type
    const getActionText = () => {
        switch (transaction.type) {
            case 'wrap': return 'Wrapped';
            case 'unwrap': return 'Unwrapped';
            case 'order': return 'Order to Swap';
            default: return 'Swapped';
        }
    };

    // Generate explorer text based on whether it's a transaction or order
    const getExplorerText = () => {
        return isOrderHash ? 'View on 1inch' : 'View on Explorer';
    };

    return (
        <div className="flex flex-col gap-4 w-full">
            <div className="bg-premium-black border border-premium-white/10 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-premium-white">Transaction Summary</h3>
                    <button
                        onClick={onClose}
                        className="text-light-gray hover:text-premium-white transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <span className="text-light-gray">Status</span>
                        <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-md text-xs font-medium">
                            Success
                        </span>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-light-gray">Action</span>
                        <span className="text-premium-white">{getActionText()}</span>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-light-gray">From</span>
                        <span className="text-premium-white">
                            {formattedSourceAmount} {transaction.sourceToken}
                        </span>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-light-gray">To</span>
                        <span className="text-premium-white">
                            {formattedDestAmount} {transaction.destinationToken}
                        </span>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-light-gray">Value (USD)</span>
                        <span className="text-premium-white">{usdValue}</span>
                    </div>
                </div>

                <div className="mt-6">
                    <a
                        href={explorerUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-full py-2 px-4 bg-premium-white/5 hover:bg-premium-white/10 border border-premium-white/10 rounded-xl transition-colors text-premium-white"
                    >
                        <span>{getExplorerText()}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    );
}; 