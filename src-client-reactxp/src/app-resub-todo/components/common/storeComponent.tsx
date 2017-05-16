import * as RX from 'reactxp';
import { ComponentBase } from 'resub';
import { Debug } from '../debug';

export function storeComp<S>(buildStateCallback: () => S, renderCallback: (state: S) => JSX.Element | null) {
    return <StoreComponent buildStateCallback={buildStateCallback} renderCallback={renderCallback} />;
};

class StoreComponent extends ComponentBase<{
    buildStateCallback: () => any,
    renderCallback: (state: any) => JSX.Element | null
}, any> {

    protected _buildState(props: {}, initialBuild: boolean): any {
        return this.props.buildStateCallback();
    }

    render() {
        return this.props.renderCallback(this.state);
    }
}
