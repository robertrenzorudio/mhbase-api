import 'reflect-metadata';
import { Field, ID, ObjectType } from 'type-graphql';
import { SkillRankInfo } from './skill-rank.model';

@ObjectType()
export class Skill {
  @Field(() => ID)
  readonly id: number;

  @Field()
  name: string;
}

@ObjectType()
export class SkillInfo extends Skill {
  @Field()
  description: string;

  @Field(() => [SkillRankInfo])
  ranks: SkillRankInfo[];
}
