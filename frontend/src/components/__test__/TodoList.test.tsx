import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { TodoList } from '../TodoList';
import { GET_TODOS } from '../../graphql/queries';

const mocks = [
  {
    request: {
      query: GET_TODOS,
    },
    result: {
      data: {
        todos: [{ id: '1', title: 'Sample Task', completed: false }],
      },
    },
  },
];

describe('TodoList', () => {
  it('renders todos', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <TodoList />
      </MockedProvider>
    );

    expect(await screen.findByText('Sample Task')).toBeInTheDocument();
  });
});
