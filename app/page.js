import {requireUser} from '../lib/auth';
import Header from './components/header';
import Analyzer from './components/analyzer';
import desafio from '../desafio';
export const dynamic='force-dynamic';
export default async function Home(){const {user}=await requireUser();return <main><Header email={user.email}/><p className="eyebrow">UM OLHAR MAIS ATENTO</p><h1>{desafio.nomeProduto}</h1><p>{desafio.frase}</p><Analyzer campo={desafio.campos.texto}/></main>}
