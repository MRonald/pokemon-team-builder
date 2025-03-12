import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  width: 5rem;

  & > img {
    position: absolute;
    top: 0;
    left: 0;
  }
`;
