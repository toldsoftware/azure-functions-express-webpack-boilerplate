
declare interface SchemaFragmentType {
  query?: QueryFragmentType;
  mutation?: MutationFragmentType;
}

declare interface QueryFragmentType {
  todos?: Promise<TodoFragmentType[]>;
  search?(text: string): Promise<TodoFragmentType[]>;
}

declare interface MutationFragmentType {
  addTodo?(text: string, isComplete?: boolean): Promise<TodoFragmentType>;
  addTodoB?(todo: AddTodoBArgsFragmentType): Promise<TodoFragmentType>;
}

declare interface AddTodoBArgsFragmentType {
  text: string;
  isComplete?: boolean;
}

declare interface TodoFragmentType {
  text?: string;
  isComplete?: boolean;
  subTodos?: TodoFragmentType[];
  otherSubTodos?: OtherTodoFragmentType[];
  nextTodo?: TodoFragmentType;
}

declare interface OtherTodoFragmentType {
  tb?: string;
  isComplete?: boolean;
}

declare var SchemaFragment: SchemaFragmentType;
declare var QueryFragment: QueryFragmentType;
declare var MutationFragment: MutationFragmentType;
declare var AddTodoBArgsFragment: AddTodoBArgsFragmentType;
declare var TodoFragment: TodoFragmentType;
declare var OtherTodoFragment: OtherTodoFragmentType;