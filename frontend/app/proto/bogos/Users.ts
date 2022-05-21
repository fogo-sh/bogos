// Original file: ../backend/pkg/proto/bogos.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { Empty as _google_protobuf_Empty, Empty__Output as _google_protobuf_Empty__Output } from '../google/protobuf/Empty';
import type { GetJwtReply as _bogos_GetJwtReply, GetJwtReply__Output as _bogos_GetJwtReply__Output } from '../bogos/GetJwtReply';
import type { GetJwtRequest as _bogos_GetJwtRequest, GetJwtRequest__Output as _bogos_GetJwtRequest__Output } from '../bogos/GetJwtRequest';
import type { UpdateCurrentUserRequest as _bogos_UpdateCurrentUserRequest, UpdateCurrentUserRequest__Output as _bogos_UpdateCurrentUserRequest__Output } from '../bogos/UpdateCurrentUserRequest';
import type { User as _bogos_User, User__Output as _bogos_User__Output } from '../bogos/User';

export interface UsersClient extends grpc.Client {
  GetCurrentUser(argument: _google_protobuf_Empty, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_bogos_User__Output>): grpc.ClientUnaryCall;
  GetCurrentUser(argument: _google_protobuf_Empty, metadata: grpc.Metadata, callback: grpc.requestCallback<_bogos_User__Output>): grpc.ClientUnaryCall;
  GetCurrentUser(argument: _google_protobuf_Empty, options: grpc.CallOptions, callback: grpc.requestCallback<_bogos_User__Output>): grpc.ClientUnaryCall;
  GetCurrentUser(argument: _google_protobuf_Empty, callback: grpc.requestCallback<_bogos_User__Output>): grpc.ClientUnaryCall;
  getCurrentUser(argument: _google_protobuf_Empty, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_bogos_User__Output>): grpc.ClientUnaryCall;
  getCurrentUser(argument: _google_protobuf_Empty, metadata: grpc.Metadata, callback: grpc.requestCallback<_bogos_User__Output>): grpc.ClientUnaryCall;
  getCurrentUser(argument: _google_protobuf_Empty, options: grpc.CallOptions, callback: grpc.requestCallback<_bogos_User__Output>): grpc.ClientUnaryCall;
  getCurrentUser(argument: _google_protobuf_Empty, callback: grpc.requestCallback<_bogos_User__Output>): grpc.ClientUnaryCall;
  
  GetJwt(argument: _bogos_GetJwtRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_bogos_GetJwtReply__Output>): grpc.ClientUnaryCall;
  GetJwt(argument: _bogos_GetJwtRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_bogos_GetJwtReply__Output>): grpc.ClientUnaryCall;
  GetJwt(argument: _bogos_GetJwtRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_bogos_GetJwtReply__Output>): grpc.ClientUnaryCall;
  GetJwt(argument: _bogos_GetJwtRequest, callback: grpc.requestCallback<_bogos_GetJwtReply__Output>): grpc.ClientUnaryCall;
  getJwt(argument: _bogos_GetJwtRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_bogos_GetJwtReply__Output>): grpc.ClientUnaryCall;
  getJwt(argument: _bogos_GetJwtRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_bogos_GetJwtReply__Output>): grpc.ClientUnaryCall;
  getJwt(argument: _bogos_GetJwtRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_bogos_GetJwtReply__Output>): grpc.ClientUnaryCall;
  getJwt(argument: _bogos_GetJwtRequest, callback: grpc.requestCallback<_bogos_GetJwtReply__Output>): grpc.ClientUnaryCall;
  
  UpdateCurrentUser(argument: _bogos_UpdateCurrentUserRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_bogos_User__Output>): grpc.ClientUnaryCall;
  UpdateCurrentUser(argument: _bogos_UpdateCurrentUserRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_bogos_User__Output>): grpc.ClientUnaryCall;
  UpdateCurrentUser(argument: _bogos_UpdateCurrentUserRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_bogos_User__Output>): grpc.ClientUnaryCall;
  UpdateCurrentUser(argument: _bogos_UpdateCurrentUserRequest, callback: grpc.requestCallback<_bogos_User__Output>): grpc.ClientUnaryCall;
  updateCurrentUser(argument: _bogos_UpdateCurrentUserRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_bogos_User__Output>): grpc.ClientUnaryCall;
  updateCurrentUser(argument: _bogos_UpdateCurrentUserRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_bogos_User__Output>): grpc.ClientUnaryCall;
  updateCurrentUser(argument: _bogos_UpdateCurrentUserRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_bogos_User__Output>): grpc.ClientUnaryCall;
  updateCurrentUser(argument: _bogos_UpdateCurrentUserRequest, callback: grpc.requestCallback<_bogos_User__Output>): grpc.ClientUnaryCall;
  
}

export interface UsersHandlers extends grpc.UntypedServiceImplementation {
  GetCurrentUser: grpc.handleUnaryCall<_google_protobuf_Empty__Output, _bogos_User>;
  
  GetJwt: grpc.handleUnaryCall<_bogos_GetJwtRequest__Output, _bogos_GetJwtReply>;
  
  UpdateCurrentUser: grpc.handleUnaryCall<_bogos_UpdateCurrentUserRequest__Output, _bogos_User>;
  
}

export interface UsersDefinition extends grpc.ServiceDefinition {
  GetCurrentUser: MethodDefinition<_google_protobuf_Empty, _bogos_User, _google_protobuf_Empty__Output, _bogos_User__Output>
  GetJwt: MethodDefinition<_bogos_GetJwtRequest, _bogos_GetJwtReply, _bogos_GetJwtRequest__Output, _bogos_GetJwtReply__Output>
  UpdateCurrentUser: MethodDefinition<_bogos_UpdateCurrentUserRequest, _bogos_User, _bogos_UpdateCurrentUserRequest__Output, _bogos_User__Output>
}
