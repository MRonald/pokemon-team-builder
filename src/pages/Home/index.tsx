import React, { useState } from "react";
import * as S from "./styles";

export const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"create" | "list">("list");

  return (
    <S.Home>
      <S.Header>
        <hr />
        <nav>
          {activeTab === "list" ? (
            <S.Label onClick={() => setActiveTab("create")}>Teams</S.Label>
          ) : (
            <S.Label onClick={() => setActiveTab("list")}>
              Create New Team
            </S.Label>
          )}
        </nav>
      </S.Header>
    </S.Home>
  );
};
