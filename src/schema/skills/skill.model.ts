import 'reflect-metadata';
import { Field, ID, ObjectType } from 'type-graphql';
import { SkillRank } from './skill-rank.model';

@ObjectType()
export class Skill {
  @Field(() => ID)
  readonly id: number;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => [SkillRank])
  ranks: SkillRank[];
}
