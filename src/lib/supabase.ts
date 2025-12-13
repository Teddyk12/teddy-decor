// Dynamic import to prevent loading during build time
let supabaseInstance: any = null;
let initializationAttempted = false;

// Helper to get environment variables in the browser
function getEnvVar(key: string): string | undefined {
  // In Next.js, NEXT_PUBLIC_ variables are available in the browser
  if (typeof window !== 'undefined') {
    // Try multiple ways to access the variable
    return process.env[key] || (window as any)[key] || undefined;
  }
  return process.env[key];
}

// Lazy initialization - only create client when actually needed (client-side only)
export async function getSupabase(): Promise<any> {
  // Only run on client side
  if (typeof window === 'undefined') {
    console.log('❌ Supabase: Running on server side, skipping');
    return null;
  }

  // Return existing instance if already created
  if (supabaseInstance !== null) {
    return supabaseInstance;
  }

  // Return null if we already tried and failed
  if (initializationAttempted && supabaseInstance === null) {
    console.log('❌ Supabase: Already attempted initialization and failed');
    return null;
  }

  // Mark that we're attempting initialization
  initializationAttempted = true;

  // Check if we have valid credentials
  const supabaseUrl = getEnvVar('NEXT_PUBLIC_SUPABASE_URL');
  const supabaseAnonKey = getEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY');

  // Detailed debug logging
  console.log('🔍 Supabase Environment Check:');
  console.log('  Window exists:', typeof window !== 'undefined');
  console.log('  process.env keys:', Object.keys(process.env).filter(k => k.includes('SUPABASE')));
  console.log('  URL exists:', !!supabaseUrl);
  console.log('  URL type:', typeof supabaseUrl);
  console.log('  URL length:', supabaseUrl?.length || 0);
  console.log('  URL preview:', supabaseUrl ? `${supabaseUrl.substring(0, 30)}...` : 'NOT SET');
  console.log('  Key exists:', !!supabaseAnonKey);
  console.log('  Key type:', typeof supabaseAnonKey);
  console.log('  Key length:', supabaseAnonKey?.length || 0);
  console.log('  Key preview:', supabaseAnonKey ? `${supabaseAnonKey.substring(0, 30)}...` : 'NOT SET');

  // Check if variables are set and valid
  const isUrlValid = supabaseUrl && supabaseUrl !== 'YOUR_SUPABASE_URL_HERE' && supabaseUrl.length > 20;
  const isKeyValid = supabaseAnonKey && supabaseAnonKey !== 'YOUR_SUPABASE_ANON_KEY_HERE' && supabaseAnonKey.length > 100;

  if (!isUrlValid || !isKeyValid) {
    console.warn('❌ Supabase NOT configured - using localStorage fallback');
    console.warn('   Reasons:');
    if (!isUrlValid) {
      console.warn('   - URL is missing, invalid, or placeholder');
      console.warn('   - Current value:', supabaseUrl || 'UNDEFINED');
    }
    if (!isKeyValid) {
      console.warn('   - Anon Key is missing, invalid, or placeholder');
      console.warn('   - Current value:', supabaseAnonKey ? `${supabaseAnonKey.substring(0, 20)}...` : 'UNDEFINED');
    }
    console.warn('   ');
    console.warn('   📋 TO FIX THIS:');
    console.warn('   1. Go to Vercel Dashboard > Your Project > Settings > Environment Variables');
    console.warn('   2. Make sure these variables exist:');
    console.warn('      - NEXT_PUBLIC_SUPABASE_URL');
    console.warn('      - NEXT_PUBLIC_SUPABASE_ANON_KEY');
    console.warn('   3. Trigger a new deployment (push to GitHub or redeploy)');
    console.warn('   4. Wait for build to complete');
    console.warn('   5. Hard refresh the page (Ctrl+Shift+R or Cmd+Shift+R)');
    return null;
  }

  try {
    // Dynamic import to avoid loading during build
    console.log('🔄 Attempting to initialize Supabase client...');
    const { createClient } = await import('@supabase/supabase-js');
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
    console.log('✅ Supabase client initialized successfully!');
    console.log('   URL:', supabaseUrl);
    console.log('   Storage bucket: gallery');
    return supabaseInstance;
  } catch (error) {
    console.error('❌ Failed to create Supabase client:', error);
    supabaseInstance = null;
    return null;
  }
}

// Database types
export interface Booking {
  id?: number;
  created_at?: string;
  name: string;
  email: string;
  phone: string;
  event_type: string;
  event_date?: string;
  event_time?: string;
  guest_count?: string;
  venue_known?: string;
  venue_name?: string;
  venue_address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  meeting_preference?: string;
  preferred_meeting_date?: string;
  preferred_meeting_time?: string;
  budget?: string;
  color_scheme?: string;
  theme?: string;
  special_requests?: string;
  how_did_you_hear?: string;
  status?: string;
}

export interface ContactInquiry {
  id?: number;
  created_at?: string;
  name: string;
  email: string;
  phone: string;
  event_type?: string;
  event_date?: string;
  message?: string;
  status?: string;
}
