import { Field, Int, ObjectType } from 'type-graphql';
import { BaseType } from '../shared/baseType';
import { BaseConnection } from '../shared/pageResponse.type';
import { SkillRank } from '../skills/skill-rank.type';

@ObjectType({ implements: BaseType })
export class Decoration extends BaseType {
  @Field()
  name: string;

  @Field(() => Int)
  rarity: number;

  @Field(() => Int)
  slot: number;

  @Field(() => [SkillRank])
  skills: SkillRank[];
}

@ObjectType()
export class DecorationConnection extends BaseConnection<Decoration>(
  Decoration
) {}
