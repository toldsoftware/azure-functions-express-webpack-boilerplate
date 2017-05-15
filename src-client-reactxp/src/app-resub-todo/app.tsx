import RX = require('reactxp');
import { TodoMainPage } from './components/todos';
import { TodoStore } from './todoStore';

const todoStore = TodoStore;

todoStore.addTodo('Task 1');
todoStore.addTodo('Task 2', true);
todoStore.addTodo('Task 3');

setInterval(() => {
    todoStore.addTodo('Task ' + (todoStore.getTodos().length + 1));
}, 3000);

export const App = () => (
    <TodoMainPage />
);
