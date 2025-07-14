import { TodoList } from './components/TodoList';
import { TodoAdd } from './components/TodoAdd';
import { FilterButtons } from './components/FilterButtons';

export function App() {
  return (
    <div>
      <h1>Todo List</h1>
      <FilterButtons />
      <TodoAdd />
      <TodoList />
    </div>
  );
}
