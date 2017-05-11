import * as React from 'react';
import { TodoQueryContainer } from './components/todos';
import { TodosFilterArgs } from './schema.graphql.fragments.manual';

export const App = () => (
    <div>
        <h3>React App</h3>
        <div>This is the root of your app</div>
        <TodoQueryContainer filter={TodosFilterArgs.ALL} />
    </div>
);