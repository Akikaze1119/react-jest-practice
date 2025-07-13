import { fireEvent, render, screen } from '@testing-library/react';
import { Counter } from '../src/components/Counter';

test('counter increment and reset works', () => {
  render(<Counter />);

  expect(screen.getByText(/Count: 0/)).toBeInTheDocument();

  fireEvent.click(screen.getByText('+1'));
  expect(screen.getByText(/Count: 1/)).toBeInTheDocument();

  fireEvent.click(screen.getByText('Reset'));
  expect(screen.getByText(/Count: 0/)).toBeInTheDocument();
});
