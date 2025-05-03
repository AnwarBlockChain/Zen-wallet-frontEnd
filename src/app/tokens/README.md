# Tokens Feature

This directory contains the implementation of the tokens feature, which displays cryptocurrency data fetched from the CoinMarketCap (CMC) API.

## Features

- List of top cryptocurrencies with key market data
- Detailed view for each cryptocurrency with additional information
- TradingView chart integration for price visualization
- Search and filter capabilities
- Responsive design

## Setup

To use this feature, you need to obtain a CoinMarketCap API key:

1. Create an account on [CoinMarketCap](https://coinmarketcap.com/api/)
2. Subscribe to a plan (their premium plan offers more features and higher rate limits)
3. Generate an API key
4. Create a `.env.local` file in the root of the project and add your API key:

```
NEXT_PUBLIC_CMC_API_KEY=your_api_key_here
```

## Implementation Details

- `/tokens` - Main page displaying a list of tokens with market data
- `/tokens/[id]` - Detailed view for a specific cryptocurrency
- `src/services/cmcService.ts` - API service for fetching data from CoinMarketCap
- `src/components/ui/TradingViewChart.tsx` - Chart component using TradingView

## API Usage

The implementation uses several CMC API endpoints:

- `/cryptocurrency/listings/latest` - Get the latest listings of cryptocurrencies
- `/cryptocurrency/info` - Get detailed information about a specific cryptocurrency 

Refer to the [CoinMarketCap API documentation](https://coinmarketcap.com/api/documentation/v1/) for more details.

## TradingView Integration

The chart is implemented using the TradingView Widget API. It dynamically loads the TradingView script and renders the chart based on the selected cryptocurrency and timeframe. 