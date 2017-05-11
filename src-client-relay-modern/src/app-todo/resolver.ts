import { Fragments, TodosFilterArgs } from './schema.graphql.fragments.manual';
import { TqlSubject } from "../tql/subject";

export const mockStore = {
    todos: new TqlSubject([
        { id: '1', text: 'Task 1', isComplete: false },
        { id: '2', text: 'Task 2', isComplete: true },
        { id: '3', text: 'Task 3', isComplete: false },
    ])
};


// export const resolver: QueryResolver = {
//     todos: (filter) => {
//         return new Promise((resolve, reject) => {
//             setTimeout(() => {
//                 resolve(mockStore.todos);
//             }, 3000);
//         });
//     },
// };


export const resolver = Fragments.Query = {
    todos: (filter) => {
        return mockStore.todos.transform(todos => {
            // console.log('resolver...todos.transform');

            if (filter === TodosFilterArgs.COMPLETE) {
                return todos.filter(x => x.isComplete);
            } else if (filter === TodosFilterArgs.INCOMPLETE) {
                return todos.filter(x => !x.isComplete);
            } else {
                return todos.slice();
            }
        });
    },
};

export const mutator: MutationResolver = {
    markComplete: (id) => {
        console.log('markComplete', { id });

        const t = mockStore.todos.getValue().filter(x => x.id === id)[0]
        t.isComplete = true;
        mockStore.todos.forceUpdate();
        return t;
    },
    markIncomplete: (id) => {
        console.log('markIncomplete', { id });

        const t = mockStore.todos.getValue().filter(x => x.id === id)[0]
        t.isComplete = false;
        mockStore.todos.forceUpdate();
        return t;
    },
    addTodo: (text: string) => {
        console.log('addTodo', { text });

        const t: Todo = {
            id: '' + mockStore.todos.getValue().length,
            text,
            isComplete: false
        };
        mockStore.todos.setValue(mockStore.todos.getValue().concat(t));
        return t;
    }
}