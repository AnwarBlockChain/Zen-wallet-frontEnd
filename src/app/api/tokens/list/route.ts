import { NextResponse } from 'next/server';
import { POPULAR_TOKENS } from '@/services/tokenListService';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const chainId = searchParams.get('chainId');

    let tokens = [...POPULAR_TOKENS];

    if (chainId) {
      tokens = tokens.filter(token => token.chainId === parseInt(chainId));
    }

    return NextResponse.json(tokens);
  } catch (error: any) {
    console.error('Error processing token list request:', error.message);

    return NextResponse.json(
      { error: error.message || 'Failed to process request' },
      { status: 500 }
    );
  }
} 