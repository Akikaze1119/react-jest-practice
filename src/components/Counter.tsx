import { useCounterStore } from '../store/counterStore';
import { StyledButton } from './StyledButton';

export const Counter = () => {
  const { count, increment, reset } = useCounterStore();

  return (
    <div>
      <p>Count: {count}</p>
      <StyledButton label='+1' handleClick={increment} />
      <StyledButton label='reset' handleClick={reset}></StyledButton>
    </div>
  );
};
