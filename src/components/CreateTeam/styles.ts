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

const BasePokeballsContainer = styled.div`
  margin: 0 1.3rem 1rem 1.3rem;

  display: flex;
  justify-content: space-between;
`;

export const PokeballsLeft = styled(BasePokeballsContainer)`
  & > *:last-child {
    margin-right: 2rem;
  }
`;

export const PokeballsRight = styled(BasePokeballsContainer)`
  & > *:first-child {
    margin-left: 2rem;
  }
`;

export const ActionButtons = styled.div`
  margin: 1.5rem 1.3rem 1rem 1.3rem;

  display: flex;
  justify-content: end;

  & > img {
    width: 3rem;
    margin-left: 1rem;
  }
`;
