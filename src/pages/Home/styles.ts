import styled from "styled-components";

export const Home = styled.div`
  text-align: center;
`;

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: end;

  background-color: #90adc6;
  height: 13vh;
  padding: 0 1rem;

  & > hr {
    border-top: 1px solid white;
  }
`;

export const Label = styled.p`
  text-transform: uppercase;
  color: #fff;
  font-weight: bold;
  font-size: 1.5rem;
  margin: 0.5rem 0;
`;

export const MainContainer = styled.div`
  margin: auto;

  @media (max-width: 1920px) {
    width: 25vw;
  }

  @media (max-width: 1600px) {
    width: 30vw;
  }

  @media (max-width: 1200px) {
    width: 50vw;
  }

  @media (max-width: 768px) {
    width: 75vw;
  }

  @media (max-width: 480px) {
    width: 100vw;
  }
`;
