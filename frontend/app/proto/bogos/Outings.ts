// Original file: ../backend/pkg/proto/bogos.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { CreateOutingRequest as _bogos_CreateOutingRequest, CreateOutingRequest__Output as _bogos_CreateOutingRequest__Output } from '../bogos/CreateOutingRequest';
import type { Empty as _google_protobuf_Empty, Empty__Output as _google_protobuf_Empty__Output } from '../google/protobuf/Empty';
import type { GetOutingRequest as _bogos_GetOutingRequest, GetOutingRequest__Output as _bogos_GetOutingRequest__Output } from '../bogos/GetOutingRequest';
import type { ListOutingPhotosReply as _bogos_ListOutingPhotosReply, ListOutingPhotosReply__Output as _bogos_ListOutingPhotosReply__Output } from '../bogos/ListOutingPhotosReply';
import type { ListOutingPhotosRequest as _bogos_ListOutingPhotosRequest, ListOutingPhotosRequest__Output as _bogos_ListOutingPhotosRequest__Output } from '../bogos/ListOutingPhotosRequest';
import type { ListOutingUsersReply as _bogos_ListOutingUsersReply, ListOutingUsersReply__Output as _bogos_ListOutingUsersReply__Output } from '../bogos/ListOutingUsersReply';
import type { ListOutingUsersRequest as _bogos_ListOutingUsersRequest, ListOutingUsersRequest__Output as _bogos_ListOutingUsersRequest__Output } from '../bogos/ListOutingUsersRequest';
import type { ListOutingsReply as _bogos_ListOutingsReply, ListOutingsReply__Output as _bogos_ListOutingsReply__Output } from '../bogos/ListOutingsReply';
import type { Outing as _bogos_Outing, Outing__Output as _bogos_Outing__Output } from '../bogos/Outing';
import type { OutingAddUserRequest as _bogos_OutingAddUserRequest, OutingAddUserRequest__Output as _bogos_OutingAddUserRequest__Output } from '../bogos/OutingAddUserRequest';
import type { OutingRemoveUserRequest as _bogos_OutingRemoveUserRequest, OutingRemoveUserRequest__Output as _bogos_OutingRemoveUserRequest__Output } from '../bogos/OutingRemoveUserRequest';
import type { UpdateOutingRequest as _bogos_UpdateOutingRequest, UpdateOutingRequest__Output as _bogos_UpdateOutingRequest__Output } from '../bogos/UpdateOutingRequest';
import type { UploadPhotoReply as _bogos_UploadPhotoReply, UploadPhotoReply__Output as _bogos_UploadPhotoReply__Output } from '../bogos/UploadPhotoReply';
import type { UploadPhotoRequest as _bogos_UploadPhotoRequest, UploadPhotoRequest__Output as _bogos_UploadPhotoRequest__Output } from '../bogos/UploadPhotoRequest';

