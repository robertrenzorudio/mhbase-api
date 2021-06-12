import 'reflect-metadata';
import {
  Arg,
  Args,
  Ctx,
  FieldResolver,
  Int,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from 'type-graphql';
import { Context } from '../../types';
import { Skill } from './skill.model';
import { SkillRank } from './skill-rank.model';
import { RateLimit } from '../../middlewares/rateLimit';
import { createPaginationOption } from '../../utils/createPaginationOption';
import { SkillArgs } from './skill.args';

@Resolver(Skill)
export class SkillResolver {
  @FieldResolver()
  async ranks(@Root() skill: Skill, @Ctx() ctx: Context): Promise<SkillRank[]> {
    return ctx.prisma.skill.findUnique({ where: { id: skill.id } }).ranks();
  }

  @Query(() => Skill, { nullable: true })
  @UseMiddleware(RateLimit())
  async skill(@Arg('id', () => Int) id: number, @Ctx() ctx: Context) {
    return ctx.prisma.skill.findUnique({ where: { id: id } });
  }

  @Query(() => [Skill])
  @UseMiddleware(RateLimit())
  async skills(@Args() args: SkillArgs, @Ctx() ctx: Context) {
    const paginationOpt = createPaginationOption({
      take: args.take,
      skip: args.skip,
      before: args.before,
      after: args.after,
    });

    return ctx.prisma.skill.findMany({
      ...paginationOpt,
      where: { name: { contains: args.name } },
    });
  }
}
