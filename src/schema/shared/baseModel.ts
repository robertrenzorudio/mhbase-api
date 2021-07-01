import { Field, ID, InterfaceType } from 'type-graphql';

// @ObjectType()
// export class BaseModel {
//   @Field(() => ID)
//   readonly id: number;
// }
@InterfaceType()
export abstract class BaseModel {
  @Field(() => ID)
  readonly id: number;
}
