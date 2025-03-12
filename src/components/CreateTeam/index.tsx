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
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const [pokemons, setPokemons] = useState<PokemonSummary[]>([]);
  const [team, setTeam] = useState<PokemonSummary[]>([]);

  useEffect(() => {
    fetchPokemons();
  }, []);

  useEffect(() => {
    setCanCheck(team.length === 6);
  }, [team]);

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

  function addOnTeam(name: string) {
    if (team.length === 6) return;

    const selectedPokemon = pokemons.find((pokemon) => pokemon.name === name);

    if (!selectedPokemon) return;

    setTeam((prev) => [...prev, selectedPokemon]);
  }

  return (
    <S.Container>
      <S.TextLabel>
        <p>My Team</p>
        <img src={pencil} alt="pencil" />
      </S.TextLabel>

      <S.PokeballsLeft>
        <Pokeball pokemon={team[0]} />
        <Pokeball pokemon={team[1]} />
        <Pokeball pokemon={team[2]} />
      </S.PokeballsLeft>
      <S.PokeballsRight>
        <Pokeball pokemon={team[3]} />
        <Pokeball pokemon={team[4]} />
        <Pokeball pokemon={team[5]} />
      </S.PokeballsRight>

      <S.ActionButtons>
        {canTrash ? (
          <img src={trash} alt="trash" />
        ) : (
          <img src={trashOpacity} alt="trashOpacity" />
        )}
        {canCheck ? (
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
            <Pokemon
              name={pokemon.name}
              url={pokemon.url}
              key={pokemon.name}
              onClick={() => addOnTeam(pokemon.name)}
            />
          ))}
        </S.PokemonsContainer>
      </InfiniteScroll>
    </S.Container>
  );
};
