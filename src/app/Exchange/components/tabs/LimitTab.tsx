'use client'

import TokenListModal from '@/app/Exchange/components/TokenListModal'
import { useTokenBalances } from '@/hooks/useTokenBalances'
import { fetchTokenList, TokenInfo } from '@/services/tokenListService'
import { AlertCircle, ArrowDownUp, ChevronDown, Info, Lock, RefreshCw, Unlock } from 'lucide-react'
import React, { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useAccount } from 'wagmi'
import { ethers } from 'ethers'

// Time constants
const MINUTE_IN_MS = 60 * 1000;
const HOUR_IN_MS = 60 * MINUTE_IN_MS;
const DAY_IN_MS = 24 * HOUR_IN_MS;

// Define expiry options
const EXPIRY_OPTIONS = [
    { label: '1 minute', value: MINUTE_IN_MS },
    { label: '1 hour', value: HOUR_IN_MS },
    { label: '1 day', value: DAY_IN_MS },
    { label: '3 days', value: 3 * DAY_IN_MS },
    { label: '7 days', value: 7 * DAY_IN_MS },
];

// Order details type
interface OrderDetails {
    sourceSymbol: string;
    sourceAmount: string;
    destSymbol: string;
    destAmount: string;
    price: string;
    expiry: string;
    salt: string;
    orderHash: string;
}

