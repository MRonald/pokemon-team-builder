import styled from "styled-components";

export const typeColors: Record<string, string> = {
  bug: "#89960B",
  dark: "#322C26",
  dragon: "#6B57D2",
  fairy: "#DA93DD",
  fighting: "#80311D",
  fire: "#EC5D35",
  ghost: "#AD6EEC",
  grass: "#68BB2B",
  ground: "#D0B155",
  normal: "#C3C0B8",
  poison: "#924694",
  psychic: "#DA3063",
  steel: "#8F8E9E",
  water: "#5CC1ED",
  electric: "#F4CB38",
  ice: "#9BDEFB",
  flying: "#5D74D5",
  rock: "#9D853C",
};

export const Container = styled.div`
  display: inline-block;
  position: relative;
  min-width: 100%;
  cursor: pointer;

  & > .check-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: 60%;
    opacity: 0.85;
  }
`;

export const NumberContainer = styled.div`
  background-color: #90adc6;
  position: absolute;
  border-radius: 100%;
  height: 2rem;
  width: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;

  & > p {
    color: #fff;
    font-size: 12px;
    font-weight: bold;
  }
`;

export const ImageContainer = styled.div`
  margin-top: 1rem;
  max-height: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PokemonName = styled.p`
  font-size: clamp(0.7rem, 1rem, 1.3rem);
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

export const TypesContainer = styled.div`
  display: flex;
  height: 0.3rem;

  & > *:not(:last-child) {
    margin-right: 0.2rem;
  }
`;

export const TypeBadge = styled.div<{ type: string }>`
  color: white;
  font-weight: bold;
  background-color: ${({ type }) => typeColors[type] || "#ccc"};
  text-align: center;
  flex: 1;
`;
