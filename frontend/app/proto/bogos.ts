import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { UsersClient as _bogos_UsersClient, UsersDefinition as _bogos_UsersDefinition } from './bogos/Users';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  bogos: {
    GetCurrentUserRequest: MessageTypeDefinition
    GetJwtReply: MessageTypeDefinition
    GetJwtRequest: MessageTypeDefinition
    UpdateCurrentUserRequest: MessageTypeDefinition
    User: MessageTypeDefinition
    Users: SubtypeConstructor<typeof grpc.Client, _bogos_UsersClient> & { service: _bogos_UsersDefinition }
  }
  google: {
    protobuf: {
      Timestamp: MessageTypeDefinition
    }
  }
}

