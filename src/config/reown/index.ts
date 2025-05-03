import { cookieStorage, createStorage } from 'wagmi'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { SolanaAdapter } from '@reown/appkit-adapter-solana/react'
import { mainnet, arbitrum, solana, solanaDevnet, solanaTestnet, base, polygon } from '@reown/appkit/networks'
import type { AppKitNetwork } from '@reown/appkit/networks'
import { HuobiWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets'

// Get projectId from https://cloud.reown.com
export const projectId = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID || "" // this is a public projectId only to use on localhost

if (!projectId) {
  throw new Error("No Project ID")
}

export const networks = [mainnet, arbitrum, solana, solanaDevnet, solanaTestnet, base, polygon] as [AppKitNetwork, ...AppKitNetwork[]]

//Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage
  }),
  ssr: true,
  projectId,
  networks
})

export const solanaWeb3JsAdapter = new SolanaAdapter({
  // @ts-ignore
  wallets: [new HuobiWalletAdapter(), new SolflareWalletAdapter()]
})

export const config = wagmiAdapter.wagmiConfig