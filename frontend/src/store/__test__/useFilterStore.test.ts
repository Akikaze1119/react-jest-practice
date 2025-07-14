import { useFilterStore } from '../useFilterStore';

describe('useFilterStore', () => {
  it('sets filter correctly', () => {
    // Set filter to 'completed' and verify the state update
    useFilterStore.getState().setFilter('completed');
    expect(useFilterStore.getState().filter).toBe('completed');

    // Set filter to 'incomplete' and verify the state update
    useFilterStore.getState().setFilter('incomplete');
    expect(useFilterStore.getState().filter).toBe('incomplete');
  });
});
