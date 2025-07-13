import { gql } from 'graphql-tag';
import { nanoid } from 'nanoid';

export const typeDefs = gql`
  type Todo {
    id: ID!
    title: String!
    completed: Boolean!
  }

  type Query {
    todos: [Todo!]!
  }

  type Mutation {
    addTodo(title: String!): Todo!
    toggleTodo(id: ID!): Todo!
    removeTodo(id: ID!): ID!
  }
`;

let todos = [
  { id: '1', title: 'First Todo', completed: false },
  { id: '2', title: 'Second Todo', completed: true },
  { id: '3', title: 'Third Todo', completed: false },
];

export const resolvers = {
  Query: {
    todos: () => todos,
  },
  Mutation: {
    addTodo: (_: any, { title }: { title: string }) => {
      const newTodo = { id: nanoid(), title, completed: false };
      todos.push(newTodo);
      return newTodo;
    },

    toggleTodo: (_: any, { id }: { id: string }) => {
      const todo = todos.find((t) => t.id === id);
      if (todo) todo.completed = !todo.completed;
      return todo;
    },

    removeTodo: (_: any, { id }: { id: string }) => {
      todos = todos.filter((t) => t.id !== id);
      return id;
    },
  },
};
