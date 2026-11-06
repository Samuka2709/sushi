# Site — clínica odontológica

Homepage de página única para clínica odontológica. Vite + React + TypeScript + Tailwind CSS + GSAP.
O build gera HTML estático pré-renderizado (todo o conteúdo já no HTML, visível mesmo sem JavaScript).

## Rodar

```
npm install
npm run dev       # http://localhost:5173
npm run build     # gera dist/ (HTML estático + assets)
npm run preview   # serve dist/ em http://localhost:4173
```

## Trocar os dados da clínica

Edite **só** `src/config/clinic.ts`. Nenhum componente tem nome, telefone, endereço ou texto da clínica.

- Tudo entre colchetes, como `[TELEFONE]`, é um **marcador pendente**: aparece destacado no site
  (fundo areia com borda tracejada) até ser trocado pelo dado real.
- O `npm run build` lista no terminal todos os marcadores que ainda faltam.
- `testimonials: []` esconde a seção de depoimentos (e o item do menu). Só use depoimentos autorizados, com fonte.
- `hasBeforeAfter: false` troca a seção de antes/depois pela galeria. Para ativar, preencha `beforeAfter`
  e as fotos em `images.beforeAfter`.
- Mais de 6 tratamentos: os cards são agrupados automaticamente por `category`.
- `hours[].days`, `opens` e `closes` alimentam os dados estruturados do Google (JSON-LD).
- `siteUrl`: preencha com o domínio final para gerar o canonical e o `og:url`.

## Trocar as imagens

Edite `src/config/images.ts`. Hoje todas as fotos são **provisórias** do Unsplash (marcadas com
`provisional: true`) e não são da clínica.

Para usar uma foto própria: salve em `public/fotos/` (WebP ou AVIF) e troque `unsplash: '...'` por
`src: '/fotos/arquivo.webp'`, mantendo `width`, `height` (proporção) e um `alt` descritivo.

- Logo: coloque o arquivo em `public/` e preencha `logo: '/logo.svg'` em `clinic.ts`.
- Favicon: é gerado com a inicial da clínica. Para usar um próprio, salve `public/favicon.svg`.
- Imagem do WhatsApp/redes: `images.og` (1200×630).

## Publicar

Rode `npm run build` e publique a pasta `dist/`.

- **Netlify / Vercel**: comando de build `npm run build`, pasta de saída `dist`. Se o projeto estiver em
  subpasta do repositório, defina o diretório raiz como `dentista`.
- **Hostinger** (ou qualquer hospedagem comum): envie o conteúdo de `dist/` para `public_html/`.

## Antes de publicar

- Substituir todos os marcadores `[...]` e todas as fotos provisórias.
- Revisar a política de privacidade em `src/Privacy.tsx` (é um modelo).
- Conferir com a clínica as regras do CFO sobre publicidade, depoimentos, antes/depois e preços.
