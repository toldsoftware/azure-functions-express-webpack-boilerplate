
declare interface SchemaFragmentType {
  query?: QueryFragmentType;
  // mutation?: MutationFragmentType;
}

// Remove Promise
declare interface QueryFragmentType {
  todos?(filter?: TodosFilterArgs): TqlObservable<TodoFragmentType[]>;
  search?(text: string): TqlObservable<TodoFragmentType[]>;
}

// declare interface MutationFragmentType {
//   addTodo?(text: string): Promise<TodoFragmentType>;
//   markComplete?(id: string): Promise<TodoFragmentType>;
//   markIncomplete?(id: string): Promise<TodoFragmentType>;
// }

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
  Todo: null as TodoFragmentType,

  // Mutation: {
  //   addTodo: () => 'addTodo' as any,
  //   markComplete: () => 'markComplete' as any,
  //   markIncomplete: () => 'markIncomplete' as any,
  // } as MutationFragmentType,
}

export enum TodosFilterArgs {
  ALL,
  COMPLETE,
  INCOMPLETE,
}
