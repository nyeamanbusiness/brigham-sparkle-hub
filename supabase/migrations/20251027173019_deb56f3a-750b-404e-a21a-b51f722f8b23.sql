-- Create site_messages table for contact form submissions
CREATE TABLE public.site_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  vehicle TEXT,
  service TEXT,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.site_messages ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert messages (public submissions)
CREATE POLICY "Anyone can submit contact form"
ON public.site_messages
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Policy: Only service role can read messages (admin access only)
-- Note: No SELECT policy for anon/authenticated means they cannot read
-- Service role bypasses RLS, so admins can read via backend