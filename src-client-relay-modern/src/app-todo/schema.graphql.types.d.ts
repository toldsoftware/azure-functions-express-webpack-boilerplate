
declare interface Schema {
  query?: Query;
  mutation?: Mutation;
}

declare interface Query {
  todos?: Todo[];
  todos_complete?: Todo[];
  todos_incomplete?: Todo[];
  search?(text: string): Todo[];
}

declare interface Mutation {
  addTodo?(text: string): Todo;
  markComplete?(id: string): Todo;
  markIncomplete?(id: string): Todo;
}

declare interface Todo {
  id: string;
  text: string;
  isComplete: boolean;
}
