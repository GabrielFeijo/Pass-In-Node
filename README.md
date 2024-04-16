# Pass In Node

O Pass.in é uma aplicação dedicada à gestão eficiente de participantes em eventos presenciais. Este projeto de back-end em Node.js foi desenvolvido durante o NLW Unite, uma iniciativa oferecida pela Rocketseat, que proporciona aprendizado e desenvolvimento de habilidades em programação.

---

## 👾 Experimente

Para documentação da API, acesse o link: [Pass-In-Docs](https://pass-in-node.vercel.app/docs).

## 🚀 Começo

Estas instruções permitirão que você obtenha uma cópia de trabalho do projeto em sua máquina local para fins de desenvolvimento e teste.

### 📋 Pré-requisitos

Antes de começar, você precisará ter as seguintes ferramentas instaladas em sua máquina:
[Git](https://git-scm.com),
[MongoDB](https://www.mongodb.com/) e
[NodeJS](https://nodejs.org/en).

Também é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

---

### 🎲 Colocando o backend para funcionar:

```bash
# Clone o repositório
$ git clone https://github.com/GabrielFeijo/Pass-In-Node
```

```bash
# Acesse a pasta do projeto em terminal/cmd
$ cd Pass-In-Node

# Instale as dependências
npm install

# Configure o .env com a URL do seu banco de dados
DATABASE_URL="mongodb://127.0.0.1:27017/PassIn"

# Inicie a aplicação em DEV:
$ npm run start
```

## Requisitos

### Requisitos funcionais

- [x] O organizador deve poder cadastrar um novo evento;
- [x] O organizador deve poder visualizar dados de um evento;
- [x] O organizador deve poder visualizar a lista de participantes;
- [x] O participante deve poder se inscrever em um evento;
- [x] O participante deve poder visualizar seu crachá de inscrição;
- [x] O participante deve poder realizar check-in no evento;

### Regras de negócio

- [x] O participante só pode se inscrever em um evento uma única vez;
- [x] O participante só pode se inscrever em eventos com vagas disponíveis;
- [x] O participante só pode realizar check-in em um evento uma única vez;

---

## 🛠️ Feito utilizando

<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" width="40" height="45" /> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastify/fastify-plain.svg" width="45" height="45"/> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" width="40" height="45" /> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlite/sqlite-original.svg" width="40" height="45" />
