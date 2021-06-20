import 'reflect-metadata';
import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class Element {
  @Field(() => ID)
  readonly id: number;

  @Field()
  name: string;

  @Field(() => [String], { description: 'Monsters who use the element' })
  monsters: string[];
}
