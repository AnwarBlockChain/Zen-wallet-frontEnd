import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get('address');
    const chainId = searchParams.get('chainId');

    if (!address || !chainId) {
        return NextResponse.json({ error: 'Address and chainId are required' }, { status: 400 });
    }

    try {
        const formattedChainId = `eip155:${chainId}`;
        const url = `https://rpc.walletconnect.org/v1/account/${address}/balance?currency=usd&chainId=${encodeURIComponent(formattedChainId)}&st=appkit&sv=react-wagmi%2Csolana-1.7.0&projectId=b56e18d47c72ab683b10814fe9495694`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'accept': '*/*',
                'cache-control': 'no-cache',
                'pragma': 'no-cache'
            }
        });

        if (!response.ok) {
            throw new Error(`Error fetching tokens: ${response.status}`);
        }

        const data = await response.json();
        return NextResponse.json(data);

    } catch (error) {
        console.error('Error in proxy API:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Failed to fetch tokens' },
            { status: 500 }
        );
    }
} 