import { PokemonSummary } from "./pokeapi-types";

export interface Team {
  name: string;
  pokemons: PokemonSummary[];
}
