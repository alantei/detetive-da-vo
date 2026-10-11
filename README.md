# Detetive da Vó

Aplicativo para analisar sinais de golpe em mensagens, criado a partir do fluxo da apostila Do Zero ao Ar.

Site: https://detetive-da-vo.vercel.app

Next.js App Router com cadastro e login por e-mail/senha, análise pela OpenRouter no servidor e histórico por usuário no Supabase. O visual tem fundo roxo, campo de mensagem e resultado em português.

## Executar

1. Instale com `pnpm install --frozen-lockfile`.
2. Copie `.env.example` para `.env.local` e preencha as três variáveis.
3. Execute `pnpm dev`; para validar o build, use `pnpm build`.

Em um projeto Supabase novo, execute `supabase/schema.sql` uma única vez. A tabela usa RLS para permitir SELECT/INSERT somente ao próprio usuário. Configure Site URL e Redirect URLs para o domínio do aplicativo.

`desafio.js` define título, campo, prompt, modelo e modo de teste. `modoTeste:false` usa o modelo gratuito `liquid/lfm-2.5-2.6b:free`. A chave OpenRouter fica somente no servidor. Configure as variáveis na Vercel e publique novamente após alterá-las.

## Verificação realizada

Build local e na Vercel aprovados. Cadastro, logout e reentrada validados. No checkpoint A/B, A consultou duas análises e B uma; consultas cruzadas retornaram zero linhas e inserção cruzada foi recusada por RLS. Três mensagens também foram analisadas pela API real e salvas pelo aplicativo. Os testes posteriores acrescentam registros ao histórico.

A confirmação de e-mail foi desativada temporariamente, com autorização, para os testes e reativada depois. As respostas da IA são indícios para conferência e podem conter erros; o teste ambíguo motivou um ajuste no prompt para evitar inventar urgência.
