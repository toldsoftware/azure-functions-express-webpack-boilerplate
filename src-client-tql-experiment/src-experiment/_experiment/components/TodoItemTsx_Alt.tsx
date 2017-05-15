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

type PartialRecursive<T> = {
  [P in keyof T]?: T[P] | PartialRecursive<T[P]>;
};

// This pattern provides autocomplete at any depth
// But it provides type constraints only for root scalars and nested objects
// It fails for object fields and nested arrays
// However, a build tool can verify type constraints where the type system fails
let t: PartialRecursive<Todo>;
const testA = t = {
  text: 'Loading..',
  isComplete: false,
  // Type system fails to constrain type of objects and their nested fields
  // subTodos: 123
  // Although, autocomplete still works
  subTodos: [{
    text: 'Loading sub...',
    isComplete: false,
    subTodos: [{
      text: 'Loading sub sub...',
      otherSubTodos: [{
        tb: 'Loading other sub sub sub...'
      }]
    }]
  }]
};

testA.subTodos[0].subTodos[0].otherSubTodos[0].tb;

// However, introducing another t= can provide type constraints at deep level
let ot: PartialRecursive<OtherTodo>;

const testWithDeepConstraints = t = {
  text: 'Loading..',
  isComplete: false,
  subTodos: [t = {
    text: 'Loading sub...',
    isComplete: false,
    subTodos: [t = {
      text: 'Loading sub sub...',
      otherSubTodos: [ot = {
        tb: 'Loading other sub sub sub...'
      }]
    }]
  }]
};

// Type system knows the available fields perfectly
testWithDeepConstraints.subTodos; //subTodos[0].subTodos[0].otherSubTodos[0].tb;

const testParentFragment = t = {
  text: 'Parent Loading...',
  subTodos: [testA],

  nextTodo: {
    isComplete: true
  },
  otherSubTodos: [{
    isComplete: true
  }]
};

// Queries are composable and maintain actual type structure
testParentFragment.subTodos[0].subTodos[1].subTodos[2].otherSubTodos[3].tb;

// Fragment Types are not needed in the instance
// because it can be reconstructed from the root query
declare interface QueryPromise {
  todos?: Promise<PartialRecursive<Todo[]>>;
  search?: (text: string) => Promise<PartialRecursive<Todo[]>>;
}

let qt: QueryPromise;
// let qt: PartialRecursive<Query>;
const testQueryRoot = qt = {
  todos: prom([testParentFragment])
  // todos: new Promise<typeof testParentFragment[]>(() => [testParentFragment])
};

testQueryRoot.todos.then(x => x[0].subTodos[0].subTodos[1].subTodos[2].otherSubTodos[3].tb);

// --- Test Query With Parameters ---
const testQueryRootWithParameter = qt = {
  search: (text) => {
    return prom([t = {
      text: 'Mock Result...',
      isComplete: false,
      otherSubTodos: [ot = {
        tb: 'With Sub Result',
      }]
    }]);
  }
};

// Great! Uses the correct type structure
testQueryRootWithParameter.search('ABC').then(x => x[0].otherSubTodos[0].tb);

// --- Test Mutation ---
let mt: PartialRecursive<Mutation>;
const testMutationRootWithParameter = mt = {
  addTodoB: (input) => {
    return t = {
      text: 'Mock Result...',
      isComplete: false,
      otherSubTodos: [ot = {
        tb: 'With Sub Result',
      }]
    };
  }
};

// Great! Uses the correct type structure
// Requires the correct parameter type
// Returns the correct type structure
testMutationRootWithParameter.addTodoB({ text: 'ABC', isComplete: false }).otherSubTodos[0].tb;

// ---
// --- Example Usage ---
// ---

let type: PartialRecursive<Todo>;
const initial = t = {
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

