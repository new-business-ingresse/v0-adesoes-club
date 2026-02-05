# Ingresse Club - Sistema de Gestão de Adesões

Sistema web para consolidar e gerenciar adesões ao Ingresse Club de múltiplas fontes: PostHog Survey e Landing Page de Produtores.

## 🚀 Deploy no Vercel

Este repositório está configurado para deploy automático no Vercel/v0.

### 1. Conectar ao Vercel

O repositório já está integrado com o projeto **adesoes-club** no Vercel. Pushes para `main` fazem deploy automático.

### 2. Configurar Variáveis de Ambiente

No dashboard do Vercel → Settings → Environment Variables, adicione:

```env
# Supabase - Projeto Principal (adesoes-club)
NEXT_PUBLIC_SUPABASE_URL=https://jndkfyoehtfigykenyca.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpuZGtmeW9laHRmaWd5a2VueWNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAzMDI3NTcsImV4cCI6MjA4NTg3ODc1N30.v3Zs7Z7tc4qX3nklDmLPtjn3S3hw_q4LWeNjG1SfdZA
SUPABASE_SERVICE_ROLE_KEY=<buscar no Supabase Dashboard>

# Supabase - Projeto LP Produtores  
LP_SUPABASE_URL=https://qqpzncvlwuhacnjnrxvt.supabase.co
LP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFxcHpuY3Zsd3VoYWNuam5yeHZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc2NDIzNzYsImV4cCI6MjA4MzIxODM3Nn0.lRFK3jGCC9sEO0KFXhE1BlNRykx_D8IsleOY9tnXSgM

# PostHog API
POSTHOG_API_URL=https://us.posthog.com
POSTHOG_PROJECT_ID=105910
POSTHOG_PERSONAL_API_KEY=<buscar no PostHog>

# Auth
NEXTAUTH_SECRET=<gerar com: openssl rand -base64 32>
NEXTAUTH_URL=https://seu-dominio.vercel.app
ADMIN_USERNAME=admin
ADMIN_PASSWORD=ingresse
```

**Credenciais necessárias:**
- **SUPABASE_SERVICE_ROLE_KEY**: [Buscar aqui](https://supabase.com/dashboard/project/jndkfyoehtfigykenyca/settings/api)
- **POSTHOG_PERSONAL_API_KEY**: [Gerar aqui](https://us.posthog.com/settings/user-api-keys)
- **NEXTAUTH_SECRET**: Gerar com `openssl rand -base64 32`

### 3. Deploy

Após configurar as variáveis, o Vercel fará deploy automaticamente. Acesse o sistema em:
- **URL**: `https://adesoes-club.vercel.app` (ou seu domínio personalizado)
- **Login**: admin / ingresse

## 📊 Estrutura do Banco de Dados

As tabelas já foram criadas no Supabase (projeto `adesoes-club - jndkfyoehtfigykenyca`):

- `event_adhesions` - Eventos que aderiram ao Club
- `producer_adhesions` - Produtoras que aderiram (LP ou Survey)
- `audit_logs` - Log de mudanças de status
- `sync_metadata` - Metadados de sincronizações

## 🔄 Sincronização de Dados

Após o primeiro deploy, execute as sincronizações para popular o banco:

```bash
# Sincronizar PostHog Survey
curl -X POST https://seu-dominio.vercel.app/api/sync/posthog

# Sincronizar Supabase LP
curl -X POST https://seu-dominio.vercel.app/api/sync/supabase-lp
```

## 🛠️ Stack Tecnológica

- **Frontend**: Next.js 14 (App Router) + React + TypeScript
- **UI**: Tailwind CSS
- **Backend**: Next.js API Routes (serverless)
- **Database**: Supabase PostgreSQL
- **Auth**: Next-Auth v5
- **Export**: SheetJS (xlsx)
- **Deploy**: Vercel
- **Analytics**: PostHog

## 📋 Funcionalidades

- ✅ Dashboard com 2 abas (Eventos e Produtoras)
- ✅ Toggle de status (Pendente ↔ Integrado)
- ✅ Export de dados para XLSX
- ✅ Sincronização automática de dados
- ✅ Autenticação simples
- ✅ Auditoria de mudanças

## 🎯 Uso do Sistema

1. **Login**: Acesse com admin/ingresse
2. **Visualizar Dados**: Navegue entre as abas
3. **Atualizar Status**: Toggle entre Pendente/Integrado
4. **Exportar**: Download XLSX dos dados
5. **Sincronizar**: API routes para sync manual

## 📝 Notas Importantes

- **Sistema independente**: Funciona 100% autônomo após deploy
- **Integração direta**: PostHog REST API + Supabase SDK
- **Sem dados mockados**: Apenas dados reais das fontes
- **Auditoria**: Todos os toggles são logados

## 🔐 Segurança

- Rotas protegidas por Next-Auth
- Service role keys nunca expostas no client
- Credenciais em variáveis de ambiente
- Auditoria de todas as mudanças

---

**Projeto**: Ingresse Club  
**Repositório**: new-business-ingresse/v0-adesoes-club  
**Vercel**: adesoes-club  
**Supabase**: jndkfyoehtfigykenyca
