'use client';
import {useState} from 'react';
export default function Analyzer({campo}){
 const [texto,setTexto]=useState(''),[resposta,setResposta]=useState(''),[error,setError]=useState(''),[busy,setBusy]=useState(false);
 async function run(e){e.preventDefault();if(busy)return;setBusy(true);setError('');setResposta('');try{const r=await fetch('/api/ia',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({texto}),signal:AbortSignal.timeout(60000)});const d=await r.json();if(!r.ok)throw new Error(d.erro||'Não foi possível analisar.');setResposta(d.resposta);if(d.aviso)setError(d.aviso);}catch(err){setError(err.name==='TimeoutError'?'A análise demorou demais. Tente novamente.':err.message||'Não foi possível conectar.')}finally{setBusy(false)}}
 return <><form onSubmit={run}><label htmlFor="texto">{campo}</label><textarea id="texto" value={texto} onChange={e=>setTexto(e.target.value)} required maxLength={8000} placeholder="Cole a mensagem recebida, sem senhas ou dados pessoais."/><button disabled={busy}>{busy?'Analisando...':'Analisar'}</button></form>{error&&<p className="error" role="alert">{error}</p>}<section aria-live="polite"><h2>Resultado da análise</h2><p className="result">{resposta||'Sua resposta aparecerá aqui.'}</p></section></>
}
