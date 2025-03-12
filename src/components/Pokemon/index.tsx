import React, { useEffect, useState } from "react";
import * as S from "./styles";
import { PokemonDetailed, PokemonSummary } from "../../types/pokeapi-types";
import { pokeapi } from "../../services/pokeapi";
import { capitalize } from "../../utils/text";

import loader from "../../assets/imgs/loader.svg";

interface PokemonProps extends PokemonSummary {
  onClick?: () => void;
}

export const Pokemon: React.FC<PokemonProps> = ({ name, url, onClick }) => {
  const [pokemon, setPokemon] = useState<PokemonDetailed>();

  useEffect(() => {
    (async () => {
      try {
        const response = await pokeapi.getPokemonDetails(name);
        setPokemon(response.data);
      } catch (error) {
        console.error("Erro ao buscar pokémon:", error);
      }
    })();
  }, [name]);

  return (
    <S.Container onClick={onClick}>
      {pokemon ? (
        <>
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
        </>
      ) : (
        <img src={loader} alt="loader" />
      )}
    </S.Container>
  );
};
