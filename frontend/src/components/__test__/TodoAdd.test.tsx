import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { TodoAdd } from '../TodoAdd';
import { ADD_TODO } from '../../graphql/mutations';
import { GET_TODOS } from '../../graphql/queries';

const mocks = [
  {
    request: {
      query: ADD_TODO,
      variables: { title: 'New Todo' },
    },
    result: {
      data: {
        addTodo: {
          id: '1',
          title: 'New Todo',
          completed: false,
        },
      },
    },
  },
  {
    request: {
      query: GET_TODOS,
      variables: {},
    },
    result: {
      data: {
        todos: [],
      },
    },
  },
  {
    // Mocking the GET_TODOS query for refetching after mutation
    request: {
      query: GET_TODOS,
    },
    result: {
      data: {
        todos: [
          {
            id: '1',
            title: 'New Todo',
            completed: false,
          },
          { id: '2', title: 'Existing Todo', completed: true },
        ],
      },
    },
  },
];

describe('TodoAdd Component', () => {
  // Test to check if the component renders correctly
  it('adds a todo and clears input', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <TodoAdd />
      </MockedProvider>
    );

    const input = screen.getByPlaceholderText(/new todo/i);
    fireEvent.change(input, { target: { value: 'New Todo' } });

    const button = screen.getByRole('button', { name: /add/i });
    fireEvent.click(button);

    // waitFor mutation and refetch to complete
    await waitFor(() => expect(input).toHaveValue(''));
  });
});
