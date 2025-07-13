import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useTodoStore } from '../store/useTodoStore';
import { ADD_TODO } from '../graphql/mutations';

export const TodoAdd = () => {
  const [title, setTitle] = useState('');
  const [addTodoMutation] = useMutation(ADD_TODO);
  const addTodoState = useTodoStore((state) => state.addTodo);

  const handleAdd = async () => {
    if (!title.trim()) return;

    const { data } = await addTodoMutation({
      variables: { title },
    });
    if (data && data.addTodo) {
      addTodoState(data.addTodo);
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
