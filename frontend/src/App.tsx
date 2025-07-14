import { TodoList } from './components/TodoList';
import { TodoAdd } from './components/TodoAdd';

export function App() {
  return (
    <div>
      <h1>Todo List</h1>
      <TodoAdd />
      <TodoList />
    </div>
  );
}