const LimitTab = () => {
    // Token state
    const [tokens, setTokens] = useState<TokenInfo[]>([])
    const [sourceToken, setSourceToken] = useState<TokenInfo | null>(null)
    const [destinationToken, setDestinationToken] = useState<TokenInfo | null>(null)
    const [isLoadingTokens, setIsLoadingTokens] = useState(true)

    // Amount and price state
    const [sourceAmount, setSourceAmount] = useState('')
    const [destinationAmount, setDestinationAmount] = useState('')
    const [limitPrice, setLimitPrice] = useState('')
    const [marketPrice, setMarketPrice] = useState('')
    const [isPriceLocked, setIsPriceLocked] = useState(false)
    const [isPriceLoading, setIsPriceLoading] = useState(false)

    // UI state
    const [expiryMs, setExpiryMs] = useState(EXPIRY_OPTIONS[4].value); // Default to 7 days
    const [showExpiryOptions, setShowExpiryOptions] = useState(false)
    const [tokenSelectorOpen, setTokenSelectorOpen] = useState(false)
    const [selectingTokenFor, setSelectingTokenFor] = useState<'source' | 'destination'>('source')

    // Order state
    const [isPlacingOrder, setIsPlacingOrder] = useState(false)
    const [orderSignature, setOrderSignature] = useState<string | null>(null)
    const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null)
    const [error, setError] = useState<Error | null>(null)
    const [quoteId, setQuoteId] = useState('')

    // Get wallet address
    const { address, isConnected } = useAccount()

    // Fetch market price from API
    const fetchMarketPrice = async () => {
        if (!sourceToken?.address || !destinationToken?.address) return

        try {
            setIsPriceLoading(true)

            // Determine amount to send - if sourceAmount is available, use it
            // otherwise use 1 unit of the token with proper decimals
            const amountToSend = sourceAmount && !isNaN(Number(sourceAmount)) && Number(sourceAmount) > 0
                ? (Number(sourceAmount) * (10 ** (sourceToken.decimals || 18))).toString()
                : (10 ** (sourceToken.decimals || 18)).toString(); // Default 1 token with proper decimals

            const response = await axios.get(`/api/oneinch/intent/price`, {
                params: {
                    srcTokenAddress: sourceToken.address,
                    dstTokenAddress: destinationToken.address,
                    amount: amountToSend,
                    walletAddress: address || '0x0000000000000000000000000000000000000000',
                    chainId: 1
                }
            })

            if (response.data && response.data.price) {
                const price = response.data.price;
                const _quoteId = response.data?.rawResponse?.quoteId || '';

                setMarketPrice(price)

                // Update destination amount if source amount exists and price isn't locked
                if (sourceAmount && !isNaN(Number(sourceAmount)) && !isPriceLocked) {
                    setDestinationAmount((Number(sourceAmount) * Number(price)).toString())
                }

                // If limit price is empty, set it to the market price
                if (!limitPrice && !isPriceLocked) {
                    setLimitPrice(price)
                }
                if (_quoteId) {
                    setQuoteId(_quoteId)
                }
            } else if (response.data && response.data.error) {
                throw new Error(typeof response.data.error === 'string'
                    ? response.data.error
                    : JSON.stringify(response.data.error))
            }
        } catch (error) {
            console.error('Failed to fetch market price:', error)
            toast.error('Failed to fetch current price')
        } finally {
            setIsPriceLoading(false)
        }
    }

    // Load tokens
    useEffect(() => {
        const loadTokens = async () => {
            try {
                setIsLoadingTokens(true)
                const tokenList = await fetchTokenList(1) // Ethereum Mainnet
                setTokens(tokenList)

                // Set default tokens
                if (!sourceToken) {
                    const usdc = tokenList.find(t => t.symbol === 'USDC')
                    if (usdc) setSourceToken(usdc)
                }

                if (!destinationToken) {
                    const matic = tokenList.find(t => t.symbol === 'MATIC')
                    if (matic) setDestinationToken(matic)
                }
            } catch (error) {
                console.error('Failed to load tokens:', error)
            } finally {
                setIsLoadingTokens(false)
            }
        }

        loadTokens()
    }, [])

    // Fetch market price when tokens change
    useEffect(() => {
        if (sourceToken && destinationToken) {
            fetchMarketPrice()
        }
    }, [sourceToken?.address, destinationToken?.address])

    // Fetch market price when source amount changes and price isn't locked
    useEffect(() => {
        if (sourceToken && destinationToken && sourceAmount && !isPriceLocked) {
            fetchMarketPrice()
        }
    }, [sourceAmount, isPriceLocked])

    // Calculate destination amount from source amount and limit price
    useEffect(() => {
        if (sourceAmount && limitPrice && !isNaN(Number(sourceAmount)) && !isNaN(Number(limitPrice))) {
            setDestinationAmount((Number(sourceAmount) * Number(limitPrice)).toString())
        } else {
            setDestinationAmount('')
        }
    }, [sourceAmount, limitPrice])

    // Calculate token addresses for balance tracking
    const tokenAddresses = useMemo(() => {
        const addresses: string[] = []
        if (sourceToken?.address) addresses.push(sourceToken.address)
        if (destinationToken?.address) addresses.push(destinationToken.address)
        return addresses
    }, [sourceToken?.address, destinationToken?.address])

    // Get token balances
    const { getBalance } = useTokenBalances(tokenAddresses)

    // Utility functions
    const handleSourceAmountChange = (value: string) => {
        const regex = /^[0-9]*\.?[0-9]*$/
        if (value === '' || regex.test(value)) {
            const parts = value.split('.')
            setSourceAmount(parts.length === 2 && parts[1].length > 18
                ? `${parts[0]}.${parts[1].substring(0, 18)}`
                : value
            )
        }
    }

    const handleLimitPriceChange = (value: string) => {
        const regex = /^[0-9]*\.?[0-9]*$/
        if (value === '' || regex.test(value)) {
            const parts = value.split('.')
            setLimitPrice(parts.length === 2 && parts[1].length > 18
                ? `${parts[0]}.${parts[1].substring(0, 18)}`
                : value
            )
        }
    }

    const handleMaxAmount = () => {
        if (!sourceToken?.address) return

        const balance = getBalance(sourceToken.address)
        if (balance?.formattedBalance) {
            setSourceAmount(balance.formattedBalance)
        }
    }

    const isAmountExceedingBalance = (): boolean => {
        if (!sourceToken?.address || !sourceAmount) return false

        const balance = getBalance(sourceToken.address)
        if (!balance?.balance) return false

        try {
            return Number(sourceAmount) > Number(balance.formattedBalance)
        } catch {
            return false
        }
    }

    const formatBalance = (token: TokenInfo | null): string => {
        if (!token?.address) return '0'

        const balance = getBalance(token.address)
        if (!balance?.formattedBalance) return '0'

        const formattedBalance = Number(balance.formattedBalance)
        if (formattedBalance < 0.001) return '< 0.001'
        if (formattedBalance < 1) return formattedBalance.toFixed(4)
        return formattedBalance.toFixed(2)
    }

    // Token selection functions
    const openTokenSelector = (type: 'source' | 'destination') => {
        setSelectingTokenFor(type)
        setTokenSelectorOpen(true)
    }

    const selectToken = (token: TokenInfo) => {
        if (selectingTokenFor === 'source') {
            // Swap if selecting same token
            if (destinationToken?.address === token.address) {
                setSourceToken(destinationToken)
                setDestinationToken(token)
            } else {
                setSourceToken(token)
            }
        } else {
            if (sourceToken?.address === token.address) {
                setDestinationToken(sourceToken)
                setSourceToken(token)
            } else {
                setDestinationToken(token)
            }
        }

        setTokenSelectorOpen(false)
    }

    const handleSwapTokens = () => {
        if (!sourceToken || !destinationToken) return

        setSourceToken(destinationToken)
        setDestinationToken(sourceToken)

        // Invert price if it exists
        if (limitPrice && Number(limitPrice) !== 0) {
            setLimitPrice((1 / Number(limitPrice)).toFixed(8))
        }

        setSourceAmount('')
        setDestinationAmount('')
    }

    // UI interaction handlers
    const togglePriceLock = () => setIsPriceLocked(!isPriceLocked)

    const handleExpirySelect = (ms: number) => {
        setExpiryMs(ms);
        setShowExpiryOptions(false);
    }

    // Place limit order function
    const placeLimitOrder = async () => {
        if (!sourceToken || !destinationToken || !sourceAmount || !limitPrice) {
            toast.error('Please connect your wallet and fill in all fields');
            return;
        }

        if (isAmountExceedingBalance()) {
            toast.error(`Insufficient ${sourceToken.symbol} balance`);
            return;
        }

        if (!isConnected || !address) {
            toast.error('Please connect your wallet first');
            return;
        }

        if (!quoteId) {
            toast.error('No quote ID available. Please refresh the price.');
            return;
        }

        setIsPlacingOrder(true);
        setError(null);
        const loadingToast = toast.loading('Creating limit order...');

        try {
            // Calculate amounts with proper decimals - ensure we have integer values
            const makingAmount = ethers.parseUnits(sourceAmount, sourceToken.decimals || 18).toString();
            const takingAmount = ethers.parseUnits(
                (Number(sourceAmount) * Number(limitPrice)).toFixed(destinationToken.decimals || 18),
                destinationToken.decimals || 18
            ).toString();

            // STEP 1: Prepare order data
            toast.loading('Preparing order data...', { id: loadingToast });

            // Generate a random salt
            const salt = Math.floor(Math.random() * 1000000000000000).toString();

            // Construct EIP-712 typed data
            const chainId = sourceToken.chainId || 1;
            const domain = {
                name: "1inch Limit Order Protocol",
                version: "2",
                chainId: Number(chainId),
                verifyingContract: "0x1111111254eeb25477b68fb85ed929f73a960582" // 1inch Limit Order Protocol v2 contract
            };

            // Define the types for EIP-712
            const types = {
                Order: [
                    { name: "salt", type: "uint256" },
                    { name: "makerAsset", type: "address" },
                    { name: "takerAsset", type: "address" },
                    { name: "maker", type: "address" },
                    { name: "receiver", type: "address" },
                    { name: "makingAmount", type: "uint256" },
                    { name: "takingAmount", type: "uint256" },
                    { name: "makerTraits", type: "uint256" }
                ]
            };

            // Create the message with proper numeric formatting
            const message = {
                salt,
                makerAsset: sourceToken.address,
                takerAsset: destinationToken.address,
                maker: address,
                receiver: "0x0000000000000000000000000000000000000000",
                makingAmount,
                takingAmount,
                makerTraits: "0"
            };

            const typedData = {
                types,
                domain,
                primaryType: "Order",
                message
            };

            // STEP 2: Sign the order with user's wallet
            toast.loading('Please sign the transaction in your wallet...', { id: loadingToast });

            if (!window.ethereum) {
                throw new Error('No ethereum provider found. Please ensure your wallet is connected.');
            }

            // Type casting window.ethereum to any to handle the request method
            const ethereum = window.ethereum as any;
            const signature = await ethereum.request({
                method: 'eth_signTypedData_v4',
                params: [address, JSON.stringify(typedData)]
            });

            // STEP 3: Submit the signed order directly to 1inch API
            toast.loading('Submitting order to 1inch...', { id: loadingToast });

            try {
                const expiryTimestamp = Math.floor((Date.now() + expiryMs) / 1000);

                const extensionPayload = {
                    taker: "0x0000000000000000000000000000000000000000", // valid zero address
                    takerTokenAmount: takingAmount, // string (from parseUnits)
                    maker: address,                // must be non-empty
                    makerTokenAmount: makingAmount, // string (from parseUnits)
                    expiry: expiryTimestamp,
                    uuid: ethers.hexlify(ethers.randomBytes(32))
                };

                const abiCoder = new ethers.AbiCoder();
                const extensionHex = abiCoder.encode(
                    ["address", "uint256", "address", "uint256", "uint256", "bytes32"],
                    [
                        extensionPayload.taker,
                        extensionPayload.takerTokenAmount,
                        extensionPayload.maker,
                        extensionPayload.makerTokenAmount,
                        extensionPayload.expiry,
                        extensionPayload.uuid
                    ]
                );

                // Construct the order payload as per 1inch API requirements
                const orderPayload = {
                    order: {
                        salt,
                        makerAsset: sourceToken.address,
                        takerAsset: destinationToken.address,
                        maker: address,
                        receiver: "0x0000000000000000000000000000000000000000",
                        makingAmount,
                        takingAmount,
                        makerTraits: "0"
                    },
                    signature,
                    extension: extensionHex,
                    quoteId: quoteId
                };

                // Submit the order using our API route which forwards to 1inch endpoint
                const submitResponse = await axios.post('/api/oneinch/fusion/orders', {
                    ...orderPayload,
                    chainId: sourceToken.chainId || 1
                });

                if (submitResponse.data.error) {
                    throw new Error(typeof submitResponse.data.error === 'string'
                        ? submitResponse.data.error
                        : JSON.stringify(submitResponse.data.error));
                }

                const orderResult = submitResponse.data;

                // Store order details for display
                setOrderSignature(signature);
                setOrderDetails({
                    sourceSymbol: sourceToken.symbol,
                    sourceAmount,
                    destSymbol: destinationToken.symbol,
                    destAmount: (Number(sourceAmount) * Number(limitPrice)).toFixed(6),
                    price: limitPrice,
                    expiry: new Date(Date.now() + expiryMs).toLocaleString(),
                    salt,
                    orderHash: orderResult.orderHash || orderResult.hash || ''
                });

                // Reset inputs
                setSourceAmount('');
                setDestinationAmount('');

                toast.dismiss(loadingToast);
                toast.success('Order signed and submitted successfully!');
            } catch (submitError: any) {
                console.error('Error submitting signed order:', submitError);
                throw new Error(`Order submission failed: ${submitError.message || 'Unknown error'}`);
            }
        } catch (error: any) {
            console.error('Error placing limit order:', error);

            // Handle specific error types
            let errorMessage = 'Failed to place limit order';

            if (error.message?.includes('User denied message signature')) {
                errorMessage = 'You rejected the signature request';
            } else if (error.message?.includes('ParserError') || error.message?.includes('Unable to encode value')) {
                errorMessage = 'Error encoding order values. Please try with a different amount or price.';
            } else if (error.message) {
                errorMessage = error.message;
            }

            setError(error instanceof Error ? error : new Error(errorMessage));
            toast.error(errorMessage);
        } finally {
            setIsPlacingOrder(false);
        }
    };

    return (
        <div className="w-full bg-black/30 backdrop-blur-xl rounded-3xl border border-medium-gray/30 shadow-xl p-6 gap-6 text-white">
            {/* Pay section */}
            <div className="flex flex-col w-full bg-white/5 hover:bg-white/8 rounded-xl p-5 transition-colors duration-200 border border-white/10 mb-3">
                <div className="text-sm text-gray-400 mb-2 font-medium">Pay</div>
                <div className="flex justify-between items-center">
                    <input
                        type="text"
                        value={sourceAmount}
                        onChange={(e) => handleSourceAmountChange(e.target.value)}
                        placeholder="0"
                        className="bg-transparent text-2xl font-semibold focus:outline-none w-1/2"
                    />
                    <button
                        onClick={() => openTokenSelector('source')}
                        className="flex items-center gap-2 bg-white/5 py-2 px-4 hover:bg-white/10 rounded-full transition-all duration-200"
                    >
                        {sourceToken?.logoURI && (
                            <img src={sourceToken.logoURI} alt={sourceToken.symbol} className="w-6 h-6 rounded-full" />
                        )}
                        <span className="font-medium">{sourceToken?.symbol || 'Select'}</span>
                        <ChevronDown size={16} className="text-premium-white" />
                    </button>
                </div>
                <div className="flex justify-between items-center mt-2 text-sm">
                    <div className="text-gray-500">~${sourceAmount ? (Number(sourceAmount) * 22.4).toFixed(2) : '0.00'}</div>
                    <div className="flex items-center">
                        <span className="text-gray-400 mr-1">Balance: {formatBalance(sourceToken)} {sourceToken?.symbol}</span>
                        <button
                            onClick={handleMaxAmount}
                            className="text-blue-400 font-medium text-xs ml-1 hover:text-blue-300 transition-colors"
                        >
                            MAX
                        </button>
                    </div>
                </div>
                {isAmountExceedingBalance() && (
                    <div className="mt-2 text-amber-500 text-sm flex items-center">
                        <AlertCircle size={14} className="mr-1" />
                        Insufficient {sourceToken?.symbol} balance.
                    </div>
                )}
            </div>

            {/* Swap direction button */}
            <div className="flex justify-center -my-4 relative z-10">
                <button
                    onClick={handleSwapTokens}
                    className="bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg"
                >
                    <ArrowDownUp size={20} className="text-premium-white" />
                </button>
            </div>

            {/* Receive section */}
            <div className="flex flex-col w-full bg-white/5 hover:bg-white/8 rounded-xl p-5 transition-colors duration-200 border border-white/10 mb-3">
                <div className="text-sm text-gray-400 mb-2 font-medium">Receive</div>
                <div className="flex justify-between items-center">
                    <input
                        type="text"
                        value={destinationAmount}
                        placeholder="0"
                        disabled
                        className="bg-transparent text-2xl font-semibold focus:outline-none w-1/2 cursor-not-allowed opacity-90"
                    />
                    <button
                        onClick={() => openTokenSelector('destination')}
                        className="flex items-center gap-2 bg-white/5 py-2 px-4 hover:bg-white/10 rounded-full transition-all duration-200"
                    >
                        {destinationToken?.logoURI && (
                            <img src={destinationToken.logoURI} alt={destinationToken.symbol} className="w-6 h-6 rounded-full" />
                        )}
                        <span className="font-medium">{destinationToken?.symbol || 'Select'}</span>
                        <ChevronDown size={16} className="text-premium-white" />
                    </button>
                </div>
                <div className="flex justify-between items-center mt-2 text-sm">
                    <div className="text-gray-500">~${destinationAmount ? (Number(destinationAmount) * 1).toFixed(2) : '0.00'}</div>
                    <div className="text-gray-400">Balance: {formatBalance(destinationToken)} {destinationToken?.symbol}</div>
                </div>
            </div>

            {/* Limit Price */}
            <div className="flex flex-col w-full bg-white/5 hover:bg-white/8 rounded-xl p-5 transition-colors duration-200 border border-white/10 mb-3">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <span className="text-gray-300 font-medium">Limit Price</span>
                        <button className="ml-2 p-1 rounded-full hover:bg-white/10 transition-colors">
                            <RefreshCw
                                size={14}
                                className="text-gray-400 cursor-pointer"
                                onClick={() => {
                                    if (limitPrice && sourceToken && destinationToken) {
                                        setLimitPrice((1 / Number(limitPrice)).toFixed(8))
                                        handleSwapTokens()
                                    }
                                }}
                            />
                        </button>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="text"
                            value={limitPrice}
                            onChange={(e) => handleLimitPriceChange(e.target.value)}
                            placeholder="0.00"
                            className="bg-transparent text-xl text-right font-semibold focus:outline-none w-28"
                        />
                        <span className="ml-2 text-gray-300">{destinationToken?.symbol}</span>
                        <button
                            onClick={togglePriceLock}
                            className="ml-2 p-1.5 rounded-full hover:bg-white/10 transition-colors"
                            title={isPriceLocked ? "Unlock price" : "Lock price"}
                        >
                            {isPriceLocked ? (
                                <Lock size={16} className="text-blue-400" />
                            ) : (
                                <Unlock size={16} className="text-gray-400" />
                            )}
                        </button>
                    </div>
                </div>

                <div className="flex justify-end mt-2">
                    <button
                        onClick={() => {
                            if (marketPrice) {
                                setLimitPrice(marketPrice)
                                if (sourceAmount && !isNaN(Number(sourceAmount))) {
                                    setDestinationAmount((Number(sourceAmount) * Number(marketPrice)).toString())
                                }
                            } else {
                                fetchMarketPrice()
                            }
                        }}
                        disabled={isPriceLoading || isPriceLocked || !sourceToken || !destinationToken}
                        className={`text-xs flex items-center gap-1 px-2 py-1 rounded-full 
                            ${isPriceLoading
                                ? 'bg-blue-500/10 text-blue-400/70'
                                : 'bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 hover:text-blue-300'} 
                            transition-all duration-200 
                            ${(isPriceLoading || isPriceLocked || !sourceToken || !destinationToken) ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        <span>Use Market Price</span>
                        {isPriceLoading && <RefreshCw size={10} className="animate-spin" />}
                    </button>
                </div>
            </div>

            {/* Expiry */}
            <div className="flex justify-between items-center bg-white/5 hover:bg-white/8 rounded-xl p-5 transition-colors duration-200 border border-white/10 mb-3">
                <div className="text-gray-300 font-medium">Expiry</div>
                <div className="relative">
                    <button
                        onClick={() => setShowExpiryOptions(!showExpiryOptions)}
                        className="flex items-center gap-2 bg-white/5 py-1.5 px-3 hover:bg-white/10 rounded-lg transition-all duration-200"
                    >
                        <span className="text-white font-medium">
                            {EXPIRY_OPTIONS.find(opt => opt.value === expiryMs)?.label || '7 days'}
                        </span>
                        <ChevronDown size={16} className="text-gray-400" />
                    </button>

                    {showExpiryOptions && (
                        <div className="absolute right-0 mt-2 py-2 w-32 bg-gray-800/90 backdrop-blur-md rounded-lg shadow-xl z-20 border border-white/10">
                            {EXPIRY_OPTIONS.map((option) => (
                                <button
                                    key={option.value}
                                    onClick={() => handleExpirySelect(option.value)}
                                    className={`w-full text-left px-4 py-2 hover:bg-white/10 transition-colors ${expiryMs === option.value ? 'bg-white/10 text-blue-400' : ''}`}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Action Button */}
            <button
                disabled={!sourceAmount || !limitPrice || isAmountExceedingBalance() || !sourceToken || !destinationToken || isPlacingOrder || !quoteId}
                onClick={placeLimitOrder}
                className={`w-full py-4 mt-4 rounded-xl font-medium text-lg transition-all duration-300 ${!sourceAmount || !limitPrice || isAmountExceedingBalance() || !sourceToken || !destinationToken || isPlacingOrder || !quoteId
                    ? 'bg-white/10 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 transform hover:scale-[1.01] active:scale-[0.99] shadow-lg hover:shadow-blue-500/20'
                    }`}
            >
                {!sourceToken || !destinationToken
                    ? 'Select tokens'
                    : !sourceAmount || !limitPrice
                        ? 'Enter amount and price'
                        : isAmountExceedingBalance()
                            ? 'Insufficient funds'
                            : !quoteId
                                ? 'Refresh price first'
                                : isPlacingOrder
                                    ? 'Placing order...'
                                    : 'Place limit order'}
            </button>

            {/* Rate information with refresh button */}
            <div className="flex items-center justify-between text-sm text-gray-400 mt-4 px-1">
                <div className="flex items-center">
                    <div className="flex items-center gap-1">
                        {marketPrice
                            ? `1 ${sourceToken?.symbol} = ${Number(marketPrice).toFixed(6)} ${destinationToken?.symbol}`
                            : '--'
                        }
                        <button
                            className={`ml-2 p-1 rounded-full transition-all ${isPriceLoading
                                ? 'opacity-50 cursor-not-allowed'
                                : 'hover:bg-white/10 active:bg-white/20'
                                }`}
                            title="Refresh price"
                            onClick={fetchMarketPrice}
                            disabled={isPriceLoading}
                        >
                            <RefreshCw
                                size={14}
                                className={`text-blue-400 ${isPriceLoading ? 'animate-spin' : ''}`}
                            />
                        </button>
                        <button className="ml-1 cursor-pointer p-1 rounded-full hover:bg-white/10 transition-colors">
                            <Info size={14} className="text-gray-400" />
                        </button>
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    <span className="text-green-400 font-medium">Free</span>
                    <span>Network Fees</span>
                    <button className="cursor-pointer p-1 rounded-full hover:bg-white/10 transition-colors">
                        <Info size={14} className="text-gray-400" />
                    </button>
                </div>
            </div>

            {/* Error message (if any) */}
            {error && (
                <div className="mt-4 p-4 bg-red-900/20 border border-red-600/20 rounded-xl text-sm text-red-400 backdrop-blur-sm">
                    {error.message}
                </div>
            )}

            {/* Token List Modal (from SwapTab) */}
            <TokenListModal
                isOpen={tokenSelectorOpen}
                onClose={() => setTokenSelectorOpen(false)}
                onSelectToken={selectToken}
                type={selectingTokenFor === 'source' ? 'from' : 'to'}
            />

            {/* Success Modal */}
            {orderSignature && orderDetails && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6 w-[450px] max-w-[90vw]">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-white">Limit Order Submitted</h3>
                            <button
                                onClick={() => setOrderSignature(null)}
                                className="text-gray-400 hover:text-white"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="bg-green-900/20 border border-green-600/30 rounded-xl p-4 mb-4">
                            <div className="flex items-center justify-center text-green-400 mb-2">
                                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="font-medium">Order successfully submitted</span>
                            </div>

                            <div className="grid grid-cols-2 gap-3 text-sm mt-3">
                                <div className="text-gray-400">Trading:</div>
                                <div className="text-right font-medium text-white">
                                    {orderDetails.sourceAmount} {orderDetails.sourceSymbol}
                                </div>

                                <div className="text-gray-400">Receiving:</div>
                                <div className="text-right font-medium text-white">
                                    {orderDetails.destAmount} {orderDetails.destSymbol}
                                </div>

                                <div className="text-gray-400">Price:</div>
                                <div className="text-right font-medium text-white">
                                    {orderDetails.price} {orderDetails.destSymbol}/{orderDetails.sourceSymbol}
                                </div>

                                <div className="text-gray-400">Expiry:</div>
                                <div className="text-right font-medium text-white">{orderDetails.expiry}</div>

                                {orderDetails.orderHash && (
                                    <>
                                        <div className="text-gray-400">Order Hash:</div>
                                        <div className="text-right font-medium text-white overflow-hidden text-ellipsis">
                                            {orderDetails.orderHash.substring(0, 6)}...{orderDetails.orderHash.substring(orderDetails.orderHash.length - 4)}
                                        </div>
                                    </>
                                )}

                                <div className="text-gray-400">Status:</div>
                                <div className="text-right font-medium text-green-400">Open</div>
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="text-gray-400 text-sm block mb-1">Signature</label>
                            <div className="flex">
                                <div className="bg-black/30 border border-gray-700 rounded-l-lg py-2 px-3 text-gray-300 text-sm overflow-hidden whitespace-nowrap overflow-ellipsis flex-grow">
                                    {orderSignature.substring(0, 10)}...{orderSignature.substring(orderSignature.length - 10)}
                                </div>
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(orderSignature);
                                        toast.success("Signature copied to clipboard");
                                    }}
                                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-r-lg text-sm"
                                >
                                    Copy
                                </button>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setOrderSignature(null)}
                                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-xl font-medium"
                            >
                                Close
                            </button>

                            {orderDetails.orderHash && (
                                <a
                                    href={`https://explorer.1inch.io/order/${orderDetails.orderHash}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white py-3 rounded-xl font-medium text-center"
                                >
                                    Track Order
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default LimitTab
