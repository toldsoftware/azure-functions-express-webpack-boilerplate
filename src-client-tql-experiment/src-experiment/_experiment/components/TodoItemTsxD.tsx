import * as React from 'react';
import { RelayComponent } from '../helpers';

import {
  createFragmentContainer,
  graphql
} from 'react-relay';

const TodoItemTsxDComponent = (props: { data: TodoItemTsxD }) => {
  const item = props.data;
  return (
    <div>
      <input type="checkbox" checked={item.isComplete} />
      <span>{item.text}</span>
    </div>
  );
}

export const TodoItemTsxD = createFragmentContainer(TodoItemTsxDComponent,
  graphql`
    fragment TodoItemTsxD on Todo {
      text
      isComplete
    }
  `);