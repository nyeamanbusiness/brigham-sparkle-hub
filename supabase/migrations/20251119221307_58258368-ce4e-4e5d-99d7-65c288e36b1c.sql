-- Add appointment date and time to orders table
ALTER TABLE public.orders 
ADD COLUMN appointment_date DATE,
ADD COLUMN appointment_time TIME,
ADD COLUMN calendar_event_id TEXT;