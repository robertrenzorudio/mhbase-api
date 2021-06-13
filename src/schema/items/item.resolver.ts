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
import { createPaginationOptions } from '../../utils/createPaginationOptions';
import { Context } from '../../types';
import { ItemArgs } from './item.args';
import { Item } from './item.model';
import { RateLimit } from '../../middlewares/rateLimit';
import { createItemWhereInput } from '../../utils/createWhereInput';
import { ErrorInterceptor } from '../../middlewares/errorInterceptor';

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
  @UseMiddleware(RateLimit(), ErrorInterceptor)
  async items(@Args() args: ItemArgs, @Ctx() ctx: Context): Promise<Item[]> {
    // If cursor based: prioritize "after" if skip is also given.
    // If both cursor and skip is given, use cursor.
    const paginationOpt = createPaginationOptions({
      take: args.take,
      skip: args.skip,
      before: args.before,
      after: args.after,
    });

    const where = args.query
      ? createItemWhereInput(args.query, args.itemSearchType)
      : undefined;

    return ctx.prisma.item.findMany({
      ...paginationOpt,
      where,
    });
  }
}
