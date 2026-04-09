# Sistema de Denúncias Anônimas

Sistema web institucional para **registro de denúncias sem identificação pessoal**, desenvolvido para demonstrar conceitos de **Engenharia de Software e Desenvolvimento Web**.

O sistema possui interface organizada, manipulação de dados no navegador e geração automática de documentos em PDF.

---

## Objetivo do projeto

Este projeto simula um portal oficial utilizado para:

* Organizar categorias de ocorrências
* Registrar denúncias através de formulário estruturado
* Gerar protocolo único automaticamente
* Armazenar registros no `localStorage`
* Permitir consulta de status por protocolo
* Gerar comprovante em PDF para o usuário

---

## Funcionalidades

* Página inicial com layout institucional e **4 categorias de denúncia**
* Exibição de **subcategorias ao selecionar uma categoria**
* Formulário de denúncia aberto automaticamente após selecionar o tipo de ocorrência
* **Geração automática de protocolo único**
* Exibição do protocolo após o registro
* Download de comprovante em **PDF utilizando jsPDF**
* Consulta de denúncia através do **número de protocolo**
* Exibição do **status da denúncia**
* Interface **responsiva para dispositivos móveis**

---

## Tecnologias utilizadas

* HTML5
* CSS3
* JavaScript (ES6+)
* Biblioteca `jsPDF` (CDN)
* `localStorage` para armazenamento de dados no navegador

---

## Estrutura de arquivos

```text
sistema-denuncias-anonimas/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

---

## Como executar localmente

1. Baixe ou clone este repositório.
2. Abra a pasta `sistema-denuncias-anonimas`.
3. Execute o arquivo:

```
index.html
```

em qualquer navegador moderno.

Opcionalmente, pode-se utilizar um servidor local para execução do projeto.

---

## Publicação no GitHub Pages

Este projeto pode ser publicado facilmente utilizando **GitHub Pages**.

Passos:

1. Envie os arquivos para um repositório no GitHub.
2. Acesse:

```
Settings → Pages
```

3. Em **Build and deployment**, configure:

* Source: `Deploy from a branch`
* Branch: `main`
* Folder: `/root`

Após alguns segundos o GitHub irá gerar o link público do site.

---

## Demonstração

Repositório do projeto:

```
(https://github.com/JoaoCruz97/sistema-denuncias-anonimas )
```

Site publicado:

```
(https://joaocruz97.github.io/sistema-denuncias-anonimas/ )
```

---

## Observação

Este sistema possui finalidade **educacional e demonstrativa**.

Em um ambiente real, um sistema de denúncias deveria incluir:

* autenticação segura
* criptografia de dados
* controle de acesso
* auditoria de registros
* conformidade com legislações de proteção de dados

---

## Autor

**João Cruz**
 / Curso: Análise e Desenvolvimento de Sistemas
