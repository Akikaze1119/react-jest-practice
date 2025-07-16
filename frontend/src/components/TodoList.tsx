import { useCallback, useMemo } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import styled from 'styled-components';

import { TodoItem } from './TodoItem';
import { GET_TODOS } from '../graphql/queries';
import { TOGGLE_TODO, REMOVE_TODO } from '../graphql/mutations';
import { TTodo } from '../types/Todo';
import { useFilterStore } from '../store/useFilterStore';
import { colors } from '../styles';

const Container = styled.ul`
  width: 100%;
  margin-top: 2rem;

  background: ${colors.black};
  padding: 2rem;
  border-radius: 1rem;

  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  min-height: 55vh;
`;

const Text = styled.p`
  text-align: center;
  font-size: 18px;
`;

export const TodoList = () => {
  const { loading, error, data, refetch } = useQuery(GET_TODOS);
  const filter = useFilterStore((state) => state.filter);

  const [toggleTodoMutation] = useMutation(TOGGLE_TODO);
  const [removeTodoMutation] = useMutation(REMOVE_TODO);

  const handleToggle = useCallback(
    async (id: string) => {
      try {
        await toggleTodoMutation({
          variables: { id },
        });
        refetch();
      } catch (error: any) {
        if (error.graphQLErrors?.length) {
          console.error(error.graphQLErrors[0].message);
        } else {
          console.error('Unexpected error:', error);
        }
        alert('Failed to toggle todo. It may not exist.');
      }
    },
    [toggleTodoMutation, refetch]
  );

  const handleRemove = useCallback(
    async (id: string) => {
      try {
        await removeTodoMutation({ variables: { id } });
        refetch();
      } catch (error: any) {
        if (error.graphQLErrors?.length) {
          console.error(error.graphQLErrors[0].message);
        } else {
          console.error('Unexpected error:', error);
        }
        alert('Failed to remove todo. Please try again.');
      }
    },
    [removeTodoMutation, refetch]
  );

  if (loading)
    return (
      <Container>
        <Text>Loading...</Text>
      </Container>
    );
  if (error)
    return (
      <Container>
        <Text>Error: {error.message}</Text>
      </Container>
    );

  const filteredTodos = useMemo(() => {
    if (!data) return [];
    return data.todos.filter((todo: TTodo) => {
      if (filter === 'completed') return todo.completed;
      if (filter === 'incomplete') return !todo.completed;
      return true; // 'all' filter
    });
  }, [data, filter]);

  return (
    <Container>
      {filteredTodos.length === 0 ? (
        <Text>No todos found. Please add one!</Text>
      ) : (
        filteredTodos.map((todo: TTodo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={() => handleToggle(todo.id)}
            onRemove={() => handleRemove(todo.id)}
          />
        ))
      )}
    </Container>
  );
};
