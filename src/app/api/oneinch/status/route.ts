import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_ONE_INCH_AUTH_KEY || '';
const STATUS_URL = 'https://api.1inch.dev/fusion-plus/orders/v1.0/order/status';

// Simple in-memory cache for order statuses to reduce API calls
// In a production environment, this should be in a database or Redis
const orderStatusCache = new Map<string, {
    status: string;
    timestamp: number;
    details?: any;
}>();

// Cache expiration time: 10 seconds for pending orders, 5 minutes for final status
const PENDING_CACHE_TTL = 10 * 1000;
const FINAL_CACHE_TTL = 5 * 60 * 1000;

// List of statuses considered final (including refunded)
const FINAL_STATUSES = ['fulfilled', 'completed', 'failed', 'cancelled', 'expired', 'refunded'];

export async function GET(request: NextRequest) {
    try {
        // Get the orderHash parameter
        const searchParams = request.nextUrl.searchParams;
        const orderHash = searchParams.get('orderHash');
        const forceRefresh = searchParams.get('refresh') === 'true' || searchParams.get('refresh') === '1';

        if (!orderHash) {
            return NextResponse.json(
                { error: 'orderHash parameter is required' },
                { status: 400 }
            );
        }

        // Check if we have a recent cached status
        const cacheKey = orderHash;
        const cachedStatus = orderStatusCache.get(cacheKey);
        const now = Date.now();

        if (cachedStatus && !forceRefresh) {
            // Determine cache TTL based on status (shorter for pending orders)
            const status = cachedStatus.status.toLowerCase();
            const isFinalStatus = FINAL_STATUSES.includes(status);
            const cacheTTL = isFinalStatus ? FINAL_CACHE_TTL : PENDING_CACHE_TTL;

            if (now - cachedStatus.timestamp < cacheTTL) {
                console.log(`Returning cached status for order ${orderHash}: ${cachedStatus.status}`);
                return NextResponse.json({
                    orderHash,
                    status: cachedStatus.status,
                    details: cachedStatus.details,
                    _meta: {
                        cached: true,
                        cachedAt: new Date(cachedStatus.timestamp).toISOString(),
                        ttl: cacheTTL,
                        remainingTtl: cacheTTL - (now - cachedStatus.timestamp)
                    }
                });
            }
        }

        // Fetch current status from 1inch Fusion API
        console.log(`Fetching order status from 1inch API for ${orderHash}${forceRefresh ? ' (forced refresh)' : ''}`);

        const response = await axios.get(`${STATUS_URL}/${orderHash}`, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'accept': 'application/json',
                'content-type': 'application/json'
            }
        });

        // Process the response
        const orderData = response.data;
        const status = orderData?.status || 'unknown';

        // Log status change if it was cached before and changed
        if (cachedStatus && cachedStatus.status !== status) {
            console.log(`⚠️ Status changed for order ${orderHash}: ${cachedStatus.status} -> ${status}`);
        }

        // Check if there's a fill status that might be more accurate
        // Sometimes the top-level status can be stale while the fills[].status is updated
        let effectiveStatus = status;
        if (orderData?.fills && orderData.fills.length > 0) {
            const fillStatus = orderData.fills[0].status;

            // If fill status is more final than the top level status, use it
            if (fillStatus &&
                (fillStatus !== status) &&
                (FINAL_STATUSES.includes(fillStatus.toLowerCase()) && !FINAL_STATUSES.includes(status.toLowerCase()))) {
                effectiveStatus = fillStatus;
                console.log(`Using fill status "${fillStatus}" instead of order status "${status}" for ${orderHash}`);
            }
        }

        // Check for escrow_cancelled events which indicate a refund
        let hasRefundEvents = false;
        if (orderData?.fills && orderData.fills.length > 0 && orderData.fills[0].escrowEvents) {
            const cancelEvents = orderData.fills[0].escrowEvents.filter(
                (event: any) => event.action === 'escrow_cancelled'
            );

            if (cancelEvents && cancelEvents.length > 0) {
                hasRefundEvents = true;
                if (effectiveStatus === 'pending') {
                    effectiveStatus = 'refunded';
                    console.log(`Setting status to "refunded" based on escrow_cancelled events for ${orderHash}`);
                }
            }
        }

        // Cache the result
        const isFinalStatus = FINAL_STATUSES.includes(effectiveStatus.toLowerCase());
        orderStatusCache.set(cacheKey, {
            status: effectiveStatus,
            timestamp: now,
            details: orderData
        });

        return NextResponse.json({
            orderHash,
            status: effectiveStatus,
            details: orderData,
            _meta: {
                cached: false,
                fetchedAt: new Date().toISOString(),
                isFinalStatus,
                statusOverridden: effectiveStatus !== status,
                hasRefundEvents
            }
        });
    } catch (error: any) {
        console.error('Error checking order status:', error);

        // Create a more informative error response
        let errorMessage = 'Failed to check order status';
        let statusCode = 500;

        if (axios.isAxiosError(error)) {
            // Extract details from the error
            const responseData = error.response?.data;
            statusCode = error.response?.status || 500;

            // Special handling for "order not found" errors
            if (error.response?.status === 404 ||
                responseData?.message?.includes('not found') ||
                responseData?.description?.includes('not found')) {

                errorMessage = 'Order not found or not yet indexed in the 1inch system';
                // Return with 404 status but include helpful context
                return NextResponse.json(
                    {
                        orderHash: request.nextUrl.searchParams.get('orderHash'),
                        status: 'not_found',
                        error: errorMessage,
                        details: {
                            message: "Order may still be propagating through the 1inch system. Try again in a few moments.",
                            originalError: responseData || error.message
                        }
                    },
                    { status: 404 }
                );
            } else if (responseData) {
                // Use the error message from the API if available
                errorMessage = responseData.message || responseData.description || errorMessage;
            }
        }

        return NextResponse.json(
            {
                error: errorMessage,
                details: error.message
            },
            { status: statusCode }
        );
    }
} 