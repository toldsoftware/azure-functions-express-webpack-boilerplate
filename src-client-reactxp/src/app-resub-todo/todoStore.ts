import { StoreBase, AutoSubscribeStore, autoSubscribe } from 'resub';

type Filter = 'all' | 'complete' | 'incomplete';

@AutoSubscribeStore
class TodoStoreClass extends StoreBase {

    private _todos: TodoItem[] = [];
    private _filter: Filter = 'all';

    @autoSubscribe
    getTodos() {
        return this._todos;
    }

    @autoSubscribe
    getTodos_filtered() {
        return this._todos.filter(x =>
            this._filter === 'complete' ? x.isComplete
                : this._filter === 'incomplete' ? !x.isComplete
                    : true);
    }

    setFilter(filter: Filter) {
        console.log('setFilter', { filter });

        this._filter = filter;
        this.trigger();
    }

    addTodo(title: string, isComplete = false) {
        console.log('addTodo', { title, isComplete });

        // this._todos.push({ title, isComplete });
        this._todos = this._todos.concat([{ title, isComplete }]);
        this.trigger();
    }
}

export interface TodoItem {
    title: string;
    isComplete: boolean;
}

export const TodoStore = new TodoStoreClass();
