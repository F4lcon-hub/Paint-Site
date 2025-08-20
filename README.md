# 🎨 Paint Application

Uma aplicação de pintura simples e moderna, construída para a web. Permite desenhar livremente em um canvas digital com diversas ferramentas e opções de personalização. Este projeto foi desenvolvido como um estudo prático de tecnologias front-end modernas.



---

## ✨ Funcionalidades

*   **Ferramentas de Desenho:** Pincel, Lápis e Borracha para diferentes estilos de traço.
*   **Configurações do Pincel:** Ajuste o **tamanho** e a **opacidade** para obter o efeito desejado.
*   **Seletor de Cores Completo:** Escolha cores de uma paleta pré-definida, use cores recentes ou insira um código hexadecimal customizado.
*   **Gerenciamento de Arquivo:**
    *   **New:** Comece um novo desenho em uma tela em branco.
    *   **Save:** Salve sua arte como um arquivo `.png` no seu dispositivo.
    *   **Clear:** Limpe completamente a área de desenho.
*   **Histórico de Ações:** Desfaça (`Undo`) e refaça (`Redo`) seus traços com facilidade.

---

## 🚀 Tecnologias Utilizadas

O projeto foi construído utilizando um conjunto de tecnologias modernas para o desenvolvimento web:

-   **React:** Biblioteca principal para a construção da interface de usuário.
-   **TypeScript:** Adiciona tipagem estática ao JavaScript, tornando o código mais robusto e previsível.
-   **Redux Toolkit:** Para o gerenciamento centralizado do estado da aplicação (ferramenta atual, cor, tamanho do pincel, etc.).
-   **Material-UI (MUI):** Biblioteca de componentes de UI para um design limpo e consistente.
-   **Vite:** Ferramenta de build e servidor de desenvolvimento extremamente rápido.

---

## ⚙️ Como Executar o Projeto Localmente

Para rodar este projeto na sua máquina, siga os passos abaixo.

**Pré-requisitos:**
-   Node.js (versão 16 ou superior)
-   `npm` ou `yarn` como gerenciador de pacotes

**Passos:**

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/seu-usuario/nome-do-repositorio.git
    ```

2.  **Navegue até a pasta do projeto:**
    ```bash
    cd nome-do-repositorio
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

4.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

5.  Abra o endereço `http://localhost:5173` (ou a porta indicada no terminal) no seu navegador para ver a aplicação funcionando.

---

## 📝 Como Funciona

A aplicação é uma **Single Page Application (SPA)**. A lógica principal está dividida em:

-   **Componentes React (`/src/components`):** Cada parte da interface (barra de menu, caixa de ferramentas, canvas) é um componente isolado.
-   **Hook `useCanvas` (`/src/hooks`):** Centraliza toda a lógica de manipulação do canvas HTML5, como desenhar, apagar, limpar e salvar.
-   **Redux Store (`/src/store`):** Atua como um "cérebro" central, guardando informações globais como a ferramenta selecionada, a cor atual e o histórico de ações para o undo/redo. Quando uma ferramenta é alterada na `Toolbox`, o Redux informa o `Canvas` sobre a mudança.

