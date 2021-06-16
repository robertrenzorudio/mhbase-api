import { Max, Min } from 'class-validator';
import { ArgsType, Field, ID, Int } from 'type-graphql';

@ArgsType()
export class PaginationArgs {
  @Field(() => Int, { defaultValue: 25 })
  @Min(1)
  @Max(50)
  limit: number;

  // Cursor-based pagination
  @Field(() => ID, { nullable: true })
  before?: number;

  @Field(() => ID, { nullable: true })
  after?: number;
}
