import { ifError } from 'assert';
import * as RX from 'reactxp';
import { TodoMainPage } from './components/todos';
import { TodoStore } from './todoStore';

const todoStore = TodoStore;

todoStore.addTodoItem('Task 1');
todoStore.addTodoItem('Task 2', true);
todoStore.addTodoItem('Task 3');

for (let i = 0; i < 30; i++) {
    todoStore.addTodoItem('Task ' + (4 + i));
}

// setInterval(() => {
//     // console.log('setInterval START');
//     todoStore.addTodo('Task ' + (todoStore.getTodos().length + 1));
//     //  console.log('setInterval END');
// }, 3000);

export const App = () => (
    <TodoMainPage />
);
