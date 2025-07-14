import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import styled from 'styled-components';

import { GET_TODOS } from '../graphql/queries';
import { ADD_TODO } from '../graphql/mutations';

const Container = styled.div`
  display: flex;
  align-items: stretch;
  margin-top: 1rem;
  width: 100%;
  padding: 1rem;
`;

const Input = styled.input`
  background: #131313;
  border: none;
  border-radius: 0.3rem;
  color: #fff;
  padding: 20px 24px;
  width: 100%;

  border-top-left-radius: 0.3rem;
  border-bottom-left-radius: 0.3rem;
`;

const Button = styled.button`
  border-top-right-radius: 0.3rem;
  border-bottom-right-radius: 0.3rem;

  width: 8rem;

  &:hover {
    background: #cecece;
  }
`;

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
    <Container>
      <Input
        type='text'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder='New todo'
      />
      <Button onClick={handleAdd}>Add</Button>
    </Container>
  );
};
