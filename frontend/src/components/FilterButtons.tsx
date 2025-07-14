import { useFilterStore } from '../store/useFilterStore';
import styled from 'styled-components';

import { colors } from '../styles';

const FilterButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;

  width: 100%;
`;

const FilterButton = styled.button`
  align-items: center;
  background-color: #131313;
  color: #fff;
  border: #fff solid 0.5px;
  display: flex;
  height: 4rem;
  justify-content: center;
  text-decoration: none;
  max-width: 8rem;
  width: 100%;

  &:disabled {
    background-color: ${colors.primary};
    color: #131313;
    border-color: ${colors.primary};
  }

  &:first-child {
    border-top-left-radius: 0.3rem;
    border-bottom-left-radius: 0.3rem;
  }

  &:last-child {
    border-top-right-radius: 0.3rem;
    border-bottom-right-radius: 0.3rem;
  }
`;

export const FilterButtons = () => {
  const { filter, setFilter } = useFilterStore();

  return (
    <FilterButtonsWrapper>
      <FilterButton onClick={() => setFilter('all')} disabled={filter === 'all'}>
        All
      </FilterButton>
      <FilterButton onClick={() => setFilter('completed')} disabled={filter === 'completed'}>
        Completed
      </FilterButton>
      <FilterButton onClick={() => setFilter('incomplete')} disabled={filter === 'incomplete'}>
        Incomplete
      </FilterButton>
    </FilterButtonsWrapper>
  );
};
