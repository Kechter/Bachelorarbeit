import { supabase } from './supabase';

export async function addToCart(userId: string, productId: number, quantity: number = 1) {
  const { data, error } = await supabase.from('cart').insert([{ user_id: userId, product_id: productId, quantity }]);
  if (error) throw error;
  return data;
}

export async function getCart(userId: string) {
  const { data, error } = await supabase.from('cart').select('*').eq('user_id', userId);
  if (error) throw error;
  return data;
}
