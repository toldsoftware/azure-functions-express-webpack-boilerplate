import * as React from 'react';
import { RelayComponent } from '../helpers';

import {
  createFragmentContainer,
  graphql
} from 'react-relay';

class TodoItemTsxBComponent extends RelayComponent<TodoItemTsxB_data> {
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

export const TodoItemTsxB = createFragmentContainer(TodoItemTsxBComponent,
  graphql`
    fragment TodoItemTsxB_data on Todo {
      text
      isComplete
    }
  `);