export interface PokemonSummary {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next?: string;
  previous?: string;
  results: PokemonSummary[];
}

interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonDetailed {
  id: number;
  name: string;
  types: PokemonType[];
  sprites: {
    back_default: string;
    back_female: string;
    back_shiny_female: string;
    front_default: string;
    front_female: string;
    front_shiny: string;
    front_shiny_female: string;
  };
}
