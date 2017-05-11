import * as React from 'react';

export function prom<T>(t: T): Promise<T> { return new Promise<T>(() => t); }

export function tql<Data, Props={}, State={}>(initialData: Data, comp: (data: Data, props: Props, state: State, children: React.ReactNode) => any): React.Component<Props, State> {

  // TODO: Do something with the initialData?

  return new TqlComponent(initialData, comp);
}

export class TqlComponent<Data, Props, State> extends React.PureComponent<Props, State>{

  constructor(private initialData: Data, private renderInner: (data: Data, props: Props, state: State, children: React.ReactNode) => JSX.Element | null) {
    super();
  }

  render() {
    return this.renderInner((this.props as any).data || this.initialData, this.props, this.state, this.props.children);
  }
}