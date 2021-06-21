import { Length } from 'class-validator';
import { ArgsType, Field, Int } from 'type-graphql';
import { PaginationArgs } from '../shared';

@ArgsType()
export class ItemArgs extends PaginationArgs {
  @Field({ nullable: true })
  @Length(1)
  name?: string;
}
