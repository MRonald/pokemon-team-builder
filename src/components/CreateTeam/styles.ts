import styled from "styled-components";

export const Container = styled.div`
  padding: 1.5rem;
`;

export const TextLabel = styled.div`
  display: flex;
  justify-content: start;

  & > * {
    font-weight: bold;
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
  }
`;

export const ActionButtons = styled.div`
  margin: 1.5rem 1.3rem 1rem 1.3rem;

  display: flex;
  justify-content: end;

  & > img {
    width: 3rem;
    margin-left: 1rem;
    cursor: pointer;
  }
`;

export const PokemonsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  padding: 1rem;
  overflow-y: auto;
  overflow-x: hidden;
  height: 40vh;
`;
