import { Field, ObjectType } from 'type-graphql';
import { BaseType } from '../shared/baseType';
import { BaseConnection } from '../shared/pageResponse.type';
import { Cure } from './cure.type';

@ObjectType({ implements: BaseType })
export class Ailment extends BaseType {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => Cure)
  cure: Cure;
}

@ObjectType()
export class AilmentConnection extends BaseConnection<Ailment>(Ailment) {}
