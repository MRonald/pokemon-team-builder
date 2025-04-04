import React, { useEffect, useState } from "react";
import * as S from "./styles";
import { typeColors } from "../Pokemon/styles";
import { PokemonDetailed, PokemonSummary } from "../../types/pokeapi-types";
import { pokeapi } from "../../services/pokeapi";
import { toast } from "react-toastify";

interface PokeballProps {
  pokemon?: PokemonSummary;
  onClick?: () => void;
  tabIndex?: number;
  isSelected?: boolean;
}

export const Pokeball: React.FC<PokeballProps> = ({
  pokemon,
  onClick,
  tabIndex,
  isSelected,
}) => {
  const [pokemonDetailed, setPokemonDetailed] = useState<PokemonDetailed>();

  useEffect(() => {
    if (!pokemon?.name) return;

    (async () => {
      try {
        const response = await pokeapi.getPokemonDetails(pokemon?.name);
        setPokemonDetailed(response.data);
      } catch (error) {
        toast.error("Error while fetching");
        console.error("Error while fetching:", error);
      }
    })();
  }, [pokemon]);

  return (
    <S.Container
      onClick={onClick}
      tabIndex={tabIndex}
      isSelected={isSelected ?? false}
    >
      <svg
        width="69"
        height="70"
        viewBox="0 0 69 70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.2293 37.988C14.3348 37.988 17.4402 38.0507 20.5412 37.9566C21.754 37.9208 22.3182 38.2792 22.7625 39.4621C24.8328 44.9599 29.4221 48.177 34.9266 48.1546C40.4133 48.1322 45.1314 44.8299 47.095 39.4263C47.5082 38.2882 47.988 37.9566 49.1165 37.9656C55.0297 38.0149 60.9428 38.0283 66.8516 37.9566C68.2599 37.9387 68.5931 38.2837 68.3754 39.7265C65.7898 57.0397 51.8043 69.5362 34.58 69.8543C17.9511 70.159 3.4813 58.012 0.313677 41.0841C-0.263871 37.988 -0.26387 37.988 2.80602 37.988C5.60934 37.9835 8.42156 37.988 11.2293 37.988Z"
          fill="white"
        />
        <path
          d="M11.2959 32.2619C8.41262 32.2619 5.52933 32.2619 2.64603 32.2619C-0.206167 32.2619 -0.286135 32.2439 0.273641 29.448C3.09918 15.3609 11.2515 5.83501 24.9083 1.73969C44.9358 -4.26885 65.7498 9.78246 68.3976 30.6981C68.5398 31.8228 68.4109 32.3022 67.1226 32.2887C61.0628 32.2305 54.9985 32.2395 48.9343 32.2843C47.8414 32.2932 47.4771 31.8631 47.0994 30.8684C45.0025 25.3303 40.4532 22.0908 34.9754 22.0818C29.3732 22.0729 24.9527 25.2541 22.7536 31.0073C22.3626 32.0289 21.8562 32.3111 20.8299 32.2887C17.6534 32.2215 14.4724 32.2619 11.2959 32.2619Z"
          fill={
            pokemonDetailed?.types[0].type.name
              ? typeColors[pokemonDetailed?.types[0].type.name]
              : "white"
          }
        />
      </svg>

      <img
        src={pokemonDetailed?.sprites.front_default}
        alt={pokemonDetailed?.name}
      />
    </S.Container>
  );
};
