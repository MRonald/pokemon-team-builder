import React from "react";
import * as S from "./styles";
import { Pokeball } from "../Pokeball";
import { Team as TeamInterface } from "../../types/app-types";

interface TeamProps {
  team: TeamInterface;
}

export const Team: React.FC<TeamProps> = ({ team }) => {
  return (
    <>
      <S.PokeballsLeft>
        <Pokeball
          key={`${team.pokemons[0]?.name}-pokeball-0`}
          pokemon={team.pokemons[0]}
        />
        <Pokeball
          key={`${team.pokemons[1]?.name}-pokeball-1`}
          pokemon={team.pokemons[1]}
        />
        <Pokeball
          key={`${team.pokemons[2]?.name}-pokeball-2`}
          pokemon={team.pokemons[2]}
        />
      </S.PokeballsLeft>
      <S.PokeballsRight>
        <Pokeball
          key={`${team.pokemons[3]?.name}-pokeball-3`}
          pokemon={team.pokemons[3]}
        />
        <Pokeball
          key={`${team.pokemons[4]?.name}-pokeball-4`}
          pokemon={team.pokemons[4]}
        />
        <Pokeball
          key={`${team.pokemons[5]?.name}-pokeball-5`}
          pokemon={team.pokemons[5]}
        />
      </S.PokeballsRight>
    </>
  );
};
