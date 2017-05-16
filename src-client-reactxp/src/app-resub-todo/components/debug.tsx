import * as RX from 'reactxp';

let renderId = 0;
export const Debug = () => (
    <RX.Text>
        {'R' + renderId++}
    </RX.Text>
);
