import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_ONE_INCH_AUTH_KEY || '';
const BASE_URL = 'https://api.1inch.dev/fusion-plus/quoter/v1.0/quote/build';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        if (!body.quote) {
            return NextResponse.json(
                { error: 'Quote is required in the request body' },
                { status: 400 }
            );
        }

        // Get URL parameters if any were sent
        const searchParams = request.nextUrl.searchParams;
        const srcChain = searchParams.get('srcChain');
        const dstChain = searchParams.get('dstChain');
        const srcTokenAddress = searchParams.get('srcTokenAddress');
        const dstTokenAddress = searchParams.get('dstTokenAddress');
        const amount = searchParams.get('amount');
        const walletAddress = searchParams.get('walletAddress');

        // Validate required parameters
        if (!amount) {
            return NextResponse.json(
                { error: 'Amount parameter is required' },
                { status: 400 }
            );
        }

        // Build request parameters
        const params: Record<string, string> = {};
        if (srcChain) params.srcChain = srcChain;
        if (dstChain) params.dstChain = dstChain;
        if (srcTokenAddress) params.srcTokenAddress = srcTokenAddress;
        if (dstTokenAddress) params.dstTokenAddress = dstTokenAddress;
        if (amount) params.amount = amount;
        if (walletAddress) params.walletAddress = walletAddress;

        console.log('Building order with params:', {
            quoteId: body.quote.quoteId || 'not provided',
            amount: params.amount || 'not provided',
            srcChain: params.srcChain || 'not provided',
            dstChain: params.dstChain || 'not provided'
        });

        // Forward the request to 1inch API
        const response = await axios.post(BASE_URL, body, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'accept': 'application/json',
                'content-type': 'application/json'
            },
            params
        });

        return NextResponse.json(response.data);
    } catch (error) {
        console.error('Error building order:', error);

        if (axios.isAxiosError(error)) {
            console.error('1inch API response:', error.response?.data);
            return NextResponse.json(
                { error: error.response?.data || 'Failed to build order from 1inch API' },
                { status: error.response?.status || 500 }
            );
        }

        return NextResponse.json(
            { error: 'Failed to build order from 1inch API' },
            { status: 500 }
        );
    }
} 