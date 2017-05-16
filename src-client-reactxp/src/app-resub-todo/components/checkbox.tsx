import * as RX from 'reactxp';
import ImageSvg, { SvgPath } from 'reactxp-imagesvg';
import { CheckboxCheckedIcon } from './icons/checkbox-checked';
import { CheckboxEmptyIcon } from './icons/checkbox-empty';
import { IconStyle } from './icons/icon-base';

export const Checkbox = (props: { isChecked: boolean, onPress: () => void, style: IconStyle }) => (
    <RX.Button onPress={props.onPress}>
        {props.isChecked ? <CheckboxCheckedIcon style={props.style} /> : <CheckboxEmptyIcon style={props.style} />}
    </RX.Button>
);
