import * as React from 'react';

export function prom<T>(t: T): Promise<T> { return new Promise<T>(() => t); }

export function tql<Data, Props={}, State={}>(initialData: Data, comp: (data: Data, props: Props, state: State, children: React.ReactNode) => JSX.Element | null): React.Component<Props & { data: Data }, State> {
  return new TqlComponent(initialData, comp);
}

export class TqlComponent<Data, Props, State> extends React.PureComponent<Props & { data: Data }, State>{

  constructor(private initialData: Data, private renderInner: (data: Data, props: Props, state: State, children: React.ReactNode) => JSX.Element | null) {
    super();
    // Do something with the initialData?
    // No, the real data will be handed down as the data property through react attribute
  }

  render() {
    return this.renderInner((this.props as any).data || this.initialData, this.props as any, this.state, this.props.children);
  }
}

export function tqlroot<Data, Resolver, Props={}, State={}>(
  initialData: Data,
  resolver: Resolver,
  comp: (data: Data, props: Props, state: State, children: React.ReactNode) => Promise<JSX.Element | null>,
  loading: (data: Data, props: Props, state: State, children: React.ReactNode) => JSX.Element | null
): React.Component<Props, State> {
  return new TqlRootComponent(initialData, resolver, comp, loading);
}

export class TqlRootComponent<Data, Resolver, Props, State> extends React.PureComponent<Props, State & { _render: JSX.Element | null }>{

  constructor(
    private initialData: Data,
    private resolver: Resolver,
    private renderInner: (data: Data, props: Props, state: State, children: React.ReactNode) => Promise<JSX.Element | null>,
    private renderLoading: (data: Data, props: Props, state: State, children: React.ReactNode) => JSX.Element | null
  ) {
    super();

    this.state = {
      _render: undefined
    } as any;
  }

  beginRender() {
    if (this.state._render !== undefined) { return; }

    setTimeout(() => {

      const dataResolver = createResolver(this.initialData, this.resolver);

      this.renderInner(dataResolver, this.props, this.state as any, this.props.children)
        .then((r) =>
          this.setState({ _render: r })
        );
    });
  }

  render() {
    this.beginRender();
    if (this.state._render !== undefined) {
      return this.state._render;
    }

    return this.renderLoading((this.props as any).data || this.initialData, this.props, this.state as any, this.props.children);
  }
}

function createResolver<TQuery, TResolver>(query: TQuery, resolver: TResolver): TQuery {
  // TODO: Create a resolver
  return resolver as any;
}