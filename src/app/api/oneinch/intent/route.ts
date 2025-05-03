import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const API_BASE_URL = "https://api.1inch.dev/fusion/relayer/v2.0";
const API_KEY = process.env.NEXT_PUBLIC_1INCH_API_KEY;

// Main handler for limit order intent creation
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            srcTokenAddress,
            dstTokenAddress,
            srcAmount,
            limitPrice,
            walletAddress,
            expiryDays = 7,
            chainId = "1"
        } = body;

        if (!srcTokenAddress || !dstTokenAddress || !srcAmount || !limitPrice || !walletAddress) {
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

        // 1. Get token details
        const srcTokenResponse = await axios.get(`https://tokens.1inch.io/v1.2/${chainId}/token/${srcTokenAddress}`);
        const dstTokenResponse = await axios.get(`https://tokens.1inch.io/v1.2/${chainId}/token/${dstTokenAddress}`);

        const srcToken = srcTokenResponse.data;
        const dstToken = dstTokenResponse.data;

        if (!srcToken || !dstToken) {
            throw new Error("Failed to fetch token details");
        }

        // 2. Calculate amounts with proper decimals
        const srcDecimals = srcToken.decimals;
        const dstDecimals = dstToken.decimals;

        // Calculate amounts
        const srcAmountInWei = (Number(srcAmount) * (10 ** srcDecimals)).toString();

        // Calculate taking amount based on limit price
        const dstAmountInWei = (Number(srcAmount) * Number(limitPrice) * (10 ** dstDecimals)).toString();

        // 3. Generate salt for the order
        const salt = Math.floor(Math.random() * 1000000000000000).toString();

        // 4. Calculate expiration time
        const expiration = Math.floor(Date.now() / 1000) + (expiryDays * 24 * 60 * 60);

        // 5. Prepare limit order object
        const order = {
            salt,
            makerAsset: srcTokenAddress,
            takerAsset: dstTokenAddress,
            maker: walletAddress,
            receiver: "0x0000000000000000000000000000000000000000",
            makingAmount: srcAmountInWei,
            takingAmount: dstAmountInWei,
            makerTraits: "0"
        };

        // 6. Generate typed data for signing
        const typedDataResponse = await axios.post(
            `${API_BASE_URL}/${chainId}/limit-order/prepare-order-signature`,
            { order },
            { headers }
        );

        if (!typedDataResponse.data) {
            throw new Error("Failed to generate typed data for signing");
        }

        // 7. Return data needed for signing
        return NextResponse.json({
            order,
            typedData: typedDataResponse.data,
            salt,
            expiry: expiration
        });
    } catch (error: any) {
        console.error("Error preparing limit order:", error);

        return NextResponse.json(
            { error: error.response?.data || error.message || "Error preparing limit order" },
            { status: error.response?.status || 500 }
        );
    }
}

// GET endpoint to get status of a limit order
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const orderHash = searchParams.get("orderHash");
        const chainId = searchParams.get("chainId") || "1";

        if (!orderHash) {
            return NextResponse.json(
                { error: "Missing orderHash parameter" },
                { status: 400 }
            );
        }

        const headers = {
            "Authorization": `Bearer ${API_KEY}`,
            "Accept": "application/json"
        };

        const response = await axios.get(
            `${API_BASE_URL}/${chainId}/limit-order/${orderHash}`,
            { headers }
        );

        return NextResponse.json(response.data);
    } catch (error: any) {
        console.error("Error fetching limit order:", error);
        return NextResponse.json(
            { error: error.response?.data || error.message || "Error fetching limit order" },
            { status: error.response?.status || 500 }
        );
    }
} 