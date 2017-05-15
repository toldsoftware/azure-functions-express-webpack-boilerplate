import { TqlSubject } from '../../tql/subject';
import * as React from 'react';
import { obs, tql, tqlroot } from '../../tql/tql';
import { obsComp } from "../../tql/observableComponent";
import { Fragments, TodosFilterArgs } from '../schema.graphql.fragments.manual';
import { resolver, mutator } from '../resolver';

export const TodoItemData = Fragments.Todo = {
    id: '-1',
    text: 'Sample...',
    isComplete: false,
};

// export const TodoItemMutation = Fragments.Mutation = {
//     markComplete: (id) => prom(TodoItemData)
// };

// export const markComplete = (data: typeof TodoItemData) => (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.checked) {
//         mutate(Fragments.Mutation.markComplete(data.id));
//     } else {
//         mutate(Fragments.Mutation.markIncomplete(data.id));
//     }
// };

export const TodoItemComponent = () => tql(TodoItemData, (data) => {

    const setComplete = (isChecked: boolean) => {
        if (isChecked) {
            mutator.markComplete(data.id);
        } else {
            mutator.markIncomplete(data.id);
        }
    };

    return (
        <div>
            <input type='checkbox' checked={data.isComplete} onChange={e => setComplete(e.target.checked)} />
            <span>{data.text}</span>
        </div>
    );
});


export const QueryData = Fragments.Query = {
    todos: (filter) => obs([TodoItemData])
};

export const TodoQueryContainer = () => tqlroot(QueryData, resolver, (data, props: { filter: TodosFilterArgs }) => {
    console.log('TodoQueryContainer...render', props);
    return data.todos(props.filter).transform(todos => {
        console.log('TodoQueryContainer...todos...transform', props);

        return (
            <div>
                {todos.map(x =>
                    <TodoItemComponent data={x} key={x.id} />
                )}
            </div>
        );
    });
}, () => (
    <div>Loading...</div>
));


export const TodoApp = () => obsComp(() => {
    let filter = new TqlSubject(TodosFilterArgs.ALL);

    return filter.transform(x => (
        <div>
            {'' + x}
            <TodoQueryContainer filter={x} />
            <div>
                <div onClick={() => filter.setValue(TodosFilterArgs.ALL)}>ALL</div>
                <div onClick={() => filter.setValue(TodosFilterArgs.COMPLETE)}>COMPLETE</div>
                <div onClick={() => filter.setValue(TodosFilterArgs.INCOMPLETE)}>INCOMPLETE</div>
            </div>
        </div>
    ));
});

