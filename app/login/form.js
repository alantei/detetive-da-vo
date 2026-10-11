'use client';
import {useState} from 'react';
import {createClient} from '../../lib/supabase/client';
export default function Login(){
 const [email,setEmail]=useState(''),[senha,setSenha]=useState(''),[busy,setBusy]=useState(false),[msg,setMsg]=useState('');
 async function submit(event){event.preventDefault();if(busy)return;setBusy(true);setMsg('');try{
 const s=createClient();const signup=event.nativeEvent.submitter?.value==='signup';
 const {data,error}=signup?await s.auth.signUp({email,password:senha}):await s.auth.signInWithPassword({email,password:senha});
 if(error){const messages={invalid_credentials:'E-mail ou senha incorretos.',email_not_confirmed:'Confirme seu e-mail antes de entrar.',user_already_exists:'Esse e-mail já está cadastrado.',weak_password:'Escolha uma senha mais forte.',over_request_rate_limit:'Muitas tentativas. Aguarde e tente novamente.',over_email_send_rate_limit:'Limite de envio de e-mails. Tente novamente mais tarde.'};setMsg(messages[error.code]||'Não foi possível entrar ou criar a conta. Confira seus dados e tente novamente.');}
 else if(data.session) window.location.assign('/');else setMsg('Conta criada. Confira seu e-mail para confirmar o cadastro.');
 }catch{setMsg('Não foi possível conectar. Tente novamente.')}finally{setBusy(false)}}
 return <form onSubmit={submit}><label htmlFor="email">E-mail</label><input id="email" type="email" autoComplete="email" value={email} onChange={e=>setEmail(e.target.value)} required/><label htmlFor="senha">Senha</label><input id="senha" type="password" autoComplete="current-password" minLength={8} value={senha} onChange={e=>setSenha(e.target.value)} required/><div className="actions"><button disabled={busy} value="login">{busy?'Aguarde…':'Entrar'}</button><button disabled={busy} value="signup">Criar conta</button></div><p role="status">{msg}</p></form>
}
