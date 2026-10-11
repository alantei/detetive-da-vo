import Login from './form';
import { configured } from '../../lib/supabase/server';
export const dynamic='force-dynamic';
export default function Page(){return <main><p className="eyebrow">BEM-VINDA AO</p><h1>Detetive da Vó</h1><p>Entre para analisar mensagens e consultar seu histórico.</p>{configured()?<Login/>:<section><h2>Configuração pendente</h2><p>O serviço de cadastro ainda não está disponível. Tente novamente mais tarde.</p></section>}</main>}
