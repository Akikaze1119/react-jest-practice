import styled from 'styled-components';

type Props = {
  label: string;
  handleClick?: () => void;
};

const Button = styled.button`
  background-color: #0070f3;
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 4px;
`;

export const StyledButton = ({ label, handleClick }: Props) => {
  return <Button onClick={handleClick}>{label}</Button>;
};
