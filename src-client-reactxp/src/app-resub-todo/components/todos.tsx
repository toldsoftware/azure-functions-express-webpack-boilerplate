import * as RX from 'reactxp';
import { VirtualListView, VirtualListViewItemInfo } from 'reactxp-virtuallistview/dist/VirtualListView';
import { TodoItem, TodoStore } from '../todoStore';
import { ComponentBase } from 'resub';
import { Checkbox } from './checkbox';
import { ConfirmEdit, createConfirmEditStyle } from './confirm-edit';
import { Debug } from './debug';
import { EditableText } from './editable-text';
import { createIconStyle } from './icons/icon-base';
import { AnimView, storeComp } from './common/index';
import { AddIcon } from './icons/add';
import { MainLayout } from './common/layout';
import { CheckboxCheckedIcon } from './icons/checkbox-checked';
import { CheckboxEmptyIcon } from './icons/checkbox-empty';
import { CheckboxSolidIcon } from './icons/checkbox-solid';

const styles = {
    row: RX.Styles.createViewStyle({
        flexDirection: 'row',
    }),
    icon: createIconStyle({
        fontSize: 16,
        padding: 0
    }),
    actionButton: RX.Styles.createButtonStyle({
        backgroundColor: '#c5ccff',
        padding: 8,
        margin: 2,
    }),
    filterButton: RX.Styles.createButtonStyle({
        backgroundColor: '#c5ffcc',
        padding: 8,
        margin: 2,
    }),
    navButton: RX.Styles.createButtonStyle({
        backgroundColor: '#c5ffff',
        padding: 8,
        margin: 2,
    }),
    tabButton: RX.Styles.createButtonStyle({
        backgroundColor: '#ffc5cc',
        padding: 8,
        margin: 2,
        flex: 1,
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
        // backgroundColor: '#cccccc'
    }),

    todoFilters: RX.Styles.createViewStyle({
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        // justifyContent: '',
        // backgroundColor: '#cccccc'
    }),

    // Todo Items
    todoItemHeight: 32,
    todoItem: RX.Styles.createViewStyle({
        flexDirection: 'row',
    }),
    todoItemTitle: RX.Styles.createTextStyle({
        fontSize: 16,
        lineHeight: 32,
        paddingLeft: 8,
        color: '#333388',
    }),
    todoItemTitle_Edit: RX.Styles.createTextStyle({
        fontSize: 16,
        paddingLeft: 8,
        color: '#333388',
    }),
    todoItemCheckbox: createIconStyle({
        fontSize: 32,
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
    const sideContent: any = undefined;
    /*const sideContent = (
        <View>
            <RX.Button style={styles.navButton} onPress={todoStore.reload}>
                Reload 1
            </RX.Button>
            <RX.Button style={styles.navButton} onPress={todoStore.reload}>
                Reload 2
            </RX.Button>
            <RX.Button style={styles.navButton} onPress={todoStore.reload}>
                Reload 3
            </RX.Button>
        </View>
    );*/
    const createAndFocus = () => {
        todoStore.addBlankTodoItem();
    };
    const bottomTabContent = (
        <RX.View style={styles.row}>
            <RX.Button onPress={createAndFocus} style={styles.actionButton}>
                <RX.View style={styles.row}>
                    <AddIcon style={styles.icon} /> Add Todo
                </RX.View>
            </RX.Button>
            <TodoFilters />
        </RX.View>
    );
    return (
        <MainLayout sideContent={sideContent} bottomTabContent={bottomTabContent}>
            <RX.ScrollView style={styles.container}>
                <Debug />
                <RX.View>
                    <RX.Text style={styles.welcome}>
                        Todo App
                    </RX.Text>
                    <RX.Text style={styles.welcome2}>
                        Resub Example
                    </RX.Text>
                    <TodoList />
                </RX.View>
            </RX.ScrollView>
        </MainLayout>
    );
};

export const TodoList = () => storeComp(() => ({
    todos: todoStore.getTodos_filtered()
}), (state) => (
    <RX.View style={styles.todoList}>
        {!state.todos.length && <RX.Text>No Items</RX.Text>}
        {state.todos.map((x, i) => <TodoItemComponent key={i} item={x} />)}
    </RX.View>
));

// Doesn't work
/*
interface TodoItemVirtualListInfo extends VirtualListViewItemInfo, TodoItem {

}

export const TodoList = () => storeComp(() => ({
    todos: todoStore.getTodos_filtered().map(x => ({
        ...x,
        key: x.id,
        height: styles.todoItemHeight,
    } as TodoItemVirtualListInfo))
}), (state) => (!state.todos.length ?
    (
        <RX.Text>No Items</RX.Text>
    ) : (
        <RX.View>
            {state.todos.length}
            <VirtualListView
                itemList={state.todos}
                renderItem={renderTodoItem}
                animateChanges={false}
                skipRenderIfItemUnchanged={false}
            />
        </RX.View>
    )
));

const renderTodoItem = (x: TodoItemVirtualListInfo) => (
    <RX.Text>TEST</RX.Text>
    // <TodoItemComponent item={x} />
);*/

export const TodoFilters = () => storeComp(() => ({
    count_all: todoStore.getCount_all(),
    count_complete: todoStore.getCount_complete(),
    count_incomplete: todoStore.getCount_incomplete(),
}), (state) => (
    <RX.View style={styles.todoFilters}>
        <RX.Button onPress={() => todoStore.setFilter('all')} style={styles.tabButton}>
            <CheckboxSolidIcon style={styles.icon} /> All ({state.count_all})
        </RX.Button>
        <RX.Button onPress={() => todoStore.setFilter('complete')} style={styles.tabButton}>
            <CheckboxCheckedIcon style={styles.icon} /> Complete ({state.count_complete})
        </RX.Button>
        <RX.Button onPress={() => todoStore.setFilter('incomplete')} style={styles.tabButton}>
            <CheckboxEmptyIcon style={styles.icon} /> Incomplete ({state.count_incomplete})
        </RX.Button>
    </RX.View>
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
        key?: any
    }, {}> {

    render() {
        return (
            <RX.View style={styles.todoItem} >
                {/*<AnimView style={styles.row} shouldAnimateOnLoad={false} shouldAnimateKey={this.props.item.title}>*/}
                <Debug />
                <Checkbox isChecked={this.props.item.isComplete}
                    onPress={this.props.item.toggleIsComplete} style={styles.todoItemCheckbox} />
                <EditableText
                    text={this.props.item.title}
                    placeholder='New Task'
                    isEditing={!this.props.item.title}
                    onChange={this.props.item.setTitle}
                    style={styles.todoItemTitle}
                    editStyle={styles.todoItemTitle_Edit}
                    confirmEditStyle={styles.confirmEdit}
                    buttonStyle={styles.actionButton}
                />
                {/*</AnimView>*/}
            </RX.View>
        );
    }
}
