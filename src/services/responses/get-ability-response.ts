interface Language {
  name: string; // 'en', 'es', 'fr', 'it', 'de', 'ja', 'zh-Hans', 'zh-Hant'
}

export interface GetAbillityResponse {
  id: number;
  name: string;
  names: {
    language: Language,
    name: string;
  }[];

  effect_entries: {
    effect: string;
    language: Language;
  }[];
}