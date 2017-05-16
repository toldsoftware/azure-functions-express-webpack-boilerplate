import * as RX from 'reactxp';
import ImageSvg, { SvgPath } from 'reactxp-imagesvg';
import { CheckIcon } from './icons/check';
import { CancelIcon } from './icons/cancel';

export interface ConfirmEditStyle {
    fontSize: number;
    padding: number;
    // width?: number;
    // height?: number;
    strokeColor?: string;
    fillColor?: string;
}

export function createConfirmEditStyle(style: ConfirmEditStyle) { return style; }

const styles = {
    row: RX.Styles.createViewStyle({
        flexDirection: 'row',
    }),
};

export const ConfirmEdit = (props: { onAccept: () => void, onCancel: () => void, style: ConfirmEditStyle }) => (
    <RX.View style={styles.row}>
        <RX.Button onPress={props.onAccept}>
            <CheckIcon style={props.style} />
        </RX.Button>
        <RX.Button onPress={props.onCancel}>
            <CancelIcon style={props.style} />
        </RX.Button>
    </RX.View>
);
