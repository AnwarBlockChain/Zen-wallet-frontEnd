"use client";

import TokenListModal from '@/app/Exchange/components/TokenListModal';
import OrderTracker from '@/app/Exchange/components/OrderTracker';
import TradeOverview from '@/app/Exchange/components/TradeOverview';
import { Button } from '@/components/ui/button';
import { useTokenBalances } from '@/hooks/useTokenBalances';
import { fetchTokenList, TokenInfo } from '@/services/tokenListService';
import oneInchService from '@/services/oneInchService';
import axios from 'axios';
import { ethers, MaxUint256 } from 'ethers';
import { AlertCircle, ArrowUpDown, Check, Loader, RefreshCw, X } from 'lucide-react';
import { useEffect, useMemo, useState, useRef } from 'react';
import { toast } from 'react-hot-toast';
import { useAccount } from 'wagmi';
import tokenList from "@uniswap/default-token-list";
import { BrowserProvider, Contract, parseUnits, formatUnits } from "ethers";
import React from 'react';
const QUOTER_ADDRESS = "0x61fFE014bA17989E743c5F6cB21bF9697530B21e";
const SWAP_ROUTER_ADDRESS = "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45";
import {SwapRouterABI,QUOTER_ABI,quoterABI,quoterABII,ERC20_ABI} from "./Abis";
let feeSelected;
console.log(tokenList.tokens);

// async function getUniswapV3Quote(_amountIn, decimalsIn, tokenIn, tokenOut) {
//   try {
//     if (!window.ethereum) throw new Error("No injected wallet found");

//     // Use ethers v6 BrowserProvider
//     //@ts-ignore
//     const provider = new BrowserProvider(window.ethereum);
//     const signer = await provider.getSigner();
//     const path = ethers.solidityPacked(
//       ["address", "uint24", "address"],
//       [tokenOut, 3000, tokenIn] // WETH -> DAI with a fee of 500 (0.05%)
//     );
//     const quoter = new Contract(QUOTER_ADDRESS, quoterABI, provider);
//     const forQuote = new Contract(QUOTER_ADDRESS, quoterABII, provider);
//     const weth = await quoter.WETH9();
//     // const amountOuut = ethers.parseUnits("1.0", 18);
//     const amountOuut = parseUnits(_amountIn.toString(), decimalsIn);

//     console.log(`the Weth for the quoter is ${weth}`);
//     // const getPool = await quoter.getPool(tokenIn, tokenOut, 3000);
//     // if (!getPool) {
//     //     console.error("pool is not available to be found")
//     // }

//     const amountIn = parseUnits(_amountIn.toString(), decimalsIn);
//     const params = {
//       tokenIn,
//       tokenOut,
//       fee: 3000,
//       amountIn,
//       sqrtPriceLimitX96: 0,
//     };

//     //@ts-ignore
//     const amountOut = await forQuote.quoteExactOutput.staticCall(
//       path,
//       amountOuut
//     );

//     console.log(`Estimated amountOut (WETH):`, amountOut[0]);
//     return amountOut;
//   } catch (err) {
//     console.error("Failed to fetch quote:", err);
//   }
// }

const FEE_TIERS = [100,500, 3000, 10000];

async function getUniswapV3Quote(_amountIn, decimalsIn, tokenIn, tokenOut) {
  if (!window.ethereum) throw new Error("No injected wallet found");
 //@ts-ignore
  const provider = new ethers.BrowserProvider(window.ethereum);
  const amountIn = parseUnits(_amountIn.toString(), decimalsIn);

  for (let fee of FEE_TIERS) {
    try {
      const path = ethers.solidityPacked(
        ["address", "uint24", "address"],
        [tokenOut, fee, tokenIn] // ExactOutput: tokenOut -> fee -> tokenIn
      );
      const quoter = new Contract(QUOTER_ADDRESS, quoterABII, provider);
      const quoteResult = await quoter.quoteExactOutput.staticCall(path, amountIn);
      feeSelected = fee;
      console.log(`Quote found at fee tier ${fee}:`, quoteResult[0]);
      return { amountOut: quoteResult[0], fee };
    } catch (err) {
      console.warn(`Quote failed at fee tier ${fee}:`, err.message);
      continue; // Try next tier
    }
  }

  throw new Error("No quote available at any fee tier");
}


