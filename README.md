# LupaApp

LupaApp é um aplicativo desenvolvido com Ionic e React, utilizando Capacitor para integração nativa e Vite como ferramenta de build.

## 📋 Funcionalidades

- **Autenticação**: Login, registro, recuperação de senha e alteração de senha.
- **Mapas**: Integração com Google Maps para exibir locais e realizar check-ins.
- **Interface Responsiva**: Design moderno e responsivo utilizando Ionic e Styled Components.
- **Gerenciamento de Usuários**: Exibição e atualização de informações do usuário.
- **Testes**: Testes unitários com Vitest e testes E2E com Cypress.

## 🚀 Tecnologias Utilizadas

- **Frontend**: React, Ionic Framework
- **Build Tool**: Vite
- **Estilização**: Styled Components
- **Integração Nativa**: Capacitor
- **Mapas**: Google Maps API
- **Gerenciamento de Estado**: React Hooks
- **Testes**: Vitest, Cypress
- **HTTP Requests**: Axios

## 🛠️ Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas:

- [Node.js](https://nodejs.org/) (versão 16 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [Ionic CLI](https://ionicframework.com/docs/cli)

## ⚙️ Configuração do Ambiente

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/LupaApp.git
   cd LupaApp

   ```

2. npm install
3. npm run dev

## ⚙️ Configuração do Ambiente para rodar no Android Studio para gerar builds

1. npx ionic build
2. npx cap sync android
3. npx cap open android

## ⚙️ Configuração do Ambiente para rodar no xcode para gerar builds

1. npx ionic build
2. npx cap sync ios
3. npx cap run ios
