'use client';

import { useState } from 'react';
import { toast } from 'react-hot-toast';

interface BuyTabProps {
    isConnected: boolean;
    address: string;
}

const BuyTab = ({ isConnected, address }: BuyTabProps) => {
    const [amount, setAmount] = useState('');
    const [currency, setCurrency] = useState('USD');
    const currencies = ['USD', 'EUR', 'GBP', 'AUD', 'CAD'];
    const [paymentMethod, setPaymentMethod] = useState('card');

    const handleAmountChange = (value: string) => {
        if (value === '' || /^\d*\.?\d*$/.test(value)) {
            setAmount(value);
        }
    };

    const handleBuy = () => {
        if (!isConnected) {
            toast.error('Please connect your wallet first');
            return;
        }

        if (!amount || parseFloat(amount) <= 0) {
            toast.error('Please enter a valid amount');
            return;
        }

        toast.success('Coming soon! This feature is under development');
    };

    return (
        <div className="flex flex-col">
            <div className="mb-6 text-center">
                <h3 className="text-lg md:text-xl font-medium text-premium-white mb-2">Buy Crypto</h3>
                <p className="text-sm text-light-gray">Purchase crypto directly using a credit card or bank transfer</p>
            </div>

            <div className="mb-4">
                <div className="text-premium-white text-base font-medium mb-2">Amount</div>
                <div className="bg-premium-white/10 rounded-2xl p-3 md:p-4">
                    <div className="flex justify-between items-center">
                        <input
                            type="text"
                            placeholder="0"
                            value={amount}
                            onChange={(e) => handleAmountChange(e.target.value)}
                            className="bg-transparent text-2xl md:text-4xl font-medium text-premium-white w-2/3 focus:outline-none"
                        />
                        <div className="relative">
                            <select
                                value={currency}
                                onChange={(e) => setCurrency(e.target.value)}
                                className="bg-dark-gray px-4 py-2 rounded-full text-premium-white appearance-none pr-8 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            >
                                {currencies.map((curr) => (
                                    <option key={curr} value={curr}>{curr}</option>
                                ))}
                            </select>
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                <svg className="w-4 h-4 text-premium-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-6">
                <div className="text-premium-white text-base font-medium mb-2">Payment Method</div>
                <div className="grid grid-cols-2 gap-3">
                    <button
                        onClick={() => setPaymentMethod('card')}
                        className={`flex items-center justify-center p-3 rounded-xl border ${paymentMethod === 'card'
                                ? 'border-blue-500/50 bg-gradient-to-br from-blue-500/20 to-purple-500/10 text-premium-white'
                                : 'border-medium-gray/30 bg-premium-white/5 text-light-gray hover:bg-premium-white/10'
                            }`}
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                        Credit Card
                    </button>
                    <button
                        onClick={() => setPaymentMethod('bank')}
                        className={`flex items-center justify-center p-3 rounded-xl border ${paymentMethod === 'bank'
                                ? 'border-blue-500/50 bg-gradient-to-br from-blue-500/20 to-purple-500/10 text-premium-white'
                                : 'border-medium-gray/30 bg-premium-white/5 text-light-gray hover:bg-premium-white/10'
                            }`}
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                        </svg>
                        Bank Transfer
                    </button>
                </div>
            </div>

            <div className="mb-6 text-light-gray text-xs space-y-2 p-3 bg-premium-white/5 rounded-xl">
                <div className="flex justify-between">
                    <span>Rate:</span>
                    <span>1 ETH ≈ 3,500 USD</span>
                </div>
                <div className="flex justify-between">
                    <span>Fee:</span>
                    <span>1.5%</span>
                </div>
                <div className="flex justify-between">
                    <span>Estimated delivery:</span>
                    <span>Instant to 10 minutes</span>
                </div>
            </div>

            <button
                onClick={handleBuy}
                className={`w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-premium-white py-3 md:py-4 rounded-xl md:rounded-full text-base md:text-lg font-medium transition-all shadow-premium hover:shadow-lg hover:shadow-blue-500/20 border border-blue-500/50 ${!isConnected || !amount || parseFloat(amount) <= 0 ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                disabled={!isConnected || !amount || parseFloat(amount) <= 0}
            >
                {!isConnected ? 'Connect Wallet' :
                    !amount || parseFloat(amount) <= 0 ? 'Enter Amount' :
                        `Buy ${amount} ${currency} of ETH`}
            </button>

            <div className="mt-4 text-center text-xs text-light-gray">
                By continuing, you agree to our <a href="#" className="text-blue-400 hover:underline">Terms of Service</a> and acknowledge our <a href="#" className="text-blue-400 hover:underline">Privacy Policy</a>.
            </div>
        </div>
    );
};

export default BuyTab; 