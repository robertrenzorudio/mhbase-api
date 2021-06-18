import { Field, ID, ObjectType } from 'type-graphql';
import { Cure } from './cure.model';

@ObjectType()
export class Ailment {
  @Field(() => ID)
  readonly id: number;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => Cure)
  cure: Cure;
}
