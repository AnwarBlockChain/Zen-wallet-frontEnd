import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const API_BASE_URL = "https://api.1inch.dev/fusion/intent/v1.0";
const API_KEY = process.env.NEXT_PUBLIC_1INCH_API_KEY;

export async function POST(request: NextRequest) {
    try {
        const payload = await request.json();
        const {
            chainId = 1,
            orderHash,
            signature,
            walletAddress
        } = payload;

        // Validate required params
        if (!orderHash || !walletAddress) {
            return NextResponse.json(
                { error: "Missing required parameters (orderHash, walletAddress)" },
                { status: 400 }
            );
        }

        // Prepare headers
        const headers = {
            "Authorization": `Bearer ${API_KEY}`,
            "Accept": "application/json",
            "Content-Type": "application/json"
        };

        // Create cancellation request
        const requestData = {
            orderHash,
            walletAddress,
            signature
        };

        // Make the API call to 1inch
        const response = await axios.post(
            `${API_BASE_URL}/${chainId}/limit-order/cancel`,
            requestData,
            { headers }
        );

        // Return successful response
        return NextResponse.json(response.data);
    } catch (error: any) {
        console.error("Error cancelling limit order:", error);

        // Detailed error handling
        if (error.response) {
            return NextResponse.json(
                {
                    error: error.response.data || "Error from 1inch API",
                    status: error.response.status
                },
                { status: error.response.status || 500 }
            );
        } else if (error.request) {
            return NextResponse.json(
                { error: "No response from 1inch API" },
                { status: 503 }
            );
        } else {
            return NextResponse.json(
                { error: error.message || "Internal server error" },
                { status: 500 }
            );
        }
    }
} 