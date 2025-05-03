import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_ONE_INCH_AUTH_KEY || '';
const BASE_URL = 'https://api.1inch.dev/fusion-plus/relayer/v1.0/submit';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Log the full request body for debugging
        console.log('Submit request body:', JSON.stringify(body, null, 2));

        const {
            order,
            signature,
            quoteId,
            walletAddress,
            chainId,
            srcChainId,
            extension,
            secretHashes,
            source = '0xe26b9977',
            hashLock,
            orderHash,
            quote
        } = body;

        // Validate required parameters
        if (!order || !signature || !quoteId) {
            return NextResponse.json({
                error: 'Missing required parameters',
                details: {
                    order: !order ? 'Required' : 'Provided',
                    signature: !signature ? 'Required' : 'Provided',
                    quoteId: !quoteId ? 'Required' : 'Provided'
                }
            }, { status: 400 });
        }

        // For 1inch API, every order needs a srcChainId
        const finalSrcChainId = srcChainId || chainId || (quote?.srcChain) || 1;

        if (!finalSrcChainId) {
            return NextResponse.json({
                error: 'Source chain ID is required for all orders',
                details: {
                    srcChainId: 'Required - Please include srcChainId in your request'
                }
            }, { status: 400 });
        }

        // Prepare payload based on the 1inch API requirements
        const payload = {
            order,
            signature,
            quoteId,
            srcChainId: finalSrcChainId,
            extension: extension || '0x',
            ...(walletAddress && { walletAddress }),
            ...(source && { source }),
            ...(secretHashes && secretHashes.length > 0 && { secretHashes })
        };

        // Log the final payload being sent to 1inch
        console.log('Submitting to 1inch with payload:', JSON.stringify(payload, null, 2));

        // Submit the order to 1inch API
        const response = await axios.post(BASE_URL, payload, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'accept': 'application/json',
                'content-type': 'application/json'
            }
        });

        console.log('1inch API response:', JSON.stringify(response.data, null, 2));

        // Add tracking instructions to the response
        return NextResponse.json({
            ...response.data,
            _tracking: {
                orderHash: response.data?.orderHash || orderHash || null,
                message: 'Use GET /api/oneinch/status?orderHash={orderHash} to track this order',
                srcChainId: finalSrcChainId
            }
        });
    } catch (error) {
        console.error('Error submitting order to 1inch:', error);

        if (axios.isAxiosError(error)) {
            console.error('1inch API error details:', error.response?.data);

            // Enhanced error handling for common issues
            const errorData = error.response?.data;

            // Check for specific error patterns
            if (errorData?.meta && Array.isArray(errorData.meta)) {
                const reasonMeta = errorData.meta.find((m: any) => m.type === 'reason');

                if (reasonMeta?.value === 'not enough balance') {
                    // Display a more helpful message for token allowance issues
                    return NextResponse.json(
                        {
                            error: {
                                title: 'Insufficient Token Balance or Allowance',
                                description: 'The order could not be placed because your wallet does not have enough tokens or the tokens have not been properly approved.',
                                technicalDetails: errorData,
                                suggestions: [
                                    'Ensure you have sufficient token balance for the swap',
                                    'Try approving your tokens again',
                                    'Reduce the swap amount',
                                    'Check that you actually own the tokens you\'re trying to swap'
                                ]
                            }
                        },
                        { status: error.response?.status || 400 }
                    );
                }
            }

            return NextResponse.json(
                {
                    error: error.response?.data || 'Failed to submit order to 1inch API',
                    status: error.response?.status,
                    statusText: error.response?.statusText
                },
                { status: error.response?.status || 500 }
            );
        }

        return NextResponse.json(
            { error: 'Failed to submit order to 1inch API' },
            { status: 500 }
        );
    }
} 