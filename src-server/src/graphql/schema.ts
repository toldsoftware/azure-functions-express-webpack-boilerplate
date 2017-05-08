import { buildSchema } from 'graphql';

export const schemaDoc = `
# A Human in Star Wars
type Human {
  id: ID!
  # The Human's Name
  name: String!
  friends: [Human]
  enemies: [Human]
  appearsIn: [Episode]!
  totalCredits: Int
}

enum Episode {
  NEWHOPE
  EMPIRE
  JEDI
}

interface Character {
  id: ID!
  name: String!
  friends: [Character]
  appearsIn: [Episode]!
}

type Human2 implements Character {
  id: ID!
  name: String!
  friends: [Character]
  appearsIn: [Episode]!
  totalCredits: Int
}

type Droid implements Character {
  id: ID!
  name: String!
  friends: [Character]
  appearsIn: [Episode]!
  primaryFunction: String
}

# Test Items
type TestIds{
  id: ID!
  idNull: ID
  ids: [ID]!
  idsNull: [ID]
}

type TestStrings{
  text: String!
  textNull: String
  texts: [String]!
  textsNull: [String]
}

type TestInts{
  one: Int!
  oneNull: Int
  many: [Int]!
  manyNull: [Int]
}

type TestFloats{
  one: Float!
  oneNull: Float
  many: [Float]!
  manyNull: [Float]
}

type TestBooleans{
  one: Boolean!
  oneNull: Boolean
  many: [Boolean]!
  manyNull: [Boolean]
}

type ObjType{
  id:ID!
}

type TestObj{
  one: ObjType!
  oneNull: ObjType
  many: [ObjType]!
  manyNull: [ObjType]
  manyDoubleNoNull: [ObjType!]!
}

enum TestEnum{
  FIRST
  SECOND
  THIRD
}

type Query {
  test:Human
  hero(id: ID): Human
}

schema {
  query: Query
}
`;

export const schema = buildSchema(schemaDoc);
