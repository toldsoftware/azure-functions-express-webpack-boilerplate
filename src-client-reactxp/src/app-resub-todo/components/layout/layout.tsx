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

export class SimpleComponentBase<T = {}, S = {}> extends RX.Component<T & { children?: JSX.Element | null }, S> {
}

let __nextId = 0;
export class View extends SimpleComponentBase<{ shouldAnimateKey?: any, style?: RX.Types.ViewStyle }> {

    private _in_animScaleValue = new RX.Animated.Value(0.0);
    private _in_animTiming = RX.Animated.timing(this._in_animScaleValue,
        { toValue: 1.0, duration: 250, easing: RX.Animated.Easing.InOut() }
    );
    private _in_animStyle = RX.Styles.createAnimatedViewStyle({
        // opacity: animatedOpacityValue,
        transform: [{
            scale: this._in_animScaleValue
        }]
    });

    private _animateKey: any = undefined;

    private _in_play = () => {
        const newKey = this.props.shouldAnimateKey || null;
        if (this._animateKey !== newKey) {
            this._animateKey = newKey;
            this._in_animScaleValue.setValue(0);
            this._in_animTiming.start();
        }
    }

    _id = __nextId++;
    _log: string[] = [];
    log(m: string) {
        // this._log = [m].concat(this._log);
        // console.log('log' + this._id, this._log);
    }

    componentDidMount() {
        this.log('componentDidMount');
        this._in_play();
    }

    // componentWillUnmount() {
    //     this.log('componentWillUnmount');
    //     // TODO:
    // }

    // shouldComponentUpdate() {
    //     console.log('shouldComponentUpdate');
    // }

    // componentWillReceiveProps() {
    //     this.log('componentWillReceiveProps');
    //     // this._in_animTiming.start();
    // }

    // componentWillUpdate() {
    //     this.log('componentWillUpdate');
    // }

    componentDidUpdate(prevProps: { children: JSX.Element | null }) {
        this.log('componentDidUpdate');
        this._in_play();
    }

    render() {
        return (
            <RX.Animated.View style={[this._in_animStyle, this.props.style]}>
                {/*{'#' + this._id}*/}
                {this.props.children}
            </RX.Animated.View>
        );
    }
}
