import React, { useEffect, useState } from "react";
import * as S from "./styles";
import * as db from "../../services/database";
import { Team as TeamInterface } from "../../types/app-types";
import { Team } from "../Team";

export const ListTeams: React.FC = () => {
  const [teams, setTeams] = useState<TeamInterface[]>([]);

  useEffect(() => {
    (async () => {
      setTeams(await db.getTeams());
    })();
  }, []);

  return (
    <S.Container>
      {teams.map((team, index) => (
        <div key={team.name + index}>
          <S.TextLabel>
            <p>{team.name}</p>
          </S.TextLabel>

          <Team team={team} />

          {index < teams.length - 1 && <hr />}
        </div>
      ))}
    </S.Container>
  );
};
