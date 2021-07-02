import { Field, ID, ObjectType } from 'type-graphql';
import { Cure } from './cure.model';

@ObjectType()
export class Ailment {
  @Field(() => ID)
  readonly id: number;

  @Field()
  name: string;
}

@ObjectType()
export class AilmentInfo extends Ailment {
  @Field()
  description: string;

  @Field(() => Cure)
  cure: Cure;
}
