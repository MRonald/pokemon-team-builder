import styled from "styled-components";

const typeColors: Record<string, string> = {
  Fire: "#F08030",
  Water: "#6890F0",
  Grass: "#78C850",
  Electric: "#F8D030",
  Psychic: "#F85888",
  Ice: "#98D8D8",
  Dragon: "#7038F8",
  Dark: "#705848",
  Fairy: "#EE99AC",
  Normal: "#A8A878",
};

export const Container = styled.div`
  display: inline-block;
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
    font-size: clamp(12px, 2vw, 18px);
  }
`;

export const ImageContainer = styled.div`
  margin-top: 1rem;
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
    margin-right: 1px;
  }
`;

export const TypeBadge = styled.div<{ type: string }>`
  border-radius: 12px;
  color: white;
  font-weight: bold;
  background-color: ${({ type }) => typeColors[type] || "#ccc"};
  text-align: center;
  flex: 1;
`;
