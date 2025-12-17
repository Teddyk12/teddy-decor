-- ============================================
-- AVAILABILITY CALENDAR & BOOKING WORKFLOW
-- Run this in your Supabase SQL Editor
-- ============================================

-- 1. Create availability calendar table
CREATE TABLE IF NOT EXISTS public.availability_calendar (
  id BIGSERIAL PRIMARY KEY,
  date DATE NOT NULL UNIQUE,
  is_available BOOLEAN DEFAULT true,
  max_bookings INTEGER DEFAULT 2,
  current_bookings INTEGER DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Update bookings table - add workflow fields
ALTER TABLE public.bookings
  ADD COLUMN IF NOT EXISTS admin_notes TEXT,
  ADD COLUMN IF NOT EXISTS confirmed_at TIMESTAMP WITH TIME ZONE,
  ADD COLUMN IF NOT EXISTS rejection_reason TEXT;

-- 3. Create booking status history table
CREATE TABLE IF NOT EXISTS public.booking_status_history (
  id BIGSERIAL PRIMARY KEY,
  booking_id BIGINT REFERENCES public.bookings(id) ON DELETE CASCADE,
  old_status TEXT,
  new_status TEXT,
  changed_by TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Enable Row Level Security
ALTER TABLE public.availability_calendar ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.booking_status_history ENABLE ROW LEVEL SECURITY;

-- 5. Create policies
CREATE POLICY "Allow public to view availability"
  ON public.availability_calendar FOR SELECT
  TO anon, authenticated USING (true);

CREATE POLICY "Allow admin to manage availability"
  ON public.availability_calendar FOR ALL
  TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow all to view booking history"
  ON public.booking_status_history FOR SELECT
  TO anon, authenticated USING (true);

CREATE POLICY "Allow all to insert booking history"
  ON public.booking_status_history FOR INSERT
  TO anon, authenticated WITH CHECK (true);

-- 6. Create indexes
CREATE INDEX IF NOT EXISTS idx_availability_date ON public.availability_calendar(date);
CREATE INDEX IF NOT EXISTS idx_availability_available ON public.availability_calendar(is_available);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON public.bookings(status);
CREATE INDEX IF NOT EXISTS idx_booking_history_booking_id ON public.booking_status_history(booking_id);

-- 7. Insert default availability (next 90 days)
INSERT INTO public.availability_calendar (date, is_available, max_bookings)
SELECT
  CURRENT_DATE + (n || ' days')::INTERVAL,
  true,
  2
FROM generate_series(0, 90) AS n
ON CONFLICT (date) DO NOTHING;
