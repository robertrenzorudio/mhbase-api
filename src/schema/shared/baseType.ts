import { Field, ID, InterfaceType } from 'type-graphql';

@InterfaceType()
export abstract class BaseType {
  @Field(() => ID)
  readonly id: number;
}
