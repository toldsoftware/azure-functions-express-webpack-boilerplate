declare module 'relay-runtime';

declare module 'react-relay' {
    const graphql: any;
    function createFragmentContainer<T>(component: T, query: string): T;
}