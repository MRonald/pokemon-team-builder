import { IDBPDatabase, openDB } from "idb";
import { Team } from "../types/app-types";

let db: IDBPDatabase;

export async function setupDB() {
  db = await openDB("pokemonDB", 1, {
    upgrade(db) {
      db.createObjectStore("teams", { keyPath: "id", autoIncrement: true });
    },
  });

  return db;
}

export async function saveTeam(team: Team) {
  await db.put("teams", team);
}

export async function getTeams() {
  return await db.getAll("teams");
}
