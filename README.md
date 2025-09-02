# Visualização de Cartas

## Tema 4 - Sistema de Visualização de Cartas Pokémon

### 📋 Sobre o Projeto

Este projeto implementa um sistema completo de visualização de cartas Pokémon, desenvolvido como parte do Tema 4 da disciplina S03. O sistema permite aos usuários visualizar, filtrar, ordenar e explorar detalhes das cartas Pokémon através de uma interface intuitiva e funcional.

### 🎯 Funcionalidades Principais

#### Para o Usuário:
- **Sistema de Login**: Autenticação segura para acesso ao sistema
- **Visualização de Cartas**: Interface principal para exibir coleção de cartas Pokémon
- **Filtros Avançados**: Filtragem de cartas por diversos critérios (tipo, geração, atributos)
- **Ordenação Personalizada**: Organização das cartas por diferentes parâmetros
- **Detalhes das Cartas**: Visualização completa de informações detalhadas de cada carta
- **Perfil do Jogador**: Visualização das informações pessoais e estatísticas

#### Integração com Sistemas Externos:
- **PokéAPI**: Integração com a API oficial Pokémon para dados atualizados
- **Sistema de Login**: Autenticação externa integrada
- **Sistema de Distribuição**: Gerenciamento da distribuição das cartas

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

### 🔄 Casos de Uso

1. **Visualizar Cartas**: Funcionalidade principal que permite a exibição da coleção
2. **Filtrar Cartas**: Extensão que permite filtragem por critérios específicos
3. **Ordenar Cartas**: Extensão que permite ordenação personalizada
4. **Ver Detalhes**: Extensão que mostra informações completas de uma carta
5. **Login**: Funcionalidade obrigatória para acesso ao sistema
6. **Visualizar Perfil**: Permite ver informações do jogador logado

### 🌐 Integração com APIs

O sistema integra-se com a **PokéAPI** para:
- Obter dados atualizados das cartas
- Buscar informações detalhadas dos Pokémon
- Sincronizar movimentos e atributos
- Manter base de dados atualizada

### 📁 Estrutura do Projeto

```
visualizacao-de-cartas/
├── docs/
│   ├── class-diagram.png      # Diagrama de classes UML
│   ├── use-case-diagram.png   # Diagrama de casos de uso
│   ├── UML projeto S03 V3.drawio  # Arquivo fonte dos diagramas
│   └── Temas.docx            # Especificações dos temas
├── src/                      # Código fonte (a ser implementado)
├── assets/                   # Recursos estáticos
└── README.md                 # Este arquivo
```

### 🚀 Como Executar

_(Instruções de execução serão adicionadas conforme o desenvolvimento progride)_

### 🛠️ Tecnologias Utilizadas

_(As tecnologias utilizadas serão adicionadas conforme o desenvolvimento progride)_

### 👥 Equipe - Equipe 8

Este projeto é desenvolvido pela **Equipe 8** como parte da disciplina S03 - 2025/2, seguindo as especificações do Tema 4.

**Membros da Equipe:**
- **Douglas Hideaki de Almeida Otani**
- **João Victor Godoy da Silva**
- **João Victor Siécola Souza**
- **Matheus Dionisio Teixeira Andrade**

### 📝 Observações

- O sistema requer autenticação para todas as funcionalidades principais
- A integração com PokéAPI garante dados sempre atualizados
- O design segue os padrões UML especificados nos diagramas
