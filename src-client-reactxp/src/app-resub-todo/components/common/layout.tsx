import * as RX from 'reactxp';
import { AnimView, SimpleComponentBase } from './view';

const styles = {
    fullRow: RX.Styles.createViewStyle({
        flexDirection: 'row',
        flex: 1,
    }),
    fullColumn: RX.Styles.createViewStyle({
        flexDirection: 'column',
        flex: 1,
    }),
};

export class MainLayout extends SimpleComponentBase<
    {
        sideContent?: JSX.Element,
        bottomTabContent?: JSX.Element
    }, {
        isExpanded?: boolean
    }> {

    render() {
        return (
            <RX.View style={styles.fullColumn}>
                <RX.View style={styles.fullRow}>
                    <RX.View>{this.state.isExpanded}
                        {this.props.sideContent}
                    </RX.View>
                    <RX.View style={styles.fullColumn}>
                        {this.props.children}
                    </RX.View>
                </RX.View>
                <RX.View>
                    {this.props.bottomTabContent}
                </RX.View>
            </RX.View>
        );
    }
}
