class TodoItem extends React.Component {
  render() {
    const item = this.props.item;
    return (
      <View>
        <Checkbox checked={item.isComplete} />
        <Text>{item.text}</Text>
      </View>
    );
  }
}

module.exports = createFragmentContainer(
  TodoItem,
  graphql`
    fragment TodoItem_item on Todo {
      text
      isComplete
    }
  `,
);