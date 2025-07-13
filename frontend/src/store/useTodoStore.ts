import { create } from 'zustand';
import { TTodo } from '../types/Todo';

type TodoState = {
  todos: TTodo[];
  setTodos: (todos: TTodo[]) => void;
  addTodo: (todo: TTodo) => void;
  toggleTodo: (id: string) => void;
  removeTodo: (id: string) => void;
};

export const useTodoStore = create<TodoState>((set) => ({
  todos: [],
  setTodos: (todos) => set({ todos }),
  addTodo: (todo) => set((state) => ({ todos: [...state.todos, todo] })),
  toggleTodo: (id) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    })),
  removeTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),
}));
