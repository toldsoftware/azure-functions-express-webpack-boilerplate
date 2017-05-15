import RX = require('reactxp');
import { TodoItem, TodoStore } from '../todoStore';
import { ComponentBase } from 'resub';

const styles = {
    container: RX.Styles.createViewStyle({
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        backgroundColor: '#f5fcff'
    }),
    welcome: RX.Styles.createTextStyle({
        textAlign: 'center',
        fontSize: 32,
        marginBottom: 12
    }),
    welcome2: RX.Styles.createTextStyle({
        textAlign: 'center',
        fontSize: 24,
        marginBottom: 12
    }),
    todoList: RX.Styles.createViewStyle({
        backgroundColor: '#cccccc'
    }),

    todoFilters: RX.Styles.createViewStyle({
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#cccccc'
    }),

    // Todo Items
    todoItemTitle: RX.Styles.createTextStyle({
        fontSize: 16,
        color: '#333388',
    }),
};

const todoStore = TodoStore;

interface TodoMainPageState {
    todos: TodoItem[];
    count_all: number;
    count_complete: number;
    count_incomplete: number;
}

export class TodoMainPage extends ComponentBase<{}, TodoMainPageState> {

    protected _buildState(): TodoMainPageState {
        const todos = todoStore.getTodos();
        return {
            todos: todoStore.getTodos_filtered(),
            count_all: todos.length,
            count_complete: todos.filter(x => x.isComplete).length,
            count_incomplete: todos.filter(x => !x.isComplete).length,
        };
    }

    render() {
        return (
            <RX.ScrollView>
                <RX.View style={styles.container}>
                    <RX.Text style={styles.welcome}>
                        Todo App
                    </RX.Text>
                    <RX.Text style={styles.welcome2}>
                        Resub Example
                    </RX.Text>
                    <RX.View style={styles.todoList}>
                        {this.state.todos.map((x, i) => <TodoItemComponent item={x} key={i} />)}
                    </RX.View>
                    <RX.View style={styles.todoFilters}>
                        <RX.Button onPress={() => todoStore.setFilter('all')}>
                            All ({this.state.count_all})
                        </RX.Button>
                        <RX.Button onPress={() => todoStore.setFilter('complete')}>
                            Complete ({this.state.count_complete})
                        </RX.Button>
                        <RX.Button onPress={() => todoStore.setFilter('incomplete')}>
                            Incomplete ({this.state.count_incomplete})
                        </RX.Button>
                    </RX.View>
                </RX.View>
            </RX.ScrollView>

        );
    }

}



export const TodoItemComponent = (props: { item: TodoItem, key: any }) => (
    <RX.View>
        <RX.Text style={styles.todoItemTitle}>
            {props.item.title}
        </RX.Text>
    </RX.View>
);
