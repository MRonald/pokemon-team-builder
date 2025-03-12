import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Arial', sans-serif;
    background-color: #E9EAEC;
    color: #333;
  }

  *:focus {
    outline: none;
  }

  a {
    text-decoration: none;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  button {
    cursor: pointer;
    background: none;
    border: none;
  }

  hr {
    border: 0;
    border-top: 1px solid #333652;
  }
`;

export default GlobalStyle;
