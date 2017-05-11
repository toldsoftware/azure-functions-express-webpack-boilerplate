
declare interface SchemaFragmentType {
  query?: QueryFragmentType;
  mutation?: MutationFragmentType;
}

declare interface QueryFragmentType {
  todos?: Promise<TodoFragmentType[]>;
  todos_complete?: Promise<TodoFragmentType[]>;
  todos_incomplete?: Promise<TodoFragmentType[]>;
  search?(text: string): Promise<TodoFragmentType[]>;
}

declare interface MutationFragmentType {
  addTodo?(text: string): Promise<TodoFragmentType>;
  markComplete?(id: string): Promise<TodoFragmentType>;
  markIncomplete?(id: string): Promise<TodoFragmentType>;
}

declare interface TodoFragmentType {
  id?: string;
  text?: string;
  isComplete?: boolean;
}

// export var SchemaFragment: SchemaFragmentType;
// export var QueryFragment: QueryFragmentType;
// export var MutationFragment: MutationFragmentType;
// export var TodoFragment: TodoFragmentType;
export var Fragments = {
  Schema: null as SchemaFragmentType,
  Query: null as QueryFragmentType,
  Mutation: null as MutationFragmentType,
  Todo: null as TodoFragmentType,
}