import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { TodoList } from '../TodoList';
import { GET_TODOS } from '../../graphql/queries';
import { TOGGLE_TODO, REMOVE_TODO } from '../../graphql/mutations';
import { useFilterStore } from '../../store/useFilterStore';
import { MockedResponse } from '@apollo/client/testing';

jest.mock('../../store/useFilterStore');
const mockedUseFilterStore = useFilterStore as jest.MockedFunction<typeof useFilterStore>;

const queryMocks = [
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

type TCustomMocks = MockedResponse[];

const renderTodoList = (customMocks: TCustomMocks = queryMocks) => {
  return render(
    <MockedProvider mocks={customMocks} addTypename={false}>
      <TodoList />
    </MockedProvider>
  );
};

describe('TodoList', () => {
  beforeEach(() => {
    // Mock Zustand store to return 'all' filter
    mockedUseFilterStore.mockReturnValue('all');
  });

  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('shows all todos when filter is "all"', async () => {
    mockedUseFilterStore.mockReturnValue('all');
    renderTodoList(queryMocks);
    await waitFor(() => {
      expect(screen.getByText('Test Todo')).toBeInTheDocument();
      expect(screen.getByText('Sample Task')).toBeInTheDocument();
    });
  });

  it('shows only completed todos when filter is "completed"', async () => {
    mockedUseFilterStore.mockReturnValue('completed');
    renderTodoList(queryMocks);
    await waitFor(() => {
      expect(screen.getByText('Sample Task')).toBeInTheDocument();
    });
  });

  it('shows only incomplete todos when filter is "incomplete"', async () => {
    mockedUseFilterStore.mockReturnValue('incomplete');
    renderTodoList(queryMocks);
    await waitFor(() => {
      expect(screen.getByText('Test Todo')).toBeInTheDocument();
    });
  });

  it('calls alert on toggle todo error', async () => {
    const toggleErrorMock = {
      request: {
        query: TOGGLE_TODO,
        variables: { id: '1' },
      },
      error: new Error('Toggle failed'),
    };

    window.alert = jest.fn();

    renderTodoList([...queryMocks, toggleErrorMock]);

    await waitFor(() => {
      expect(screen.getByText('Test Todo')).toBeInTheDocument();
      expect(screen.getByText('Sample Task')).toBeInTheDocument();
    });

    const todoItem = screen.getByText('Test Todo').closest('li');
    if (todoItem) {
      fireEvent.click(todoItem.querySelector('input[type="checkbox"]')!);
    }

    await waitFor(() =>
      expect(window.alert).toHaveBeenCalledWith('Failed to toggle todo. It may not exist.')
    );
  });

  it('calls alert on remove todo error', async () => {
    const removeErrorMock = {
      request: {
        query: REMOVE_TODO,
        variables: { id: '1' },
      },
      error: new Error('Remove failed'),
    };

    window.alert = jest.fn();

    renderTodoList([...queryMocks, removeErrorMock]);

    // wait for todos to appear
    await waitFor(() => screen.getByText('Test Todo'));

    // simulate click on remove button
    // depending on your TodoItem button, locate it:
    const removeButton = screen.getByText('Test Todo').closest('li')?.querySelector('button');
    if (removeButton) {
      fireEvent.click(removeButton);
    }

    await waitFor(() =>
      expect(window.alert).toHaveBeenCalledWith('Failed to remove todo. Please try again.')
    );
  });

  it('shows "No todos found" message if filteredTodos is empty', async () => {
    mockedUseFilterStore.mockReturnValue('completed');
    const emptyMocks = [
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
    ];

    renderTodoList(emptyMocks);

    await waitFor(() =>
      expect(screen.getByText('No todos found. Please add one!')).toBeInTheDocument()
    );
  });

  /* TODO: FIX OR DELETE */
  it('renders todos', async () => {
    renderTodoList(queryMocks);

    expect(await screen.findByText('Sample Task')).toBeInTheDocument();
  });

  it('renders loading state', () => {
    renderTodoList(queryMocks);
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
