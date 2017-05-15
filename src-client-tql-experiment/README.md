## Commands

- Run in Browser
    - `webpack -w`
- Generate Files with Watch
    - `yarn run relay -- --watch`

## Prerequisites

- [ ] Node
- [ ] Yarn
- [ ] Setup Project
    - `npm init`

## Steps to Setup React with Typescript

- Follow:
    - https://github.com/toldsoftware/boilerplate-react-typescript

## Steps to Setup Relay Compiler

- [ ] Install Relay Modern
    - `yarn add react-relay@dev`
    - `yarn add --dev babel-plugin-relay@dev`
    - `yarn add --dev relay-compiler@dev`
- [ ] Add Relay Compiler Script to `package.json`
    - `scripts`
        - `"relay": "relay-compiler --src ./src --schema src/schema.graphql"`
- [ ] Run
    - `yarn run relay -- --watch`

## Steps to Setup Relay Modern


- [ ] Create Relay Modern Environment
    - See `src/relay/environment.ts`
    - https://facebook.github.io/relay/docs/relay-environment.html
- [ ] Create Relay Modern Network
    - See `src/relay/network.ts`
    - https://facebook.github.io/relay/docs/network-layer.html

## References

- https://github.com/toldsoftware/boilerplate-react-typescript
- https://facebook.github.io/relay/docs/relay-modern.html