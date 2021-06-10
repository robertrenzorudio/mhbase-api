import { Context } from 'src/context/context';
import {
  Arg,
  Ctx,
  FieldResolver,
  Int,
  Query,
  Resolver,
  Root,
} from 'type-graphql';
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
  async location(@Arg('id', () => Int) id: number, @Ctx() ctx: Context) {
    return ctx.prisma.location.findUnique({ where: { id: id } });
  }

  @Query(() => [Location])
  async locations(@Ctx() ctx: Context) {
    return ctx.prisma.location.findMany();
  }
}
