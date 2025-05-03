import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_ONE_INCH_AUTH_KEY || '';
const BASE_URL = 'https://api.1inch.dev/fusion-plus/orders/v1.0/data';

export async function POST(request: NextRequest) {
    try {
        // Get the URL pathname to route requests
        const url = new URL(request.url);
        const pathname = url.pathname;

        // If this is an orders/data request
        if (pathname.endsWith('/api/oneinch/orders/data')) {
            const body = await request.json();
            const { quote, walletAddress, source = '0xe26b9977' } = body;

            if (!quote || !walletAddress) {
                return NextResponse.json(
                    {
                        error: 'Missing required parameters',
                        details: {
                            quote: !quote ? 'Required' : 'Provided',
                            walletAddress: !walletAddress ? 'Required' : 'Provided'
                        }
                    },
                    { status: 400 }
                );
            }

            const quoteId = quote.quoteId || quote.id;

            console.log('Creating order data with params:', {
                walletAddress,
                quoteId
            });

            const response = await axios.post(BASE_URL, {
                quoteId,
                walletAddress,
                source
            }, {
                headers: {
                    'Authorization': `Bearer ${API_KEY}`,
                    'accept': 'application/json',
                    'content-type': 'application/json'
                }
            });

            return NextResponse.json(response.data);
        }

        // Default response if path doesn't match
        return NextResponse.json({ error: 'Endpoint not found' }, { status: 404 });
    } catch (error) {
        console.error('Error getting order data:', error);

        if (axios.isAxiosError(error)) {
            console.error('1inch API error details:', error.response?.data);
            return NextResponse.json(
                { error: error.response?.data || 'Failed to get order data from 1inch API' },
                { status: error.response?.status || 500 }
            );
        }

        return NextResponse.json(
            { error: 'Failed to get order data from 1inch API' },
            { status: 500 }
        );
    }
} 