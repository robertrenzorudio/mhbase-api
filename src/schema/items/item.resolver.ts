import { Context } from 'src/context/context';
import { Arg, Ctx, Int, Query, Resolver } from 'type-graphql';
import { Item } from './item.model';

@Resolver()
export class ItemResolver {
  @Query(() => Item, { nullable: true })
  async item(
    @Arg('id', () => Int) id: number,
    @Ctx() ctx: Context
  ): Promise<Item | null> {
    return ctx.prisma.item.findUnique({ where: { id: id } });
  }

  @Query(() => [Item])
  async items(@Ctx() ctx: Context): Promise<Item[] | null> {
    return ctx.prisma.item.findMany();
  }
}
