'use client';

import { useState } from 'react';
import { toast } from 'react-hot-toast';

interface ReceiveTabProps {
    isConnected: boolean;
    address: string;
}

const ReceiveTab = ({ isConnected, address }: ReceiveTabProps) => {
    const [copied, setCopied] = useState(false);

    const handleCopyAddress = () => {
        if (!address) return;

        navigator.clipboard.writeText(address)
            .then(() => {
                setCopied(true);
                toast.success('Address copied to clipboard');
                setTimeout(() => setCopied(false), 2000);
            })
            .catch(() => {
                toast.error('Failed to copy address');
            });
    };

    return (
        <div className="flex flex-col items-center">
            <div className="mb-6 text-center">
                <h3 className="text-lg md:text-xl font-medium text-premium-white mb-2">Receive Crypto</h3>
                <p className="text-sm text-light-gray">Share your wallet address to receive funds</p>
            </div>

            {isConnected ? (
                <>
                    <div className="w-full mb-6 bg-premium-white/5 p-4 rounded-xl border border-medium-gray/30">
                        <div className="mb-2 text-xs text-light-gray">Your Wallet Address</div>
                        <div className="flex items-center justify-between">
                            <div className="text-sm text-blue-500 font-mono break-all">
                                {address}
                            </div>
                            <button
                                onClick={handleCopyAddress}
                                className="ml-2 p-2 bg-dark-gray rounded-lg hover:bg-medium-gray/50 transition-colors"
                            >
                                {copied ? (
                                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="w-48 h-48 md:w-56 md:h-56 bg-white p-3 rounded-lg mb-4">
                        {address && (
                            <div className="w-full h-full flex items-center justify-center">
                                <img
                                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${address}`}
                                    alt="Wallet QR Code"
                                    className="w-full h-full"
                                />
                            </div>
                        )}
                    </div>

                    <div className="text-center text-sm text-light-gray">
                        <p>Scan this QR code with a wallet app</p>
                        <p>to receive crypto to this address</p>
                    </div>
                </>
            ) : (
                <div className="py-8 text-center">
                    <p className="text-light-gray mb-4">Connect your wallet to view your receive address</p>
                    <button className="px-6 py-3 bg-blue-600 text-premium-white rounded-xl font-medium hover:bg-blue-700 transition-colors">
                        Connect Wallet
                    </button>
                </div>
            )}
        </div>
    );
};

export default ReceiveTab; 