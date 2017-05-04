

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