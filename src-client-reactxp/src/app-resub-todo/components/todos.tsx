import { Value } from 'reactxp/dist/web/Animated';
import * as RX from 'reactxp';
import { TodoItem, TodoStore } from '../todoStore';
import { ComponentBase } from 'resub';
import { Checkbox } from './checkbox';
import { ConfirmEdit, createConfirmEditStyle } from './confirm-edit';
import { Debug } from './debug';
import { EditableText } from './editable-text';
import { createIconStyle } from './icons/icon-base';

const styles = {
    row: RX.Styles.createViewStyle({
        flexDirection: 'row',
    }),
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
    todoItem: RX.Styles.createViewStyle({
        flexDirection: 'row',
    }),
    todoItemTitle: RX.Styles.createTextStyle({
        fontSize: 16,
        paddingLeft: 8,
        color: '#333388',
    }),
    todoItemTitle_Edit: RX.Styles.createTextStyle({
        fontSize: 16,
        paddingLeft: 8,
        color: '#333388',
    }),
    todoItemCheckbox: createIconStyle({
        fontSize: 16,
        padding: 0,
        fillColor: '#008800',
    }),
    confirmEdit: createConfirmEditStyle({
        fontSize: 16,
        padding: 0,
    })
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
                <Debug />
                <RX.View style={styles.container}>
                    <RX.Text style={styles.welcome}>
                        Todo App
                    </RX.Text>
                    <RX.Text style={styles.welcome2}>
                        Resub Example
                    </RX.Text>
                    <RX.View style={styles.todoList}>
                        {this.state.todos.map((x, i) => <TodoItemComponent key={i} item={x} />)}
                    </RX.View>
                    <RX.Button onPress={todoStore.addBlankTodoItem}>
                        Add Todo
                    </RX.Button>
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

/*export const TodoItemComponent = (props: { item: TodoItem, key: any }) => (
    <RX.View>
        <RX.Text style={styles.todoItemTitle}>
            {props.item.title}
        </RX.Text>
    </RX.View>
);*/

export class TodoItemComponent extends ComponentBase<
    {
        item: TodoItem,
        key: any
    }, {}> {

    render() {
        return (
            <RX.View style={styles.todoItem}>
                <Debug />
                <Checkbox isChecked={this.props.item.isComplete}
                    onPress={this.props.item.toggleIsComplete} style={styles.todoItemCheckbox} />
                <EditableText text={this.props.item.title} onChange={this.props.item.setTitle}
                    style={styles.todoItemTitle}
                    editStyle={styles.todoItemTitle_Edit}
                    confirmEditStyle={styles.confirmEdit}
                />
            </RX.View>
        );
    }
}
