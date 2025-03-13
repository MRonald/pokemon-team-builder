import React from "react";
import * as S from "./styles";
import { useDrop } from "react-dnd";
import { Pokeball } from "../Pokeball";
import { Team as TeamInterface } from "../../types/app-types";
import { PokemonSummary } from "../../types/pokeapi-types";

interface TeamProps {
  team: TeamInterface;
  selectedPokemon?: number;
  selectPokemon?: (index: number) => void;
  addPokemonToTeam?: (pokemon: PokemonSummary) => void;
}

export const Team: React.FC<TeamProps> = React.forwardRef<
  HTMLDivElement,
  TeamProps
>(({ team, selectedPokemon, selectPokemon, addPokemonToTeam }, ref) => {
  const [, drop] = useDrop(() => ({
    accept: "POKEMON",
    drop: (item: PokemonSummary) => {
      if (addPokemonToTeam) addPokemonToTeam(item);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  function renderPokeballs(pokemons: any[], startIndex: number) {
    return [...Array(3)].map((_, index) => {
      const pokemon = pokemons[index];
      return (
        <Pokeball
          key={`${pokemon?.name}-pokeball-${startIndex + index}`}
          pokemon={pokemon}
          onClick={() => selectPokemon && selectPokemon(startIndex + index)}
          isSelected={selectedPokemon === startIndex + index}
        />
      );
    });
  }

  function combinedRef(node: HTMLDivElement | null) {
    drop(node);
    if (typeof ref === "function") {
      ref(node);
    } else if (ref && "current" in ref) {
      ref.current = node;
    }
  }

  return (
    <div ref={combinedRef}>
      <S.PokeballsLeft>
        {renderPokeballs(team.pokemons.slice(0, 3), 0)}
      </S.PokeballsLeft>
      <S.PokeballsRight>
        {renderPokeballs(team.pokemons.slice(3, 6), 3)}
      </S.PokeballsRight>
    </div>
  );
});
