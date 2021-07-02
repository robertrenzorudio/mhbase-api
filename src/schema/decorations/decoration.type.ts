import { Field, ID, Int, ObjectType } from 'type-graphql';
import { SkillRank } from '../skills/skill-rank.model';

@ObjectType()
export class Decoration {
  @Field(() => ID)
  readonly id: number;

  @Field()
  name: string;

  @Field(() => Int)
  rarity: number;

  @Field(() => Int)
  slot: number;

  @Field(() => [SkillRank])
  skills: SkillRank[];
}
