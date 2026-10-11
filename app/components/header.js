'use client';
import Link from 'next/link';
import {createClient} from '../../lib/supabase/client';
import {useState} from 'react';
export default function Header({email}){const [error,setError]=useState('');return <><nav><span>{email}</span><Link href="/">Analisar</Link><Link href="/historico">Histórico</Link><button onClick={async()=>{try{const {error}=await createClient().auth.signOut();if(error)throw error;window.location.assign('/login')}catch{setError('Não foi possível sair. Tente novamente.')}}}>Sair</button></nav>{error&&<p role="alert" className="error">{error}</p>}</>}
