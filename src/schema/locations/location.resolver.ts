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
import { createPaginationOptions } from '../../utils';
import { RateLimit } from '../../middlewares';
import { Context } from '../../types';
import { Camp } from './camp.model';
import { LocationArgs } from './location.args';
import { Location } from './location.model';

@Resolver(Location)
export class LocationResolver {
  @FieldResolver()
  async camps(
    @Root() location: Location,
    @Ctx() ctx: Context
  ): Promise<Camp[]> {
    return ctx.prisma.location
      .findUnique({ where: { id: location.id } })
      .camps();
  }

  @Query(() => Location, { nullable: true })
  @UseMiddleware(RateLimit())
  async location(@Arg('id', () => Int) id: number, @Ctx() ctx: Context) {
    return ctx.prisma.location.findUnique({ where: { id: id } });
  }

  @Query(() => [Location])
  @UseMiddleware(RateLimit())
  async locations(@Args() args: LocationArgs, @Ctx() ctx: Context) {
    const paginationOpt = createPaginationOptions({
      take: args.take,
      skip: args.skip,
      before: args.before,
      after: args.after,
    });

    return ctx.prisma.location.findMany({
      ...paginationOpt,
      where: { name: { contains: args.name } },
    });
  }
}
