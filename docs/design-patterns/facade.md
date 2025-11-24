# Facade Pattern

## Descrição
O **Facade** (Fachada) é um padrão de projeto estrutural que fornece uma interface simplificada para um subsistema complexo. Ele oculta a complexidade do sistema e fornece uma interface mais fácil de usar para os clientes.

## Problema que Resolve
Em sistemas complexos, os clientes frequentemente precisam:
- Interagir com múltiplos serviços e classes
- Conhecer a ordem correta de chamadas
- Lidar com dependências entre componentes
- Escrever código repetitivo para operações comuns

Isso resulta em:
- Código duplicado
- Acoplamento forte entre cliente e subsistemas
- Dificuldade de manutenção
- Curva de aprendizado alta

## Implementação no Projeto

### CardFacade (`src/facades/CardFacade.ts`)

```typescript
export class CardFacade {
  private static instance: CardFacade;
  private pokeApiService: PokeApiService;
  private cardDistributionService: CardDistributionService;

  private constructor() {
    this.pokeApiService = PokeApiService.getInstance();
    this.cardDistributionService = CardDistributionService.getInstance();
  }

  static getInstance(): CardFacade {
    if (!CardFacade.instance) {
      CardFacade.instance = new CardFacade();
    }
    return CardFacade.instance;
  }

  // Métodos simplificados...
}
```

**O que a Facade encapsula:**
- `PokeApiService` - Comunicação com API externa
- `CardDistributionService` - Gerenciamento de cartas dos usuários
- `CardFactory` - Transformação de dados da API
- `MoveFactory` - Transformação de movimentos
- `AbilityFactory` - Transformação de habilidades

## Métodos Disponíveis

### 1. **getCardById(id: string): Promise<Card>**
Busca uma carta individual por ID.

**Antes (sem Facade):**
```typescript
// Cliente precisa conhecer PokeApiService e CardFactory
const pokeApi = PokeApiService.getInstance();
const response = await pokeApi.getCard(id);
const card = CardFactory.fromApiResponse(response, id);
```

**Depois (com Facade):**
```typescript
const facade = CardFacade.getInstance();
const card = await facade.getCardById(id);
```

### 2. **getUserCards(userId: string): Promise<Card[]>**
Busca todas as cartas de um usuário.

**Antes (sem Facade):**
```typescript
// Cliente precisa coordenar 3 passos
const distributionService = CardDistributionService.getInstance();
const pokeApi = PokeApiService.getInstance();

// 1. Buscar IDs das cartas do usuário
const cardIds = await distributionService.getUserCards(userId);

// 2. Buscar dados de cada carta na API
const responses = await pokeApi.fetchCards(cardIds);

// 3. Transformar em objetos Card
const cards = responses.map((res, idx) => 
  CardFactory.fromApiResponse(res, String(cardIds[idx]))
);
```

**Depois (com Facade):**
```typescript
const facade = CardFacade.getInstance();
const cards = await facade.getUserCards(userId);
```

### 3. **getMoveDetails(moveName: string): Promise<Move>**
Busca detalhes de um movimento.

**Simplificação:**
```typescript
// Antes: PokeApiService + MoveFactory
const facade = CardFacade.getInstance();
const move = await facade.getMoveDetails("thunder");
```

### 4. **getAbilityDetails(abilityName: string): Promise<Ability>**
Busca detalhes de uma habilidade.

**Simplificação:**
```typescript
const facade = CardFacade.getInstance();
const ability = await facade.getAbilityDetails("static");
```

### 5. **getCompleteCardData(id: string): Promise<{card, moves, abilities}>**
**Método mais poderoso** - Busca carta com TODOS os detalhes em uma única chamada.

