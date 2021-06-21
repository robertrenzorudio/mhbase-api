import { Length } from 'class-validator';
import { ArgsType, Field } from 'type-graphql';
import { PaginationArgs } from '../shared';

@ArgsType()
export class ElementArgs extends PaginationArgs {
  @Field({ nullable: true })
  @Length(1)
  name?: string;
}
