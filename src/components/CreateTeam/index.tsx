import React, { useEffect, useState } from "react";
import * as S from "./styles";
import { Pokemon } from "../Pokemon";
import { pokeapi } from "../../services/pokeapi";
import { PokemonSummary } from "../../types/pokeapi-types";
import InfiniteScroll from "react-infinite-scroll-component";
import * as db from "../../services/database";

import pencil from "../../assets/imgs/pencil.svg";
import check from "../../assets/imgs/check.svg";
import checkOpacity from "../../assets/imgs/check-opacity.svg";
import trash from "../../assets/imgs/trash.svg";
import trashOpacity from "../../assets/imgs/trash-opacity.svg";
import { toast } from "react-toastify";
import { Team } from "../Team";

export const CreateTeam: React.FC = () => {
  const [canCheck, setCanCheck] = useState<boolean>(false);
  const [canTrash, setCanTrash] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isEditing, setIsEditing] = useState(false);
  const [teamName, setTeamName] = useState("My Team");

  const [pokemons, setPokemons] = useState<PokemonSummary[]>([]);
  const [team, setTeam] = useState<PokemonSummary[]>([]);
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
      toast.error("Error while fetching");
      console.error("Error while fetching:", error);
      setHasMore(false);
    }
  }

  function addPokemon(pokemon: PokemonSummary) {
    if (team.length === 6) return;

    console.log("chamou o select pokemon", pokemon);

    setTeam((prev) => [...prev, pokemon]);
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

  async function saveTeam() {
    if (!canCheck || team.length < 6) return;

    try {
      await db.saveTeam({
        name: teamName,
        pokemons: team,
      });

      toast.success("Saved successfully!");

      resetFields();
    } catch (error) {
      toast.error("Error while saving");
      console.error("Error while saving:", error);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTeamName(e.target.value);
  }

  function handleBlurOrEnter(
    e:
      | React.FocusEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLInputElement>
  ) {
    if ("key" in e && e.key !== "Enter") return;
    setIsEditing(false);
  }

  function resetFields() {
    setTeam([]);
    setTeamName("My Team");
  }

  return (
    <S.Container>
      <S.TextLabel>
        {isEditing ? (
          <input
            type="text"
            value={teamName}
            onChange={handleChange}
            onBlur={handleBlurOrEnter}
            onKeyDown={handleBlurOrEnter}
            autoFocus
            maxLength={45}
          />
        ) : (
          <p onClick={() => setIsEditing(true)}>{teamName}</p>
        )}
        <img src={pencil} alt="Edit" onClick={() => setIsEditing(true)} />
      </S.TextLabel>

      <Team
        team={{ name: teamName, pokemons: team }}
        selectedPokemon={selectedPokemon}
        selectPokemon={(index: number) => selectPokemon(index)}
        addPokemonToTeam={addPokemon}
      />

      <S.ActionButtons>
        <img
          src={canTrash ? trash : trashOpacity}
          alt="trash"
          tabIndex={6}
          onClick={removePokemon}
        />
        <img
          src={canCheck ? check : checkOpacity}
          alt="check"
          tabIndex={7}
          onClick={saveTeam}
        />
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
              onClick={() => addPokemon(pokemon)}
              isSelected={team.some((item) => item.name === pokemon.name)}
            />
          ))}
        </S.PokemonsContainer>
      </InfiniteScroll>
    </S.Container>
  );
};
