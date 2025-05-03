// Types for 1inch Fusion SDK
export interface FusionOrderParams {
    fromTokenAddress: string;
    toTokenAddress: string;
    amount: string;
    walletAddress: string;
    permit?: string;
    takingFeeBps?: number;
    takingFeeReceiver?: string;
    source?: string;
}

export interface OrderFee {
    takingFeeBps: number;
    takingFeeReceiver: string;
}

// Interface for the place-order API
export interface PlaceOrderParams {
    quote: {
        fromTokenAddress: string;
        toTokenAddress: string;
        amount: string;
    };
    walletAddress: string;
    fee?: OrderFee;
}

export interface PlaceOrderResponse {
    order: any;
    signature: string;
    hash: string;
} 