import { render, screen, fireEvent } from '@testing-library/react';
import { FilterButtons } from '../FilterButtons';
import { useFilterStore } from '../../store/useFilterStore';

describe('FilterButtons', () => {
  it('updates the filter correctly on click', () => {
    render(<FilterButtons />);
    fireEvent.click(screen.getByText(/completed/i));
    expect(useFilterStore.getState().filter).toBe('completed');
  });
});
