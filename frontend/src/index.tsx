import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';

import { ApolloProvider } from '@apollo/client';
import { client } from './apolloClient'; // Assuming you have an Apollo Client setup

import './index.css';
import { App } from './App';

let container = document.getElementById('app')!;
let root = createRoot(container);
root.render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>
);
