import { render, screen } from '@testing-library/react';
import Greeting from '../src/components/Greeting';

test('renders greeting with name', () => {
  render(<Greeting name='Satomi' />);
  expect(screen.getByText('Hello, Satomi!')).toBeInTheDocument();
});
