import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');
  
  if (!id) {
    return NextResponse.json(
      { error: 'Cryptocurrency ID is required' },
      { status: 400 }
    );
  }
  
  try {
    console.log('Fetching coin info with API key:', process.env.CMC_API_KEY?.substring(0, 5) + '...');
    const response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/info', {
      params: { id },
      headers: {
        'X-CMC_PRO_API_KEY': process.env.CMC_API_KEY || '',
      },
    });
    
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching crypto info:', error);
    
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