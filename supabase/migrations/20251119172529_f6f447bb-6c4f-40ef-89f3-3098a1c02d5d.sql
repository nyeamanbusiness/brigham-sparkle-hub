-- Drop the existing restrictive policy
DROP POLICY IF EXISTS "Anyone can submit booking" ON public.orders;

-- Create a permissive policy that allows anyone to insert orders
CREATE POLICY "Anyone can submit booking" 
ON public.orders 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);