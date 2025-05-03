import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const limit = searchParams.get('limit') || '100';
  const start = searchParams.get('start') || '1';
  
  try {
    const apiKey = process.env.CMC_API_KEY || process.env.NEXT_PUBLIC_CMC_API_KEY || '';
    console.log('Fetching listings with API key:', apiKey.substring(0, 5) + '...');
    
    const response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
      params: {
        limit,
        start,
        convert: 'USD',
      },
      headers: {
        'X-CMC_PRO_API_KEY': apiKey,
      },
    });
    
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching crypto listings:', error);
    
    // Log more detailed error information
    if (axios.isAxiosError(error)) {
      console.error('Axios error details:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch cryptocurrency listings' },
      { status: 500 }
    );
  }
} 