
declare interface SchemaResolver {
  query?: QueryResolver | Promise<QueryResolver> | (() => QueryResolver) | (() => Promise<QueryResolver>);
  mutation?: MutationResolver | Promise<MutationResolver> | (() => MutationResolver) | (() => Promise<MutationResolver>);
}

declare interface QueryResolver {
  todos?(filter?: TodosFilter): TodoResolver[] | Promise<TodoResolver[]> | (() => TodoResolver[]) | (() => Promise<TodoResolver[]>);
  search?(text: string): TodoResolver[] | Promise<TodoResolver[]> | (() => TodoResolver[]) | (() => Promise<TodoResolver[]>);
}

declare interface MutationResolver {
  addTodo?(text: string): TodoResolver | Promise<TodoResolver> | (() => TodoResolver) | (() => Promise<TodoResolver>);
  markComplete?(id: string): TodoResolver | Promise<TodoResolver> | (() => TodoResolver) | (() => Promise<TodoResolver>);
  markIncomplete?(id: string): TodoResolver | Promise<TodoResolver> | (() => TodoResolver) | (() => Promise<TodoResolver>);
}

declare interface TodoResolver {
  id: string | Promise<string> | (() => string) | (() => Promise<string>);
  text: string | Promise<string> | (() => string) | (() => Promise<string>);
  isComplete: boolean | Promise<boolean> | (() => boolean) | (() => Promise<boolean>);
}