export const approveBothTokens = async (tokenA: string, tokenB: string) => {
  try {
    if (!window.ethereum) throw new Error("No wallet found");

    //@ts-ignore
    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    // Approve Token A
    const tokenAContract = new Contract(tokenA, ERC20_ABI, signer);
    const txA = await tokenAContract.approve(SWAP_ROUTER_ADDRESS, MaxUint256);
    console.log(`Approving ${tokenA}...`);
    await txA.wait();
    console.log(`Token ${tokenA} approved ✅`);

    // Approve Token B
    // const tokenBContract = new Contract(tokenB, ERC20_ABI, signer);
    // const txB = await tokenBContract.approve(SWAP_ROUTER_ADDRESS, MaxUint256);
    // console.log(`Approving ${tokenB}...`);
    // await txB.wait();
    // console.log(`Token ${tokenB} approved ✅`);
  } catch (error) {
    console.error("Approval failed:", error);
  }
};

export const balanceOfErc20 = async (tokenAddress: string): Promise<string> => {
  if (!window.ethereum) throw new Error("No wallet found");
  console.log("checking the balance of the tokens in function");
  //@ts-ignore
  const provider = new BrowserProvider(window.ethereum);
  console.log(1)

  const signer = await provider.getSigner();
  console.log(2)

  const tokenAContract = new Contract(tokenAddress, ERC20_ABI, signer);
  console.log(3)

  const addressOfSpender = await signer.getAddress();
  console.log(4)

  const balanceOf = await tokenAContract.balanceOf(addressOfSpender); // Await here
  console.log(5)

  const decimals = await tokenAContract.decimals(); // Get token decimals
  console.log(6)

  const formattedBalance = ethers.formatUnits(balanceOf, decimals); // Format balance
  console.log(7)

  console.log(`The balance of the spender for the token is ${formattedBalance}`);
  return formattedBalance;
};



const executeSwap = async (
  tokenIn,
  tokenOut,
  amountOut,
  amountInMaximum,
  decimalsIn,
  decimalsOut
) => {
  if (!window.ethereum) throw new Error("MetaMask not found");
  //@ts-ignore
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const router = new ethers.Contract(
    SWAP_ROUTER_ADDRESS,
    SwapRouterABI,
    signer
  );
  const recipient = await signer.getAddress();
  // Pack path: tokenOut -> fee -> tokenIn (because it's exactOutput)
  const path = ethers.solidityPacked(
    ["address", "uint24", "address"],
    [tokenIn, feeSelected, tokenOut]
  );
  
  const exactInputParams = {
    path,
    recipient,
    deadline: Math.floor(Date.now() / 1000) + 60 * 10,
    amountIn: amountInMaximum, // parsedAmountInMax from your UI
    amountOutMinimum: 0,     // set this to prevent front-running/slippage
  };
  

  try {
    const tx = await router.exactInput(exactInputParams, {
      gasLimit: 800000,
    });
    console.log("Swap transaction sent:", tx.hash);
    await tx.wait();
    console.log("Swap confirmed");
  } catch (err) {
    console.error("Swap failed:", err);
  }
};

type Token = TokenInfo & {
    balance?: string;
};

