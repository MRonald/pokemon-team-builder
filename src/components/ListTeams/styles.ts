import styled from "styled-components";

export const Container = styled.div`
  padding: 1.5rem;

  & hr {
    margin: 1.5rem 0;
  }
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
