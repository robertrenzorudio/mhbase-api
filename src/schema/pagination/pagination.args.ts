import { Max, Min } from 'class-validator';
import { ArgsType, Field, Int } from 'type-graphql';

@ArgsType()
export class PaginationArgs {
  @Field(() => Int, { defaultValue: 25 })
  @Min(1)
  @Max(50)
  take: number;

  // Offset-based pagination.
  @Field(() => Int, { nullable: true })
  @Min(0)
  skip?: number;

  // Cursor-based pagination
  @Field(() => Int, { nullable: true })
  @Min(0)
  before?: number;

  @Field(() => Int, { nullable: true })
  @Min(0)
  after?: number;
}
