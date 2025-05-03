export interface Chain {
    id: number;
    name: string;
    symbol: string;
    icon?: string;
    nativeCurrency: {
        name: string;
        symbol: string;
        decimals: number;
    };
    rpcUrls: string[];
    blockExplorers: {
        name: string;
        url: string;
    }[];
}

const chains: Chain[] = [
    {
        id: 1,
        name: 'Ethereum',
        symbol: 'ETH',
        icon: '/images/chains/ethereum.svg',
        nativeCurrency: {
            name: 'Ether',
            symbol: 'ETH',
            decimals: 18,
        },
        rpcUrls: ['https://ethereum.publicnode.com'],
        blockExplorers: [
            {
                name: 'Etherscan',
                url: 'https://etherscan.io',
            },
        ],
    },
    {
        id: 137,
        name: 'Polygon',
        symbol: 'MATIC',
        icon: '/images/chains/polygon.svg',
        nativeCurrency: {
            name: 'MATIC',
            symbol: 'MATIC',
            decimals: 18,
        },
        rpcUrls: ['https://polygon-rpc.com'],
        blockExplorers: [
            {
                name: 'PolygonScan',
                url: 'https://polygonscan.com',
            },
        ],
    },
    {
        id: 56,
        name: 'BNB Smart Chain',
        symbol: 'BNB',
        icon: '/images/chains/binance.svg',
        nativeCurrency: {
            name: 'BNB',
            symbol: 'BNB',
            decimals: 18,
        },
        rpcUrls: ['https://bsc-dataseed.binance.org'],
        blockExplorers: [
            {
                name: 'BscScan',
                url: 'https://bscscan.com',
            },
        ],
    },
    {
        id: 42161,
        name: 'Arbitrum One',
        symbol: 'ARB',
        icon: '/images/chains/arbitrum.svg',
        nativeCurrency: {
            name: 'Ether',
            symbol: 'ETH',
            decimals: 18,
        },
        rpcUrls: ['https://arb1.arbitrum.io/rpc'],
        blockExplorers: [
            {
                name: 'Arbiscan',
                url: 'https://arbiscan.io',
            },
        ],
    },
    {
        id: 10,
        name: 'Optimism',
        symbol: 'OP',
        icon: '/images/chains/optimism.svg',
        nativeCurrency: {
            name: 'Ether',
            symbol: 'ETH',
            decimals: 18,
        },
        rpcUrls: ['https://mainnet.optimism.io'],
        blockExplorers: [
            {
                name: 'Optimism Explorer',
                url: 'https://optimistic.etherscan.io',
            },
        ],
    },
];

export default chains; 