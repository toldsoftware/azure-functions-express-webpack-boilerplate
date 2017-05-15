
declare interface Schema {
  query?: Query;
  mutation?: Mutation;
}

declare interface Query {
  todos?(filter?: TodosFilter): Todo[];
  search?(text: string): Todo[];
}

declare enum TodosFilter{
  ALL,
  COMPLETE,
  INCOMPLETE,
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
