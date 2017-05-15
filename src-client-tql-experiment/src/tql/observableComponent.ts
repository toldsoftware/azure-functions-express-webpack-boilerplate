import * as React from "React";

export function obsComp<Props={}, State={}>(
    comp: (props: Props, state: State, children: React.ReactNode) => TqlObservable<JSX.Element | null>
): React.Component<Props, State> {
    return new ObservableComponent(comp);
}

export class ObservableComponent<Props, State> extends React.PureComponent<Props, State & { _render: JSX.Element | null }>{

    constructor(
        private renderInner: (props: Props, state: State, children: React.ReactNode) => TqlObservable<JSX.Element | null>,
    ) {
        super();

        this.state = {
            _render: undefined
        } as any;
    }

    beginRender() {
        if (this.state._render !== undefined) { return; }

        setTimeout(() => {
            this.renderInner(this.props, this.state as any, this.props.children)
                .subscribe((r) =>
                    this.setState({ _render: r })
                , true);
        });
    }

    render() {
        // console.log('ObservableComponent render');
        this.beginRender();
        return this.state._render || null;
    }
}