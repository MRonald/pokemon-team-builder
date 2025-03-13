import React from "react";
import * as S from "./styles";
import { Pokeball } from "../Pokeball";
import { Team as TeamInterface } from "../../types/app-types";

interface TeamProps {
  team: TeamInterface;
  selectedPokemon?: number;
  selectPokemon?: (index: number) => void;
}

export const Team: React.FC<TeamProps> = ({
  team,
  selectedPokemon,
  selectPokemon,
}) => {
  const renderPokeballs = (pokemons: any[], startIndex: number) => {
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
  };

  return (
    <>
      <S.PokeballsLeft>
        {renderPokeballs(team.pokemons.slice(0, 3), 0)}
      </S.PokeballsLeft>
      <S.PokeballsRight>
        {renderPokeballs(team.pokemons.slice(3, 6), 3)}
      </S.PokeballsRight>
    </>
  );
};
