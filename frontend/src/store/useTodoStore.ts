import { create } from 'zustand';
import { TTodo } from '../types/Todo';

type TTodoStoreState = {
  todos: TTodo[];
  addTodo: (title: string) => void;
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
};

export const useTodoStore = create<TTodoStoreState>((set) => ({
  todos: [
    { id: 1, title: 'Learn React', completed: false },
    { id: 2, title: 'Learn Zustand', completed: false },
    { id: 3, title: 'Build a Todo App', completed: true },
  ],

  addTodo: (title: string) =>
    set((state) => ({
      todos: [...state.todos, { id: Date.now(), title, completed: false }],
    })),

  toggleTodo: (id: number) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    })),

  removeTodo: (id: number) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),
}));
