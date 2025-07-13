import styled from 'styled-components';
import { TTodo } from '../types/Todo';

const Item = styled.li<{ $completed: boolean }>`
  text-decoration: ${({ $completed }) => ($completed ? 'line-through' : 'none')};
  padding: 4px;
`;

type TProps = {
  todo: TTodo;
};

export const TodoItem = ({ todo }: TProps) => {
  return <Item $completed={todo.completed}>{todo.title}</Item>;
};
