import styled from 'styled-components';
import { TTodo } from '../types/Todo';

const Item = styled.li<{ $completed: boolean }>`
  text-decoration: ${({ $completed }) => ($completed ? 'line-through' : 'none')};
  padding: 4px;
`;

type TProps = {
  todo: TTodo;
  onToggle: () => void;
  onRemove: () => void;
};

export const TodoItem = ({ todo, onToggle, onRemove }: TProps) => {
  return (
    <Item $completed={todo.completed} onClick={onToggle}>
      {todo.title}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
      >
        Delete
      </button>
    </Item>
  );
};
