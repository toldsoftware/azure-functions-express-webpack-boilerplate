Demo how to do the latest stuff using Azure Functions as the host.

## Objectives

- Infinitely Scalable
- Global CDN and Web Apis
- Thin & Fast
- Tiny Boilerplate
- Minimal Codebase
- Feature-Organized Code Structure
- Extremely Fast Build Time (<10 sec)
- Instant Local Debugging
- Minimal Admin (Create Resources & Git Deploy only)


## Tools

- Global CDN for static resources
    - *Global CDN for server-side rendering (for non-user specific content)
- Custom Domain w/ free HTTPS (controlled by Azure CDN)
- GraphQL Server Endpoint


## Demos

- src-server 
    - Simple Function (Code In Place)
    - Static Files
    - Express Function Endpoint Packaged with Webpack
    - Express-GraphQL Endpoint Packed with Webpack
- src-client
    - ReactXP using GraphQL
        - web app
        - *android
        - *ios
- local debug

### Static Files

- Proxies
    - Static: 
        - static/{*file} => fun-static?file={file}
    - Root: 
        - " " => fun-static?file=index.html
- fun-static serves files from static folder
- static folder to contain static files
- Azure CDN
    - Point to azure functions website
    - Query String Pass through
        - It may be possible to rely on cache-control headers
    - Set Custom Domain
    - Use free SSL for HTTPS

### Server Code Debug in VSCode

- tsc -w
- find _test.js in build folder
- Hit F5

### Build

- Server
    - cd /src-server
    - webpack -w
    - files build to fun-*/bundle.js (See webpack.config.ts)
- Client
    - cd /src-client
    - webpack -w
    - files build to static folder

---



### Run locally

- Install ts-node globally
    - npm install ts-node -g
- Run tsnode
    - ts-node src/index-node.ts

### Package

- Package with webpack
    - webpack
- Git Push to Deploy to Azure Functions


### GraphQL

- Example Call
    - https://told-azure-functions-express-webpack-boilerplate.azurewebsites.net/api/graphql
        - query = {hero(id:"123"){id name appearsIn totalCredits}}
        - result = {"result":{"data":{"hero":{"id":"123","name":"Luke","appearsIn":["NEWHOPE"],"totalCredits":5}}}}