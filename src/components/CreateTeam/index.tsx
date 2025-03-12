import React, { useEffect, useState } from "react";
import * as S from "./styles";
import { Pokeball } from "../Pokeball";
import { Pokemon } from "../Pokemon";
import { pokeapi } from "../../services/pokeapi";
import { PokemonSummary } from "../../types/pokeapi-types";
import InfiniteScroll from "react-infinite-scroll-component";

import pencil from "../../assets/imgs/pencil.svg";
import check from "../../assets/imgs/check.svg";
import checkOpacity from "../../assets/imgs/check-opacity.svg";
import trash from "../../assets/imgs/trash.svg";
import trashOpacity from "../../assets/imgs/trash-opacity.svg";

export const CreateTeam: React.FC = () => {
  const [canCheck, setCanCheck] = useState<boolean>(false);
  const [canTrash, setCanTrash] = useState<boolean>(false);
  const [pokemons, setPokemons] = useState<PokemonSummary[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchPokemons();
  }, []);

  async function fetchPokemons() {
    try {
      const response = await pokeapi.getPokemonList(20, page * 20);
      const newPokemons = response.data.results;

      if (page === 0) {
        setPokemons(newPokemons);
        setPage(1);
      } else {
        setPokemons((prev) => [...prev, ...newPokemons]);
        setPage((prev) => prev + 1);
      }

      if (!response.data.next) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Erro ao buscar pokémons:", error);
      setHasMore(false);
    }
  }

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

      <InfiniteScroll
        dataLength={pokemons.length}
        next={fetchPokemons}
        hasMore={hasMore}
        loader={null}
        scrollableTarget="pokemons-container"
      >
        <S.PokemonsContainer id="pokemons-container">
          {pokemons.map((pokemon) => (
            <Pokemon name={pokemon.name} url={pokemon.url} key={pokemon.name} />
          ))}
        </S.PokemonsContainer>
      </InfiniteScroll>
    </S.Container>
  );
};
