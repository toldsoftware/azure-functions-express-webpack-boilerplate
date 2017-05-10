
declare type ID = string;
// declare type String = string;
declare type Int = number;
declare type Float = number;
// declare type Boolean = boolean;
// A Human in Star Wars
declare interface Human {
  id: ID;
  // The Human's Name
  name: String;
  friends?: Human[];
  enemies?: Human[];
  appearsIn: Episode[];
  totalCredits?: Int;
}

declare enum Episode {
  NEWHOPE,
  EMPIRE,
  JEDI,
}

declare interface Character {
  id: ID;
  name: String;
  friends?: Character[];
  appearsIn: Episode[];
}

declare interface Human2 extends Character {
  id: ID;
  name: String;
  friends?: Character[];
  appearsIn: Episode[];
  totalCredits?: Int;
}

declare interface Droid extends Character {
  id: ID;
  name: String;
  friends?: Character[];
  appearsIn: Episode[];
  primaryFunction?: String;
}

// Test Items
declare interface TestIds{
  id: ID;
  idNull?: ID;
  ids: ID[];
  idsNull?: ID[];
}

declare interface TestStrings{
  text: String;
  textNull?: String;
  texts: String[];
  textsNull?: String[];
}

declare interface TestInts{
  one: Int;
  oneNull?: Int;
  many: Int[];
  manyNull?: Int[];
}

declare interface TestFloats{
  one: Float;
  oneNull?: Float;
  many: Float[];
  manyNull?: Float[];
}

declare interface TestBooleans{
  one: Boolean;
  oneNull?: Boolean;
  many: Boolean[];
  manyNull?: Boolean[];
}

declare interface ObjType{
  id: ID;
}

declare interface TestObj{
  one: ObjType;
  oneNull?: ObjType;
  many: ObjType[];
  manyNull?: ObjType[];
  manyDoubleNoNull: ObjType[];
}

declare enum TestEnum{
  FIRST,
  SECOND,
  THIRD,
}





declare interface HumanResolver {
  id: ID | Promise<ID> | (() => ID) | (() => Promise<ID>);
  // The HumanResolver's Name
  name: String | Promise<String> | (() => String) | (() => Promise<String>);
  friends: HumanResolver[] | Promise<HumanResolver[]> | (() => HumanResolver[]) | (() => Promise<HumanResolver[]>);
  enemies: HumanResolver[] | Promise<HumanResolver[]> | (() => HumanResolver[]) | (() => Promise<HumanResolver[]>);
  appearsIn: Episode[] | Promise<Episode[]> | (() => Episode[]) | (() => Promise<Episode[]>);
  totalCredits: Int | Promise<Int> | (() => Int) | (() => Promise<Int>);
}

declare interface CharacterResolver {
  id: ID | Promise<ID> | (() => ID) | (() => Promise<ID>);
  name: String | Promise<String> | (() => String) | (() => Promise<String>);
  friends: CharacterResolver[] | Promise<CharacterResolver[]> | (() => CharacterResolver[]) | (() => Promise<CharacterResolver[]>);
  appearsIn: Episode[] | Promise<Episode[]> | (() => Episode[]) | (() => Promise<Episode[]>);
}

declare interface HumanResolver2Resolver extends CharacterResolver {
  id: ID | Promise<ID> | (() => ID) | (() => Promise<ID>);
  name: String | Promise<String> | (() => String) | (() => Promise<String>);
  friends: CharacterResolver[] | Promise<CharacterResolver[]> | (() => CharacterResolver[]) | (() => Promise<CharacterResolver[]>);
  appearsIn: Episode[] | Promise<Episode[]> | (() => Episode[]) | (() => Promise<Episode[]>);
  totalCredits: Int | Promise<Int> | (() => Int) | (() => Promise<Int>);
}

