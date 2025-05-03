import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const API_BASE_URL = "https://api.1inch.dev/fusion/relayer/v2.0";
const API_KEY = process.env.NEXT_PUBLIC_1INCH_API_KEY;

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            makerAsset,
            takerAsset,
            maker,
            makingAmount,
            takingAmount,
            chainId = "1"
        } = body;

        if (!makerAsset || !takerAsset || !maker || !makingAmount || !takingAmount) {
            return NextResponse.json(
                { error: "Missing required parameters" },
                { status: 400 }
            );
        }

        const headers = {
            "Authorization": `Bearer ${API_KEY}`,
            "Accept": "application/json",
            "Content-Type": "application/json"
        };

        // Generate salt for the order
        const salt = Math.floor(Math.random() * 1000000000000000).toString();

        // Prepare order object
        const order = {
            salt,
            makerAsset,
            takerAsset,
            maker,
            receiver: "0x0000000000000000000000000000000000000000",
            makingAmount,
            takingAmount,
            makerTraits: "0"
        };

        // Make the API call to 1inch to get typed data for signing
        const response = await axios.post(
            `${API_BASE_URL}/${chainId}/limit-order/prepare-order-signature`,
            { order },
            { headers }
        );

        return NextResponse.json({
            order,
            typedData: response.data
        });
    } catch (error: any) {
        console.error("Error preparing order data:", error);

        return NextResponse.json(
            { error: error.response?.data || error.message || "Error preparing order data" },
            { status: error.response?.status || 500 }
        );
    }
} 