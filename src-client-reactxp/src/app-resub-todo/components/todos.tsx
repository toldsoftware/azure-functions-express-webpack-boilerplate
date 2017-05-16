import { Value } from 'reactxp/dist/web/Animated';
import * as RX from 'reactxp';
import { TodoItem, TodoStore } from '../todoStore';
import { ComponentBase } from 'resub';
import { Checkbox } from './checkbox';
import { ConfirmEdit, createConfirmEditStyle } from './confirm-edit';
import { Debug } from './debug';
import { EditableText } from './editable-text';
import { createIconStyle } from './icons/icon-base';
import { View, storeComp } from './layout/layout';

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

export const TodoMainPage = () => {
    return (
        <RX.ScrollView>
            <Debug />
            <View style={styles.container}>
                <RX.Text style={styles.welcome}>
                    Todo App
                    </RX.Text>
                <RX.Text style={styles.welcome2}>
                    Resub Example
                </RX.Text>
                <TodoList />
                <RX.Button onPress={todoStore.addBlankTodoItem}>
                    Add Todo
                </RX.Button>
                <TodoFilters />
            </View>
        </RX.ScrollView>
    );
};

export const TodoList = () => storeComp(() => ({
    todos: todoStore.getTodos_filtered()
}), (state) => (
    <View style={styles.todoList}>
        {state.todos.map((x, i) => <TodoItemComponent key={i} item={x} />)}
    </View>
));

export const TodoFilters = () => storeComp(() => ({
    count_all: todoStore.getCount_all(),
    count_complete: todoStore.getCount_complete(),
    count_incomplete: todoStore.getCount_incomplete(),
}), (state) => (
    <View style={styles.todoFilters}>
        <RX.Button onPress={() => todoStore.setFilter('all')}>
            All ({state.count_all})
        </RX.Button>
        <RX.Button onPress={() => todoStore.setFilter('complete')}>
            Complete ({state.count_complete})
        </RX.Button>
        <RX.Button onPress={() => todoStore.setFilter('incomplete')}>
            Incomplete ({state.count_incomplete})
        </RX.Button>
    </View>
));

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
            <View style={styles.todoItem} shouldAnimateKey={this.props.item.title}>
                <Debug />
                <Checkbox isChecked={this.props.item.isComplete}
                    onPress={this.props.item.toggleIsComplete} style={styles.todoItemCheckbox} />
                <EditableText text={this.props.item.title} onChange={this.props.item.setTitle}
                    style={styles.todoItemTitle}
                    editStyle={styles.todoItemTitle_Edit}
                    confirmEditStyle={styles.confirmEdit}
                />
            </View>
        );
    }
}
