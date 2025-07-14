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

const renderTodoAdd = () =>
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <TodoAdd />
    </MockedProvider>
  );

const addButton = () => {
  const button = screen.getByRole('button', { name: /add/i });
  fireEvent.click(button);
};

describe('TodoAdd Component', () => {
  // Test to check if the component renders correctly
  it('adds a todo and clears input', async () => {
    renderTodoAdd();

    const input = screen.getByPlaceholderText(/new todo/i);
    fireEvent.change(input, { target: { value: 'New Todo' } });

    addButton();

    // waitFor mutation and refetch to complete
    await waitFor(() => expect(input).toHaveValue(''));
  });

  /* 
    3 Tests for input validation:
  */
  it('should not allow adding an empty todo', async () => {
    renderTodoAdd();

    const input = screen.getByPlaceholderText(/new todo/i);
    fireEvent.change(input, { target: { value: '' } });

    addButton();

    // Check if the input is still empty
    expect(input).toHaveValue('');
    // Check if the error message is displayed
    await waitFor(() => {
      expect(screen.getByText(/please enter a todo\./i)).toBeInTheDocument();
    });
  });

  it('should show error when todo is longer than 50 characters', async () => {
    renderTodoAdd();
    fireEvent.change(screen.getByPlaceholderText(/new todo/i), {
      target: { value: 'a'.repeat(51) },
    });
    addButton();
    expect(screen.getByText(/50 characters or less/i)).toBeInTheDocument();
  });

  it('should show error when todo contains invalid characters', async () => {
    renderTodoAdd();
    fireEvent.change(screen.getByPlaceholderText(/new todo/i), {
      target: { value: 'invalid!@#' },
    });
    addButton();
    expect(screen.getByText(/only letters, numbers, and spaces/i)).toBeInTheDocument();
  });
});
