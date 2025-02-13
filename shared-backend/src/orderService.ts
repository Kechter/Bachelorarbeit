import { supabase } from './supabase';

export async function placeOrder(userId: string, totalPrice: number) {
  const { data, error } = await supabase.from('orders').insert([{ user_id: userId, total_price: totalPrice }]);
  if (error) throw error;
  return data;
}

export async function getOrders(userId: string) {
  const { data, error } = await supabase.from('orders').select('*').eq('user_id', userId);
  if (error) throw error;
  return data;
}
