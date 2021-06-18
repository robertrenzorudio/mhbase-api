import { ArgsType, Field } from 'type-graphql';
import { PaginationArgs } from '../pagination/pagination.args';

@ArgsType()
export class AilmentArgs extends PaginationArgs {
  @Field({ nullable: true })
  name?: string;
}
