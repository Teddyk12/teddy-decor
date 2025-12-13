import { NextResponse } from 'next/server';

export async function GET() {
  const envCheck = {
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    supabaseUrl: {
      exists: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      isPlaceholder: process.env.NEXT_PUBLIC_SUPABASE_URL === 'YOUR_SUPABASE_URL_HERE',
      length: process.env.NEXT_PUBLIC_SUPABASE_URL?.length || 0,
      preview: process.env.NEXT_PUBLIC_SUPABASE_URL
        ? `${process.env.NEXT_PUBLIC_SUPABASE_URL.substring(0, 30)}...`
        : 'NOT SET',
      value: process.env.NEXT_PUBLIC_SUPABASE_URL || 'undefined'
    },
    supabaseKey: {
      exists: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      isPlaceholder: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY === 'YOUR_SUPABASE_ANON_KEY_HERE',
      length: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.length || 0,
      preview: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        ? `${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.substring(0, 30)}...`
        : 'NOT SET'
    },
    web3formsKey: {
      exists: !!process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
      isPlaceholder: process.env.NEXT_PUBLIC_WEB3FORMS_KEY === 'YOUR_ACCESS_KEY_HERE',
      length: process.env.NEXT_PUBLIC_WEB3FORMS_KEY?.length || 0,
    },
    allEnvKeys: Object.keys(process.env).filter(k => k.startsWith('NEXT_PUBLIC_'))
  };

  const isConfigured =
    envCheck.supabaseUrl.exists &&
    !envCheck.supabaseUrl.isPlaceholder &&
    envCheck.supabaseUrl.length > 20 &&
    envCheck.supabaseKey.exists &&
    !envCheck.supabaseKey.isPlaceholder &&
    envCheck.supabaseKey.length > 100;

  return NextResponse.json({
    configured: isConfigured,
    message: isConfigured
      ? '✅ Supabase environment variables are properly configured!'
      : '❌ Supabase environment variables are missing or invalid',
    details: envCheck,
    instructions: !isConfigured ? {
      step1: 'Go to Vercel Dashboard > Your Project > Settings > Environment Variables',
      step2: 'Add NEXT_PUBLIC_SUPABASE_URL with your Supabase project URL',
      step3: 'Add NEXT_PUBLIC_SUPABASE_ANON_KEY with your Supabase anon/public key',
      step4: 'Trigger a new deployment (Environment variables are embedded at BUILD time)',
      step5: 'Wait for build to complete, then hard refresh this page'
    } : undefined
  }, {
    headers: {
      'Cache-Control': 'no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    }
  });
}
