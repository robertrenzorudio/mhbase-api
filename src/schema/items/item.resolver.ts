import 'reflect-metadata';
import {
  Arg,
  Args,
  Ctx,
  Int,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql';
import { createPaginationOption } from '../../utils/createPaginationOption';
import { Context } from '../../types';
import { ItemArgs } from './item.args';
import { Item } from './item.model';
import { RateLimit } from '../../middlewares/rateLimit';

@Resolver()
export class ItemResolver {
  @Query(() => Item, { nullable: true })
  @UseMiddleware(RateLimit())
  async item(
    @Arg('id', () => Int) id: number,
    @Ctx() ctx: Context
  ): Promise<Item | null> {
    return ctx.prisma.item.findUnique({ where: { id: id } });
  }

  @Query(() => [Item])
  @UseMiddleware(RateLimit())
  async items(
    @Args() args: ItemArgs,
    @Ctx() ctx: Context
  ): Promise<Item[] | null> {
    // If cursor based: prioritize "after" if both is given.
    // If both cursor and skip is given, use cursor.
    const paginationOpt = createPaginationOption({
      take: args.take,
      skip: args.skip,
      before: args.before,
      after: args.after,
    });

    return ctx.prisma.item.findMany({
      ...paginationOpt,
      where: { name: { contains: args.name } },
    });
  }
}
