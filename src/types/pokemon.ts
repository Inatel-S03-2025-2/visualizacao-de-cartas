export interface Pokemon {
	id: number;
	name: string;
	types: string[];
	typeColor: string;
	image: string;
	hp: number;
	attack: number;
	defense: number;
	specialAttack?: number;
	specialDefense?: number;
	speed?: number;
	generation: number;
	isShiny: boolean;
	moves?: string[];
	rarity?: string;
	damage?: number;
}

export interface GetSpecificPokemonResponse {
	moves: {
		move: {
			url: string;
			name: string;
		};
	}[];
	types: {
		type: {
			name: string;
		};
	}[];
	name: string;
	stats: {
		base_stat: number;
		stat: {
			name: string;
		};
	}[];
	sprites: {
		other: {
			"official-artwork": {
				front_default: string;
			};
		};
	};
}

export interface MoveDetails {
	name: string;
	accuracy: number | null;
	power: number | null;
	pp: number | null;
	type: { name: string };
	effect_entries: {
		effect: string;
		short_effect: string;
		language: { name: string };
	}[];
}
