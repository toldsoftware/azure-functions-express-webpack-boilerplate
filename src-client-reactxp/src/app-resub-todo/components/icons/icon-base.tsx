import * as RX from 'reactxp';
import ImageSvg, { SvgPath } from 'reactxp-imagesvg';

export interface IconStyle {
    fontSize: number;
    padding: number;
    // width?: number;
    // height?: number;
    strokeColor?: string;
    fillColor?: string;
}

export function createIconStyle(style: IconStyle) { return style; }
export type IconProps = { style: IconStyle };

export const IconBase = (props: IconProps & { viewBox: string, children?: JSX.Element | null }) => (
    <ImageSvg
        height={props.style.fontSize + props.style.padding * 2}
        width={props.style.fontSize + props.style.padding * 2}
        strokeColor={props.style.strokeColor}
        fillColor={props.style.fillColor}
        viewBox={props.viewBox}
    >
        {props.children}
    </ImageSvg>
);
