
declare interface SchemaResolver {
  query?: QueryResolver | Promise<QueryResolver> | (() => QueryResolver) | (() => Promise<QueryResolver>);
  mutation?: MutationResolver | Promise<MutationResolver> | (() => MutationResolver) | (() => Promise<MutationResolver>);
}

declare interface QueryResolver {
  todos?: TodoResolver[] | Promise<TodoResolver[]> | (() => TodoResolver[]) | (() => Promise<TodoResolver[]>);
  search?(text: string): TodoResolver[] | Promise<TodoResolver[]> | (() => TodoResolver[]) | (() => Promise<TodoResolver[]>);
}

declare interface MutationResolver {
  addTodo?(text: string, isComplete?: boolean): TodoResolver | Promise<TodoResolver> | (() => TodoResolver) | (() => Promise<TodoResolver>);
  addTodoB?(todo: AddTodoBArgsResolver): TodoResolver | Promise<TodoResolver> | (() => TodoResolver) | (() => Promise<TodoResolver>);
}

declare interface AddTodoBArgsResolver {
  text: string | Promise<string> | (() => string) | (() => Promise<string>);
  isComplete?: boolean | Promise<boolean> | (() => boolean) | (() => Promise<boolean>);
}

declare interface TodoResolver {
  text: string | Promise<string> | (() => string) | (() => Promise<string>);
  isComplete: boolean | Promise<boolean> | (() => boolean) | (() => Promise<boolean>);
  subTodos?: TodoResolver[] | Promise<TodoResolver[]> | (() => TodoResolver[]) | (() => Promise<TodoResolver[]>);
  otherSubTodos?: OtherTodoResolver[] | Promise<OtherTodoResolver[]> | (() => OtherTodoResolver[]) | (() => Promise<OtherTodoResolver[]>);
  nextTodo?: TodoResolver | Promise<TodoResolver> | (() => TodoResolver) | (() => Promise<TodoResolver>);
}

declare interface OtherTodoResolver {
  tb: string | Promise<string> | (() => string) | (() => Promise<string>);
  isComplete: boolean | Promise<boolean> | (() => boolean) | (() => Promise<boolean>);
}