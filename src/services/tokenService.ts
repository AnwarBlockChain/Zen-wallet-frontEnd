import { formatUnits } from 'ethers/lib/utils';
import { erc20ABI } from 'wagmi';
import { getPublicClient } from 'wagmi/actions';
import { readContract } from '@wagmi/core';
import { TokenBalance, GetTokenBalanceParams } from '@/types/web3';

// Mock data for development
const mockTokenData = {
  '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2': { // WETH
    decimals: 18,
    symbol: 'WETH',
    name: 'Wrapped Ether',
    balance: '4235600000000000000', // 4.2356 ETH
  },
  '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599': { // WBTC
    decimals: 8,
    symbol: 'WBTC',
    name: 'Wrapped Bitcoin',
    balance: '12450000', // 0.1245 BTC
  },
  '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48': { // USDC
    decimals: 6,
    symbol: 'USDC',
    name: 'USD Coin',
    balance: '1245870000', // 1245.87 USDC
  },
};

/**
 * Fetches token balance and metadata for a specific token
 * This is a mock implementation for development
 * 
 * @param params Token balance request parameters
 * @returns Token balance and metadata
 */
export async function getTokenBalance({
  tokenAddress,
  walletAddress,
  chainId,
}: GetTokenBalanceParams): Promise<TokenBalance> {
  try {
    // For development, return mock data
    const tokenData = mockTokenData[tokenAddress] || {
      decimals: 18,
      symbol: 'UNKNOWN',
      name: 'Unknown Token',
      balance: '0',
    };

    // Format balance with proper decimals
    const formatted = formatUnits(tokenData.balance, tokenData.decimals);

    return {
      balance: tokenData.balance,
      formatted,
      decimals: tokenData.decimals,
      symbol: tokenData.symbol,
      name: tokenData.name,
    };

    // In production, this would use actual contract calls like:
    /*
    const config = createConfig({...});
    const client = getPublicClient(config);
    
    const decimals = await readContract(client, {
      address: tokenAddress as `0x${string}`,
      abi: erc20ABI,
      functionName: 'decimals',
    });
    
    // Similar for other contract calls
    */
  } catch (error) {
    console.error('Error fetching token balance:', error);
    throw error;
  }
}

/**
 * Fetches token price from an API
 * This is a mock implementation for development
 * 
 * @param tokenAddress Token contract address
 * @param chainId Chain ID
 * @returns Token price in USD
 */
export async function getTokenPrice(tokenAddress: string, chainId: number): Promise<number> {
  // Mock prices for development
  const mockPrices: Record<string, number> = {
    // Ethereum mainnet
    '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2': 2000.25, // WETH
    '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599': 25890.75, // WBTC
    '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48': 1.00, // USDC

    // Polygon
    '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619': 2000.25, // WETH
    '0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6': 25890.75, // WBTC
    '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48': 1.00, // USDC
  };

  return mockPrices[tokenAddress.toLowerCase()] || 0;
} 