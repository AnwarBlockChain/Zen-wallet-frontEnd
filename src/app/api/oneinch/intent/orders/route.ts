import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const API_BASE_URL = "https://api.1inch.dev/fusion/intent/v1.0";
const API_KEY = process.env.NEXT_PUBLIC_1INCH_API_KEY;

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const chainId = searchParams.get("chainId") || "1";
        const walletAddress = searchParams.get("walletAddress");
        const page = searchParams.get("page") || "1";
        const limit = searchParams.get("limit") || "20";
        const status = searchParams.get("status"); // Optional parameter for filtering by status

        if (!walletAddress) {
            return NextResponse.json(
                { error: "Missing walletAddress parameter" },
                { status: 400 }
            );
        }

        const headers = {
            "Authorization": `Bearer ${API_KEY}`,
            "Accept": "application/json"
        };

        // Build query parameters
        let queryParams = `walletAddress=${walletAddress}&page=${page}&limit=${limit}`;
        if (status) {
            queryParams += `&status=${status}`;
        }

        // Make the API call to 1inch
        const response = await axios.get(
            `${API_BASE_URL}/${chainId}/limit-orders?${queryParams}`,
            { headers }
        );

        return NextResponse.json(response.data);
    } catch (error: any) {
        console.error("Error fetching limit orders:", error);

        return NextResponse.json(
            { error: error.response?.data || error.message || "Error fetching limit orders" },
            { status: error.response?.status || 500 }
        );
    }
} 