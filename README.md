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

```bash
npm install
npm run dev
```

### IonicCLI

Deve-se primeiro garantir que tem o CLI do Ionic instalado:

```bash
npm install -g @ionic/cli
```

## ⚙️ Configuração do Ambiente para rodar no Android Studio para gerar builds

```bash
npm run android
```

## ⚙️ Configuração do Ambiente para rodar no xcode para gerar builds

```bash
npm run ios
```

## 🚀 Passo a passo para build no iOS e envio para AppStore

### Passo 1: Adicionar Capability + Setup da Conta
- Ao abrir o projeto no Xcode, no target App, vá até a aba Signing & Capabilities
- Confira se o box "Automatically manage signing" e a conta Fernanda L.Paludo estão selecionados
- Confira se abaxo da conta, aparece a Capability "In-App Purchase", caso não esteja habilitado, siga os passos abaixo
    - No canto superior esquerdo, acima de "Signing", clique no botão "+ Capability"
    - Busque na lista e selecione a opção In-App Purchase
    - Ele irá aparecer logo abaixo do Signing Certificate
- Suba o número da versão e da build em +1 a partir do valor que consta no app.

### Passo 2: Alterar a linguagem nativa do app
- Ainda no target App, selecione a aba "Info"
- Confira se a Key "Default localization" está como "pt-br"
- Confira se a Key "Bundle Display Name" está como "Clube Lupa"

### Passo 3: Conecte um dispositivo compatível com a Build
- Você pode tanto conectar um dispositivo por cabo no computador, quanto selecionar a opção "Any iOS Device"

### Passo 4: Arquivar o projeto
- Na barra de tarefas, clique em "Product"
- Na lista que abre em seguida, selecione "Archive" e aguarde o Xcode finalizar a build

### Passo 5: Selecionar a distribuição
- Na janela que abrir assim que o Xcode terminar de arquivar o projeto, você deve selecionar "Distribute App"
- Em seguida, selecione "App Store Connect" (dessa maneira a versão irá tanto para loja, quanto para o testflight)
- Aguarde a operação finalizar.
