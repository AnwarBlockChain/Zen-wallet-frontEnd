# ZenWallet - Premium Decentralized Wallet

ZenWallet is an elegant, premium decentralized wallet application built with modern web technologies. It provides a beautiful, intuitive interface for managing crypto assets, swapping tokens, and interacting with decentralized finance protocols.

## Features

- **Premium UI/UX**: Elegant, royale design with attention to detail
- **Multi-Chain Support**: Manage assets across multiple blockchain networks
- **Token Swaps**: Exchange tokens with optimal routing and competitive rates
- **Portfolio Management**: Track your assets and performance over time
- **DeFi Integration**: Access yield farming, staking, and liquidity pools
- **Security-First**: Enterprise-grade security with modern best practices

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom premium theme
- **Components**: shadcn/ui with custom premium styling
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **Web3 Integration**: ethers.js, wagmi, ConnectKit
- **Animation**: Framer Motion

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/zen-wallet-frontend.git
   cd zen-wallet-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
src/
├── app/                   # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Landing page
│   ├── dashboard/         # Dashboard pages
│   │   ├── page.tsx       # Main dashboard
│   │   ├── swap/          # Token swap functionality
│   │   ├── tokens/        # Token management
│   │   └── nfts/          # NFT gallery
│   └── api/               # API routes
├── components/
│   ├── ui/                # Base UI components
│   ├── web3/              # Web3 specific components
│   ├── layout/            # Layout components
│   ├── common/            # Common components
│   └── forms/             # Form components
├── hooks/                 # Custom React hooks
├── services/              # API and service functions
├── stores/                # Zustand state stores
├── types/                 # TypeScript type definitions
└── utils/                 # Utility functions
```

## Design System

ZenWallet uses a custom premium design system with:

- **Color Palette**: Royal purple, gold, and midnight blue accents
- **Typography**: Clean, modern sans-serif fonts
- **Components**: Custom premium variants of standard UI components
- **Animations**: Subtle, elegant transitions and effects
- **Glassmorphism**: Modern glass effects for depth and elegance

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [wagmi](https://wagmi.sh/)
- [ConnectKit](https://docs.family.co/connectkit)

## 1inch Cross-Chain Integration

This project includes integration with the 1inch Cross-Chain SDK for executing cross-chain swaps.

### Production Setup

To enable real transaction signing for 1inch orders, follow these steps:

1. Install the Web3 dependency:
   ```bash
   npm install web3
   ```

2. Create a `.env.local` file in the project root (use `.env.local.example` as a template):
   ```
   # 1inch API Key (required)
   ONE_INCH_AUTH_KEY=your_1inch_api_key_here

   # Maker Private Key - KEEP THIS SECURE (required)
   # This is the private key of the wallet that will be signing transactions
   MAKER_PRIVATE_KEY=your_private_key_here

   # Web3 Node URL (required)
   # Examples: Infura, Alchemy, or your own Ethereum node
   WEB3_NODE_URL=https://mainnet.infura.io/v3/your_project_id
   ```

3. Edit `src/app/api/oneinch/place-order/route.ts` and:
   - Uncomment the Web3 import at the top
   - Uncomment the blockchain provider initialization 
   - Uncomment the actual order placement code

4. Restart the development server:
   ```bash
   npm run dev
   ```

### Security Considerations

- Never commit your private keys or API keys to git
- For production deployments, use secure environment variables
- Consider using a hardware security module (HSM) for key management in production

### Development Mode

To use the application in development mode with mock responses (no real transactions):
- Skip adding a private key to `.env.local`
- The app will return mock responses for order placement 