const nextConfig = {
    images: {
        domains: ['tokens-data.1inch.io', 'tokens.1inch.io', 's2.coinmarketcap.com'],
    },
    env: {
        CMC_API_KEY: process.env.NEXT_PUBLIC_CMC_API_KEY,
    },
};

module.exports = nextConfig; 