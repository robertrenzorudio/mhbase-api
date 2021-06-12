import {
  Arg,
  Ctx,
  FieldResolver,
  Int,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from 'type-graphql';
import { RateLimit } from '../../middlewares/rateLimit';
import { Context } from '../../types';
import { Camp } from './camp.model';
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
  async locations(@Ctx() ctx: Context) {
    return ctx.prisma.location.findMany();
  }
}
