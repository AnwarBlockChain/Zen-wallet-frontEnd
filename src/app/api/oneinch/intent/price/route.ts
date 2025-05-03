import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const API_BASE_URL = "https://api.1inch.dev/fusion/quoter/v2.0";
const API_KEY = process.env.NEXT_PUBLIC_ONE_INCH_AUTH_KEY;

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const chainId = searchParams.get("chainId") || "1";
        const srcTokenAddress = searchParams.get("srcTokenAddress");
        const dstTokenAddress = searchParams.get("dstTokenAddress");
        const amount = searchParams.get("amount") || "1000000000000000000"; // Default to 1 token in wei (18 decimals)
        const walletAddress = searchParams.get("walletAddress") || "0x0000000000000000000000000000000000000000";

        if (!srcTokenAddress || !dstTokenAddress) {
            return NextResponse.json(
                { error: "Missing token addresses" },
                { status: 400 }
            );
        }

        const headers = {
            "Authorization": `Bearer ${API_KEY}`,
            "Accept": "application/json",
            "Content-Type": "application/json"
        };

        // Get current market price from 1inch using the quote/receive endpoint
        const response = await axios.get(
            `${API_BASE_URL}/${chainId}/quote/receive?fromTokenAddress=${srcTokenAddress}&toTokenAddress=${dstTokenAddress}&amount=${amount}&walletAddress=${walletAddress}&enableEstimate=true`,
            { headers }
        );

        // Extract the price from the response
        const responseData = response.data;
        const price = responseData.toTokenAmount && responseData.fromTokenAmount
            ? (Number(responseData.toTokenAmount) / Number(responseData.fromTokenAmount)).toString()
            : null;

        return NextResponse.json({
            price,
            rawResponse: responseData
        });
    } catch (error: any) {
        console.error("Error fetching price estimate:", error);

        // Return more detailed error information
        const errorMessage = error.response?.data || error.message || "Error fetching price estimate";
        console.error("Detailed error:", JSON.stringify(errorMessage));

        return NextResponse.json(
            { error: errorMessage },
            { status: error.response?.status || 500 }
        );
    }
} 