import { Length } from 'class-validator';
import { ArgsType, Field } from 'type-graphql';
import { PaginationArgs } from '../pagination/pagination.args';

@ArgsType()
export class ItemArgs extends PaginationArgs {
  @Field({ nullable: true })
  @Length(1)
  name?: string;
}
