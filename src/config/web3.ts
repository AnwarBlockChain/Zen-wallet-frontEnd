// Default chains for the application
export const defaultChains = ['ethereum', 'polygon', 'optimism', 'arbitrum', 'base'];

// Supported ERC20 tokens
export const supportedTokens = {
  ethereum: [
    {
      address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', // WETH
      symbol: 'WETH',
      name: 'Wrapped Ether',
      decimals: 18,
      chainId: 1,
    },
    {
      address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599', // WBTC
      symbol: 'WBTC',
      name: 'Wrapped Bitcoin',
      decimals: 8,
      chainId: 1,
    },
    {
      address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', // USDC
      symbol: 'USDC',
      name: 'USD Coin',
      decimals: 6,
      chainId: 1,
    },
  ],
  polygon: [
    {
      address: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619', // WETH
      symbol: 'WETH',
      name: 'Wrapped Ether',
      decimals: 18,
      chainId: 137,
    },
    {
      address: '0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6', // WBTC
      symbol: 'WBTC',
      name: 'Wrapped Bitcoin',
      decimals: 8,
      chainId: 137,
    },
    {
      address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', // USDC
      symbol: 'USDC',
      name: 'USD Coin',
      decimals: 6,
      chainId: 137,
    },
  ],
};

// WalletConnect project ID
export const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'demo-project-id';

// App info for ConnectKit
export const appInfo = {
  appName: 'ZenWallet',
  appDescription: 'The most elegant decentralized wallet experience',
  appUrl: 'https://zen-wallet.app',
  appIcon: 'https://zen-wallet.app/logo.png',
}; 