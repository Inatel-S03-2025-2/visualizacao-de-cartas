# Factory Pattern

## Descrição
O **Factory** (ou Factory Method) é um padrão de projeto criacional que fornece uma interface para criar objetos, permitindo que as subclasses ou métodos estáticos decidam qual classe instanciar. Ele encapsula a lógica de criação de objetos complexos.

## Problema que Resolve
Ao trabalhar com APIs externas ou dados brutos, frequentemente precisamos:
- Transformar dados da API em objetos do domínio da aplicação
- Aplicar lógica de mapeamento e transformação
- Lidar com dados opcionais ou malformados
- Manter o código de criação separado da lógica de negócio

## Implementação no Projeto

### Classes que Utilizam Factory

#### 1. **CardFactory** (`src/factories/CardFactory.ts`)
```typescript
export class CardFactory {
  static fromApiResponse(res: GetSpecificPokemonResponse, id: string): Card {
    const types = res.types.map((t) => t.type.name);
    const typeColors = types.map((type) => CardFactory.getTypeColor(type));

    const stats: Record<string, number> = {};
    for (const s of res.stats) {
      stats[s.stat.name] = s.base_stat;
    }

    return {
      id: Number(id),
      name: res.name,
      types,
      typeColors,
      image: res.sprites.other["official-artwork"].front_default,
      hp: stats["hp"],
      attack: stats["attack"],
      defense: stats["defense"],
      isShiny: false,
      specialAttack: stats["special-attack"],
      specialDefense: stats["special-defense"],
      speed: stats["speed"],
      moves: res.moves.slice(0, 4).map((m) => m.move.name),
      damage: stats["attack"],
      abilities: res.abilities.map((a) => a.ability.name),
    };
  }

  private static getTypeColor(type: string): string {
    const typeColors: Record<string, string> = {
      normal: "#A8A77A",
      fire: "#EE8130",
      water: "#6390F0",
      // ... outros tipos
    };
    return typeColors[type] ?? "#777";
  }
}
```

**Responsabilidades:**
- Converte resposta da PokeAPI (`GetSpecificPokemonResponse`) em objeto `Card` do domínio
- Extrai e organiza estatísticas do Pokémon
- Mapeia tipos para cores correspondentes
- Define valores padrão (ex: `isShiny: false`)
- Limita movimentos aos 4 primeiros

**Por que Factory aqui?**
- A resposta da API é complexa e precisa ser transformada
- Encapsula a lógica de mapeamento de cores de tipos
- Centraliza a criação de cartas em um único lugar
- Facilita mudanças futuras no formato da API

#### 2. **MoveFactory** (`src/factories/MoveFactory.ts`)
```typescript
export class MoveFactory {
  static fromApiResponse(res: GetMoveResponse): Move {
    return res as Move;
  }
}
```

**Responsabilidades:**
- Converte resposta da API em objeto `Move`
- Atualmente simples, mas preparado para transformações futuras

**Por que Factory aqui?**
- Mantém consistência com outras factories
- Permite adicionar lógica de transformação no futuro (ex: tradução, filtros)
- Desacopla o formato da API do formato interno

#### 3. **AbilityFactory** (`src/factories/AbilityFactory.ts`)
```typescript
export class AbillityFactory {
  static fromApiResponse(res: GetAbillityResponse): Ability {
    const name =
      res.names.find((name) => name.language.name === "en")?.name ||
      "Habilidade sem nome";
    
    const description =
      res.effect_entries.find((effect) => effect.language.name === "en")
        ?.effect || "Habilidade sem descrição";

    return {
      name,
      description,
    };
  }
}
```

**Responsabilidades:**
- Extrai o nome da habilidade em inglês de um array de traduções
- Extrai a descrição em inglês dos efeitos
- Fornece valores padrão caso dados estejam ausentes

**Por que Factory aqui?**
- A API retorna múltiplos idiomas, precisamos filtrar
- Encapsula lógica de tratamento de dados ausentes
- Simplifica o objeto retornado para apenas name e description

## Características do Padrão

