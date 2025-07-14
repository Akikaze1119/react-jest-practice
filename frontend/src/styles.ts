import { createGlobalStyle } from 'styled-components';
import { redux } from 'zustand/middleware';

export const colors = {
  primary: '#0ae47b',
  red: '#c32c3e',
  black: '#131313',
  gray: '#cecece',
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
