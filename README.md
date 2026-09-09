# Portfólio de Dados

Site estático simples para portfólio de transição de carreira para dados.
Só HTML, CSS e um JS mínimo — sem build, sem dependências.

## Arquivos

- `index.html` — estrutura e conteúdo (edite os textos aqui)
- `style.css` — visual do site
- `script.js` — reservado para funcionalidades futuras

## O que trocar antes de publicar

1. **Nome e contato**: busque por `Seu Nome`, `seuemail@exemplo.com`,
   `seu-usuario` no `index.html` e troque pelos seus dados.
2. **Seção "Sobre"**: o parágrafo está com um texto-guia — escreva sua
   história com suas palavras.
3. **Projeto Olist**: quando o repositório estiver pronto, abra
   `script.js` e preencha `links.repo` (e `links.demo`, se tiver) no
   objeto do projeto Olist.
4. **Novo projeto**: os projetos ficam em um array no topo do
   `script.js` (constante `PROJECTS`). Copie o objeto de exemplo
   comentado no final do array, cole um novo bloco e preencha os
   campos — o card aparece sozinho na página, com filtro por
   tecnologia incluso automaticamente. Não precisa tocar no HTML.

## Como publicar no GitHub Pages (grátis)

1. Crie um repositório novo no GitHub (ex: `seu-usuario.github.io`, ou
   qualquer nome — nesse caso o link fica em `seu-usuario.github.io/nome-repo`).
2. Suba estes três arquivos (`index.html`, `style.css`, `script.js`) para
   a raiz do repositório.
3. Em **Settings → Pages**, escolha a branch `main` e a pasta `/root`.
4. Em alguns minutos o site fica no ar no endereço que o GitHub mostrar.

Cada vez que você terminar um projeto novo, é só editar o `index.html`,
subir (`git push`) e o site atualiza sozinho.
