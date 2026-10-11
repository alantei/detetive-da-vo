import {configured,createClient} from '../../../lib/supabase/server';
import desafio from '../../../desafio';
export const runtime='nodejs';
export const maxDuration=60;
const json=(body,status=200)=>Response.json(body,{status,headers:{'Cache-Control':'no-store'}});
export async function POST(request){
 try{
  const origin=request.headers.get('origin');
  if(origin && origin!==new URL(request.url).origin) return json({erro:'Origem da solicitação inválida.'},403);
  if(!configured())return json({erro:'O serviço ainda não está configurado.'},503);
  const supabase=await createClient();const {data:{user},error:authError}=await supabase.auth.getUser();
  if(authError||!user)return json({erro:'Entre na sua conta para analisar.'},401);
  if(!request.headers.get('content-type')?.includes('application/json'))return json({erro:'Formato de envio inválido.'},415);
  const raw=await request.text();if(raw.length>40000)return json({erro:'Texto muito longo.'},413);
  let body;try{body=JSON.parse(raw)}catch{return json({erro:'Solicitação inválida.'},400)}
  if(typeof body.texto!=='string'||!body.texto.trim()||body.texto.length>8000)return json({erro:'Digite uma mensagem de até 8.000 caracteres.'},400);
  const texto=body.texto.trim();let resposta;
  if(desafio.modoTeste)resposta=desafio.respostaExemplo;
  else{
   if(!process.env.OPENROUTER_API_KEY)return json({erro:'O serviço de IA ainda não está configurado.'},503);
   const r=await fetch('https://openrouter.ai/api/v1/chat/completions',{method:'POST',headers:{Authorization:`Bearer ${process.env.OPENROUTER_API_KEY}`,'Content-Type':'application/json'},body:JSON.stringify({model:desafio.modelo,messages:[{role:'system',content:desafio.prompt},{role:'user',content:texto}],max_tokens:1500}),signal:AbortSignal.timeout(45000)});
   if(r.status===429)return json({erro:'Você atingiu o limite de uso de hoje.'},429);
   if(!r.ok)return json({erro:r.status===401?'A configuração da IA precisa ser revisada.':'A IA está indisponível. Tente novamente mais tarde.'},502);
   const data=await r.json();resposta=data.choices?.[0]?.message?.content;
   if(typeof resposta!=='string'||!resposta.trim())return json({erro:'A IA não retornou uma resposta válida.'},502);
  }
  const {error}=await supabase.from('respostas').insert({entrada:texto,resposta});
  if(error)return json({resposta,aviso:'A análise foi concluída, mas não foi salva no histórico.'});
  return json({resposta});
 }catch(error){return json({erro:error.name==='TimeoutError'?'A IA demorou demais. Tente novamente.':'Não foi possível concluir a análise. Tente novamente.'},503)}
}
