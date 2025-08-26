import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.BEEHIIV_API_KEY;
  const publicationId = process.env.BEEHIIV_PUBLICATION_ID;
  
  return NextResponse.json({
    environment: process.env.NODE_ENV,
    apiKeyExists: !!apiKey,
    apiKeyLength: apiKey ? apiKey.length : 0,
    publicationIdExists: !!publicationId,
    publicationIdValue: publicationId,
    allBeehiivKeys: Object.keys(process.env).filter(key => key.includes('BEEHIIV')),
    totalEnvKeys: Object.keys(process.env).length
  });
}
