import styled from "styled-components";

export const Container = styled.div<{ isSelected: boolean }>`
  position: relative;
  width: 5rem;
  transition: transform 0.2s ease-out;

  ${({ isSelected }) =>
    isSelected &&
    `
      transform: scale(1.2);
      outline: none;
  `}

  & > img {
    position: absolute;
    top: 0;
    left: 0;
  }
`;
