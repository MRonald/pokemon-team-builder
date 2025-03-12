import React, { useEffect, useState } from "react";
import * as S from "./styles";
import { Pokeball } from "../Pokeball";
import { Pokemon } from "../Pokemon";
import { pokeapi } from "../../services/pokeapi";
import { PokemonSummary } from "../../types/pokeapi-types";

import pencil from "../../assets/imgs/pencil.svg";
import check from "../../assets/imgs/check.svg";
import checkOpacity from "../../assets/imgs/check-opacity.svg";
import trash from "../../assets/imgs/trash.svg";
import trashOpacity from "../../assets/imgs/trash-opacity.svg";

export const CreateTeam: React.FC = () => {
  const [canCheck, setCanCheck] = useState<boolean>(false);
  const [canTrash, setCanTrash] = useState<boolean>(false);
  const [pokemons, setPokemons] = useState<PokemonSummary[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await pokeapi.getPokemonList();
        setPokemons(response.data.results);
      } catch (error) {
        console.error("Erro ao buscar pokémons:", error);
      }
    })();
  }, []);

  return (
    <S.Container>
      <S.TextLabel>
        <p>My Team</p>
        <img src={pencil} alt="pencil" />
      </S.TextLabel>

      <S.PokeballsLeft>
        <Pokeball />
        <Pokeball />
        <Pokeball />
      </S.PokeballsLeft>
      <S.PokeballsRight>
        <Pokeball />
        <Pokeball />
        <Pokeball />
      </S.PokeballsRight>

      <S.ActionButtons>
        {canCheck ? (
          <img src={trash} alt="trash" />
        ) : (
          <img src={trashOpacity} alt="trashOpacity" />
        )}
        {canTrash ? (
          <img src={check} alt="check" />
        ) : (
          <img src={checkOpacity} alt="checkOpacity" />
        )}
      </S.ActionButtons>

      <S.TextLabel>
        <p>Choose 6 Pokémons:</p>
      </S.TextLabel>

      <S.PokemonsContainer>
        {pokemons.map((pokemon) => (
          <Pokemon name={pokemon.name} url={pokemon.url} key={pokemon.name} />
        ))}
      </S.PokemonsContainer>
    </S.Container>
  );
};
