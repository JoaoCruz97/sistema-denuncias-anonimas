# Sistema de Denuncias Anonimas

Sistema web institucional para registro de denuncias sem identificacao pessoal, desenvolvido para demonstrar conceitos de Engenharia de Software com interface organizada, manipulacao de dados no navegador e geracao de documentos.

## Objetivo do projeto

Este projeto simula um portal oficial para:

- organizar categorias de ocorrencias
- registrar denuncias com formulario estruturado
- gerar protocolo unico automaticamente
- salvar registros no `localStorage`
- permitir consulta de status por protocolo
- gerar comprovante em PDF para o usuario

## Funcionalidades

1. Pagina inicial com layout institucional e 4 categorias de denuncia.
2. Filtro de tipos de crimes por categoria.
3. Formulario de registro aberto automaticamente apos selecionar o crime.
4. Geracao automatica de protocolo unico.
5. Download automatico de comprovante PDF com `jsPDF`.
6. Consulta de denuncia por numero de protocolo.

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript (ES6+)
- Biblioteca `jsPDF` (CDN)

## Estrutura de arquivos

```text
sistema-denuncias-anonimas/
  index.html
  style.css
  script.js
  README.md
```

## Como executar localmente

1. Abra a pasta `sistema-denuncias-anonimas`.
2. Abra o arquivo `index.html` no navegador.

Opcionalmente, rode um servidor local para evitar bloqueios de navegador em alguns contextos.

## Publicacao no GitHub Pages

1. Crie um repositorio no GitHub e envie os arquivos do projeto.
2. No repositorio, acesse `Settings` -> `Pages`.
3. Em `Build and deployment`, selecione:
   - `Source`: `Deploy from a branch`
   - `Branch`: `main` (ou `master`) e pasta `/root`
4. Salve e aguarde a URL publica ser gerada pelo GitHub Pages.

## Observacao

Este sistema tem fins educacionais e demonstrativos. Em ambiente real, um sistema de denuncias deve incluir requisitos adicionais de seguranca, auditoria, criptografia e conformidade legal.

## Autor
João Cruz