**Antes (sem Facade):**
```typescript
// Cliente precisa fazer MÚLTIPLAS requisições
const pokeApi = PokeApiService.getInstance();

// 1. Buscar carta
const cardResponse = await pokeApi.getCard(id);
const card = CardFactory.fromApiResponse(cardResponse, id);

// 2. Buscar cada movimento (4 requisições)
const movePromises = card.moves.map(name => 
  pokeApi.fetchMove(name).then(res => MoveFactory.fromApiResponse(res))
);
const moves = await Promise.all(movePromises);

// 3. Buscar cada habilidade (2-3 requisições)
const abilityPromises = card.abilities.map(name =>
  pokeApi.fetchAbility(name).then(res => AbilityFactory.fromApiResponse(res))
);
const abilities = await Promise.all(abilityPromises);

// Total: 7-8 linhas de código, ~7 requisições HTTP
```

**Depois (com Facade):**
```typescript
const facade = CardFacade.getInstance();
const { card, moves, abilities } = await facade.getCompleteCardData(id);
// 1 linha de código, mesmas requisições otimizadas internamente
```

### 6. **getMultipleCards(ids: string[]): Promise<Card[]>**
Busca múltiplas cartas em paralelo.

**Simplificação:**
```typescript
const facade = CardFacade.getInstance();
const cards = await facade.getMultipleCards(["1", "25", "150"]);
```

## Impacto no CardController

### Antes (sem Facade) - 90 linhas
```typescript
export class CardController {
  private static pokeApiService = PokeApiService.getInstance();
  private static cardDistributionService = CardDistributionService.getInstance();

  static async fetchCardsByUserId(userId: string): Promise<Card[]> {
    try {
      if (!userId || userId.trim() === "") {
        throw new Error("ID do usuário inválido");
      }

      const userCardsIds = await this.cardDistributionService.getUserCards(userId);
      
      if (!userCardsIds || userCardsIds.length === 0) {
        return [];
      }

      const pokemonsData = await this.pokeApiService.fetchCards(userCardsIds);
      return pokemonsData.map((res, idx) =>
        CardFactory.fromApiResponse(res, String(userCardsIds[idx]))
      );
    } catch (error) {
      console.error("Erro ao buscar cartas do usuário:", error);
      throw new Error(
        error instanceof Error
          ? error.message
          : "Erro ao carregar cartas do usuário"
      );
    }
  }

  static async getCardById(id: string): Promise<Card> {
    try {
      if (!id || id.trim() === "") {
        throw new Error("ID da carta inválido");
      }

      const res = await this.pokeApiService.getCard(id);
      return CardFactory.fromApiResponse(res, id);
    } catch (error) {
      console.error(`Erro ao buscar carta ${id}:`, error);
      throw new Error(
        error instanceof Error ? error.message : `Erro ao carregar carta ${id}`
      );
    }
  }

  // ... mais 40 linhas para getMoveByMoveId e getAbilityByAbilityId
}
```

### Depois (com Facade) - 35 linhas
```typescript
export class CardController {
  private static facade = CardFacade.getInstance();

  static async fetchCardsByUserId(userId: string): Promise<Card[]> {
    return this.facade.getUserCards(userId);
  }

  static async getCardById(id: string): Promise<Card> {
    return this.facade.getCardById(id);
  }

  static async getMoveByMoveId(id: string): Promise<Move> {
    return this.facade.getMoveDetails(id);
  }

  static async getAbilityByAbilityId(id: string): Promise<Ability> {
    return this.facade.getAbilityDetails(id);
  }

  static async getCompleteCardData(id: string): Promise<{
    card: Card;
    moves: Move[];
    abilities: Ability[];
  }> {
    return this.facade.getCompleteCardData(id);
  }
}
```

**Redução:** 90 → 35 linhas (**~60% menos código**)

## Características do Padrão

### Elementos Principais
1. **Interface Simplificada**: Métodos intuitivos e de alto nível
2. **Encapsulamento**: Oculta subsistemas complexos (Services + Factories)
3. **Coordenação**: Gerencia a ordem e dependências entre componentes
4. **Singleton**: Única instância compartilhada

### Vantagens
- ✅ **Simplicidade**: Interface fácil de usar e entender
- ✅ **Desacoplamento**: Clientes não conhecem subsistemas internos
- ✅ **Manutenibilidade**: Mudanças internas não afetam clientes
- ✅ **Reutilização**: Operações complexas centralizadas
- ✅ **Redução de código**: Elimina duplicação
- ✅ **Testes mais fáceis**: Mock apenas a fachada

