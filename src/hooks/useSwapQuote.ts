import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ethers } from 'ethers';
import SwapService, { SwapParams, SwapQuote } from '@/services/swapService';
import { TokenInfo } from '@/services/tokenListService';

// Define a simplified Token interface that matches what's used in the components
interface Token {
    address: string;
    symbol: string;
    name: string;
    decimals: number;
    logoURI?: string;
    balance?: string;
}

/**
 * Convert a number in scientific notation to a decimal string
 * This handles numbers like 1.89e+21 that ethers cannot parse directly
 */
function normalizeScientificNotation(value: string): string {
    // Check if it's in scientific notation
    if (value.includes('e') || value.includes('E')) {
        // Parse it as a number then convert to string without scientific notation
        const num = Number(value);
        if (isNaN(num)) {
            throw new Error(`Invalid number format: ${value}`);
        }

        // For very large numbers, use a different approach to avoid precision loss
        if (Math.abs(num) > 1e20) {
            // Convert to a decimal string manually
            const [mantissa, exponentPart] = value.toLowerCase().split('e');
            const exponent = parseInt(exponentPart.replace('+', ''));

            if (exponent > 0) {
                // For positive exponents
                const decimalPos = mantissa.indexOf('.');
                if (decimalPos === -1) {
                    // Integer mantissa, just add zeros
                    return mantissa + '0'.repeat(exponent);
                } else {
                    // Decimal mantissa, need to shift the decimal point
                    const decimalPlaces = mantissa.length - decimalPos - 1;
                    if (exponent >= decimalPlaces) {
                        // Remove decimal point and add remaining zeros
                        return mantissa.replace('.', '') + '0'.repeat(exponent - decimalPlaces);
                    } else {
                        // Shift decimal point right
                        const newMantissa = mantissa.replace('.', '');
                        return newMantissa.substring(0, decimalPos + exponent) +
                            '.' +
                            newMantissa.substring(decimalPos + exponent);
                    }
                }
            } else {
                // For negative exponents
                const cleanMantissa = mantissa.replace('.', '');
                return '0.' + '0'.repeat(Math.abs(exponent) - 1) + cleanMantissa;
            }
        }

        // For smaller numbers, regular toString() works fine
        return num.toString();
    }

    return value;
}

/**
 * Safely parse a string to BigInt, handling scientific notation
 */
function safeParseUnits(value: string, decimals: number): string {
    try {
        // Normalize scientific notation first
        const normalizedValue = normalizeScientificNotation(value);
        return ethers.parseUnits(normalizedValue, decimals).toString();
    } catch (error) {
        console.error(`Error parsing units for value: ${value}`, error);
        throw new Error(`Invalid amount format: ${value}`);
    }
}

/**
 * Safely format units to string, with error handling
 */
function safeFormatUnits(value: string, decimals: number): string {
    try {
        return ethers.formatUnits(value, decimals);
    } catch (error) {
        console.error(`Error formatting units for value: ${value}`, error);
        throw new Error(`Invalid amount format: ${value}`);
    }
}

export interface SwapEstimation {
    toAmount: string;
    formattedToAmount: string;
    rate: string;
    priceImpact: string;
    priceImpactPercent: string;
    routeDescription: string;
    networkCost: string;
    swapFees: string;
    minReceived: string;
}

