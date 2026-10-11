begin;
create table public.respostas (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null default auth.uid(),
  entrada text not null check (char_length(entrada) between 1 and 8000),
  resposta text not null,
  criado_em timestamptz not null default now()
);
alter table public.respostas enable row level security;
create policy "cada uma vê as suas" on public.respostas for select to authenticated using ((select auth.uid()) = user_id);
create policy "cada uma salva as suas" on public.respostas for insert to authenticated with check ((select auth.uid()) = user_id);
revoke all on public.respostas from anon;
grant select, insert on public.respostas to authenticated;
create index respostas_usuario_data on public.respostas (user_id, criado_em desc);
commit;
