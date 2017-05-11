import * as React from 'react';
import { prom, tql } from '../../tql/tql';
import { Fragments } from '../schema.graphql.fragments.manual';

export const TodoItemData = Fragments.Todo = {
    id: '-1',
    text: 'Sample...',
    isComplete: false,
};

export const TodoItemComponent = () => tql(TodoItemData, (data, props: { abc: string }) => {
    return (
        <div>
            <input type='checkbox' checked={data.isComplete} />
            <span>{data.text}</span>
        </div>
    );
});


export const QueryData = Fragments.Query = {
    todos: prom([TodoItemData])
};


export const TodoQueryContainer = () => tql(QueryData, (data) => {
    return (
        <div>
            <TodoItemComponent abc='123' />
        </div>
    );
});
