import * as RX from 'reactxp';
import { View, SimpleComponentBase } from './view';

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
            <View style={styles.fullColumn}>
                <View style={styles.fullRow}>
                    <View>{this.state.isExpanded}
                        {this.props.sideContent}
                    </View>
                    <View style={styles.fullColumn}>
                        {this.props.children}
                    </View>
                </View>
                <View>
                    {this.props.bottomTabContent}
                </View>
            </View>
        );
    }
}
