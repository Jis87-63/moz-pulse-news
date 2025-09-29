# Guia de Deploy no Vercel - O País

## Pré-requisitos

1. Conta no [Vercel](https://vercel.com)
2. Conta no [GitHub](https://github.com)
3. Código do projeto no GitHub

## Passos para Deploy

### 1. Preparar o Repositório GitHub

```bash
# Inicializar repositório git (se ainda não foi feito)
git init

# Adicionar todos os arquivos
git add .

# Fazer commit
git commit -m "Initial commit - O País News App"

# Adicionar repositório remoto (substitua com seu URL)
git remote add origin https://github.com/seu-usuario/opais.git

# Push para o GitHub
git push -u origin main
```

### 2. Deploy no Vercel

#### Opção A: Via Interface Web

1. Acesse [vercel.com](https://vercel.com) e faça login
2. Clique em "New Project"
3. Importe seu repositório GitHub
4. Configure o projeto:
   - **Framework Preset**: Vite
   - **Root Directory**: ./
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Clique em "Deploy"

#### Opção B: Via CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login no Vercel
vercel login

# Deploy
vercel

# Para deploy em produção
vercel --prod
```

### 3. Configurar Domínio Personalizado

1. No dashboard do Vercel, vá em "Settings" > "Domains"
2. Adicione o domínio `opais.vercel.app` ou seu domínio personalizado
3. Configure os DNS conforme instruções do Vercel

## Configurações Importantes

### Variáveis de Ambiente (Futuro)

Quando integrar APIs reais de notícias, adicione as seguintes variáveis no Vercel:

```bash
NEWS_API_KEY=sua_chave_aqui
MEDIASTACK_API_KEY=sua_chave_aqui
```

### Redirects e Rewrites

O projeto já está configurado para funcionar com SPA routing. O Vercel detecta automaticamente aplicações Vite/React.

### Performance

- ✅ Código é automaticamente otimizado pelo Vercel
- ✅ CDN global incluído
- ✅ HTTPS automático
- ✅ Compressão Gzip/Brotli

## Estrutura do Projeto

```
opais/
├── public/
│   ├── favicon.png          # Favicon gerado
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── CookieConsent.tsx
│   │   ├── LoadingScreen.tsx
│   │   ├── Header.tsx
│   │   └── NewsCard.tsx
│   ├── data/
│   │   └── mockNews.ts      # Dados mock (substituir por API)
│   ├── pages/
│   │   ├── Index.tsx
│   │   ├── NewsDetail.tsx
│   │   └── NotFound.tsx
│   ├── types/
│   │   └── news.ts
│   ├── App.tsx
│   ├── index.css            # Design system
│   └── main.tsx
├── index.html
├── tailwind.config.ts       # Configuração Tailwind
└── vite.config.ts
```

## Próximos Passos

### Integração com APIs de Notícias

#### 1. NewsAPI.org

```typescript
// Exemplo de integração
const fetchNews = async () => {
  const response = await fetch(
    `https://newsapi.org/v2/everything?q=mozambique&apiKey=${API_KEY}`
  );
  const data = await response.json();
  return data.articles;
};
```

#### 2. Mediastack

```typescript
// Exemplo de integração
const fetchNews = async () => {
  const response = await fetch(
    `http://api.mediastack.com/v1/news?access_key=${API_KEY}&countries=mz`
  );
  const data = await response.json();
  return data.data;
};
```

#### 3. RSS Feeds

Fontes sugeridas para Moçambique:
- AIM (Agência de Informação de Moçambique)
- O País
- Notícias (jornal)
- BBC África (filtrado por Moçambique)

## Monitoramento

- Acesse [vercel.com/dashboard](https://vercel.com/dashboard) para ver analytics
- Logs de erro estão disponíveis na seção "Logs"
- Performance insights na aba "Analytics"

## Suporte

Para problemas:
1. Verifique os logs no dashboard do Vercel
2. Consulte a [documentação do Vercel](https://vercel.com/docs)
3. Verifique o build localmente: `npm run build && npm run preview`

## SEO e Performance

✅ **Já implementado:**
- Meta tags para SEO
- Open Graph para redes sociais
- Favicon personalizado
- Performance otimizada
- Responsivo para mobile
- Lazy loading de imagens

✅ **Recomendações:**
- Adicionar sitemap.xml
- Implementar analytics (Google Analytics, Plausible)
- Adicionar PWA support
- Implementar cache strategy
