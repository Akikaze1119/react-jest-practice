import { useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';

import { TTodo } from '../types/Todo';
import { TodoItem } from './TodoItem';
import { useTodoStore } from '../store/useTodoStore';
import { GET_TODOS } from '../graphql/queries';
import { TOGGLE_TODO, REMOVE_TODO } from '../graphql/mutations';

export const TodoList = () => {
  const { loading, error, data } = useQuery(GET_TODOS);

  const setTodos = useTodoStore((state) => state.setTodos);
  const todos = useTodoStore((state) => state.todos);
  const toggleTodoState = useTodoStore((state) => state.toggleTodo);
  const removeTodoState = useTodoStore((state) => state.removeTodo);

  const [toggleTodoMutation] = useMutation(TOGGLE_TODO);
  const [removeTodoMutation] = useMutation(REMOVE_TODO);

  useEffect(() => {
    if (data && data.todos) {
      setTodos(data.todos);
    }
  }, [data, setTodos]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleToggle = async (id: string) => {
    try {
      await toggleTodoMutation({
        variables: { id },
      });
      toggleTodoState(id);
    } catch (error: any) {
      if (error.graphQLErrors?.length) {
        console.error(error.graphQLErrors[0].message);
      } else {
        console.error('Unexpected error:', error);
      }
      alert('Failed to toggle todo. It may not exist.');
    }
  };

  const handleRemove = async (id: string) => {
    try {
      await removeTodoMutation({ variables: { id } });
      removeTodoState(id);
    } catch (error: any) {
      if (error.graphQLErrors?.length) {
        console.error(error.graphQLErrors[0].message);
      } else {
        console.error('Unexpected error:', error);
      }
      alert('Failed to remove todo. Please try again.');
    }
  };

  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={() => handleToggle(todo.id)}
          onRemove={() => handleRemove(todo.id)}
        />
      ))}
    </ul>
  );
};
