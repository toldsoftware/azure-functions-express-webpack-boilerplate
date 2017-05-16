import { StoreBase, AutoSubscribeStore, autoSubscribe } from 'resub';

type Filter = 'all' | 'complete' | 'incomplete';

let last = Date.now();
export const log = (message: string, ...args: any[]) => {
    const now = Date.now();
    console.log(now - last, message, ...args);
    last = now;
};

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
        return this.getTodos().filter(x =>
            this._filter === 'complete' ? x.isComplete
                : this._filter === 'incomplete' ? !x.isComplete
                    : true);
    }

    @autoSubscribe
    getCount_all() {
        return this._todos.length;
    }

    @autoSubscribe
    getCount_complete() {
        return this._todos.filter(x => x.isComplete).length;
    }

    @autoSubscribe
    getCount_incomplete() {
        return this._todos.filter(x => !x.isComplete).length;
    }

    setFilter = (filter: Filter) => {
        // log('setFilter', { filter });

        this._filter = filter;
        this.trigger();
    }

    addBlankTodoItem = () => {
        this.addTodoItem();
        this.trigger();
    }

    addTodoItem = (title: string = 'New Task', isComplete = false) => {
        // log('addTodo', { title, isComplete });

        // this._todos.push(createTodoItem(this, { title, isComplete }));
        this._todos = this._todos.concat([createTodoItem(this, { title, isComplete })]);
        this.trigger();
    }

    setTodoItemIsComplete = (item: TodoItem, value: boolean) => {
        log('setIsComplete', { value, ...item });

        // item.isComplete = value;
        this._todos = this._todos.map(x => x.id !== item.id ? x : createTodoItem(this, { isComplete: value }, item));
        this.trigger();
    }

    setTodoItemTitle = (item: TodoItem, value: string) => {
        log('setTitle', { value, ...item });

        // item.title = value;
        this._todos = this._todos.map(x => x.id !== item.id ? x : createTodoItem(this, { title: value }, item));
        this.trigger();
    }
}

// Todo Item
interface TodoItemData {
    readonly id: string;
    readonly title: string;
    readonly isComplete: boolean;
}

export interface TodoItem extends TodoItemData {
    setTitle: (value: string) => void;
    setIsComplete: (value: boolean) => void;
    toggleIsComplete: () => void;
}

let _nextId = 0;
function nextId() {
    return _nextId++ + ':' + Date.now();
}

function createTodoItem(store: TodoStoreClass, data: Partial<TodoItemData>, clone?: TodoItem) {
    const x: TodoItem = {
        id: data.id || (clone && clone.id) || nextId(),
        title: data.title || (clone && clone.title),
        isComplete: data.isComplete !== undefined ? data.isComplete : (clone && clone.isComplete),
        setTitle: (v) => store.setTodoItemTitle(x, v),
        setIsComplete: (v) => store.setTodoItemIsComplete(x, v),
        toggleIsComplete: () => store.setTodoItemIsComplete(x, !x.isComplete),
    };

    return x;
}

export const TodoStore = new TodoStoreClass();
