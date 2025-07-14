import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';

import { GET_TODOS } from '../graphql/queries';
import { ADD_TODO } from '../graphql/mutations';

export const TodoAdd = () => {
  const [title, setTitle] = useState('');
  const { refetch } = useQuery(GET_TODOS);
  const [addTodoMutation] = useMutation(ADD_TODO);

  const handleAdd = async () => {
    if (!title.trim()) return;

    const { data } = await addTodoMutation({
      variables: { title },
    });
    refetch();

    if (data && data.addTodo) {
      setTitle('');
    }
  };

  return (
    <div>
      <input
        type='text'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder='New todo'
      />
      <button onClick={handleAdd}>Add Todo</button>
    </div>
  );
};
