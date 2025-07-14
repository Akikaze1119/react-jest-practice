import { styled } from 'styled-components';

import { TodoList } from './components/TodoList';
import { TodoAdd } from './components/TodoAdd';
import { FilterButtons } from './components/FilterButtons';

import { GlobalStyle } from './styles';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

export function App() {
  return (
    <Layout>
      <GlobalStyle />
      <h1>Todo List</h1>
      <FilterButtons />
      <TodoList />
      <TodoAdd />
    </Layout>
  );
}
