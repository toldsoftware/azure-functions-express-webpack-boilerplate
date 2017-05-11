import * as React from 'react';
import { TodoQueryContainer } from './components/todos';

export const App = () => (
    <div>
        <h3>React App</h3>
        <div>This is the root of your app</div>
        <TodoQueryContainer />
    </div>
);