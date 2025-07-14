import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import styled from 'styled-components';

import { GET_TODOS } from '../graphql/queries';
import { ADD_TODO } from '../graphql/mutations';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
  width: 100%;
  padding: 1rem;
`;

const InputWrapper = styled.div`
  display: flex;
  width: 100%;
`;

const Input = styled.input<{ $invalid?: boolean }>`
  background: #131313;
  border: 2px solid ${({ $invalid }) => ($invalid ? 'red' : '#333')};
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

const ErrorText = styled.p`
  color: red;
  font-size: 0.8rem;
  margin: 0;
`;

export const TodoAdd = () => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const { refetch } = useQuery(GET_TODOS);
  const [addTodoMutation] = useMutation(ADD_TODO);

  const validate = (value: string) => {
    if (!value.trim()) return 'Please enter a todo.';
    if (value.length > 50) return 'Todo must be 50 characters or less.';
    if (/[^a-zA-Z0-9\s]/.test(value)) return 'Only letters, numbers, and spaces allowed.';
    return '';
  };

  const handleAdd = async () => {
    const validationError = validate(title);
    setError(validationError);
    if (validationError) return;

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
      <InputWrapper>
        <Input
          type='text'
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setError('');
          }}
          placeholder='New todo'
          $invalid={!!error}
        />
        <Button onClick={handleAdd} disabled={!!error || !title.trim()}>
          Add
        </Button>
      </InputWrapper>
      {error && <ErrorText>{error}</ErrorText>}
    </Container>
  );
};
