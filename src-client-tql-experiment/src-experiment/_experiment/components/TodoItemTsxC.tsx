import * as React from 'react';
import { RelayComponent } from '../helpers';

import {
  createFragmentContainer,
  graphql
} from 'react-relay';

class TodoItemTsxBComponent extends RelayComponent<TodoItemTsxC> {
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

export const TodoItemTsxC = createFragmentContainer(TodoItemTsxBComponent,
  graphql`
    fragment TodoItemTsxC on Todo {
      text
      isComplete
    }
  `);