const SwapTab = (): React.ReactNode => {
    const { address } = useAccount();
    const chainId = 1;

    // Token state
    const [tokens, setTokens] = useState<Token[]>([]);
    const [sourceToken, setSourceToken] = useState<Token | null>(null);
    const [destToken, setDestToken] = useState<Token | null>(null);
    const [tokenSelectorOpen, setTokenSelectorOpen] = useState<boolean>(false);
    const [selectingTokenFor, setSelectingTokenFor] = useState<'source' | 'destination'>('source');
    const [isLoadingTokens, setIsLoadingTokens] = useState<boolean>(true);
// alamgir
    // Swap state
    const [sourceAmount, setSourceAmount] = useState<string>('');
    const [destinationAmount, setDestinationAmount] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [quoteLoading, setQuoteLoading] = useState(false);
    const [approving, setApproving] = useState(false);
    const [tokenBalance, setTokenBalance] = useState<any>();

    const [selectedTokenAddress, setSelectedTokenAddress] = useState<string>("");

  
    const [swapState, setSwapState] = useState<{
        quoteResult: any;
        orderResult: any;
        typedData: any;
        signature: string | null;
    }>({
        quoteResult: null,
        orderResult: null,
        typedData: null,
        signature: null
    });
    const [hasAllowance, setHasAllowance] = useState(false);
    const [allowanceLoading, setAllowanceLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [submittingOrder, setSubmittingOrder] = useState(false);

    // Add new state variables for order tracking and modal
    const [isPollingStatus, setIsPollingStatus] = useState<boolean>(false);
    const [lastPolledAt, setLastPolledAt] = useState<Date | null>(null);
    const [showTradeOverview, setShowTradeOverview] = useState<boolean>(false);
    const [orderDetails, setOrderDetails] = useState<any>(null);
    const [pollCount, setPollCount] = useState<number>(0);
    const MAX_POLL_ATTEMPTS = 20;

    const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);

    const { quoteResult, orderResult } = swapState;

    const fetchUniswapTokenList = async () => {
        const res = await fetch('https://gateway.ipfs.io/ipns/tokens.uniswap.org');
        const data = await res.json();
        return data.tokens.filter((token: any) => token.chainId === 1); // Ethereum mainnet only
    };
    const filterTokensByChainId = (tokenList: any[]) => {
        console.log(`filtering the tokens function`);
        return tokenList.filter((token: any) => token.chainId === 1);  // Ethereum mainnet
    };

    useEffect(() => {
        const loadTokens = async () => {
            setIsLoadingTokens(true);
            try {
                const filteredTokens = filterTokensByChainId(tokenList.tokens);
                console.log(`The filtered tokens are below ${JSON.stringify(filteredTokens, null, 2)}`);
                // approveBothTokens()
                setTokens(filteredTokens);
            } catch (err) {
                console.error("Failed to fetch token list", err);
            } finally {
                setIsLoadingTokens(false);
            }
        };
        loadTokens();
    }, []);

    const openTokenSelector = (type: 'source' | 'destination') => {
        setSelectingTokenFor(type);
        setTokenSelectorOpen(true);
    };

    const handleTokenSelect = (token: Token) => {
        if (selectingTokenFor === 'source') {
            setSourceToken(token);
            setSelectedTokenAddress(token.address);
        } else {
            setDestToken(token);
        }
        setTokenSelectorOpen(false); 
    };

    const closeDropdown = () => {
        setTokenSelectorOpen(false); 
    };

    React.useEffect(() => {
      console.log("Selected token address changed:", selectedTokenAddress);
      if (selectedTokenAddress) {
        (async () => {
          try {
            const balance = await balanceOfErc20(selectedTokenAddress);
            console.log("Fetched balance:", balance);
            setTokenBalance(balance); // Update state with fetched balance
          } catch (err) {
            console.error("Error fetching token balance:", err);
            setTokenBalance("0"); // Fallback to 0 in case of an error
          }
        })();
      }
    }, [selectedTokenAddress]);
    
    useEffect(() => {
      const fetchAndQuote = async () => {
        if (!sourceToken || !destToken || !sourceAmount) return;
    
        try {
          // @ts-ignore
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
    
          // Get source token decimals
          const sourceContract = new ethers.Contract(sourceToken.address, ERC20_ABI, signer);
          const sourceDecimals = await sourceContract.decimals();
    
          // Get destination token decimals (in case needed)
          const destContract = new ethers.Contract(destToken.address, ERC20_ABI, signer);
          const destDecimals = await destContract.decimals();
    
          console.log("Source Address:", sourceToken.address);
          console.log("Dest Address:", destToken.address);
          console.log("Source Decimals:", sourceDecimals);
          console.log("Dest Decimals:", destDecimals);
    
          // Call quote function
          const quoteResult = await getUniswapV3Quote(
            sourceAmount,
            sourceDecimals,
            sourceToken.address,
            destToken.address
          );
          const formatted = formatUnits(quoteResult.amountOut.toString(), destDecimals);
          console.log(` ==========> the formatted destination amount is ${formatted}`)

setDestinationAmount(formatted);
setSwapState(prev => ({
  ...prev,
  quoteResult: quoteResult.amountOut,
}));
          
          // const formatted = formatUnits(quoteResult[0], destDecimals);
          
          // setDestinationAmount(formatted); // display-friendly
          // setSwapState(prev => ({
          //   ...prev,
          //   quoteResult: quoteResult[0], // raw BigInt for swap
          // }));;
        } catch (err) {
          console.error("Error in fetching quote:", err);
        }
      };
    
      fetchAndQuote();
    }, [sourceToken, destToken, sourceAmount]);
    // test 


    const handleApproveAndSwap = async () => {
      if (!sourceToken || !destToken || !sourceAmount || !destinationAmount) {
        console.error("Missing required token or amount info");
        return;
      }
    
      try {
        // Approve both tokens
        setApproving(true);
    
        // await approveBothTokens(sourceToken.address, destToken.address);
    
        console.log("Approvals completed. Now executing swap...");
    
        // Get token decimals
        //@ts-ignore
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
    
        const sourceContract = new ethers.Contract(sourceToken.address, ERC20_ABI, signer);
        const destContract = new ethers.Contract(destToken.address, ERC20_ABI, signer);
    
        const sourceDecimals = await sourceContract.decimals();
        const destDecimals = await destContract.decimals();
        const parsedAmountInMax = parseUnits(sourceAmount.toString(), sourceDecimals);
        const parsedAmountOut = swapState.quoteResult; // ✅ KEEP IT AS IS — DO NOT FORMAT
        console.log(`teh parsedAmountIn is ${parsedAmountInMax} and the out is ${parsedAmountOut} but the sourceAmount is ${sourceAmount}`)
        // Execute swap
        // await executeSwap(
        //   sourceToken.address,
        //   destToken.address,
        //   parsedAmountOut,
        //   parsedAmountInMax,
        //   sourceDecimals,
        //   destDecimals
        // );
        await executeSwap(
          sourceToken.address,
          destToken.address,
          parsedAmountOut,
          parsedAmountInMax,
          sourceDecimals,
          destDecimals
        );
      } catch (error) {
        console.error("Error during approval or swap:", error);
      } finally {
        setApproving(false);
      }
    };
    

    
    return (
        <div className="w-full max-w-lg mx-auto p-5 bg-black/30 backdrop-blur-xl rounded-3xl border border-medium-gray/30 shadow-xl">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-premium-white">Swap</h2>
            </div>

            <div className="space-y-2">
          

      {/* alamgir */
      }
       <div className="p-4 bg-white/5 hover:bg-white/8 rounded-xl transition-colors border border-white/5">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-light-gray">Payyyyyyyyyyyyy</span>
        <button className="opacity-80 hover:opacity-100 transition-opacity">
          <span className="px-1.5 py-0.5 text-xs bg-white/10 rounded hover:bg-white/20 transition-colors">
            MAX
          </span>
        </button>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex-1">
          <input
            type="text"
            value={sourceAmount}
            onChange={(e) => setSourceAmount(e.target.value)}
            placeholder="0.0"
            className="w-full bg-transparent text-xl text-premium-white border-none focus:outline-none"
          />
        </div>

        <button
          onClick={() => setTokenSelectorOpen(true)}
          className="flex items-center bg-white/10 hover:bg-white/15 py-2 px-3 rounded-xl transition-colors"
        >
          {sourceToken ? (
            <>
              {sourceToken.logoURI ? (
                <img
                  src={sourceToken.logoURI}
                  alt={sourceToken.symbol}
                  className="w-6 h-6 mr-2 rounded-full"
                />
              ) : (
                <div className="w-6 h-6 mr-2 rounded-full bg-blue-600 flex items-center justify-center text-xs text-white">
                  {sourceToken.symbol.substring(0, 2)}
                </div>
              )}
              <span className="text-premium-white font-medium mr-1">
                {sourceToken.symbol}
              </span>
            </>
          ) : (
            <span className="text-premium-white font-medium">Select Token</span>
          )}
        </button>
      </div>
      <div>
        <input
          type="text"
          value={tokenBalance}
          readOnly
          placeholder="Token Balance"
          className="w-full bg-transparent text-s text-premium-white border-none focus:outline-none"
        />
      </div>
    </div>

      {tokenSelectorOpen && (
        <div className="absolute top-20 left-0 right-0 max-h-60 overflow-y-auto rounded-xl shadow-lg p-4 z-10 bg-black">
          {tokens.map((token) => (
            <div
              key={token.address}
              onClick={() => handleTokenSelect(token)}
              className="flex items-center gap-2 p-2 hover:bg-white/10 rounded cursor-pointer"
            >
              <img
                src={token.logoURI}
                alt={token.symbol}
                className="w-6 h-6 rounded-full"
              />
              <span className="text-premium-white font-medium">
                {token.symbol}
              </span>
            </div>
          ))}
        </div>
      )}






                <div className="flex justify-center">
                    <button
                        className="bg-white/10 hover:bg-white/20 p-3 rounded-full -my-4 z-10 transition-all duration-300 transform hover:scale-110 active:rotate-180"
                        aria-label="Swap tokens"
                    >
                        ↕
                    </button>
                </div>
{/* alamgir alam */}
                <div className="p-4 bg-white/5 hover:bg-white/8 rounded-xl transition-colors border border-white/5">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-light-gray">Receiveeeeeeeeeee</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                value={destinationAmount}
                                readOnly
                                placeholder="0.0"
                                className="w-full bg-transparent text-xl text-premium-white border-none focus:outline-none"
                            />
                        </div>

                        <button
                            onClick={() => openTokenSelector('destination')}
                            className="flex items-center bg-white/10 hover:bg-white/15 py-2 px-3 rounded-xl transition-colors"
                        >
                            {destToken ? (
                                <>
                                    {destToken.logoURI ? (
                                        <img src={destToken.logoURI} alt={destToken.symbol} className="w-6 h-6 mr-2 rounded-full" />
                                    ) : (
                                        <div className="w-6 h-6 mr-2 rounded-full bg-blue-600 flex items-center justify-center text-xs text-white">
                                            {destToken.symbol.substring(0, 2)}
                                        </div>
                                    )}
                                    <span className="text-premium-white font-medium mr-1">{destToken.symbol}</span>
                                </>
                            ) : (
                                <span className="text-premium-white font-medium">Select Token</span>
                            )}
                        </button>
                    </div>
                    
                </div>
            </div>

{/* alamgir  */}
{/* button */}
<button
  onClick={handleApproveAndSwap}
  disabled={approving || !sourceAmount || !destinationAmount}
  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-xl transition-all mt-4"
>
  {approving ? "Approving..." : "Approve & Swap"}
</button>

                        


            {tokenSelectorOpen && (
                <div className="absolute top-20 left-0 right-0 max-h-60 overflow-y-auto rounded-xl shadow-lg p-4 z-10 bg-black">
                    <button
                        onClick={closeDropdown}
                        className="absolute top-2 right-2 p-1 rounded-full text-light-gray hover:text-premium-white"
                        aria-label="Close Dropdown"
                    >
                        <svg className ="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                    {isLoadingTokens ? (
                        <p className="text-center text-light-gray">Loading tokens...</p>
                    ) : (
                        tokens.map((token) => (
                            <div
                                key={token.address}
                                onClick={() => handleTokenSelect(token)}
                                className="flex items-center gap-2 p-2 hover:bg-white/10 rounded cursor-pointer"
                            >
                                <img
                                    src={token.logoURI}
                                    alt={token.symbol}
                                    className="w-6 h-6 rounded-full"
                                />
                                <span className="text-premium-white font-medium">{token.symbol}</span>
                            </div>
                            
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default SwapTab;
