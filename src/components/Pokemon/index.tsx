import React, { useEffect, useState } from "react";
import * as S from "./styles";
import { PokemonDetailed, PokemonSummary } from "../../types/pokeapi-types";
import { pokeapi } from "../../services/pokeapi";
import { capitalize } from "../../utils/text";

import loader from "../../assets/imgs/loader.svg";
import check from "../../assets/imgs/check.svg";
import { toast } from "react-toastify";

interface PokemonProps extends PokemonSummary {
  onClick?: () => void;
  isSelected?: boolean;
}

export const Pokemon: React.FC<PokemonProps> = ({
  name,
  url,
  onClick,
  isSelected,
}) => {
  const [pokemon, setPokemon] = useState<PokemonDetailed>();

  useEffect(() => {
    (async () => {
      try {
        const response = await pokeapi.getPokemonDetails(name);
        setPokemon(response.data);
      } catch (error) {
        toast.error("Error while fetching");
        console.error("Error while fetching:", error);
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

          {isSelected && <img src={check} className="check-icon" alt="check" />}
        </>
      ) : (
        <img src={loader} alt="loader" />
      )}
    </S.Container>
  );
};
