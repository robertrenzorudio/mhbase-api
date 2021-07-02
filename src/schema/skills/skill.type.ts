import 'reflect-metadata';
import { Field, ObjectType } from 'type-graphql';
import { BaseType } from '../shared/baseType';
import { BaseConnection } from '../shared/pageResponse.type';
import { SkillRank } from './skill-rank.type';

@ObjectType({ implements: BaseType })
export class Skill extends BaseType {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => [SkillRank])
  ranks: SkillRank[];
}

@ObjectType()
export class SkillConnection extends BaseConnection<Skill>(Skill) {}
