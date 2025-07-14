import { render } from '@testing-library/react';
import { App } from '../src/App';
import { useTodoStore } from '../src/store/useTodoStore';

describe('<App/>', () => {
  it('renders correctly (snapshot)', () => {
    useTodoStore.setState({
      todos: [
        { id: 1, title: 'Test Todo', completed: false },
        { id: 2, title: 'Another Todo', completed: true },
      ],
    });

    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
  });
});
