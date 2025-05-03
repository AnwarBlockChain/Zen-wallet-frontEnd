import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const API_BASE_URL = "https://api.1inch.dev/fusion/relayer/v2.0";
const API_KEY = process.env.NEXT_PUBLIC_1INCH_API_KEY;

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const chainId = searchParams.get("chainId") || "1";
        const fromTokenAddress = searchParams.get("fromTokenAddress");
        const toTokenAddress = searchParams.get("toTokenAddress");
        const amount = searchParams.get("amount");
        const walletAddress = searchParams.get("walletAddress");

        if (!fromTokenAddress || !toTokenAddress || !amount || !walletAddress) {
            return NextResponse.json(
                { error: "Missing required parameters" },
                { status: 400 }
            );
        }

        const headers = {
            "Authorization": `Bearer ${API_KEY}`,
            "Accept": "application/json"
        };

        // Make the API call to 1inch to get quote
        const response = await axios.get(
            `${API_BASE_URL}/${chainId}/quote`,
            {
                headers,
                params: {
                    fromTokenAddress,
                    toTokenAddress,
                    amount,
                    walletAddress
                }
            }
        );

        return NextResponse.json(response.data);
    } catch (error: any) {
        console.error("Error fetching quote:", error);

        return NextResponse.json(
            { error: error.response?.data || error.message || "Error fetching quote" },
            { status: error.response?.status || 500 }
        );
    }
} 