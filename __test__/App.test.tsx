import { render, screen } from '@testing-library/react';
import { App } from '../src/App';

test('renders greeting message', () => {
  render(<App />);
  expect(screen.getByText('Hello from App component!')).toBeInTheDocument();
});
