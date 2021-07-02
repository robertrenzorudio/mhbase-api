import 'reflect-metadata';
import {
  Arg,
  Args,
  ClassType,
  Ctx,
  ID,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql';
import {
  RateLimit,
  ErrorInterceptor,
  ValidatePaginationArgs,
} from '../../middlewares';
import { EntityName } from '../../enums';
import { prisma } from '../../db';
import { qsb, cursorHash, createConnectionResponse } from '../../utils';
import { Context } from '../../types';
import { PaginationArgs } from './pagination.args';

export function createBaseResolver<
  T extends ClassType,
  X extends ClassType,
  Y extends ClassType
>(
  name: string,
  returnType: T,
  connectionType: X,
  inputType: Y,
  entity: EntityName
) {
  @Resolver({ isAbstract: true })
  abstract class BaseResolver {
    @Query(() => returnType, {
      name: `${name}`,
      nullable: true,
      description:
        `Find one ${name} by id or name.` +
        `If both is given, id will be used.`,
    })
    @UseMiddleware(RateLimit(), ErrorInterceptor)
    async findOne(
      @Arg('id', () => ID, { nullable: true }) id?: number | string,
      @Arg('name', { nullable: true }) name?: string
    ): Promise<any> {
      const { query, value } = qsb.findOne(entity, id, name);
      const res = await prisma.$queryRaw(query, value);

      return res.length ? res[0] : null;
    }

    @Query(() => connectionType, { name: `${name}s` })
    @UseMiddleware(ErrorInterceptor, ValidatePaginationArgs, RateLimit())
    async findMany(
      @Args(() => inputType) args: PaginationArgs,
      @Ctx() ctx: Context
    ): Promise<any> {
      let { first, last, before, after } = args;
      let findManyArgs: qsb.findManyArgs = { entity };

      if (first) {
        findManyArgs.first = first + 1;
      } else if (last) {
        findManyArgs.last = last + 1;
      }

      if (before) {
        if (isNaN((findManyArgs.before = +cursorHash.hashToCursor(before)))) {
          throw { message: `Cursor "${before}" is invalid.`, code: '404' };
        }
      } else if (after) {
        if (isNaN((findManyArgs.after = +cursorHash.hashToCursor(after)))) {
          throw { message: `Cursor "${after}" is invalid.`, code: '404' };
        }
      }

      const { query, values } = qsb.findMany(findManyArgs);

      const data = await prisma.$queryRaw(query, ...values);
      return createConnectionResponse({
        ctx,
        data,
        entity,
        first,
        last,
        before,
        after,
      });
    }
  }
  return BaseResolver;
}
