
type ID = string;
type String = string;
type Int = number;
type Float = number;
type Boolean = boolean;

// A Human in Star Wars
export interface Human {
    id: ID;
    // The Human's Name
    name: String;
    friends?: Human[];
    enemies?: Human[];
    appearsIn: Episode[];
    totalCredits?: Int;
}

export enum Episode {
    NEWHOPE,
    EMPIRE,
    JEDI,
}

export interface Character {
    id: ID;
    name: String;
    friends?: Character[];
    appearsIn: Episode[];
}

export interface Human2 extends Character {
    id: ID;
    name: String;
    friends?: Character[];
    appearsIn: Episode[];
    totalCredits?: Int;
}

export interface Droid extends Character {
    id: ID;
    name: String;
    friends?: Character[];
    appearsIn: Episode[];
    primaryFunction?: String;
}

// Test Items
export interface TestIds {
    id: ID;
    idNull?: ID;
    ids: ID[];
    idsNull?: ID[];
}

export interface TestStrings {
    text: String;
    textNull?: String;
    texts: String[];
    textsNull?: String[];
}

export interface TestInts {
    one: Int;
    oneNull?: Int;
    many: Int[];
    manyNull?: Int[];
}

export interface TestFloats {
    one: Float;
    oneNull?: Float;
    many: Float[];
    manyNull?: Float[];
}

export interface TestBooleans {
    one: Boolean;
    oneNull?: Boolean;
    many: Boolean[];
    manyNull?: Boolean[];
}

export interface ObjType {
    id: ID;
}

export interface TestObj {
    one: ObjType;
    oneNull?: ObjType;
    many: ObjType[];
    manyNull?: ObjType[];
    manyDoubleNoNull: ObjType[];
}

export enum TestEnum {
    FIRST,
    SECOND,
    THIRD,
}

// Resolvers ------
export interface HumanResolver {
    id: ID | Promise<ID> | (() => ID) | (() => Promise<ID>);
    // The HumanResolver's Name
    name: String | Promise<String> | (() => String) | (() => Promise<String>);
    friends: HumanResolver[] | Promise<HumanResolver[]> | (() => HumanResolver[]) | (() => Promise<HumanResolver[]>);
    enemies: HumanResolver[] | Promise<HumanResolver[]> | (() => HumanResolver[]) | (() => Promise<HumanResolver[]>);
    appearsIn: Episode[] | Promise<Episode[]> | (() => Episode[]) | (() => Promise<Episode[]>);
    totalCredits: Int | Promise<Int> | (() => Int) | (() => Promise<Int>);
}

export interface CharacterResolver {
    id: ID | Promise<ID> | (() => ID) | (() => Promise<ID>);
    name: String | Promise<String> | (() => String) | (() => Promise<String>);
    friends: CharacterResolver[] | Promise<CharacterResolver[]> | (() => CharacterResolver[]) | (() => Promise<CharacterResolver[]>);
    appearsIn: Episode[] | Promise<Episode[]> | (() => Episode[]) | (() => Promise<Episode[]>);
}

export interface HumanResolver2Resolver extends CharacterResolver {
    id: ID | Promise<ID> | (() => ID) | (() => Promise<ID>);
    name: String | Promise<String> | (() => String) | (() => Promise<String>);
    friends: CharacterResolver[] | Promise<CharacterResolver[]> | (() => CharacterResolver[]) | (() => Promise<CharacterResolver[]>);
    appearsIn: Episode[] | Promise<Episode[]> | (() => Episode[]) | (() => Promise<Episode[]>);
    totalCredits: Int | Promise<Int> | (() => Int) | (() => Promise<Int>);
}

