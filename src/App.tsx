import './App.css';
import { Counter } from './components/Counter';
import { StyledButton } from './components/StyledButton';
import { Greeting } from './components/Greeting';

const testButton = () => {
  console.log('Button clicked!');
};

export function App() {
  return (
    <>
      <h1>Hello from App component!</h1>
      <h2>Greeting Component</h2>
      <Greeting name='John Doe' />

      <h2>Styled-components</h2>
      <StyledButton handleClick={testButton} label='button' />

      <h2>Test Zustand</h2>
      <Counter />
    </>
  );
}
