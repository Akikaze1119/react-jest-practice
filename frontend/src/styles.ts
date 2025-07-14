import { createGlobalStyle } from 'styled-components';

export const colors = {
  primary: '#0ae47b',
};

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    background: #000;
    color: #fff;
    font-family: Poppins, sans-serif;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    cursor: pointer;
    font-family: inherit;
    font-size: 1rem;
    border: none;
  }

  input {
    font-family: inherit;
    font-size: 1rem;
  }

  input:focus {
    outline: none;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    display: flex;
    align-items: center;
    padding: 0.5rem 0;
  }

  h1 {
    font-size: 2rem;
    font-weight: 400;
    margin: 0;
    padding: 1rem;
    text-align: center;
  }
`;
