import 'reflect-metadata';
import {
  Arg,
  Ctx,
  FieldResolver,
  Int,
  Query,
  Resolver,
  Root,
} from 'type-graphql';
import { Context } from '../../types';
import { Skill } from './skill.model';
import { SkillRank } from './skill-rank.model';

@Resolver(Skill)
export class SkillResolver {
  @FieldResolver()
  async ranks(@Root() skill: Skill, @Ctx() ctx: Context): Promise<SkillRank[]> {
    return ctx.prisma.skill.findUnique({ where: { id: skill.id } }).ranks();
  }

  @Query(() => Skill, { nullable: true })
  async skill(@Arg('id', () => Int) id: number, @Ctx() ctx: Context) {
    return ctx.prisma.skill.findUnique({ where: { id: id } });
  }

  @Query(() => [Skill])
  async skills(@Ctx() ctx: Context) {
    return ctx.prisma.skill.findMany();
  }
}
