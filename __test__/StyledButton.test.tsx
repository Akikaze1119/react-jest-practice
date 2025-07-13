import { render, screen } from '@testing-library/react';
import { StyledButton } from '../src/components/StyledButton';

test('renders styled button with label', () => {
  render(<StyledButton label='Click me!' />);
  expect(screen.getByText('Click me!')).toBeInTheDocument();
});

test('button has correct styles', () => {
  const { container } = render(<StyledButton label='Click me!' />);
  const button = container.querySelector('button');
  expect(button).toHaveStyle({
    backgroundColor: '#0070f3',
    color: '#fff',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
  });
});
