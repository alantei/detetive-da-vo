import { redirect } from 'next/navigation';
import { configured,createClient } from './supabase/server';
export async function requireUser(){
  if(!configured()) redirect('/login');
  const supabase=await createClient();
  const {data:{user},error}=await supabase.auth.getUser();
  if(error || !user) redirect('/login');
  return {supabase,user};
}
