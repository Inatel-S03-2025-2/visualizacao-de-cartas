# Visualização de Cartas

## Tema 4 - Sistema de Visualização de Cartas Pokémon

### 📋 Sobre o Projeto

Sistema de visualização de cartas Pokémon desenvolvido como parte do Tema 4 da disciplina S03. Permite aos usuários visualizar sua coleção de cartas através de uma interface web.

### 🎯 Status de Implementação

**Implementado:**
- Login (autenticação mockada)
- Dashboard com visualização de cartas
- Cards com informações (tipos, stats, geração, shiny)
- Botões de Batalha e Trocas (UI apenas)

**Pendente:**
- Funcionalidades de Batalha e Trocas
- Página de Perfil do Jogador
- Página de Detalhes da Carta
- Filtros e Ordenação
- Integração com PokéAPI

### 🏗️ Arquitetura do Sistema

#### Entidades Principais:

**Player (Jogador)**
- `name`: Nome do jogador
- `id`: Identificador único
- `password`: Senha de acesso
- `email`: Email para contato
- **Métodos**:
  - `listCards()`: Lista todas as cartas do jogador
  - `showPlayer()`: Exibe informações do jogador
  - `filterCards(filters)`: Aplica filtros na coleção

**Card (Carta)**
- `name`: Nome do Pokémon
- `id`: Identificador único da carta
- `types[]`: Tipos do Pokémon (Fogo, Água, etc.)
- `isShiny`: Indica se é uma carta especial
- `moves[]`: Lista de movimentos disponíveis
- `generation`: Geração do Pokémon
- **Atributos de Batalha**:
  - `hp`: Pontos de vida
  - `attack`: Ataque físico
  - `defense`: Defesa física
  - `specialAttack`: Ataque especial
  - `specialDefense`: Defesa especial
  - `speed`: Velocidade
- **Métodos**:
  - `showDetails()`: Exibe detalhes completos da carta

### 🔄 Casos de Uso (conforme diagrama)

1. **Login**: Autenticação para acesso ao sistema
2. **Visualizar Cartas**: Exibição da coleção de cartas
3. **Batalhar**: Sistema de batalhas entre cartas
4. **Trocar Cartas**: Sistema de trocas de cartas
5. **Visualizar Perfil**: Informações do jogador
6. **Ver Detalhes**: Detalhes completos de uma carta

Veja o diagrama completo em `docs/use-case-diagram.png`

### 🌐 Integração Futura

**PokéAPI**: O sistema será integrado com a PokéAPI para obter dados reais das cartas. Atualmente utiliza dados mockados (`src/data/mockPokemons.ts`).

### 📁 Estrutura do Projeto

```
visualizacao-de-cartas/
├── docs/
│   ├── class-diagram.png          # Diagrama de classes UML
│   ├── use-case-diagram.png       # Diagrama de casos de uso
│   └── UML projeto S03 V4.drawio  # Arquivo fonte dos diagramas
├── src/
│   ├── components/                # Componentes reutilizáveis
│   │   ├── BattleButton/         # Botão de batalha
│   │   ├── TradeButton/          # Botão de trocas
│   │   ├── PokemonCard/          # Card individual de Pokémon
│   │   ├── PokemonGrid/          # Grid de cards
│   │   ├── Header/               # Cabeçalho com logo e menu
│   │   ├── UserDropdown/         # Menu do usuário
│   │   ├── Login/                # Formulário de login
│   │   ├── PrivateRoute/         # Proteção de rotas
│   │   └── EmptyState/           # Estado vazio
│   ├── pages/                    # Páginas da aplicação
│   │   ├── auth/login.tsx        # Página de login
│   │   ├── dashboard/            # Dashboard principal
│   │   └── dashboard/cards/detail/  # Detalhes da carta
│   ├── routes/                   # Configuração de rotas
│   ├── contexts/                 # Contextos React (Auth)
│   ├── hooks/                    # Hooks customizados (useAuth)
│   ├── types/                    # Definições de tipos TypeScript
│   ├── data/                     # Camada de dados (mockPokemons)
│   └── assets/                   # Recursos estáticos
├── index.html
├── package.json
└── README.md
```

### 🚀 Como Executar

```bash
npm install
npm run dev
```

Acesse `http://localhost:5173` e faça login com qualquer usuário.

### 🛠️ Tecnologias

- React 19.1.1 + TypeScript 5.9.3
- Vite 7.1.7
- React Router 7.9.4
- CSS Modules

### 👥 Equipe 8

**Membros:**
- Douglas Hideaki de Almeida Otani
- João Victor Godoy da Silva
- João Victor Siécola Souza
- Matheus Dionisio Teixeira Andrade

**Disciplina:** S03 - 2025/2 | **Tema:** 4
