import { styled } from 'styled-components';

import { TTodo } from '../types/Todo';
import { Checkbox } from './Checkbox';
import { Spacer } from './Spacer';
import { IconButton } from './IconButton';
import { FiTrash2 } from 'react-icons/fi';

type TProps = {
  todo: TTodo;
  onToggle: () => void;
  onRemove: () => void;
};

const ListItem = styled.li`
  align-items: center;
  display: flex;
  font-size: 18px;
  padding: 4px 0;
`;

const DeleteButton = styled(IconButton)`
  visibility: hidden;

  ${ListItem}:hover & {
    visibility: visible;
  }
`;

export const TodoItem = ({ todo, onToggle, onRemove }: TProps) => {
  return (
    <ListItem>
      <Checkbox completed={todo.completed} onToggle={onToggle} />
      <Spacer width={24} />
      <span>{todo.title}</span>
      <Spacer flex={1} />
      <DeleteButton
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
      >
        <FiTrash2 color={'#fff'} size={20} />
      </DeleteButton>
    </ListItem>
  );
};
