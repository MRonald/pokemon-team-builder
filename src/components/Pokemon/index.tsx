import React, { useEffect, useState } from "react";
import * as S from "./styles";
import { PokemonDetailed, PokemonSummary } from "../../types/pokeapi-types";
import { pokeapi } from "../../services/pokeapi";
import { capitalize } from "../../utils/text";

export const Pokemon: React.FC<PokemonSummary> = ({ name, url }) => {
  const [pokemon, setPokemon] = useState<PokemonDetailed>();

  useEffect(() => {
    (async () => {
      try {
        const response = await pokeapi.getPokemonDetails(name);
        setPokemon(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Erro ao buscar pokémon:", error);
      }
    })();
  }, [name]);

  return (
    <S.Container>
      <S.NumberContainer>
        <p>#{pokemon?.id}</p>
      </S.NumberContainer>
      <S.ImageContainer>
        <img src={pokemon?.sprites.front_default} alt={pokemon?.name} />
      </S.ImageContainer>
      <S.PokemonName>{capitalize(pokemon?.name)}</S.PokemonName>
      <S.TypesContainer>
        {pokemon?.types.map((type, index) => (
          <S.TypeBadge key={index} type={type.type.name}></S.TypeBadge>
        ))}
      </S.TypesContainer>
    </S.Container>
  );
};
