import * as React from 'react';
import {
  createFragmentContainer,
  graphql
} from 'react-relay';

class TodoItemTsxComponent extends React.Component<{ data: TodoItemTsx_data }, {}> {
  render() {
    const item = this.props.data;
    return (
      <div>
        <input type="checkbox" checked={item.isComplete} />
        <span>{item.text}</span>
      </div>
    );
  }
}

export const TodoItemTsxWithQuery = createFragmentContainer(
  TodoItemTsxComponent,
  graphql`
    fragment TodoItemTsx_data on Todo {
      text
      isComplete
      subTodos {
        text
      }
    }
  `,
);