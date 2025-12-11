// Dynamic import to prevent loading during build time
let supabaseInstance: any = null;
let initializationAttempted = false;

// Lazy initialization - only create client when actually needed (client-side only)
export async function getSupabase(): Promise<any> {
  // Only run on client side
  if (typeof window === 'undefined') {
    return null;
  }

  // Return null if we already tried and failed
  if (initializationAttempted && supabaseInstance === null) {
    return null;
  }

  // Return existing instance if already created
  if (supabaseInstance !== null) {
    return supabaseInstance;
  }

  // Mark that we're attempting initialization
  initializationAttempted = true;

  // Check if we have valid credentials
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Require both values and they must be real (not undefined/empty)
  if (!supabaseUrl || !supabaseAnonKey ||
      supabaseUrl.length < 20 ||
      supabaseAnonKey.length < 100) {
    console.log('Supabase not configured - using localStorage fallback');
    return null;
  }

  try {
    // Dynamic import to avoid loading during build
    const { createClient } = await import('@supabase/supabase-js');
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
    console.log('Supabase client initialized successfully');
    return supabaseInstance;
  } catch (error) {
    console.error('Failed to create Supabase client:', error);
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