### Desvantagens
- ⚠️ Pode se tornar um "god object" se acumular muitas responsabilidades
- ⚠️ Adiciona uma camada extra de abstração

## Arquitetura do Sistema

```
┌─────────────────────┐
│   CardController    │ ← Controller da aplicação
└──────────┬──────────┘
           │
           │ usa
           ▼
┌─────────────────────┐
│    CardFacade       │ ← Facade Pattern (Interface Simplificada)
└──────────┬──────────┘
           │
           │ coordena
           ▼
┌──────────────────────────────────────┐
│     Subsistemas Complexos            │
│                                      │
│  ┌──────────────────┐               │
│  │ PokeApiService   │ (Singleton)   │
│  └──────────────────┘               │
│                                      │
│  ┌──────────────────┐               │
│  │ CardDistribution │ (Singleton)   │
│  │ Service          │               │
│  └──────────────────┘               │
│                                      │
│  ┌──────────────────┐               │
│  │  CardFactory     │ (Factory)     │
│  └──────────────────┘               │
│                                      │
│  ┌──────────────────┐               │
│  │  MoveFactory     │ (Factory)     │
│  └──────────────────┘               │
│                                      │
│  ┌──────────────────┐               │
│  │ AbilityFactory   │ (Factory)     │
│  └──────────────────┘               │
└──────────────────────────────────────┘
```

## Exemplo Prático Completo

```typescript
// Cenário: Página de detalhes de uma carta

// ❌ SEM FACADE (código complexo e acoplado)
async function loadCardDetails(cardId: string) {
  const pokeApi = PokeApiService.getInstance();
  
  // Buscar carta
  const cardRes = await pokeApi.getCard(cardId);
  const card = CardFactory.fromApiResponse(cardRes, cardId);
  
  // Buscar movimentos
  const moves = await Promise.all(
    card.moves.map(async (name) => {
      const res = await pokeApi.fetchMove(name);
      return MoveFactory.fromApiResponse(res);
    })
  );
  
  // Buscar habilidades
  const abilities = await Promise.all(
    card.abilities.map(async (name) => {
      const res = await pokeApi.fetchAbility(name);
      return AbilityFactory.fromApiResponse(res);
    })
  );
  
  return { card, moves, abilities };
}

// ✅ COM FACADE (código simples e limpo)
async function loadCardDetails(cardId: string) {
  const facade = CardFacade.getInstance();
  return await facade.getCompleteCardData(cardId);
}
```

## Benefícios Mensuráveis

| Métrica | Sem Facade | Com Facade | Melhoria |
|---------|------------|------------|----------|
| Linhas de código (Controller) | ~90 | ~35 | -60% |
| Imports necessários | 7 | 1 | -86% |
| Conhecimento de subsistemas | 5 classes | 1 classe | -80% |
| Complexidade ciclomática | Alta | Baixa | Significativa |
| Tempo de implementação | Alto | Baixo | Rápido |

## Integração com Outros Padrões

O Facade trabalha em conjunto com:

1. **Singleton**: Todos os serviços são singletons
2. **Factory**: Usa factories para transformar dados
3. **Facade**: Coordena Singletons + Factories

```typescript
// Dentro do CardFacade
async getCardById(id: string): Promise<Card> {
  // 1. Singleton busca dados
  const response = await this.pokeApiService.getCard(id);
  
  // 2. Factory transforma dados
  return CardFactory.fromApiResponse(response, id);
  
  // 3. Facade retorna resultado pronto
}
```

## Conclusão
O Facade Pattern é utilizado neste projeto para **simplificar drasticamente** a interação com múltiplos serviços e factories. Ele:
- Reduz a complexidade do código cliente
- Centraliza operações complexas
- Desacopla controllers dos detalhes de implementação
- Facilita manutenção e evolução do sistema

O `CardFacade` é a **interface unificada** que permite que controllers e componentes trabalhem com cartas de forma simples, sem precisar conhecer os detalhes internos de APIs, caches, factories e distribuição de cartas.
