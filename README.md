# 🎨 Aplicação de Pintura Digital

Uma aplicação de pintura digital completa e funcional desenvolvida com React, TypeScript e Material-UI. Permite aos usuários criar desenhos e pinturas digitais com diversas ferramentas e opções de personalização.

## 📋 Funcionalidades

### 🖌️ Ferramentas de Desenho
- **Pincel**: Ferramenta principal para pintura com traços suaves
- **Lápis**: Ferramenta para desenhos precisos com traços definidos
- **Borracha**: Remove partes do desenho

### 🎨 Sistema de Cores
- **Paleta de Gradientes**: Cores organizadas em gradientes predefinidos
- **Cores Recentes**: Acesso rápido às últimas cores utilizadas
- **Cor Personalizada**: Entrada manual de cores em formato hexadecimal
- **Seletor de Cor Visual**: Interface intuitiva para escolha de cores

### ⚙️ Configurações do Pincel
- **Tamanho**: Ajustável de 1px a 50px
- **Opacidade**: Controle de transparência de 10% a 100%
- **Configurações Dinâmicas**: Ajustes em tempo real

### 💾 Operações de Arquivo
- **Novo Canvas**: Limpa a tela para um novo desenho
- **Salvar**: Download da imagem em formato PNG
- **Limpar**: Remove todo o conteúdo do canvas
- **Desfazer/Refazer**: Histórico de até 50 ações

## 🏗️ Arquitetura do Projeto

### 📁 Hierarquia de Arquivos (por importância)

```
📦 Paint Application
├── 🔴 CRÍTICOS (Core da Aplicação)
│   ├── App.paintapp.tsx              # Ponto de entrada principal
│   ├── src/components/PaintApp.tsx   # Componente raiz com providers
│   ├── src/store/paintStore.ts       # Gerenciamento de estado global
│   └── src/hooks/useCanvas.ts        # Lógica principal do canvas
│
├── 🟡 PRINCIPAIS (Interface Principal)
│   ├── src/components/PaintCanvas.tsx # Área de desenho (Canvas HTML5)
│   ├── src/components/Toolbox.tsx     # Barra de ferramentas lateral
│   ├── src/components/MenuBar.tsx     # Menu superior
│   └── src/components/ColorPicker.tsx # Seletor de cores
│
├── 🟢 SECUNDÁRIOS (Componentes Reutilizáveis)
│   ├── src/components/BrushSettings.tsx # Configurações do pincel
│   ├── src/components/ToolButton.tsx    # Botão de ferramenta
│   └── src/components/ColorSwatch.tsx   # Amostra de cor individual
│
├── 🔵 SUPORTE (Configuração e Utilitários)
│   ├── src/theme/theme.ts            # Tema Material-UI
│   ├── src/types/enums.ts            # Definições de tipos
│   ├── src/utils/formatters.ts       # Funções de formatação
│   ├── src/paintAppMockData.ts       # Dados de exemplo
│   └── index.css                     # Estilos globais
```

## 🚀 Tecnologias Utilizadas

- **React 19** - Biblioteca principal para interface
- **TypeScript** - Tipagem estática
- **Material-UI v7** - Componentes de interface
- **Redux Toolkit** - Gerenciamento de estado
- **HTML5 Canvas** - Área de desenho
- **Emotion** - Estilização CSS-in-JS

## 🎯 Como Usar

### Ferramentas de Desenho
1. **Selecione uma ferramenta** na barra lateral esquerda
2. **Ajuste o tamanho** do pincel usando o controle deslizante
3. **Configure a opacidade** conforme desejado
4. **Escolha uma cor** na paleta ou use o seletor personalizado

### Desenhando
1. **Clique e arraste** no canvas para desenhar
2. **Use diferentes ferramentas** para efeitos variados
3. **Ajuste configurações** em tempo real durante o desenho

### Salvando o Trabalho
1. **Clique em "Salvar"** no menu superior
2. **O arquivo será baixado** automaticamente como PNG
3. **Use "Desfazer/Refazer"** para corrigir erros

## 🔧 Estrutura Técnica

### Gerenciamento de Estado
- **Redux Store** centraliza todo o estado da aplicação
- **Hooks customizados** para lógica específica do canvas
- **Estado reativo** que atualiza a interface automaticamente

### Canvas HTML5
- **Renderização em tempo real** dos traços
- **Diferentes modos de composição** para ferramentas
- **Histórico de ações** para desfazer/refazer
- **Exportação** em formato de imagem

### Interface Responsiva
- **Layout flexível** que se adapta a diferentes telas
- **Componentes reutilizáveis** para consistência
- **Tema personalizado** com cores modernas

## 🎨 Paleta de Cores

A aplicação inclui uma paleta de cores gradiente organizada em:
- **Vermelhos**: Do vermelho puro aos tons pastéis
- **Verdes**: Variações de verde em diferentes intensidades
- **Azuis**: Tons de azul do escuro ao claro
- **Amarelos**: Gradientes de amarelo
- **Magentas**: Tons de rosa e magenta
- **Cianos**: Variações de azul-ciano
- **Cinzas**: Escala de cinzas do preto ao branco

## 📱 Compatibilidade

- **Navegadores Modernos**: Chrome, Firefox, Safari, Edge
- **Dispositivos**: Desktop e tablet (otimizado para mouse)
- **Resolução**: Funciona em diferentes tamanhos de tela

---

*Desenvolvido com ❤️ usando React e Material-UI*