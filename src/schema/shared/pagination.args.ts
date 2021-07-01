import { Length, Max, Min } from 'class-validator';
import { cursorHash } from '../../utils/';
import { ArgsType, Field, Int } from 'type-graphql';

const { minCursorLenght } = cursorHash;

@ArgsType()
export class PaginationArgs {
  @Field(() => Int, { nullable: true })
  @Min(1)
  @Max(100)
  first?: number;

  @Field(() => Int, { nullable: true })
  @Min(1)
  @Max(100)
  last?: number;

  @Field({ nullable: true })
  @Length(minCursorLenght)
  before?: string;

  @Field({ nullable: true })
  @Length(minCursorLenght)
  after?: string;
}
