import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Token, Transaction } from '@/types/web3';

// Wallet store state interface
interface WalletState {
  // Connected wallet
  address: string | null;
  isConnected: boolean;
  chainId: number | null;
  
  // Tokens
  tokens: Token[];
  favoriteTokens: string[];
  
  // Transactions
  transactions: Transaction[];
  
  // Actions
  setWallet: (address: string | null, chainId: number | null) => void;
  setConnected: (isConnected: boolean) => void;
  setTokens: (tokens: Token[]) => void;
  addToken: (token: Token) => void;
  updateToken: (address: string, updates: Partial<Token>) => void;
  toggleFavoriteToken: (address: string) => void;
  addTransaction: (transaction: Transaction) => void;
  updateTransaction: (id: string, updates: Partial<Transaction>) => void;
  clearTransactions: () => void;
}

// Create wallet store
export const useWalletStore = create<WalletState>()(
  persist(
    (set) => ({
      // Initial state
      address: null,
      isConnected: false,
      chainId: null,
      tokens: [],
      favoriteTokens: [],
      transactions: [],
      
      // Actions
      setWallet: (address, chainId) => set({ address, chainId }),
      
      setConnected: (isConnected) => set({ isConnected }),
      
      setTokens: (tokens) => set({ tokens }),
      
      addToken: (token) => set((state) => ({
        tokens: [...state.tokens.filter(t => t.address !== token.address), token]
      })),
      
      updateToken: (address, updates) => set((state) => ({
        tokens: state.tokens.map(token => 
          token.address === address ? { ...token, ...updates } : token
        )
      })),
      
      toggleFavoriteToken: (address) => set((state) => ({
        favoriteTokens: state.favoriteTokens.includes(address)
          ? state.favoriteTokens.filter(a => a !== address)
          : [...state.favoriteTokens, address]
      })),
      
      addTransaction: (transaction) => set((state) => ({
        transactions: [transaction, ...state.transactions]
      })),
      
      updateTransaction: (id, updates) => set((state) => ({
        transactions: state.transactions.map(tx => 
          tx.id === id ? { ...tx, ...updates } : tx
        )
      })),
      
      clearTransactions: () => set({ transactions: [] }),
    }),
    {
      name: 'zen-wallet-storage',
      partialize: (state) => ({
        favoriteTokens: state.favoriteTokens,
        transactions: state.transactions,
      }),
    }
  )
); 