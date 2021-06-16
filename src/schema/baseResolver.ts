import 'reflect-metadata';
import {
  Arg,
  Args,
  ClassType,
  Int,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql';
import { RateLimit, ErrorInterceptor } from '../middlewares';
import { EntityName } from '../enums';
import { prisma } from '../db';
import { qsb } from '../utils';

export function createBaseResolver<T extends ClassType, X extends ClassType>(
  name: string,
  returnType: T,
  inputType: X,
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
      @Arg('id', () => Int, { nullable: true }) id?: number,
      @Arg('name', { nullable: true }) name?: string
    ): Promise<any> {
      const { query, value } = qsb.findOne(entity, id, name);
      const res = await prisma.$queryRaw(query, value);

      return res.length ? res[0] : null;
    }

    @Query(() => [returnType], { name: `${name}s` })
    @UseMiddleware(RateLimit(10), ErrorInterceptor)
    async findMany(@Args(() => inputType) args: any): Promise<any> {
      const { query, values } = qsb.findMany({
        entity: entity,
        limit: args.limit,
        before: args.before,
        after: args.after,
        name: args.name,
      });

      return prisma.$queryRaw(query, ...values);
    }
  }

  return BaseResolver;
}