export interface DroidResolver extends CharacterResolver {
    id: ID | Promise<ID> | (() => ID) | (() => Promise<ID>);
    name: String | Promise<String> | (() => String) | (() => Promise<String>);
    friends: CharacterResolver[] | Promise<CharacterResolver[]> | (() => CharacterResolver[]) | (() => Promise<CharacterResolver[]>);
    appearsIn: Episode[] | Promise<Episode[]> | (() => Episode[]) | (() => Promise<Episode[]>);
    primaryFunction: String | Promise<String> | (() => String) | (() => Promise<String>);
}

export interface TestIdsResolver {
    id: ID | Promise<ID> | (() => ID) | (() => Promise<ID>);
    idNull: ID | Promise<ID> | (() => ID) | (() => Promise<ID>);
    ids: ID[] | Promise<ID[]> | (() => ID[]) | (() => Promise<ID[]>);
    idsNull: ID[] | Promise<ID[]> | (() => ID[]) | (() => Promise<ID[]>);
}

export interface TestStringsResolver {
    text: String | Promise<String> | (() => String) | (() => Promise<String>);
    textNull: String | Promise<String> | (() => String) | (() => Promise<String>);
    texts: String[] | Promise<String[]> | (() => String[]) | (() => Promise<String[]>);
    textsNull: String[] | Promise<String[]> | (() => String[]) | (() => Promise<String[]>);
}

export interface TestIntsResolver {
    one: Int | Promise<Int> | (() => Int) | (() => Promise<Int>);
    oneNull: Int | Promise<Int> | (() => Int) | (() => Promise<Int>);
    many: Int[] | Promise<Int[]> | (() => Int[]) | (() => Promise<Int[]>);
    manyNull: Int[] | Promise<Int[]> | (() => Int[]) | (() => Promise<Int[]>);
}

export interface TestFloatsResolver {
    one: Float | Promise<Float> | (() => Float) | (() => Promise<Float>);
    oneNull: Float | Promise<Float> | (() => Float) | (() => Promise<Float>);
    many: Float[] | Promise<Float[]> | (() => Float[]) | (() => Promise<Float[]>);
    manyNull: Float[] | Promise<Float[]> | (() => Float[]) | (() => Promise<Float[]>);
}

export interface TestBooleansResolver {
    one: Boolean | Promise<Boolean> | (() => Boolean) | (() => Promise<Boolean>);
    oneNull: Boolean | Promise<Boolean> | (() => Boolean) | (() => Promise<Boolean>);
    many: Boolean[] | Promise<Boolean[]> | (() => Boolean[]) | (() => Promise<Boolean[]>);
    manyNull: Boolean[] | Promise<Boolean[]> | (() => Boolean[]) | (() => Promise<Boolean[]>);
}

export interface ObjTypeResolver {
    id: ID | Promise<ID> | (() => ID) | (() => Promise<ID>);
}

export interface TestObjResolver {
    one: ObjTypeResolver | Promise<ObjTypeResolver> | (() => ObjTypeResolver) | (() => Promise<ObjTypeResolver>);
    oneNull: ObjTypeResolver | Promise<ObjTypeResolver> | (() => ObjTypeResolver) | (() => Promise<ObjTypeResolver>);
    many: ObjTypeResolver[] | Promise<ObjTypeResolver[]> | (() => ObjTypeResolver[]) | (() => Promise<ObjTypeResolver[]>);
    manyNull: ObjTypeResolver[] | Promise<ObjTypeResolver[]> | (() => ObjTypeResolver[]) | (() => Promise<ObjTypeResolver[]>);
    manyDoubleNoNull: ObjTypeResolver[] | Promise<ObjTypeResolver[]> | (() => ObjTypeResolver[]) | (() => Promise<ObjTypeResolver[]>);
}

export interface QueryResolver {
    test: HumanResolver | Promise<HumanResolver> | (() => HumanResolver) | (() => Promise<HumanResolver>);
    hero(id: ID): HumanResolver | Promise<HumanResolver> | (() => HumanResolver) | (() => Promise<HumanResolver>);
}

export interface SchemaResolver {
    query: QueryResolver;
}
