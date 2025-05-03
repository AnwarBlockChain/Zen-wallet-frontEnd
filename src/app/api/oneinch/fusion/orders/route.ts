import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const API_BASE_URL = "https://api.1inch.dev/fusion/relayer/v2.0";
const API_KEY = process.env.NEXT_PUBLIC_ONE_INCH_AUTH_KEY;

// Define the expected payload type
interface OrderPayload {
    order: any;
    signature: string;
    extension: string;
    quoteId: string;
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { order, signature, extension, quoteId } = body;
        const chainId = body.chainId || "1";

        if (!order || !signature || !quoteId) {
            return NextResponse.json(
                { error: "Missing required parameters (order, signature, or quoteId)" },
                { status: 400 }
            );
        }

        const headers = {
            "Authorization": `Bearer ${API_KEY}`,
            "Accept": "application/json",
            "Content-Type": "application/json"
        };

        // Prepare the payload for 1inch API with quoteId required
        const payload: OrderPayload = {
            order,
            signature,
            extension: extension || "0x",
            quoteId
        };

        console.log("Submitting order to 1inch:", JSON.stringify(payload, null, 2));

        // Make the API call to 1inch
        const response = await axios.post(
            `${API_BASE_URL}/${chainId}/order/submit`,
            payload,
            { headers }
        );

        console.log("1inch response:", JSON.stringify(response.data, null, 2));

        return NextResponse.json(response.data);
    } catch (error: any) {
        console.error("Error creating limit order:", error);

        // Provide more detailed error information
        let errorData = error.response?.data || { message: error.message || "Error creating limit order" };
        let errorStatus = error.response?.status || 500;

        // Log the detailed error for debugging
        console.error("Detailed error:", JSON.stringify(errorData, null, 2));

        return NextResponse.json(
            { error: errorData, status: errorStatus },
            { status: errorStatus }
        );
    }
} 