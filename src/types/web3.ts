// Token interface
export interface Token {
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  balance: string;
  formatted: string;
  price: number;
  value: number;
  chainId: number;
  logoURI?: string;
}

// Transaction interface
export interface Transaction {
  id: string;
  hash: string;
  type: 'send' | 'receive' | 'swap' | 'approve';
  status: 'pending' | 'confirmed' | 'failed';
  timestamp: number;
  from: string;
  to: string;
  value: string;
  asset: string;
  chainId: number;
}

// Token balance interface
export interface TokenBalance {
  balance: string;
  formatted: string;
  decimals: number;
  symbol: string;
  name: string;
}

// Token balance request interface
export interface GetTokenBalanceParams {
  tokenAddress: string;
  walletAddress: string;
  chainId?: number;
} 