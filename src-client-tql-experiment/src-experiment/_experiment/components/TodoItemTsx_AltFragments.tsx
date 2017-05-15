import * as React from 'react';
import { RelayComponent } from '../helpers';

import {
  createFragmentContainer,
  graphql
} from 'react-relay';


// --- Typescript Type System Based Fragments ---

// graphql`
//   fragment TodoItemTsx_data on Todo {
//     text
//     isComplete
//     subTodos {
//       text
//     }
//   }
// `,

// This pattern provides autocomplete at any depth
// But it provides type constraints for most structure
// Also, it knows deep types
// It fails for object fields and allows scalars to be substituted
// However, a build tool can verify type constraints where the type system fails
const testA = TodoFragment = {
  text: 'Loading...',
  isComplete: false,
  // Type system fails to constrain type 
  // if a scalar is put in place of an object
  otherSubTodos: [''],
  nextTodo: 123,
  // Although, autocomplete still works
  subTodos: [{
    text: 'Loading sub...',
    isComplete: false,
    subTodos: [{
      text: 'Loading sub sub ...',
      otherSubTodos: [{
        tb: 'Loading other sub sub sub...'
      }]
    }]
  }]
};

testA.subTodos[0].subTodos[0].otherSubTodos[0].tb;

// Compare: 
// const testA = TodoFragment = {
// const testA: TodoFragment = {
// The top is a type object pass through which allows the new variable name to maintain the original type
// The bottom forces the variable to the type and adds additional partial fields that were not declared
const testAType: TodoFragmentType = {
  text: 'Loading...',
  isComplete: false,
  // Type system fails to constrain type 
  // if a scalar is put in place of an object
  otherSubTodos: [''],
  nextTodo: 123,
  // Although, autocomplete still works
  subTodos: [{
    text: 'Loading sub...',
    isComplete: false,
    subTodos: [{
      text: 'Loading sub sub ...',
      otherSubTodos: [{
        tb: 'Loading other sub sub sub...'
      }]
    }]
  }]
};

// Notice: This should error:
// testA.nextTodo.nextTodo;
// But here all fields are present according to the original type Fragment (local type knowledge is lost)
testAType.nextTodo.nextTodo.nextTodo;


// Composing Fragments works fine
const testParentFragment = TodoFragment = {
  text: 'Parent Loading...',
  subTodos: [testA],
  nextTodo: {
    subTodos: [testA]
  }
};

// Query Fragments work with the Promise
const testQueryRoot = QueryFragment = {
  todos: prom([testParentFragment])
  // todos: new Promise<typeof testParentFragment[]>(() => [testParentFragment])
};

testQueryRoot.todos.then(x => x[0].subTodos[0].subTodos[1].subTodos[2].otherSubTodos[3].tb);

// Or could be made to work without a promise or an observable
// const testQueryNoPromise = QueryFragment = {
//   todos: [testParentFragment]
// };
// const testQueryObservable = QueryFragment = {
//   todos: obs([testParentFragment])
// };



// --- Test Query With Parameters ---
const testQueryRootWithParameter = QueryFragment = {
  // The parameters are automatically typed
  // And cannot exceed the correct number 
  // Although, it does allow some could be ignored
  search: (text) => {
    // Inside a promise, an extra type pass through can provide autocomplete
    return prom([TodoFragment = {
      text: 'Mock Result...',
      isComplete: false,
      otherSubTodos: [{
        tb: 'With Sub Result',
      }]
    }]);
  }
};

// This works just fine and requires the correct parameters
testQueryRootWithParameter.search('ABC').then(x => x[0].otherSubTodos[0].tb);

// --- Test Mutation ---

// Mutations work just like the query
const testMutationRootWithParameter = MutationFragment = {
  addTodoB: (input) => {
    return prom({
      text: 'Mock Result...',
      isComplete: false,
      otherSubTodos: [{
        tb: 'With Sub Result',
      }]
    });
  }
};

// And they requires the correct parameter type (respecting nullable parameters)
// And return the correct type structure
testMutationRootWithParameter.addTodoB({ text: 'ABC', isComplete: false }).then(x => x.otherSubTodos[0].tb);
testMutationRootWithParameter.addTodoB({ text: 'ABC' }).then(x => x.otherSubTodos[0].tb);

// ---
// --- Example Usage ---
// ---

const initial = TodoFragment = {
  text: 'Loading...',
  isComplete: false,
};

// export const TodoItemTsxAlt = tql(initial, (data, props, state, children) => {
export const TodoItemTsxAlt = tql(initial, (data) => {
  const item = data;
  return (
    <div>
      <input type="checkbox" checked={item.isComplete} />
      <span>{item.text}</span>
    </div>
  );
});


// --- Helpers ---
function prom<T>(t: T): Promise<T> { return new Promise<T>(() => t); }

function tql<Data, Props={}, State={}>(initialData: Data, comp: (data: Data, props: Props, state: State, children: React.ReactNode) => any): React.Component<Props, State> {

  // TODO: Do something with the initialData?

  return new TqlComponent(initialData, comp);
}

class TqlComponent<Data, Props, State> extends React.PureComponent<Props, State>{

  constructor(private initialData: Data, private renderInner: (data: Data, props: Props, state: State, children: React.ReactNode) => JSX.Element | null) {
    super();
  }

  render() {
    return this.renderInner((this.props as any).data || this.initialData, this.props, this.state, this.props.children);
  }
}

// export const TodoItemTsxD = createFragmentContainer(TodoItemTsxDComponent,
//   graphql`
//     fragment TodoItemTsxD on Todo {
//       text
//       isComplete
//     }
//   `);
