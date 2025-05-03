import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const symbol = searchParams.get('symbol');
  
  if (!symbol) {
    return NextResponse.json(
      { error: 'Cryptocurrency symbol is required' },
      { status: 400 }
    );
  }
  
  try {
    console.log('Fetching listings for symbol lookup:', symbol);
    // Get all listings to find the coin ID
    const listingsResponse = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
      params: {
        limit: 5000, // Get a large number of listings to increase chances of finding the coin
        convert: 'USD',
      },
      headers: {
        'X-CMC_PRO_API_KEY': process.env.CMC_API_KEY || '',
      },
    });
    
    // Find the coin with the matching symbol
    const coin = listingsResponse.data.data.find(
      (coin: any) => coin.symbol.toLowerCase() === symbol.toLowerCase()
    );
    
    if (!coin) {
      return NextResponse.json(
        { error: `Cryptocurrency with symbol ${symbol} not found` },
        { status: 404 }
      );
    }
    
    // Get the detailed info about this coin
    const infoResponse = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/info', {
      params: { id: coin.id },
      headers: {
        'X-CMC_PRO_API_KEY': process.env.CMC_API_KEY || '',
      },
    });
    
    // Combine the information
    const result = {
      ...infoResponse.data,
      market_data: coin
    };
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching crypto by symbol:', error);
    
    // Log more detailed error information
    if (axios.isAxiosError(error)) {
      console.error('Axios error details:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch cryptocurrency information' },
      { status: 500 }
    );
  }
} 