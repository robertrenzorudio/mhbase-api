import { NonEmptyArray } from 'type-graphql';
import { AilmentResolver } from './ailments/ailment.resolver';
import { DecorationResolver } from './decorations/decoration.resolver';
import { ItemResolver } from './items/item.resolver';
import { LocationResolver } from './locations/location.resolver';
import { SkillResolver } from './skills/skill.resolver';

export const resolvers: NonEmptyArray<Function> | NonEmptyArray<string> = [
  AilmentResolver,
  DecorationResolver,
  ItemResolver,
  LocationResolver,
  SkillResolver,
];
