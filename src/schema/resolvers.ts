import { SkillResolver } from './skills/skill.resolver';
import { NonEmptyArray } from 'type-graphql';
import { LocationResolver } from './locations/location.resolver';

export const resolvers: NonEmptyArray<Function> | NonEmptyArray<string> = [
  SkillResolver,
  LocationResolver,
];
