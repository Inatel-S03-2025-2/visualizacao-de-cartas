import type { GetAbillityResponse } from "@/services/responses/get-ability-response";
import type { Ability } from "@/types/ability";

export class AbillityMapper {
  static fromApiResponse(res: GetAbillityResponse): Ability {

    const name = res.names.find((name) => name.language.name === 'en')?.name || 'Habilidade sem nome';
    const description = res.effect_entries.find((effect) => effect.language.name === 'en')?.effect || 'Habilidade sem descrição';

    return {
      name,
      description
    }
  }
}