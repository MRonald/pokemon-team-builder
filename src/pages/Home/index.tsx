import React, { useState } from "react";
import * as S from "./styles";
import { CreateTeam } from "../../components/CreateTeam";
import { ListTeams } from "../../components/ListTeams";

export const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"create" | "list">("list");

  return (
    <S.Home>
      <S.Header>
        <hr />
        <nav>
          {activeTab === "list" ? (
            <S.Label onClick={() => setActiveTab("list")}>
              Create New Team
            </S.Label>
          ) : (
            <S.Label onClick={() => setActiveTab("create")}>Teams</S.Label>
          )}
        </nav>
      </S.Header>

      {activeTab === "list" ? <ListTeams /> : <CreateTeam />}
    </S.Home>
  );
};
