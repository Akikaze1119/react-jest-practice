import { ComponentProps } from 'react';
import styled from 'styled-components';
import { colors } from '../styles';
import { FiCheck } from 'react-icons/fi';

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;
  position: relative;
`;

const HiddenCheckbox = styled.input`
  border: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const StyledCheckbox = styled.div<{ $completed: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  background: ${(props) => (props.$completed ? colors.primary : 'none')};
  border: 3px solid ${colors.primary};
  border-radius: 0.3rem;
  transition: all 100ms;
  color: #fff;
  font-size: 16px;
`;

type Props = ComponentProps<'input'> & {
  completed: boolean;
  onToggle?: () => void;
};

export const Checkbox = ({ completed, onToggle, ...props }: Props) => (
  <CheckboxContainer onClick={onToggle}>
    <HiddenCheckbox {...props} type='checkbox' checked={completed} readOnly />
    <StyledCheckbox $completed={completed}>
      {completed && <FiCheck color='#131313' />}
    </StyledCheckbox>
  </CheckboxContainer>
);
