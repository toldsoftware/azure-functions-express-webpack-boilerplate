
export const resolver: QueryResolver = {
    todos: (filter) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve([
                    { id: '1', text: 'Task 1', isComplete: false },
                    { id: '2', text: 'Task 2', isComplete: true },
                    { id: '3', text: 'Task 3', isComplete: false },
                ]);
            }, 3000);
        });
    },
};