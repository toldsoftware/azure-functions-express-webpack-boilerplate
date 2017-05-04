import { buildSchema } from 'graphql';

export const schema = buildSchema(`
type Query {
  test:Human
  hero(id: ID): Human
}

type Human {
  id: ID!
  name: String!
  friends: [Human]
  appearsIn: [Episode]!
  totalCredits: Int
}

enum Episode {
  NEWHOPE
  EMPIRE
  JEDI
}
`);