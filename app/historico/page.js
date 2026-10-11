import {requireUser} from '../../lib/auth';
import Header from '../components/header';
export const dynamic='force-dynamic';
export default async function Historico(){
 const {supabase,user}=await requireUser();
 const {data,error}=await supabase.from('respostas').select('id,entrada,resposta,criado_em').order('criado_em',{ascending:false}).limit(100);
 return <main><Header email={user.email}/><h1>Seu histórico</h1><p>Suas últimas 100 análises, da mais recente para a mais antiga.</p>{error?<p className="error" role="alert">Não foi possível carregar seu histórico. Tente novamente.</p>:data.length?data.map(item=><article key={item.id}><small><time dateTime={item.criado_em}>{new Intl.DateTimeFormat('pt-BR',{dateStyle:'medium',timeStyle:'short',timeZone:'America/Sao_Paulo'}).format(new Date(item.criado_em))} (Brasília)</time></small><h2>Mensagem</h2><p className="result">{item.entrada}</p><h2>Análise</h2><p className="result">{item.resposta}</p></article>):<section><p>Você ainda não tem análises salvas.</p></section>}</main>
}
