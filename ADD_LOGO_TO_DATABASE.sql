-- ============================================
-- SETTINGS TABLE FOR LOGO URL
-- ============================================

-- Create settings table to store site-wide settings like logo
CREATE TABLE IF NOT EXISTS public.site_settings (
  id BIGSERIAL PRIMARY KEY,
  setting_key TEXT UNIQUE NOT NULL,
  setting_value TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Create policy (allow all access)
CREATE POLICY "Enable all access for site_settings"
ON public.site_settings
FOR ALL
USING (true)
WITH CHECK (true);

-- Insert default logo setting
INSERT INTO public.site_settings (setting_key, setting_value)
VALUES ('logo_url', '/images/teddy-decor-logo.svg')
ON CONFLICT (setting_key) DO NOTHING;

-- Create index
CREATE INDEX IF NOT EXISTS idx_settings_key ON public.site_settings(setting_key);
