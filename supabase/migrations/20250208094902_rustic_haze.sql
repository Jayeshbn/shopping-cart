/*
  # Update cart items RLS policies
  
  1. Changes
    - Add policies for anonymous access to cart items
    - Allow public read/write access for demonstration purposes
    
  Note: In a production environment, you would typically want to tie cart items 
  to authenticated users. This is a simplified version for demonstration.
*/

-- Allow anonymous access to cart items
CREATE POLICY "Allow anonymous access to cart items"
  ON cart_items
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

-- Update the user_id to be optional
ALTER TABLE cart_items
  ALTER COLUMN user_id DROP NOT NULL;