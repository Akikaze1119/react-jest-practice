import { render, screen, fireEvent } from '@testing-library/react';
import { TodoItem } from '../TodoItem';

const todo = { id: '1', title: 'Test Todo', completed: false };

describe('TodoItem', () => {
  it('renders todo title and calls handlers', () => {
    const onToggle = jest.fn();
    const onRemove = jest.fn();

    render(<TodoItem todo={todo} onToggle={onToggle} onRemove={onRemove} />);

    expect(screen.getByText('Test Todo')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('checkbox'));
    expect(onToggle).toHaveBeenCalled();

    fireEvent.click(screen.getByLabelText(/delete/i));
    expect(onRemove).toHaveBeenCalled();
  });
});