export interface OutingsClient extends grpc.Client {
  AddUser(argument: _bogos_OutingAddUserRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  AddUser(argument: _bogos_OutingAddUserRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  AddUser(argument: _bogos_OutingAddUserRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  AddUser(argument: _bogos_OutingAddUserRequest, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  addUser(argument: _bogos_OutingAddUserRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  addUser(argument: _bogos_OutingAddUserRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  addUser(argument: _bogos_OutingAddUserRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  addUser(argument: _bogos_OutingAddUserRequest, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  
  CreateOuting(argument: _bogos_CreateOutingRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_bogos_Outing__Output>): grpc.ClientUnaryCall;
  CreateOuting(argument: _bogos_CreateOutingRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_bogos_Outing__Output>): grpc.ClientUnaryCall;
  CreateOuting(argument: _bogos_CreateOutingRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_bogos_Outing__Output>): grpc.ClientUnaryCall;
  CreateOuting(argument: _bogos_CreateOutingRequest, callback: grpc.requestCallback<_bogos_Outing__Output>): grpc.ClientUnaryCall;
  createOuting(argument: _bogos_CreateOutingRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_bogos_Outing__Output>): grpc.ClientUnaryCall;
  createOuting(argument: _bogos_CreateOutingRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_bogos_Outing__Output>): grpc.ClientUnaryCall;
  createOuting(argument: _bogos_CreateOutingRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_bogos_Outing__Output>): grpc.ClientUnaryCall;
  createOuting(argument: _bogos_CreateOutingRequest, callback: grpc.requestCallback<_bogos_Outing__Output>): grpc.ClientUnaryCall;
  
  GetOuting(argument: _bogos_GetOutingRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_bogos_Outing__Output>): grpc.ClientUnaryCall;
  GetOuting(argument: _bogos_GetOutingRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_bogos_Outing__Output>): grpc.ClientUnaryCall;
  GetOuting(argument: _bogos_GetOutingRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_bogos_Outing__Output>): grpc.ClientUnaryCall;
  GetOuting(argument: _bogos_GetOutingRequest, callback: grpc.requestCallback<_bogos_Outing__Output>): grpc.ClientUnaryCall;
  getOuting(argument: _bogos_GetOutingRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_bogos_Outing__Output>): grpc.ClientUnaryCall;
  getOuting(argument: _bogos_GetOutingRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_bogos_Outing__Output>): grpc.ClientUnaryCall;
  getOuting(argument: _bogos_GetOutingRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_bogos_Outing__Output>): grpc.ClientUnaryCall;
  getOuting(argument: _bogos_GetOutingRequest, callback: grpc.requestCallback<_bogos_Outing__Output>): grpc.ClientUnaryCall;
  
  ListOutingPhotos(argument: _bogos_ListOutingPhotosRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_bogos_ListOutingPhotosReply__Output>): grpc.ClientUnaryCall;
  ListOutingPhotos(argument: _bogos_ListOutingPhotosRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_bogos_ListOutingPhotosReply__Output>): grpc.ClientUnaryCall;
  ListOutingPhotos(argument: _bogos_ListOutingPhotosRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_bogos_ListOutingPhotosReply__Output>): grpc.ClientUnaryCall;
  ListOutingPhotos(argument: _bogos_ListOutingPhotosRequest, callback: grpc.requestCallback<_bogos_ListOutingPhotosReply__Output>): grpc.ClientUnaryCall;
  listOutingPhotos(argument: _bogos_ListOutingPhotosRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_bogos_ListOutingPhotosReply__Output>): grpc.ClientUnaryCall;
  listOutingPhotos(argument: _bogos_ListOutingPhotosRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_bogos_ListOutingPhotosReply__Output>): grpc.ClientUnaryCall;
  listOutingPhotos(argument: _bogos_ListOutingPhotosRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_bogos_ListOutingPhotosReply__Output>): grpc.ClientUnaryCall;
  listOutingPhotos(argument: _bogos_ListOutingPhotosRequest, callback: grpc.requestCallback<_bogos_ListOutingPhotosReply__Output>): grpc.ClientUnaryCall;
  
  ListOutingUsers(argument: _bogos_ListOutingUsersRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_bogos_ListOutingUsersReply__Output>): grpc.ClientUnaryCall;
  ListOutingUsers(argument: _bogos_ListOutingUsersRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_bogos_ListOutingUsersReply__Output>): grpc.ClientUnaryCall;
  ListOutingUsers(argument: _bogos_ListOutingUsersRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_bogos_ListOutingUsersReply__Output>): grpc.ClientUnaryCall;
  ListOutingUsers(argument: _bogos_ListOutingUsersRequest, callback: grpc.requestCallback<_bogos_ListOutingUsersReply__Output>): grpc.ClientUnaryCall;
  listOutingUsers(argument: _bogos_ListOutingUsersRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_bogos_ListOutingUsersReply__Output>): grpc.ClientUnaryCall;
  listOutingUsers(argument: _bogos_ListOutingUsersRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_bogos_ListOutingUsersReply__Output>): grpc.ClientUnaryCall;
  listOutingUsers(argument: _bogos_ListOutingUsersRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_bogos_ListOutingUsersReply__Output>): grpc.ClientUnaryCall;
  listOutingUsers(argument: _bogos_ListOutingUsersRequest, callback: grpc.requestCallback<_bogos_ListOutingUsersReply__Output>): grpc.ClientUnaryCall;
  
  ListOutings(argument: _google_protobuf_Empty, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_bogos_ListOutingsReply__Output>): grpc.ClientUnaryCall;
  ListOutings(argument: _google_protobuf_Empty, metadata: grpc.Metadata, callback: grpc.requestCallback<_bogos_ListOutingsReply__Output>): grpc.ClientUnaryCall;
  ListOutings(argument: _google_protobuf_Empty, options: grpc.CallOptions, callback: grpc.requestCallback<_bogos_ListOutingsReply__Output>): grpc.ClientUnaryCall;
  ListOutings(argument: _google_protobuf_Empty, callback: grpc.requestCallback<_bogos_ListOutingsReply__Output>): grpc.ClientUnaryCall;
  listOutings(argument: _google_protobuf_Empty, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_bogos_ListOutingsReply__Output>): grpc.ClientUnaryCall;
  listOutings(argument: _google_protobuf_Empty, metadata: grpc.Metadata, callback: grpc.requestCallback<_bogos_ListOutingsReply__Output>): grpc.ClientUnaryCall;
  listOutings(argument: _google_protobuf_Empty, options: grpc.CallOptions, callback: grpc.requestCallback<_bogos_ListOutingsReply__Output>): grpc.ClientUnaryCall;
  listOutings(argument: _google_protobuf_Empty, callback: grpc.requestCallback<_bogos_ListOutingsReply__Output>): grpc.ClientUnaryCall;
  
  RemoveUser(argument: _bogos_OutingRemoveUserRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  RemoveUser(argument: _bogos_OutingRemoveUserRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  RemoveUser(argument: _bogos_OutingRemoveUserRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  RemoveUser(argument: _bogos_OutingRemoveUserRequest, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  removeUser(argument: _bogos_OutingRemoveUserRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  removeUser(argument: _bogos_OutingRemoveUserRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  removeUser(argument: _bogos_OutingRemoveUserRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  removeUser(argument: _bogos_OutingRemoveUserRequest, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  
  UpdateOuting(argument: _bogos_UpdateOutingRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_bogos_Outing__Output>): grpc.ClientUnaryCall;
  UpdateOuting(argument: _bogos_UpdateOutingRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_bogos_Outing__Output>): grpc.ClientUnaryCall;
  UpdateOuting(argument: _bogos_UpdateOutingRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_bogos_Outing__Output>): grpc.ClientUnaryCall;
  UpdateOuting(argument: _bogos_UpdateOutingRequest, callback: grpc.requestCallback<_bogos_Outing__Output>): grpc.ClientUnaryCall;
  updateOuting(argument: _bogos_UpdateOutingRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_bogos_Outing__Output>): grpc.ClientUnaryCall;
  updateOuting(argument: _bogos_UpdateOutingRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_bogos_Outing__Output>): grpc.ClientUnaryCall;
  updateOuting(argument: _bogos_UpdateOutingRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_bogos_Outing__Output>): grpc.ClientUnaryCall;
  updateOuting(argument: _bogos_UpdateOutingRequest, callback: grpc.requestCallback<_bogos_Outing__Output>): grpc.ClientUnaryCall;
  
  UploadPhoto(argument: _bogos_UploadPhotoRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_bogos_UploadPhotoReply__Output>): grpc.ClientUnaryCall;
  UploadPhoto(argument: _bogos_UploadPhotoRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_bogos_UploadPhotoReply__Output>): grpc.ClientUnaryCall;
  UploadPhoto(argument: _bogos_UploadPhotoRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_bogos_UploadPhotoReply__Output>): grpc.ClientUnaryCall;
  UploadPhoto(argument: _bogos_UploadPhotoRequest, callback: grpc.requestCallback<_bogos_UploadPhotoReply__Output>): grpc.ClientUnaryCall;
  uploadPhoto(argument: _bogos_UploadPhotoRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_bogos_UploadPhotoReply__Output>): grpc.ClientUnaryCall;
  uploadPhoto(argument: _bogos_UploadPhotoRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_bogos_UploadPhotoReply__Output>): grpc.ClientUnaryCall;
  uploadPhoto(argument: _bogos_UploadPhotoRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_bogos_UploadPhotoReply__Output>): grpc.ClientUnaryCall;
  uploadPhoto(argument: _bogos_UploadPhotoRequest, callback: grpc.requestCallback<_bogos_UploadPhotoReply__Output>): grpc.ClientUnaryCall;
  
}

export interface OutingsHandlers extends grpc.UntypedServiceImplementation {
  AddUser: grpc.handleUnaryCall<_bogos_OutingAddUserRequest__Output, _google_protobuf_Empty>;
  
  CreateOuting: grpc.handleUnaryCall<_bogos_CreateOutingRequest__Output, _bogos_Outing>;
  
  GetOuting: grpc.handleUnaryCall<_bogos_GetOutingRequest__Output, _bogos_Outing>;
  
  ListOutingPhotos: grpc.handleUnaryCall<_bogos_ListOutingPhotosRequest__Output, _bogos_ListOutingPhotosReply>;
  
  ListOutingUsers: grpc.handleUnaryCall<_bogos_ListOutingUsersRequest__Output, _bogos_ListOutingUsersReply>;
  
  ListOutings: grpc.handleUnaryCall<_google_protobuf_Empty__Output, _bogos_ListOutingsReply>;
  
  RemoveUser: grpc.handleUnaryCall<_bogos_OutingRemoveUserRequest__Output, _google_protobuf_Empty>;
  
  UpdateOuting: grpc.handleUnaryCall<_bogos_UpdateOutingRequest__Output, _bogos_Outing>;
  
  UploadPhoto: grpc.handleUnaryCall<_bogos_UploadPhotoRequest__Output, _bogos_UploadPhotoReply>;
  
}

export interface OutingsDefinition extends grpc.ServiceDefinition {
  AddUser: MethodDefinition<_bogos_OutingAddUserRequest, _google_protobuf_Empty, _bogos_OutingAddUserRequest__Output, _google_protobuf_Empty__Output>
  CreateOuting: MethodDefinition<_bogos_CreateOutingRequest, _bogos_Outing, _bogos_CreateOutingRequest__Output, _bogos_Outing__Output>
  GetOuting: MethodDefinition<_bogos_GetOutingRequest, _bogos_Outing, _bogos_GetOutingRequest__Output, _bogos_Outing__Output>
  ListOutingPhotos: MethodDefinition<_bogos_ListOutingPhotosRequest, _bogos_ListOutingPhotosReply, _bogos_ListOutingPhotosRequest__Output, _bogos_ListOutingPhotosReply__Output>
  ListOutingUsers: MethodDefinition<_bogos_ListOutingUsersRequest, _bogos_ListOutingUsersReply, _bogos_ListOutingUsersRequest__Output, _bogos_ListOutingUsersReply__Output>
  ListOutings: MethodDefinition<_google_protobuf_Empty, _bogos_ListOutingsReply, _google_protobuf_Empty__Output, _bogos_ListOutingsReply__Output>
  RemoveUser: MethodDefinition<_bogos_OutingRemoveUserRequest, _google_protobuf_Empty, _bogos_OutingRemoveUserRequest__Output, _google_protobuf_Empty__Output>
  UpdateOuting: MethodDefinition<_bogos_UpdateOutingRequest, _bogos_Outing, _bogos_UpdateOutingRequest__Output, _bogos_Outing__Output>
  UploadPhoto: MethodDefinition<_bogos_UploadPhotoRequest, _bogos_UploadPhotoReply, _bogos_UploadPhotoRequest__Output, _bogos_UploadPhotoReply__Output>
}
