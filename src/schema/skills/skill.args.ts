import { Length } from 'class-validator';
import { ArgsType, Field } from 'type-graphql';
import { PaginationArgs } from '../pagination/pagination.args';

@ArgsType()
export class SkillArgs extends PaginationArgs {
  @Field({ nullable: true })
  @Length(1)
  name?: string;
}
