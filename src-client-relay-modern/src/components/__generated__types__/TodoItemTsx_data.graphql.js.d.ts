
declare type TodoItemTsx_data = {
  text: string;
  isComplete: boolean;
  subTodos?: ?Array<?TodoItemTsx_data_subTodos>;
}


declare type TodoItemTsx_data_subTodos = {
  text: string;
}