import { NonEmptyArray } from 'type-graphql';
import { SkillResolver } from './skills/skill.resolver';
import { LocationResolver } from './locations/location.resolver';
import { ItemResolver } from './items/item.resolver';
import { AilmentResolver } from './ailments/ailment.resolver';

export const resolvers: NonEmptyArray<Function> | NonEmptyArray<string> = [
  SkillResolver,
  LocationResolver,
  ItemResolver,
  AilmentResolver,
];
