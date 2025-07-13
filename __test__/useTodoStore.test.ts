import { use } from 'react';
import { useTodoStore } from '../src/store/useTodoStore';

describe('useTodoStore', () => {
  beforeEach(() => {
    useTodoStore.setState({ todos: [] });
  });

  it('should add a todo', () => {
    useTodoStore.getState().addTodo('Test Todo');
    const todos = useTodoStore.getState().todos;
    expect(todos).toHaveLength(1);
    expect(todos[0].title).toBe('Test Todo');
  });

  it('should toggle a todo', () => {
    useTodoStore.setState({
      todos: [{ id: 1, title: 'Test Todo', completed: false }],
    });
    useTodoStore.getState().toggleTodo(1);
    const todo = useTodoStore.getState().todos[0];
    expect(todo.completed).toBe(true);
  });

  it('should remove a todo', () => {
    useTodoStore.setState({
      todos: [{ id: 1, title: 'Test Todo', completed: false }],
    });

    useTodoStore.getState().removeTodo(1);
    const todos = useTodoStore.getState().todos;
    expect(todos).toHaveLength(0);
  });
});
