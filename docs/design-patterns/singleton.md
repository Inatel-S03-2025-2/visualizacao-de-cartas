# Singleton Pattern

## Descrição

O **Singleton** é um padrão de projeto criacional que garante que uma classe tenha apenas uma única instância e fornece um ponto de acesso global a essa instância.

## Problema que Resolve

Em muitas situações, é necessário garantir que apenas uma instância de uma classe exista durante toda a execução do programa. Criar múltiplas instâncias pode:

- Desperdiçar recursos (memória, conexões)
- Causar inconsistências de estado
- Dificultar o controle centralizado

## Implementação no Projeto

### Classes que Utilizam Singleton

#### 1. **ApiCache** (`src/services/ApiCache.ts`)

```typescript
export class ApiCache {
  private static instance: ApiCache;
  private cache: Map<string, unknown>;

  private constructor() {
    this.cache = new Map();
  }

  static getInstance(): ApiCache {
    if (!ApiCache.instance) {
      ApiCache.instance = new ApiCache();
    }
    return ApiCache.instance;
  }
  // ... métodos
}
```

**Por que Singleton aqui?**

- Garante que existe apenas **um cache** compartilhado em toda a aplicação
- Evita duplicação de dados em memória
- Centraliza o gerenciamento de cache de requisições à API

#### 2. **PokeApiService** (`src/services/PokeApiService.ts`)

```typescript
export class PokeApiService {
  private static instance: PokeApiService;
  private cache: ApiCache;

  private constructor() {
    this.cache = ApiCache.getInstance();
  }

  static getInstance(): PokeApiService {
    if (!PokeApiService.instance) {
      PokeApiService.instance = new PokeApiService();
    }
    return PokeApiService.instance;
  }
  // ... métodos de requisição à API
}
```

**Por que Singleton aqui?**

- Centraliza todas as requisições à PokeAPI em um único ponto
- Reutiliza a mesma instância de cache
- Evita criar múltiplos clientes HTTP

#### 3. **AuthService** (`src/services/AuthService.ts`)

```typescript
export class AuthService {
  private static instance: AuthService;
  private readonly BASE_URL = "http://localhost:3000/api";

  private constructor() {}

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }
  // ... métodos de autenticação
}
```

**Por que Singleton aqui?**

- Mantém o estado de autenticação centralizado
- Garante uma única fonte de verdade para tokens e sessão
- Facilita o gerenciamento de login/logout

#### 4. **CardDistributionService** (`src/services/CardDistributionService.ts`)

```typescript
export class CardDistributionService {
  private static instance: CardDistributionService;
  private readonly BASE_URL = "http://localhost:4000/api";

  private constructor() {}

  static getInstance(): CardDistributionService {
    if (!CardDistributionService.instance) {
      CardDistributionService.instance = new CardDistributionService();
    }
    return CardDistributionService.instance;
  }
  // ... métodos de distribuição de cartas
}
```

**Por que Singleton aqui?**

- Centraliza a lógica de distribuição de cartas
- Evita inconsistências no gerenciamento de cartas dos usuários
- Garante que todos acessem a mesma instância do serviço

#### 5. **CardFacade** (`src/facades/CardFacade.ts`)

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
  // ... métodos da fachada
}
```

**Por que Singleton aqui?**

- Garante um único ponto de acesso à fachada
- Reutiliza as instâncias dos serviços internos
- Evita criação desnecessária de múltiplas fachadas

## Características do Padrão

### Elementos Principais

1. **Construtor Privado**: Impede a criação direta de instâncias (`private constructor()`)
2. **Instância Estática**: Armazena a única instância da classe (`private static instance`)
3. **Método de Acesso**: Fornece acesso global à instância (`static getInstance()`)

### Vantagens

- ✅ Controla o acesso à única instância
- ✅ Reduz o uso de memória
- ✅ Permite inicialização tardia (lazy initialization)
- ✅ Facilita o compartilhamento de recursos

### Desvantagens

- ⚠️ Pode dificultar testes unitários (acoplamento global)
- ⚠️ Viola o Princípio da Responsabilidade Única (controla instância + lógica de negócio)
- ⚠️ Requer cuidado em ambientes multi-thread (não aplicável em JavaScript single-threaded)

## Casos de Uso no Projeto

| Classe                    | Uso                           | Benefício                              |
| ------------------------- | ----------------------------- | -------------------------------------- |
| `ApiCache`                | Cache de requisições HTTP     | Evita requisições duplicadas           |
| `PokeApiService`          | Cliente da PokeAPI            | Centraliza comunicação com API externa |
| `AuthService`             | Gerenciamento de autenticação | Mantém estado de sessão único          |
| `CardDistributionService` | Distribuição de cartas        | Evita inconsistências no inventário    |
| `CardFacade`              | Interface simplificada        | Ponto único de acesso às operações     |

## Exemplo de Uso

```typescript
// Sempre retorna a mesma instância
const cache1 = ApiCache.getInstance();
const cache2 = ApiCache.getInstance();

console.log(cache1 === cache2); // true

// Uso no código
const pokeApi = PokeApiService.getInstance();
const pokemon = await pokeApi.getCard("25"); // Pikachu
```

## Conclusão

O Singleton é utilizado extensivamente neste projeto para gerenciar **serviços compartilhados** e **recursos centralizados**. Ele garante consistência, economiza recursos e simplifica o acesso a funcionalidades essenciais da aplicação.
