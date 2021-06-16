import 'reflect-metadata';
import { Ctx, FieldResolver, Query, Resolver, Root } from 'type-graphql';
import { Context } from '../../types';
import { Skill } from './skill.model';
import { SkillRank } from './skill-rank.model';
import { SkillArgs } from './skill.args';
import { createBaseResolver } from '../baseResolver';
import { EntityName } from '../../enums';

const SkillBaseResolver = createBaseResolver(
  'skill',
  Skill,
  SkillArgs,
  EntityName.Skill
);

@Resolver(Skill)
export class SkillResolver extends SkillBaseResolver {
  @FieldResolver()
  async ranks(@Root() skill: Skill, @Ctx() ctx: Context): Promise<SkillRank[]> {
    return ctx.prisma.skill.findUnique({ where: { id: skill.id } }).ranks();
  }
}
