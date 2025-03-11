import React, { useState } from "react";
import * as S from "./styles";
import { Pokeball } from "../Pokeball";
import { Pokemon } from "../Pokemon";

import pencil from "../../assets/imgs/pencil.svg";
import check from "../../assets/imgs/check.svg";
import checkOpacity from "../../assets/imgs/check-opacity.svg";
import trash from "../../assets/imgs/trash.svg";
import trashOpacity from "../../assets/imgs/trash-opacity.svg";

export const CreateTeam: React.FC = () => {
  const [canCheck, setCanCheck] = useState<boolean>(false);
  const [canTrash, setCanTrash] = useState<boolean>(false);

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

      <div>
        <Pokemon />
      </div>
    </S.Container>
  );
};
