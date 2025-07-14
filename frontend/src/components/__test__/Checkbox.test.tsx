import { render, screen, fireEvent } from '@testing-library/react';
import { Checkbox } from '../Checkbox';

describe('Checkbox', () => {
  it('renders correctly and triggers onToggle', () => {
    const onToggle = jest.fn();
    render(<Checkbox completed={false} onToggle={onToggle} />);
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(onToggle).toHaveBeenCalled();
  });
});