const useSwapQuote = (
    swapService: SwapService | null,
    params: {
        sourceToken: Token | null;
        destinationToken: Token | null;
        sourceAmount: string;
        userAddress?: string;
        slippage?: number;
    },
    options?: {
        refetchInterval?: number;
        enabled?: boolean;
    }
) => {
    const {
        sourceToken,
        destinationToken,
        sourceAmount,
        userAddress,
        slippage = 1.0
    } = params;

    // Set up validation state and minimum amount

    const isValidAmount = useMemo(() => {
        if (!sourceAmount ||
            sourceAmount.trim() === '' ||
            sourceAmount === '0' ||
            sourceAmount === '0.0' ||
            sourceAmount === '.') {
            return false;
        }

        try {
            const numericAmount = parseFloat(sourceAmount);
            return !isNaN(numericAmount) && numericAmount > 0;
        } catch {
            return false;
        }
    }, [sourceAmount]);

    const canFetchQuote = useMemo(() => {
        return Boolean(
            sourceToken?.address &&
            destinationToken?.address &&
            userAddress &&
            isValidAmount
        );
    }, [
        sourceToken?.address,
        destinationToken?.address,
        userAddress,
        isValidAmount
    ]);

    const formattedSourceAmount = useMemo(() => {
        if (!isValidAmount || !sourceToken) return '';

        try {
            // Ensure we have a valid decimal format
            const normalizedAmount = sourceAmount.startsWith('.')
                ? `0${sourceAmount}`
                : sourceAmount;

            return ethers.parseUnits(
                normalizedAmount,
                sourceToken.decimals
            ).toString();
        } catch (e) {
            console.error('Error parsing amount:', e);
            return '';
        }
    }, [sourceAmount, sourceToken, isValidAmount]);

    const {
        data: quote,
        error,
        isLoading,
        isFetching,
        refetch
    } = useQuery({
        queryKey: ['swapQuote', sourceToken?.address, destinationToken?.address, formattedSourceAmount, slippage],
        queryFn: async () => {
            if (!canFetchQuote || !formattedSourceAmount || !swapService) {
                return null;
            }

            // Adapt Token to TokenInfo by adding chainId
            const adaptedSourceToken: TokenInfo = {
                ...sourceToken!,
                chainId: 1 // Default to Ethereum mainnet
            };

            const adaptedDestinationToken: TokenInfo = {
                ...destinationToken!,
                chainId: 1 // Default to Ethereum mainnet
            };

            const swapParams: SwapParams = {
                fromToken: adaptedSourceToken,
                toToken: adaptedDestinationToken,
                amount: formattedSourceAmount,
                userAddress: userAddress!,
                slippage: slippage,
            };

            return await swapService.getQuote(swapParams);
        },
        enabled: canFetchQuote && Boolean(formattedSourceAmount) && options?.enabled,
        refetchInterval: options?.refetchInterval,
        staleTime: 10000, // Consider data stale after 10 seconds
    });

    const estimation: SwapEstimation | null = useMemo(() => {
        if (!quote || !destinationToken) return null;

        try {
            // Format destination amount with proper decimals
            const formattedToAmount = safeFormatUnits(
                quote.toAmount,
                destinationToken.decimals
            );

            // Calculate minimum amount received with slippage
            let minReceived = '0';
            let formattedMinReceived = '0';

            try {
                const destAmountNum = Number(quote.toAmount);
                minReceived = (destAmountNum * (1 - slippage / 100))
                    .toFixed(0)
                    .toString();

                formattedMinReceived = safeFormatUnits(
                    minReceived,
                    destinationToken.decimals
                );
            } catch (error) {
                console.error('Error calculating min received:', error);
                // Fall back to a percentage of the formatted amount for display
                const destAmount = Number(formattedToAmount);
                formattedMinReceived = (destAmount * (1 - slippage / 100)).toFixed(6);
            }

            // Properly calculate the exchange rate considering token decimals
            let calculatedRate = '';
            try {
                if (sourceToken && formattedSourceAmount) {
                    // Get amounts in their actual decimal representation
                    const destValue = Number(formattedToAmount);
                    const srcValue = Number(safeFormatUnits(
                        formattedSourceAmount,
                        sourceToken.decimals
                    ));

                    if (srcValue > 0) {
                        const rateValue = destValue / srcValue;
                        calculatedRate = rateValue.toString();
                    }
                }
            } catch (e) {
                console.error('Error calculating rate:', e);
                calculatedRate = quote.rate || '0'; // Fallback to the rate from the quote
            }

            // Format price impact as percentage
            const priceImpactValue = parseFloat(quote.priceImpact || '0');
            const priceImpactPercent = priceImpactValue > 0
                ? `${priceImpactValue.toFixed(2)}%`
                : '< 0.01%';

            return {
                toAmount: quote.toAmount,
                formattedToAmount,
                rate: calculatedRate,
                priceImpact: quote.priceImpact,
                priceImpactPercent,
                routeDescription: quote.routeDescription || '1inch Swap',
                networkCost: '~$0.25', // Default estimate, would be calculated from gas price in production
                swapFees: '0.05%', // Default estimate based on 1inch fees
                minReceived: formattedMinReceived
            };
        } catch (e) {
            console.error('Error formatting estimation:', e);
            // Throw a more user-friendly error that will be captured by the query error handler
            throw new Error('Could not calculate swap details. Please try a different amount.');
        }
    }, [quote, destinationToken, slippage, sourceToken, formattedSourceAmount]);

    return {
        quote,
        estimation,
        error,
        isLoading,
        isFetching,
        refetch,
        isValidAmount,
    };
}

export default useSwapQuote; 