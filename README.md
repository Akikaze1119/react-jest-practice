# Todo App with React, Apollo Client, and GraphQL
## Project Overview
This project is a simple Todo application built with React, Apollo Client, and GraphQL.  
It demonstrates how to use GraphQL queries and mutations with Apollo, state management with Zustand, and component testing with Jest and React Testing Library.

## Setup Instructions
### 1. Clone the repository:
```bash
git clone https://github.com/Akikaze1119/react-jest-practice.git
```
### 2. Start the Frontend project:
- 1. Install dependencies:
```bash
cd frontend
npm install
```
- 2. Start the project:
```
npm start
```

### 3. Start the Backend(Server) project:
- 1. Install dependencies <sub>(Move from `/frontend` to `/server` directory)</sub>:
```bash
cd ../server
npm install
```


- 2. Start the project:
```
npm start
```

### Test URLs
* Frontend: `http://localhost:1234`
* Server: `http://localhost:4000/`
**Make sure to run the backend and frontend servers concurrently during development.**

## Running Tests for React and Viewing Coverage
**First, move to the frontend directory:**
```bash
cd ./frontend
```

◼︎ Run all tests:
```
npm run test
```

◼︎ Run tests with coverage report:
```bash
npm run test:coverage
```
Coverage reports will be generated in the `coverage` directory.
Open `coverage/lcov-report/index.html` in your browser to view detailed coverage.

## Folder Structure
```
react-jest-practice/
├── frontend/
│   └── src/
│       ├── components/       # React components
│       │   └── __test__/
│       │
│       ├── graphql/          # GraphQL queries and mutations
│       ├── store/            # Zustand store for app state
│       │   └── __test__/
│       │
│       ├── styles/           # Styling files (e.g., styled-components theme)
│       └── types/            # TypeScript types
│
└── server/
　   └── src/
```

## Tech Stack
### Frontend:
* React
* TypeScript
* Apollo Client (GraphQL)
* Zustand (State Management)
* styled-components
* Parcel (Bundler)
* Jest & React Testing Library (Testing)

### Backend:
* Node.js
* TypeScript
* Apollo Server (GraphQL API)

## GraphQL Queries & Mutations (Brief)
* `GET_TODOS`: Query to fetch all todos.
* `ADD_TODO`: Mutation to add a new todo.
* `TOGGLE_TODO`: Mutation to toggle todo completion.
* `REMOVE_TODO`: Mutation to remove a todo.
