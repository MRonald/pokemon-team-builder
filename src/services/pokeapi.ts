import axios, { AxiosPromise } from "axios";
import { PokemonDetailed, PokemonListResponse } from "../types/pokeapi-types";

const axiosBase = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
});

export const pokeapi = {
  getPokemonList(limit = 20, offset = 0): AxiosPromise<PokemonListResponse> {
    return axiosBase.get(`pokemon?limit=${limit}&offset=${offset}`);
  },

  getPokemonDetails(name: string): AxiosPromise<PokemonDetailed> {
    return axiosBase.get(`pokemon/${name}`);
  },
};
