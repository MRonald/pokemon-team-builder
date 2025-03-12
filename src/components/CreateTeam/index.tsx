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
  const [team, setTeam] = useState<(PokemonSummary | undefined)[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<number>();

  useEffect(() => {
    fetchPokemons();
  }, []);

  useEffect(() => {
    setCanCheck(team.length === 6);
  }, [team]);

  useEffect(() => {
    setCanTrash(selectedPokemon !== undefined);
  }, [selectedPokemon]);

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

  function addPokemon(name: string) {
    if (team.length === 6) return;

    const selectedPokemon = pokemons.find((pokemon) => pokemon.name === name);

    if (!selectedPokemon) return;

    setTeam((prev) => [...prev, selectedPokemon]);
  }

  function selectPokemon(index: number) {
    if (!team[index]) return;

    if (selectedPokemon === index) {
      setSelectedPokemon(undefined);
    } else {
      setSelectedPokemon(index);
    }
  }

  function removePokemon() {
    if (!canTrash || selectedPokemon === undefined) return;

    setTeam((prevTeam) =>
      prevTeam.filter((_, index) => index !== selectedPokemon)
    );

    setSelectedPokemon(undefined);
  }

  return (
    <S.Container>
      <S.TextLabel>
        <p>My Team</p>
        <img src={pencil} alt="pencil" />
      </S.TextLabel>

      <S.PokeballsLeft>
        <Pokeball
          key={`${team[0]?.name}-pokeball-0`}
          pokemon={team[0]}
          onClick={() => selectPokemon(0)}
          tabIndex={0}
          isSelected={selectedPokemon === 0}
        />
        <Pokeball
          key={`${team[1]?.name}-pokeball-1`}
          pokemon={team[1]}
          onClick={() => selectPokemon(1)}
          tabIndex={1}
          isSelected={selectedPokemon === 1}
        />
        <Pokeball
          key={`${team[2]?.name}-pokeball-2`}
          pokemon={team[2]}
          onClick={() => selectPokemon(2)}
          tabIndex={2}
          isSelected={selectedPokemon === 2}
        />
      </S.PokeballsLeft>
      <S.PokeballsRight>
        <Pokeball
          key={`${team[3]?.name}-pokeball-3`}
          pokemon={team[3]}
          onClick={() => selectPokemon(3)}
          tabIndex={3}
          isSelected={selectedPokemon === 3}
        />
        <Pokeball
          key={`${team[4]?.name}-pokeball-4`}
          pokemon={team[4]}
          onClick={() => selectPokemon(4)}
          tabIndex={4}
          isSelected={selectedPokemon === 4}
        />
        <Pokeball
          key={`${team[5]?.name}-pokeball-5`}
          pokemon={team[5]}
          onClick={() => selectPokemon(5)}
          tabIndex={5}
          isSelected={selectedPokemon === 5}
        />
      </S.PokeballsRight>

      <S.ActionButtons>
        <img
          src={canTrash ? trash : trashOpacity}
          alt="trash"
          tabIndex={6}
          onClick={removePokemon}
        />
        <img src={canCheck ? check : checkOpacity} alt="check" tabIndex={7} />
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
              onClick={() => addPokemon(pokemon.name)}
            />
          ))}
        </S.PokemonsContainer>
      </InfiniteScroll>
    </S.Container>
  );
};
