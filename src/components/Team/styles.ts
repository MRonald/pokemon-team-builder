import styled from "styled-components";

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
