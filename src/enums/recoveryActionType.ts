import { registerEnumType } from 'type-graphql';

export enum RecoveryActionType {
  Crouch = 'Crouch',
  Dodge = 'Dodge',
}

registerEnumType(RecoveryActionType, {
  name: 'RecoveryActionType',
  description: 'The action needed to be performed to remove ailment.',
});
