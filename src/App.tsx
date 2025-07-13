import { TTodo } from './types/Todo';
import { TodoItem } from './components/TodoItem';

const dummyTodos: TTodo[] = [
  { id: 1, title: 'Learn React', completed: false },
  { id: 2, title: 'Learn Zustand', completed: false },
  { id: 3, title: 'Learn GraphQL', completed: true },
];

export function App() {
  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {dummyTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
}
