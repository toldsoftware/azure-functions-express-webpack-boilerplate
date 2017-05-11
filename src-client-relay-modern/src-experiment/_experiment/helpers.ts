import * as React from 'react';

// import {
//     createFragmentContainer
// } from 'react-relay';

// export function FragmentComponent<Data, Props, State>(query: string, component: (props: Props & { data: Data }, state: State) => any) {

//     return createFragmentContainer(
//         component,
//         query
//     );
// }

export class RelayComponent<Data, Props={}, State={}> extends React.Component<Props & { data: Data }, State>{
}