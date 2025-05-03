import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_ONE_INCH_AUTH_KEY || '';
const BASE_URL = 'https://api.1inch.dev/fusion-plus/quoter/v1.0/quote/receive';

// Support both GET and POST methods for flexibility
export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;

    // Parse parameters from URL with proper defaults
    const srcChain = searchParams.get('srcChain') || '1';
    const dstChain = searchParams.get('dstChain') || '1';
    const srcTokenAddress = searchParams.get('srcTokenAddress') || '';
    const dstTokenAddress = searchParams.get('dstTokenAddress') || '';
    const amount = searchParams.get('amount') || '';
    const walletAddress = searchParams.get('walletAddress') || '';
    const enableEstimate = searchParams.get('enableEstimate') || 'true';

    // Validate required parameters
    if (!srcTokenAddress || !dstTokenAddress || !amount || !walletAddress) {
        return NextResponse.json(
            { error: 'Required parameters missing: srcTokenAddress, dstTokenAddress, amount, or walletAddress' },
            { status: 400 }
        );
    }

    // Log the parameters
    console.log('Quote request parameters:', {
        srcChain, dstChain, srcTokenAddress, dstTokenAddress,
        amount, walletAddress, enableEstimate
    });

    try {
        // Call 1inch Fusion Plus API
        const response = await axios.get(BASE_URL, {
            params: {
                srcChain,
                dstChain,
                srcTokenAddress,
                dstTokenAddress,
                amount,
                walletAddress,
                enableEstimate,
            },
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'accept': 'application/json',
                'content-type': 'application/json'
            }
        });

        // Log response for debugging
        console.log('1inch Quote response:', response.data);

        return NextResponse.json(response.data);
    } catch (error) {
        console.error('Error fetching 1inch quote:', error);

        if (axios.isAxiosError(error)) {
            console.error('1inch API error details:', error.response?.data);
            return NextResponse.json(
                { error: error.response?.data || 'Failed to fetch quote from 1inch API' },
                { status: error.response?.status || 500 }
            );
        }

        return NextResponse.json(
            { error: 'Failed to fetch quote from 1inch API' },
            { status: 500 }
        );
    }
}

// Also support POST for compatibility
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Extract parameters from request body
        const {
            srcChain = '1',
            dstChain = '1',
            srcTokenAddress,
            dstTokenAddress,
            amount,
            walletAddress,
            enableEstimate = 'true',
        } = body;

        // Validate required parameters
        if (!srcTokenAddress || !dstTokenAddress || !amount || !walletAddress) {
            return NextResponse.json(
                { error: 'Required parameters missing: srcTokenAddress, dstTokenAddress, amount, or walletAddress' },
                { status: 400 }
            );
        }

        // Log the parameters
        console.log('Quote request parameters (POST):', {
            srcChain, dstChain, srcTokenAddress, dstTokenAddress,
            amount, walletAddress, enableEstimate
        });

        // Call 1inch Fusion Plus API
        const response = await axios.get(BASE_URL, {
            params: {
                srcChain,
                dstChain,
                srcTokenAddress,
                dstTokenAddress,
                amount,
                walletAddress,
                enableEstimate
            },
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'accept': 'application/json',
                'content-type': 'application/json'
            }
        });

        // Log response for debugging
        console.log('1inch Quote response (POST):', response.data);

        return NextResponse.json(response.data);
    } catch (error) {
        console.error('Error fetching 1inch quote (POST):', error);

        if (axios.isAxiosError(error)) {
            console.error('1inch API error details:', error.response?.data);
            return NextResponse.json(
                { error: error.response?.data || 'Failed to fetch quote from 1inch API' },
                { status: error.response?.status || 500 }
            );
        }

        return NextResponse.json(
            { error: 'Failed to fetch quote from 1inch API' },
            { status: 500 }
        );
    }
} 