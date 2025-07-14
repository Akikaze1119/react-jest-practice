import { render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { TodoList } from '../TodoList';
import { GET_TODOS } from '../../graphql/queries';

const mocks = [
  {
    request: {
      query: GET_TODOS,
      variables: {},
    },
    result: {
      data: {
        todos: [
          { id: '1', title: 'Test Todo', completed: false },
          { id: '2', title: 'Sample Task', completed: true },
        ],
      },
    },
  },
];

const renderTodoList = () => {
  return render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <TodoList />
    </MockedProvider>
  );
};

describe('TodoList', () => {
  it('renders todos', async () => {
    renderTodoList();

    expect(await screen.findByText('Sample Task')).toBeInTheDocument();
  });

  it('renders loading state', () => {
    renderTodoList();
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders error state', async () => {
    const errorMock = {
      request: { query: GET_TODOS },
      error: new Error('Something went wrong'),
    };

    render(
      <MockedProvider mocks={[errorMock]} addTypename={false}>
        <TodoList />
      </MockedProvider>
    );

    await waitFor(() => expect(screen.getByText(/error/i)).toBeInTheDocument());
  });
});
