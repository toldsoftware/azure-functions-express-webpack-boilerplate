// Mocks
declare module React {
  class Component<Props, State> {
    props: Props;
    state: State;
    setState(s: Partial<State>);
  }
};

declare function createFragmentContainer(comp: any, query: any);
declare function graphql(input: TemplateStringsArray): string;

class TodoItemTsxComponent extends React.Component<{ data: TodoItemTsx_data }, {}> {
  render() {
    const item = this.props.data;
    return (
      <div>
        <input type='checkbox' checked={item.isComplete} />
        <span>{item.text}</span>
      </div>
    );
  }
}

export const TodoItemTsxWithQuery = createFragmentContainer(
  TodoItemTsxComponent,
  graphql`
    fragment TodoItemTsx_data on Todo {
      text
      isComplete
    }
  `,
);