### Elementos Principais
1. **Método Estático de Criação**: `static fromApiResponse()`
2. **Encapsulamento da Lógica**: Transformações complexas ficam dentro da factory
3. **Tipo de Retorno Consistente**: Sempre retorna objetos do domínio (`Card`, `Move`, `Ability`)

### Vantagens
- ✅ Separa criação de objetos do código que os utiliza
- ✅ Centraliza lógica de transformação de dados
- ✅ Facilita testes (mock das factories)
- ✅ Permite adicionar validações na criação
- ✅ Simplifica mudanças no formato da API

### Desvantagens
- ⚠️ Adiciona classes extras ao projeto
- ⚠️ Pode ser over-engineering para objetos simples

## Fluxo de Dados

```
PokeAPI Response (JSON)
        ↓
   Factory Pattern
        ↓
Domain Object (TypeScript Interface)
        ↓
Application Logic
```

### Exemplo de Fluxo Completo

```typescript
// 1. PokeApiService busca dados brutos
const rawData = await PokeApiService.getInstance().getCard("25");

// 2. CardFactory transforma em objeto do domínio
const card = CardFactory.fromApiResponse(rawData, "25");

// 3. Aplicação usa objeto limpo e tipado
console.log(card.name);        // "pikachu"
console.log(card.types);       // ["electric"]
console.log(card.typeColors);  // ["#F7D02C"]
```

## Diferença: Dados da API vs Domínio

### Resposta da API (complexa)
```json
{
  "id": 25,
  "name": "pikachu",
  "types": [
    {
      "slot": 1,
      "type": {
        "name": "electric",
        "url": "https://pokeapi.co/api/v2/type/13/"
      }
    }
  ],
  "stats": [
    {"base_stat": 35, "stat": {"name": "hp"}},
    {"base_stat": 55, "stat": {"name": "attack"}},
    // ...
  ],
  "sprites": {
    "other": {
      "official-artwork": {
        "front_default": "https://..."
      }
    }
  }
}
```

### Objeto do Domínio (simplificado)
```typescript
{
  id: 25,
  name: "pikachu",
  types: ["electric"],
  typeColors: ["#F7D02C"],
  hp: 35,
  attack: 55,
  defense: 40,
  image: "https://...",
  // ... campos relevantes
}
```

## Casos de Uso no Projeto

| Factory | Entrada | Saída | Transformação Principal |
|---------|---------|-------|-------------------------|
| `CardFactory` | `GetSpecificPokemonResponse` | `Card` | Extração de stats, mapeamento de cores |
| `MoveFactory` | `GetMoveResponse` | `Move` | Cast direto (preparado para expansão) |
| `AbilityFactory` | `GetAbillityResponse` | `Ability` | Filtro de idioma, valores padrão |

## Integração com Outros Padrões

O Factory é usado em conjunto com:

1. **Singleton (PokeApiService)**: Busca dados da API
2. **Factory**: Transforma dados brutos em objetos do domínio
3. **Facade (CardFacade)**: Coordena Singleton + Factory

```typescript
// Dentro do CardFacade
async getCardById(id: string): Promise<Card> {
  const response = await this.pokeApiService.getCard(id);  // Singleton
  return CardFactory.fromApiResponse(response, id);         // Factory
}
```

## Exemplo de Uso Completo

```typescript
// Buscar Pikachu
const cardResponse = await PokeApiService.getInstance().getCard("25");
const pikachu = CardFactory.fromApiResponse(cardResponse, "25");

console.log(pikachu);
// {
//   id: 25,
//   name: "pikachu",
//   types: ["electric"],
//   typeColors: ["#F7D02C"],
//   hp: 35,
//   attack: 55,
//   ...
// }

// Buscar habilidade
const abilityResponse = await PokeApiService.getInstance()
  .fetchAbility("static");
const staticAbility = AbilityFactory.fromApiResponse(abilityResponse);

console.log(staticAbility);
// {
//   name: "Static",
//   description: "Contact with the Pokémon may cause paralysis."
// }
```

## Conclusão
O Factory Pattern é utilizado neste projeto para **transformar dados externos** da PokeAPI em **objetos do domínio** bem definidos. Ele mantém o código limpo, facilita manutenção e permite que a aplicação trabalhe com objetos tipados e simplificados, independentemente das mudanças no formato da API externa.
