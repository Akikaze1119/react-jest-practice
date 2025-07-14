import { useQuery, useMutation } from '@apollo/client';

import { TodoItem } from './TodoItem';
import { GET_TODOS } from '../graphql/queries';
import { TOGGLE_TODO, REMOVE_TODO } from '../graphql/mutations';
import { TTodo } from '../types/Todo';
import { useFilterStore } from '../store/useFilterStore';

export const TodoList = () => {
  const { loading, error, data, refetch } = useQuery(GET_TODOS);
  const filter = useFilterStore((state) => state.filter);

  const [toggleTodoMutation] = useMutation(TOGGLE_TODO);
  const [removeTodoMutation] = useMutation(REMOVE_TODO);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleToggle = async (id: string) => {
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
  };

  const handleRemove = async (id: string) => {
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
  };

  const filteredTodos = data.todos.filter((todo: TTodo) => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'incomplete') return !todo.completed;
    return true; // 'all' filter
  });

  return (
    <ul>
      {filteredTodos.map((todo: TTodo) => (
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
