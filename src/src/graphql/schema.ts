import { buildSchema } from 'graphql';

export const schema = buildSchema(`
type Query {
  hero(episode: Episode): Character
}

interface Character {
  id: ID!
  name: String!
  friends: [Character]
  appearsIn: [Episode]!
}

type Human implements Character {
  id: ID!
  name: String!
  friends: [Character]
  appearsIn: [Episode]!
  totalCredits: Int
}

enum Episode {
  NEWHOPE
  EMPIRE
  JEDI
}
`);
