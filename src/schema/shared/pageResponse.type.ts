import { ClassType, Field, Int, ObjectType } from 'type-graphql';

@ObjectType()
export class PageInfo {
  @Field({ nullable: true })
  endCursor?: String;

  @Field({ nullable: true })
  startCursor?: String;

  @Field()
  hasNextPage: boolean;

  @Field()
  hasPreviousPage: boolean;
}

export function BaseConnection<NodeType>(NodeType: ClassType<NodeType>) {
  @ObjectType(`${NodeType.name}Edge`)
  class Edge extends BaseEdge<NodeType>(NodeType) {}

  @ObjectType({ isAbstract: true })
  abstract class BaseConnection {
    @Field(() => Int)
    totalCount: number;

    @Field(() => [Edge])
    edges: Edge[];

    @Field()
    pageInfo: PageInfo;
  }
  return BaseConnection;
}

function BaseEdge<NodeType>(NodeType: ClassType<NodeType>) {
  @ObjectType({ isAbstract: true })
  abstract class BaseEdge {
    @Field()
    cursor: string;

    @Field(() => NodeType)
    node: NodeType;
  }
  return BaseEdge;
}
