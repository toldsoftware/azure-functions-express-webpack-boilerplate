import * as React from 'react';
import { prom, tql, tqlroot } from '../../tql/tql';
import { Fragments, TodosFilterArgs } from '../schema.graphql.fragments.manual';
import { resolver } from '../resolver';

export const TodoItemData = Fragments.Todo = {
    id: '-1',
    text: 'Sample...',
    isComplete: false,
};

export const TodoItemComponent = () => tql(TodoItemData, (data) => {
    return (
        <div>
            <input type='checkbox' checked={data.isComplete} />
            <span>{data.text}</span>
        </div>
    );
});


export const QueryData = Fragments.Query = {
    todos: (filter) => prom([TodoItemData])
};

export const TodoQueryContainer = () => tqlroot(QueryData, resolver, async (data, props: { filter: TodosFilterArgs }) => {
    const todos = await data.todos(props.filter);

    return (
        <div>
            {todos.map(x =>
                <TodoItemComponent data={x} key={x.id} />
            )}
        </div>
    );
}, () => (
    <div>Loading...</div>
));
