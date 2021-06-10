import 'reflect-metadata';
import { GraphQLScalarType } from 'graphql';
import { Field, ID, Int, ObjectType } from 'type-graphql';
import { JsonValue } from 'type-fest';

const ModifierScalar = new GraphQLScalarType({
  name: 'Modifier',
  description:
    'The Modifier scalar is a JsonObject that describes the stat modifiers ' +
    'granted by a skill rank',
  serialize(value: unknown): JsonValue {
    if (typeof value !== 'object') {
      throw TypeError('ModifierScalar can only serialize JsonObject values.');
    }
    return value as JsonValue;
  },
  parseValue(value: unknown): JsonValue {
    if (typeof value !== 'object') {
      throw new TypeError('ModifierScalar can only parse JsonValue values.');
    }
    return value;
  },
});

@ObjectType()
export class SkillRank {
  @Field(() => ID)
  id: number;

  @Field(() => Int)
  level: number;

  @Field()
  description: string;

  @Field(() => ModifierScalar, { nullable: true })
  modifiers?: JsonValue;

  @Field()
  skillName: string;

  @Field(() => ID)
  skillId: number;
}
