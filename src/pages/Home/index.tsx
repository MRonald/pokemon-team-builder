import React, { useState } from "react";
import * as S from "./styles";
import { CreateTeam } from "../../components/CreateTeam";
import { ListTeams } from "../../components/ListTeams";

export const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"create" | "list">("create");

  return (
    <S.Home>
      <S.Header>
        <hr />
        <nav>
          {activeTab === "list" ? (
            <S.Label onClick={() => setActiveTab("create")}>
              Create New Team
            </S.Label>
          ) : (
            <S.Label onClick={() => setActiveTab("list")}>Teams</S.Label>
          )}
        </nav>
      </S.Header>

      <S.MainContainer>
        {activeTab === "list" ? <ListTeams /> : <CreateTeam />}
      </S.MainContainer>
    </S.Home>
  );
};
