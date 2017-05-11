export const mockStore = {
    todos: [
        { id: '1', text: 'Task 1', isComplete: false },
        { id: '2', text: 'Task 2', isComplete: true },
        { id: '3', text: 'Task 3', isComplete: false },
    ]
};


export const resolver: QueryResolver = {
    todos: (filter) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(mockStore.todos);
            }, 3000);
        });
    },
};

export const mutator: MutationResolver = {
    markComplete: (id) => {
        const t = mockStore.todos.filter(x => x.id === id)[0]
        t.isComplete = true;
        return t;
    },
    markIncomplete: (id) => {
        const t = mockStore.todos.filter(x => x.id === id)[0]
        t.isComplete = false;
        return t;
    },
    addTodo: (text: string) => {
        const t: Todo = {
            id: '' + mockStore.todos.length,
            text,
            isComplete: false
        };
        mockStore.todos.push(t);
        return t;
    }
}