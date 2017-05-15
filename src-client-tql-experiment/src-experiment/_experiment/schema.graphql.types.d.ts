
declare interface Schema {
  query?: Query;
  mutation?: Mutation;
}

declare interface Query {
  todos?: Todo[];
  search?(text: string): Todo[];
}

declare interface Mutation {
  addTodo?(text: string, isComplete?: boolean): Todo;
  addTodoB?(todo: AddTodoBArgs): Todo;
}

declare interface AddTodoBArgs {
  text: string;
  isComplete?: boolean;
}

declare interface Todo {
  text: string;
  isComplete: boolean;
  subTodos?: Todo[];
  otherSubTodos?: OtherTodo[];
  nextTodo?: Todo;
}

declare interface OtherTodo {
  tb: string;
  isComplete: boolean;
}
