// Component declarations
declare module '@/components/ui/button' {
  export const Button: React.ComponentType<any>;
}

declare module '@/components/ui/card' {
  export const Card: React.ComponentType<any>;
  export const CardHeader: React.ComponentType<any>;
  export const CardTitle: React.ComponentType<any>;
  export const CardDescription: React.ComponentType<any>;
  export const CardContent: React.ComponentType<any>;
  export const CardFooter: React.ComponentType<any>;
}

declare module '@/components/ui/input' {
  export const Input: React.ComponentType<any>;
}

declare module '@/components/ui/dialog' {
  export const Dialog: React.ComponentType<any>;
  export const DialogTrigger: React.ComponentType<any>;
  export const DialogContent: React.ComponentType<any>;
  export const DialogHeader: React.ComponentType<any>;
  export const DialogTitle: React.ComponentType<any>;
  export const DialogDescription: React.ComponentType<any>;
  export const DialogFooter: React.ComponentType<any>;
}

declare module '@/components/ui/tabs' {
  export const Tabs: React.ComponentType<any>;
  export const TabsList: React.ComponentType<any>;
  export const TabsTrigger: React.ComponentType<any>;
  export const TabsContent: React.ComponentType<any>;
}

// Web3 library declarations
declare module 'wagmi' {
  export const useAccount: any;
  export const useWalletClient: any;
  export const erc20ABI: any;
  export const WagmiConfig: React.ComponentType<any>;
  export const createConfig: any;
  export const createStorage: any;
  export const cookieStorage: any;
  export const WagmiProvider: React.ComponentType<any>;
  export const useWagmi: any;
  export const cookieToInitialState: any;
}

declare module 'wagmi/chains' {
  export const mainnet: any;
  export const polygon: any;
  export const optimism: any;
  export const arbitrum: any;
  export const base: any;
}

declare module 'wagmi/actions' {
  export const getPublicClient: any;
}

declare module '@wagmi/core' {
  export const readContract: any;
}

declare module 'connectkit' {
  export const ConnectKitProvider: React.ComponentType<any>;
  export const ConnectKitButton: any;
  export const getDefaultConfig: any;
}

declare module 'ethers/lib/utils' {
  export const formatUnits: any;
} 