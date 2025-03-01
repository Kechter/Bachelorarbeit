import { supabase } from './supabase';

export async function fetchProducts() {
  const { data, error } = await supabase.from('products').select('*');
  if (error) throw error;
  return data;
}

export async function fetchProductById(id: string) {
  const { data, error } = await supabase.from('products').select('*').eq('id', id);
  if (error) throw error;
  return data;
}