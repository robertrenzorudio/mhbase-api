import { SkillsResolver } from './skills/skills.resolver';
import { NonEmptyArray } from 'type-graphql';

export const resolvers: NonEmptyArray<Function> | NonEmptyArray<string> = [
  SkillsResolver,
];