declare interface DroidResolver extends CharacterResolver {
  id: ID | Promise<ID> | (() => ID) | (() => Promise<ID>);
  name: String | Promise<String> | (() => String) | (() => Promise<String>);
  friends: CharacterResolver[] | Promise<CharacterResolver[]> | (() => CharacterResolver[]) | (() => Promise<CharacterResolver[]>);
  appearsIn: Episode[] | Promise<Episode[]> | (() => Episode[]) | (() => Promise<Episode[]>);
  primaryFunction: String | Promise<String> | (() => String) | (() => Promise<String>);
}

declare interface TestIdsResolver{
  id: ID | Promise<ID> | (() => ID) | (() => Promise<ID>);
  idNull: ID | Promise<ID> | (() => ID) | (() => Promise<ID>);
  ids: ID[] | Promise<ID[]> | (() => ID[]) | (() => Promise<ID[]>);
  idsNull: ID[] | Promise<ID[]> | (() => ID[]) | (() => Promise<ID[]>);
}

declare interface TestStringsResolver{
  text: String | Promise<String> | (() => String) | (() => Promise<String>);
  textNull: String | Promise<String> | (() => String) | (() => Promise<String>);
  texts: String[] | Promise<String[]> | (() => String[]) | (() => Promise<String[]>);
  textsNull: String[] | Promise<String[]> | (() => String[]) | (() => Promise<String[]>);
}

declare interface TestIntsResolver{
  one: Int | Promise<Int> | (() => Int) | (() => Promise<Int>);
  oneNull: Int | Promise<Int> | (() => Int) | (() => Promise<Int>);
  many: Int[] | Promise<Int[]> | (() => Int[]) | (() => Promise<Int[]>);
  manyNull: Int[] | Promise<Int[]> | (() => Int[]) | (() => Promise<Int[]>);
}

declare interface TestFloatsResolver{
  one: Float | Promise<Float> | (() => Float) | (() => Promise<Float>);
  oneNull: Float | Promise<Float> | (() => Float) | (() => Promise<Float>);
  many: Float[] | Promise<Float[]> | (() => Float[]) | (() => Promise<Float[]>);
  manyNull: Float[] | Promise<Float[]> | (() => Float[]) | (() => Promise<Float[]>);
}

declare interface TestBooleansResolver{
  one: Boolean | Promise<Boolean> | (() => Boolean) | (() => Promise<Boolean>);
  oneNull: Boolean | Promise<Boolean> | (() => Boolean) | (() => Promise<Boolean>);
  many: Boolean[] | Promise<Boolean[]> | (() => Boolean[]) | (() => Promise<Boolean[]>);
  manyNull: Boolean[] | Promise<Boolean[]> | (() => Boolean[]) | (() => Promise<Boolean[]>);
}

declare interface ObjTypeResolver{
  id: ID | Promise<ID> | (() => ID) | (() => Promise<ID>);
}

declare interface TestObjResolver{
  one: ObjTypeResolver | Promise<ObjTypeResolver> | (() => ObjTypeResolver) | (() => Promise<ObjTypeResolver>);
  oneNull: ObjTypeResolver | Promise<ObjTypeResolver> | (() => ObjTypeResolver) | (() => Promise<ObjTypeResolver>);
  many: ObjTypeResolver[] | Promise<ObjTypeResolver[]> | (() => ObjTypeResolver[]) | (() => Promise<ObjTypeResolver[]>);
  manyNull: ObjTypeResolver[] | Promise<ObjTypeResolver[]> | (() => ObjTypeResolver[]) | (() => Promise<ObjTypeResolver[]>);
  manyDoubleNoNull: ObjTypeResolver[] | Promise<ObjTypeResolver[]> | (() => ObjTypeResolver[]) | (() => Promise<ObjTypeResolver[]>);
}

declare interface QueryResolver {
  test: HumanResolver | Promise<HumanResolver> | (() => HumanResolver) | (() => Promise<HumanResolver>);
  hero(id: ID): HumanResolver | Promise<HumanResolver> | (() => HumanResolver) | (() => Promise<HumanResolver>);
}

declare interface SchemaResolver {
  query: QueryResolver;
}