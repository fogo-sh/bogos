import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { OutingsClient as _bogos_OutingsClient, OutingsDefinition as _bogos_OutingsDefinition } from './bogos/Outings';
import type { UsersClient as _bogos_UsersClient, UsersDefinition as _bogos_UsersDefinition } from './bogos/Users';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  bogos: {
    CreateOutingRequest: MessageTypeDefinition
    GetJwtReply: MessageTypeDefinition
    GetJwtRequest: MessageTypeDefinition
    GetOutingRequest: MessageTypeDefinition
    ListOutingPhotosReply: MessageTypeDefinition
    ListOutingPhotosRequest: MessageTypeDefinition
    ListOutingUsersReply: MessageTypeDefinition
    ListOutingUsersRequest: MessageTypeDefinition
    ListOutingsReply: MessageTypeDefinition
    Outing: MessageTypeDefinition
    OutingAddUserRequest: MessageTypeDefinition
    OutingRemoveUserRequest: MessageTypeDefinition
    Outings: SubtypeConstructor<typeof grpc.Client, _bogos_OutingsClient> & { service: _bogos_OutingsDefinition }
    Photo: MessageTypeDefinition
    UpdateCurrentUserRequest: MessageTypeDefinition
    UpdateOutingRequest: MessageTypeDefinition
    UploadPhotoReply: MessageTypeDefinition
    UploadPhotoRequest: MessageTypeDefinition
    User: MessageTypeDefinition
    Users: SubtypeConstructor<typeof grpc.Client, _bogos_UsersClient> & { service: _bogos_UsersDefinition }
  }
  google: {
    protobuf: {
      Empty: MessageTypeDefinition
      Timestamp: MessageTypeDefinition
    }
  }
}

