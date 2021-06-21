import { ArgsType, Field } from 'type-graphql';
import { PaginationArgs } from '../shared';

@ArgsType()
export class LocationArgs extends PaginationArgs {
  @Field({ nullable: true })
  name?: string;
}
