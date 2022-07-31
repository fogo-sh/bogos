/* eslint-disable */
import { CallContext, CallOptions } from "nice-grpc-common";
import { Timestamp } from "./google/protobuf/timestamp";
import { Empty } from "./google/protobuf/empty";
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "bogos";

export interface GetJwtRequest {
  username: string;
  password: string;
}

export interface GetJwtReply {
  jwt: string;
}

export interface UpdateCurrentUserRequest {
  updateDisplayName: boolean;
  displayName?: string | undefined;
  updateAvatarUrl: boolean;
  avatarUrl?: string | undefined;
  updatePassword: boolean;
  password: string;
}

export interface User {
  id: number;
  username: string;
  displayName?: string | undefined;
  avatarUrl?: string | undefined;
  createdAt: Date | undefined;
  updatedAt?: Date | undefined;
}

export interface ListOutingsReply {
  outings: Outing[];
}

export interface ListOutingUsersRequest {
  outingId: number;
}

export interface ListOutingUsersReply {
  users: User[];
}

export interface GetOutingRequest {
  outingId: number;
}

export interface ListUserOutingsRequest {
  userId: number;
}

export interface ListUserOutingsReply {
  outings: Outing[];
}

export interface CreateOutingRequest {
  title: string;
  date: Date | undefined;
}

export interface UpdateOutingRequest {
  outingId: number;
  updateTitle: boolean;
  title: string;
  updateDate: boolean;
  date: Date | undefined;
}

export interface OutingAddUserRequest {
  outingId: number;
  userId: number;
}

export interface OutingRemoveUserRequest {
  outingId: number;
  userId: number;
}

export interface Outing {
  id: number;
  title: string;
  date: Date | undefined;
  createdAt: Date | undefined;
  updatedAt?: Date | undefined;
}

export interface ListOutingPhotosRequest {
  outingId: number;
}

export interface ListOutingPhotosReply {
  photos: Photo[];
}

export interface ListUserPhotosRequest {
  userId: number;
}

export interface ListUserPhotosReply {
  photos: Photo[];
}

export interface UploadPhotoRequest {
  extension: string;
  outingId: number;
}

export interface UploadPhotoReply {
  uploadUrl: string;
  photo: Photo | undefined;
}

export interface DeletePhotoRequest {
  photoId: number;
}

export interface Photo {
  id: number;
  url: string;
  title?: string | undefined;
  createdAt: Date | undefined;
  updatedAt?: Date | undefined;
}

function createBaseGetJwtRequest(): GetJwtRequest {
  return { username: "", password: "" };
}

export const GetJwtRequest = {
  encode(
    message: GetJwtRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.username !== "") {
      writer.uint32(10).string(message.username);
    }
    if (message.password !== "") {
      writer.uint32(18).string(message.password);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetJwtRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetJwtRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.username = reader.string();
          break;
        case 2:
          message.password = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetJwtRequest {
    return {
      username: isSet(object.username) ? String(object.username) : "",
      password: isSet(object.password) ? String(object.password) : "",
    };
  },

  toJSON(message: GetJwtRequest): unknown {
    const obj: any = {};
    message.username !== undefined && (obj.username = message.username);
    message.password !== undefined && (obj.password = message.password);
    return obj;
  },

  fromPartial(object: DeepPartial<GetJwtRequest>): GetJwtRequest {
    const message = createBaseGetJwtRequest();
    message.username = object.username ?? "";
    message.password = object.password ?? "";
    return message;
  },
};

function createBaseGetJwtReply(): GetJwtReply {
  return { jwt: "" };
}

export const GetJwtReply = {
  encode(
    message: GetJwtReply,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.jwt !== "") {
      writer.uint32(10).string(message.jwt);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetJwtReply {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetJwtReply();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.jwt = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetJwtReply {
    return {
      jwt: isSet(object.jwt) ? String(object.jwt) : "",
    };
  },

  toJSON(message: GetJwtReply): unknown {
    const obj: any = {};
    message.jwt !== undefined && (obj.jwt = message.jwt);
    return obj;
  },

  fromPartial(object: DeepPartial<GetJwtReply>): GetJwtReply {
    const message = createBaseGetJwtReply();
    message.jwt = object.jwt ?? "";
    return message;
  },
};

function createBaseUpdateCurrentUserRequest(): UpdateCurrentUserRequest {
  return {
    updateDisplayName: false,
    displayName: undefined,
    updateAvatarUrl: false,
    avatarUrl: undefined,
    updatePassword: false,
    password: "",
  };
}

export const UpdateCurrentUserRequest = {
  encode(
    message: UpdateCurrentUserRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.updateDisplayName === true) {
      writer.uint32(8).bool(message.updateDisplayName);
    }
    if (message.displayName !== undefined) {
      writer.uint32(18).string(message.displayName);
    }
    if (message.updateAvatarUrl === true) {
      writer.uint32(24).bool(message.updateAvatarUrl);
    }
    if (message.avatarUrl !== undefined) {
      writer.uint32(34).string(message.avatarUrl);
    }
    if (message.updatePassword === true) {
      writer.uint32(40).bool(message.updatePassword);
    }
    if (message.password !== "") {
      writer.uint32(50).string(message.password);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): UpdateCurrentUserRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateCurrentUserRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.updateDisplayName = reader.bool();
          break;
        case 2:
          message.displayName = reader.string();
          break;
        case 3:
          message.updateAvatarUrl = reader.bool();
          break;
        case 4:
          message.avatarUrl = reader.string();
          break;
        case 5:
          message.updatePassword = reader.bool();
          break;
        case 6:
          message.password = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateCurrentUserRequest {
    return {
      updateDisplayName: isSet(object.updateDisplayName)
        ? Boolean(object.updateDisplayName)
        : false,
      displayName: isSet(object.displayName)
        ? String(object.displayName)
        : undefined,
      updateAvatarUrl: isSet(object.updateAvatarUrl)
        ? Boolean(object.updateAvatarUrl)
        : false,
      avatarUrl: isSet(object.avatarUrl) ? String(object.avatarUrl) : undefined,
      updatePassword: isSet(object.updatePassword)
        ? Boolean(object.updatePassword)
        : false,
      password: isSet(object.password) ? String(object.password) : "",
    };
  },

  toJSON(message: UpdateCurrentUserRequest): unknown {
    const obj: any = {};
    message.updateDisplayName !== undefined &&
      (obj.updateDisplayName = message.updateDisplayName);
    message.displayName !== undefined &&
      (obj.displayName = message.displayName);
    message.updateAvatarUrl !== undefined &&
      (obj.updateAvatarUrl = message.updateAvatarUrl);
    message.avatarUrl !== undefined && (obj.avatarUrl = message.avatarUrl);
    message.updatePassword !== undefined &&
      (obj.updatePassword = message.updatePassword);
    message.password !== undefined && (obj.password = message.password);
    return obj;
  },

  fromPartial(
    object: DeepPartial<UpdateCurrentUserRequest>
  ): UpdateCurrentUserRequest {
    const message = createBaseUpdateCurrentUserRequest();
    message.updateDisplayName = object.updateDisplayName ?? false;
    message.displayName = object.displayName ?? undefined;
    message.updateAvatarUrl = object.updateAvatarUrl ?? false;
    message.avatarUrl = object.avatarUrl ?? undefined;
    message.updatePassword = object.updatePassword ?? false;
    message.password = object.password ?? "";
    return message;
  },
};

function createBaseUser(): User {
  return {
    id: 0,
    username: "",
    displayName: undefined,
    avatarUrl: undefined,
    createdAt: undefined,
    updatedAt: undefined,
  };
}

export const User = {
  encode(message: User, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).int32(message.id);
    }
    if (message.username !== "") {
      writer.uint32(18).string(message.username);
    }
    if (message.displayName !== undefined) {
      writer.uint32(26).string(message.displayName);
    }
    if (message.avatarUrl !== undefined) {
      writer.uint32(34).string(message.avatarUrl);
    }
    if (message.createdAt !== undefined) {
      Timestamp.encode(
        toTimestamp(message.createdAt),
        writer.uint32(42).fork()
      ).ldelim();
    }
    if (message.updatedAt !== undefined) {
      Timestamp.encode(
        toTimestamp(message.updatedAt),
        writer.uint32(50).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): User {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUser();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.int32();
          break;
        case 2:
          message.username = reader.string();
          break;
        case 3:
          message.displayName = reader.string();
          break;
        case 4:
          message.avatarUrl = reader.string();
          break;
        case 5:
          message.createdAt = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 6:
          message.updatedAt = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): User {
    return {
      id: isSet(object.id) ? Number(object.id) : 0,
      username: isSet(object.username) ? String(object.username) : "",
      displayName: isSet(object.displayName)
        ? String(object.displayName)
        : undefined,
      avatarUrl: isSet(object.avatarUrl) ? String(object.avatarUrl) : undefined,
      createdAt: isSet(object.createdAt)
        ? fromJsonTimestamp(object.createdAt)
        : undefined,
      updatedAt: isSet(object.updatedAt)
        ? fromJsonTimestamp(object.updatedAt)
        : undefined,
    };
  },

  toJSON(message: User): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    message.username !== undefined && (obj.username = message.username);
    message.displayName !== undefined &&
      (obj.displayName = message.displayName);
    message.avatarUrl !== undefined && (obj.avatarUrl = message.avatarUrl);
    message.createdAt !== undefined &&
      (obj.createdAt = message.createdAt.toISOString());
    message.updatedAt !== undefined &&
      (obj.updatedAt = message.updatedAt.toISOString());
    return obj;
  },

  fromPartial(object: DeepPartial<User>): User {
    const message = createBaseUser();
    message.id = object.id ?? 0;
    message.username = object.username ?? "";
    message.displayName = object.displayName ?? undefined;
    message.avatarUrl = object.avatarUrl ?? undefined;
    message.createdAt = object.createdAt ?? undefined;
    message.updatedAt = object.updatedAt ?? undefined;
    return message;
  },
};

function createBaseListOutingsReply(): ListOutingsReply {
  return { outings: [] };
}

export const ListOutingsReply = {
  encode(
    message: ListOutingsReply,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.outings) {
      Outing.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListOutingsReply {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListOutingsReply();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.outings.push(Outing.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListOutingsReply {
    return {
      outings: Array.isArray(object?.outings)
        ? object.outings.map((e: any) => Outing.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ListOutingsReply): unknown {
    const obj: any = {};
    if (message.outings) {
      obj.outings = message.outings.map((e) =>
        e ? Outing.toJSON(e) : undefined
      );
    } else {
      obj.outings = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<ListOutingsReply>): ListOutingsReply {
    const message = createBaseListOutingsReply();
    message.outings = object.outings?.map((e) => Outing.fromPartial(e)) || [];
    return message;
  },
};

function createBaseListOutingUsersRequest(): ListOutingUsersRequest {
  return { outingId: 0 };
}

export const ListOutingUsersRequest = {
  encode(
    message: ListOutingUsersRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.outingId !== 0) {
      writer.uint32(8).int32(message.outingId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ListOutingUsersRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListOutingUsersRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.outingId = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListOutingUsersRequest {
    return {
      outingId: isSet(object.outingId) ? Number(object.outingId) : 0,
    };
  },

  toJSON(message: ListOutingUsersRequest): unknown {
    const obj: any = {};
    message.outingId !== undefined &&
      (obj.outingId = Math.round(message.outingId));
    return obj;
  },

  fromPartial(
    object: DeepPartial<ListOutingUsersRequest>
  ): ListOutingUsersRequest {
    const message = createBaseListOutingUsersRequest();
    message.outingId = object.outingId ?? 0;
    return message;
  },
};

function createBaseListOutingUsersReply(): ListOutingUsersReply {
  return { users: [] };
}

export const ListOutingUsersReply = {
  encode(
    message: ListOutingUsersReply,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.users) {
      User.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ListOutingUsersReply {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListOutingUsersReply();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.users.push(User.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListOutingUsersReply {
    return {
      users: Array.isArray(object?.users)
        ? object.users.map((e: any) => User.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ListOutingUsersReply): unknown {
    const obj: any = {};
    if (message.users) {
      obj.users = message.users.map((e) => (e ? User.toJSON(e) : undefined));
    } else {
      obj.users = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<ListOutingUsersReply>): ListOutingUsersReply {
    const message = createBaseListOutingUsersReply();
    message.users = object.users?.map((e) => User.fromPartial(e)) || [];
    return message;
  },
};

function createBaseGetOutingRequest(): GetOutingRequest {
  return { outingId: 0 };
}

export const GetOutingRequest = {
  encode(
    message: GetOutingRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.outingId !== 0) {
      writer.uint32(8).int32(message.outingId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetOutingRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetOutingRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.outingId = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetOutingRequest {
    return {
      outingId: isSet(object.outingId) ? Number(object.outingId) : 0,
    };
  },

  toJSON(message: GetOutingRequest): unknown {
    const obj: any = {};
    message.outingId !== undefined &&
      (obj.outingId = Math.round(message.outingId));
    return obj;
  },

  fromPartial(object: DeepPartial<GetOutingRequest>): GetOutingRequest {
    const message = createBaseGetOutingRequest();
    message.outingId = object.outingId ?? 0;
    return message;
  },
};

function createBaseListUserOutingsRequest(): ListUserOutingsRequest {
  return { userId: 0 };
}

export const ListUserOutingsRequest = {
  encode(
    message: ListUserOutingsRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.userId !== 0) {
      writer.uint32(8).int32(message.userId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ListUserOutingsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListUserOutingsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.userId = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListUserOutingsRequest {
    return {
      userId: isSet(object.userId) ? Number(object.userId) : 0,
    };
  },

  toJSON(message: ListUserOutingsRequest): unknown {
    const obj: any = {};
    message.userId !== undefined && (obj.userId = Math.round(message.userId));
    return obj;
  },

  fromPartial(
    object: DeepPartial<ListUserOutingsRequest>
  ): ListUserOutingsRequest {
    const message = createBaseListUserOutingsRequest();
    message.userId = object.userId ?? 0;
    return message;
  },
};

function createBaseListUserOutingsReply(): ListUserOutingsReply {
  return { outings: [] };
}

export const ListUserOutingsReply = {
  encode(
    message: ListUserOutingsReply,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.outings) {
      Outing.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ListUserOutingsReply {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListUserOutingsReply();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.outings.push(Outing.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListUserOutingsReply {
    return {
      outings: Array.isArray(object?.outings)
        ? object.outings.map((e: any) => Outing.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ListUserOutingsReply): unknown {
    const obj: any = {};
    if (message.outings) {
      obj.outings = message.outings.map((e) =>
        e ? Outing.toJSON(e) : undefined
      );
    } else {
      obj.outings = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<ListUserOutingsReply>): ListUserOutingsReply {
    const message = createBaseListUserOutingsReply();
    message.outings = object.outings?.map((e) => Outing.fromPartial(e)) || [];
    return message;
  },
};

function createBaseCreateOutingRequest(): CreateOutingRequest {
  return { title: "", date: undefined };
}

export const CreateOutingRequest = {
  encode(
    message: CreateOutingRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.date !== undefined) {
      Timestamp.encode(
        toTimestamp(message.date),
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateOutingRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateOutingRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.title = reader.string();
          break;
        case 2:
          message.date = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateOutingRequest {
    return {
      title: isSet(object.title) ? String(object.title) : "",
      date: isSet(object.date) ? fromJsonTimestamp(object.date) : undefined,
    };
  },

  toJSON(message: CreateOutingRequest): unknown {
    const obj: any = {};
    message.title !== undefined && (obj.title = message.title);
    message.date !== undefined && (obj.date = message.date.toISOString());
    return obj;
  },

  fromPartial(object: DeepPartial<CreateOutingRequest>): CreateOutingRequest {
    const message = createBaseCreateOutingRequest();
    message.title = object.title ?? "";
    message.date = object.date ?? undefined;
    return message;
  },
};

function createBaseUpdateOutingRequest(): UpdateOutingRequest {
  return {
    outingId: 0,
    updateTitle: false,
    title: "",
    updateDate: false,
    date: undefined,
  };
}

export const UpdateOutingRequest = {
  encode(
    message: UpdateOutingRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.outingId !== 0) {
      writer.uint32(8).int32(message.outingId);
    }
    if (message.updateTitle === true) {
      writer.uint32(16).bool(message.updateTitle);
    }
    if (message.title !== "") {
      writer.uint32(26).string(message.title);
    }
    if (message.updateDate === true) {
      writer.uint32(32).bool(message.updateDate);
    }
    if (message.date !== undefined) {
      Timestamp.encode(
        toTimestamp(message.date),
        writer.uint32(42).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateOutingRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateOutingRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.outingId = reader.int32();
          break;
        case 2:
          message.updateTitle = reader.bool();
          break;
        case 3:
          message.title = reader.string();
          break;
        case 4:
          message.updateDate = reader.bool();
          break;
        case 5:
          message.date = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateOutingRequest {
    return {
      outingId: isSet(object.outingId) ? Number(object.outingId) : 0,
      updateTitle: isSet(object.updateTitle)
        ? Boolean(object.updateTitle)
        : false,
      title: isSet(object.title) ? String(object.title) : "",
      updateDate: isSet(object.updateDate) ? Boolean(object.updateDate) : false,
      date: isSet(object.date) ? fromJsonTimestamp(object.date) : undefined,
    };
  },

  toJSON(message: UpdateOutingRequest): unknown {
    const obj: any = {};
    message.outingId !== undefined &&
      (obj.outingId = Math.round(message.outingId));
    message.updateTitle !== undefined &&
      (obj.updateTitle = message.updateTitle);
    message.title !== undefined && (obj.title = message.title);
    message.updateDate !== undefined && (obj.updateDate = message.updateDate);
    message.date !== undefined && (obj.date = message.date.toISOString());
    return obj;
  },

  fromPartial(object: DeepPartial<UpdateOutingRequest>): UpdateOutingRequest {
    const message = createBaseUpdateOutingRequest();
    message.outingId = object.outingId ?? 0;
    message.updateTitle = object.updateTitle ?? false;
    message.title = object.title ?? "";
    message.updateDate = object.updateDate ?? false;
    message.date = object.date ?? undefined;
    return message;
  },
};

function createBaseOutingAddUserRequest(): OutingAddUserRequest {
  return { outingId: 0, userId: 0 };
}

export const OutingAddUserRequest = {
  encode(
    message: OutingAddUserRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.outingId !== 0) {
      writer.uint32(8).int32(message.outingId);
    }
    if (message.userId !== 0) {
      writer.uint32(16).int32(message.userId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): OutingAddUserRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOutingAddUserRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.outingId = reader.int32();
          break;
        case 2:
          message.userId = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): OutingAddUserRequest {
    return {
      outingId: isSet(object.outingId) ? Number(object.outingId) : 0,
      userId: isSet(object.userId) ? Number(object.userId) : 0,
    };
  },

  toJSON(message: OutingAddUserRequest): unknown {
    const obj: any = {};
    message.outingId !== undefined &&
      (obj.outingId = Math.round(message.outingId));
    message.userId !== undefined && (obj.userId = Math.round(message.userId));
    return obj;
  },

  fromPartial(object: DeepPartial<OutingAddUserRequest>): OutingAddUserRequest {
    const message = createBaseOutingAddUserRequest();
    message.outingId = object.outingId ?? 0;
    message.userId = object.userId ?? 0;
    return message;
  },
};

function createBaseOutingRemoveUserRequest(): OutingRemoveUserRequest {
  return { outingId: 0, userId: 0 };
}

export const OutingRemoveUserRequest = {
  encode(
    message: OutingRemoveUserRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.outingId !== 0) {
      writer.uint32(8).int32(message.outingId);
    }
    if (message.userId !== 0) {
      writer.uint32(16).int32(message.userId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): OutingRemoveUserRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOutingRemoveUserRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.outingId = reader.int32();
          break;
        case 2:
          message.userId = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): OutingRemoveUserRequest {
    return {
      outingId: isSet(object.outingId) ? Number(object.outingId) : 0,
      userId: isSet(object.userId) ? Number(object.userId) : 0,
    };
  },

  toJSON(message: OutingRemoveUserRequest): unknown {
    const obj: any = {};
    message.outingId !== undefined &&
      (obj.outingId = Math.round(message.outingId));
    message.userId !== undefined && (obj.userId = Math.round(message.userId));
    return obj;
  },

  fromPartial(
    object: DeepPartial<OutingRemoveUserRequest>
  ): OutingRemoveUserRequest {
    const message = createBaseOutingRemoveUserRequest();
    message.outingId = object.outingId ?? 0;
    message.userId = object.userId ?? 0;
    return message;
  },
};

function createBaseOuting(): Outing {
  return {
    id: 0,
    title: "",
    date: undefined,
    createdAt: undefined,
    updatedAt: undefined,
  };
}

export const Outing = {
  encode(
    message: Outing,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).int32(message.id);
    }
    if (message.title !== "") {
      writer.uint32(18).string(message.title);
    }
    if (message.date !== undefined) {
      Timestamp.encode(
        toTimestamp(message.date),
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.createdAt !== undefined) {
      Timestamp.encode(
        toTimestamp(message.createdAt),
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.updatedAt !== undefined) {
      Timestamp.encode(
        toTimestamp(message.updatedAt),
        writer.uint32(42).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Outing {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOuting();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.int32();
          break;
        case 2:
          message.title = reader.string();
          break;
        case 3:
          message.date = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 4:
          message.createdAt = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 5:
          message.updatedAt = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Outing {
    return {
      id: isSet(object.id) ? Number(object.id) : 0,
      title: isSet(object.title) ? String(object.title) : "",
      date: isSet(object.date) ? fromJsonTimestamp(object.date) : undefined,
      createdAt: isSet(object.createdAt)
        ? fromJsonTimestamp(object.createdAt)
        : undefined,
      updatedAt: isSet(object.updatedAt)
        ? fromJsonTimestamp(object.updatedAt)
        : undefined,
    };
  },

  toJSON(message: Outing): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    message.title !== undefined && (obj.title = message.title);
    message.date !== undefined && (obj.date = message.date.toISOString());
    message.createdAt !== undefined &&
      (obj.createdAt = message.createdAt.toISOString());
    message.updatedAt !== undefined &&
      (obj.updatedAt = message.updatedAt.toISOString());
    return obj;
  },

  fromPartial(object: DeepPartial<Outing>): Outing {
    const message = createBaseOuting();
    message.id = object.id ?? 0;
    message.title = object.title ?? "";
    message.date = object.date ?? undefined;
    message.createdAt = object.createdAt ?? undefined;
    message.updatedAt = object.updatedAt ?? undefined;
    return message;
  },
};

function createBaseListOutingPhotosRequest(): ListOutingPhotosRequest {
  return { outingId: 0 };
}

export const ListOutingPhotosRequest = {
  encode(
    message: ListOutingPhotosRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.outingId !== 0) {
      writer.uint32(8).int32(message.outingId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ListOutingPhotosRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListOutingPhotosRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.outingId = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListOutingPhotosRequest {
    return {
      outingId: isSet(object.outingId) ? Number(object.outingId) : 0,
    };
  },

  toJSON(message: ListOutingPhotosRequest): unknown {
    const obj: any = {};
    message.outingId !== undefined &&
      (obj.outingId = Math.round(message.outingId));
    return obj;
  },

  fromPartial(
    object: DeepPartial<ListOutingPhotosRequest>
  ): ListOutingPhotosRequest {
    const message = createBaseListOutingPhotosRequest();
    message.outingId = object.outingId ?? 0;
    return message;
  },
};

function createBaseListOutingPhotosReply(): ListOutingPhotosReply {
  return { photos: [] };
}

export const ListOutingPhotosReply = {
  encode(
    message: ListOutingPhotosReply,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.photos) {
      Photo.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ListOutingPhotosReply {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListOutingPhotosReply();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.photos.push(Photo.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListOutingPhotosReply {
    return {
      photos: Array.isArray(object?.photos)
        ? object.photos.map((e: any) => Photo.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ListOutingPhotosReply): unknown {
    const obj: any = {};
    if (message.photos) {
      obj.photos = message.photos.map((e) => (e ? Photo.toJSON(e) : undefined));
    } else {
      obj.photos = [];
    }
    return obj;
  },

  fromPartial(
    object: DeepPartial<ListOutingPhotosReply>
  ): ListOutingPhotosReply {
    const message = createBaseListOutingPhotosReply();
    message.photos = object.photos?.map((e) => Photo.fromPartial(e)) || [];
    return message;
  },
};

function createBaseListUserPhotosRequest(): ListUserPhotosRequest {
  return { userId: 0 };
}

export const ListUserPhotosRequest = {
  encode(
    message: ListUserPhotosRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.userId !== 0) {
      writer.uint32(8).int32(message.userId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ListUserPhotosRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListUserPhotosRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.userId = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListUserPhotosRequest {
    return {
      userId: isSet(object.userId) ? Number(object.userId) : 0,
    };
  },

  toJSON(message: ListUserPhotosRequest): unknown {
    const obj: any = {};
    message.userId !== undefined && (obj.userId = Math.round(message.userId));
    return obj;
  },

  fromPartial(
    object: DeepPartial<ListUserPhotosRequest>
  ): ListUserPhotosRequest {
    const message = createBaseListUserPhotosRequest();
    message.userId = object.userId ?? 0;
    return message;
  },
};

function createBaseListUserPhotosReply(): ListUserPhotosReply {
  return { photos: [] };
}

export const ListUserPhotosReply = {
  encode(
    message: ListUserPhotosReply,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.photos) {
      Photo.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListUserPhotosReply {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListUserPhotosReply();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.photos.push(Photo.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListUserPhotosReply {
    return {
      photos: Array.isArray(object?.photos)
        ? object.photos.map((e: any) => Photo.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ListUserPhotosReply): unknown {
    const obj: any = {};
    if (message.photos) {
      obj.photos = message.photos.map((e) => (e ? Photo.toJSON(e) : undefined));
    } else {
      obj.photos = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<ListUserPhotosReply>): ListUserPhotosReply {
    const message = createBaseListUserPhotosReply();
    message.photos = object.photos?.map((e) => Photo.fromPartial(e)) || [];
    return message;
  },
};

function createBaseUploadPhotoRequest(): UploadPhotoRequest {
  return { extension: "", outingId: 0 };
}

export const UploadPhotoRequest = {
  encode(
    message: UploadPhotoRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.extension !== "") {
      writer.uint32(10).string(message.extension);
    }
    if (message.outingId !== 0) {
      writer.uint32(16).int32(message.outingId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UploadPhotoRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUploadPhotoRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.extension = reader.string();
          break;
        case 2:
          message.outingId = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UploadPhotoRequest {
    return {
      extension: isSet(object.extension) ? String(object.extension) : "",
      outingId: isSet(object.outingId) ? Number(object.outingId) : 0,
    };
  },

  toJSON(message: UploadPhotoRequest): unknown {
    const obj: any = {};
    message.extension !== undefined && (obj.extension = message.extension);
    message.outingId !== undefined &&
      (obj.outingId = Math.round(message.outingId));
    return obj;
  },

  fromPartial(object: DeepPartial<UploadPhotoRequest>): UploadPhotoRequest {
    const message = createBaseUploadPhotoRequest();
    message.extension = object.extension ?? "";
    message.outingId = object.outingId ?? 0;
    return message;
  },
};

function createBaseUploadPhotoReply(): UploadPhotoReply {
  return { uploadUrl: "", photo: undefined };
}

export const UploadPhotoReply = {
  encode(
    message: UploadPhotoReply,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.uploadUrl !== "") {
      writer.uint32(10).string(message.uploadUrl);
    }
    if (message.photo !== undefined) {
      Photo.encode(message.photo, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UploadPhotoReply {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUploadPhotoReply();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.uploadUrl = reader.string();
          break;
        case 2:
          message.photo = Photo.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UploadPhotoReply {
    return {
      uploadUrl: isSet(object.uploadUrl) ? String(object.uploadUrl) : "",
      photo: isSet(object.photo) ? Photo.fromJSON(object.photo) : undefined,
    };
  },

  toJSON(message: UploadPhotoReply): unknown {
    const obj: any = {};
    message.uploadUrl !== undefined && (obj.uploadUrl = message.uploadUrl);
    message.photo !== undefined &&
      (obj.photo = message.photo ? Photo.toJSON(message.photo) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<UploadPhotoReply>): UploadPhotoReply {
    const message = createBaseUploadPhotoReply();
    message.uploadUrl = object.uploadUrl ?? "";
    message.photo =
      object.photo !== undefined && object.photo !== null
        ? Photo.fromPartial(object.photo)
        : undefined;
    return message;
  },
};

function createBaseDeletePhotoRequest(): DeletePhotoRequest {
  return { photoId: 0 };
}

export const DeletePhotoRequest = {
  encode(
    message: DeletePhotoRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.photoId !== 0) {
      writer.uint32(8).int32(message.photoId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeletePhotoRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeletePhotoRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.photoId = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DeletePhotoRequest {
    return {
      photoId: isSet(object.photoId) ? Number(object.photoId) : 0,
    };
  },

  toJSON(message: DeletePhotoRequest): unknown {
    const obj: any = {};
    message.photoId !== undefined &&
      (obj.photoId = Math.round(message.photoId));
    return obj;
  },

  fromPartial(object: DeepPartial<DeletePhotoRequest>): DeletePhotoRequest {
    const message = createBaseDeletePhotoRequest();
    message.photoId = object.photoId ?? 0;
    return message;
  },
};

function createBasePhoto(): Photo {
  return {
    id: 0,
    url: "",
    title: undefined,
    createdAt: undefined,
    updatedAt: undefined,
  };
}

export const Photo = {
  encode(message: Photo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).int32(message.id);
    }
    if (message.url !== "") {
      writer.uint32(18).string(message.url);
    }
    if (message.title !== undefined) {
      writer.uint32(26).string(message.title);
    }
    if (message.createdAt !== undefined) {
      Timestamp.encode(
        toTimestamp(message.createdAt),
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.updatedAt !== undefined) {
      Timestamp.encode(
        toTimestamp(message.updatedAt),
        writer.uint32(42).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Photo {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePhoto();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.int32();
          break;
        case 2:
          message.url = reader.string();
          break;
        case 3:
          message.title = reader.string();
          break;
        case 4:
          message.createdAt = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 5:
          message.updatedAt = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Photo {
    return {
      id: isSet(object.id) ? Number(object.id) : 0,
      url: isSet(object.url) ? String(object.url) : "",
      title: isSet(object.title) ? String(object.title) : undefined,
      createdAt: isSet(object.createdAt)
        ? fromJsonTimestamp(object.createdAt)
        : undefined,
      updatedAt: isSet(object.updatedAt)
        ? fromJsonTimestamp(object.updatedAt)
        : undefined,
    };
  },

  toJSON(message: Photo): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    message.url !== undefined && (obj.url = message.url);
    message.title !== undefined && (obj.title = message.title);
    message.createdAt !== undefined &&
      (obj.createdAt = message.createdAt.toISOString());
    message.updatedAt !== undefined &&
      (obj.updatedAt = message.updatedAt.toISOString());
    return obj;
  },

  fromPartial(object: DeepPartial<Photo>): Photo {
    const message = createBasePhoto();
    message.id = object.id ?? 0;
    message.url = object.url ?? "";
    message.title = object.title ?? undefined;
    message.createdAt = object.createdAt ?? undefined;
    message.updatedAt = object.updatedAt ?? undefined;
    return message;
  },
};

export type UsersDefinition = typeof UsersDefinition;
export const UsersDefinition = {
  name: "Users",
  fullName: "bogos.Users",
  methods: {
    getJwt: {
      name: "GetJwt",
      requestType: GetJwtRequest,
      requestStream: false,
      responseType: GetJwtReply,
      responseStream: false,
      options: {},
    },
    getCurrentUser: {
      name: "GetCurrentUser",
      requestType: Empty,
      requestStream: false,
      responseType: User,
      responseStream: false,
      options: {},
    },
    updateCurrentUser: {
      name: "UpdateCurrentUser",
      requestType: UpdateCurrentUserRequest,
      requestStream: false,
      responseType: User,
      responseStream: false,
      options: {},
    },
  },
} as const;

export interface UsersServiceImplementation<CallContextExt = {}> {
  getJwt(
    request: GetJwtRequest,
    context: CallContext & CallContextExt
  ): Promise<DeepPartial<GetJwtReply>>;
  getCurrentUser(
    request: Empty,
    context: CallContext & CallContextExt
  ): Promise<DeepPartial<User>>;
  updateCurrentUser(
    request: UpdateCurrentUserRequest,
    context: CallContext & CallContextExt
  ): Promise<DeepPartial<User>>;
}

export interface UsersClient<CallOptionsExt = {}> {
  getJwt(
    request: DeepPartial<GetJwtRequest>,
    options?: CallOptions & CallOptionsExt
  ): Promise<GetJwtReply>;
  getCurrentUser(
    request: DeepPartial<Empty>,
    options?: CallOptions & CallOptionsExt
  ): Promise<User>;
  updateCurrentUser(
    request: DeepPartial<UpdateCurrentUserRequest>,
    options?: CallOptions & CallOptionsExt
  ): Promise<User>;
}

export type OutingsDefinition = typeof OutingsDefinition;
export const OutingsDefinition = {
  name: "Outings",
  fullName: "bogos.Outings",
  methods: {
    listOutings: {
      name: "ListOutings",
      requestType: Empty,
      requestStream: false,
      responseType: ListOutingsReply,
      responseStream: false,
      options: {},
    },
    listOutingUsers: {
      name: "ListOutingUsers",
      requestType: ListOutingUsersRequest,
      requestStream: false,
      responseType: ListOutingUsersReply,
      responseStream: false,
      options: {},
    },
    getOuting: {
      name: "GetOuting",
      requestType: GetOutingRequest,
      requestStream: false,
      responseType: Outing,
      responseStream: false,
      options: {},
    },
    listUserOutings: {
      name: "ListUserOutings",
      requestType: ListUserOutingsRequest,
      requestStream: false,
      responseType: ListUserOutingsReply,
      responseStream: false,
      options: {},
    },
    createOuting: {
      name: "CreateOuting",
      requestType: CreateOutingRequest,
      requestStream: false,
      responseType: Outing,
      responseStream: false,
      options: {},
    },
    updateOuting: {
      name: "UpdateOuting",
      requestType: UpdateOutingRequest,
      requestStream: false,
      responseType: Outing,
      responseStream: false,
      options: {},
    },
    addUser: {
      name: "AddUser",
      requestType: OutingAddUserRequest,
      requestStream: false,
      responseType: Empty,
      responseStream: false,
      options: {},
    },
    removeUser: {
      name: "RemoveUser",
      requestType: OutingRemoveUserRequest,
      requestStream: false,
      responseType: Empty,
      responseStream: false,
      options: {},
    },
  },
} as const;

export interface OutingsServiceImplementation<CallContextExt = {}> {
  listOutings(
    request: Empty,
    context: CallContext & CallContextExt
  ): Promise<DeepPartial<ListOutingsReply>>;
  listOutingUsers(
    request: ListOutingUsersRequest,
    context: CallContext & CallContextExt
  ): Promise<DeepPartial<ListOutingUsersReply>>;
  getOuting(
    request: GetOutingRequest,
    context: CallContext & CallContextExt
  ): Promise<DeepPartial<Outing>>;
  listUserOutings(
    request: ListUserOutingsRequest,
    context: CallContext & CallContextExt
  ): Promise<DeepPartial<ListUserOutingsReply>>;
  createOuting(
    request: CreateOutingRequest,
    context: CallContext & CallContextExt
  ): Promise<DeepPartial<Outing>>;
  updateOuting(
    request: UpdateOutingRequest,
    context: CallContext & CallContextExt
  ): Promise<DeepPartial<Outing>>;
  addUser(
    request: OutingAddUserRequest,
    context: CallContext & CallContextExt
  ): Promise<DeepPartial<Empty>>;
  removeUser(
    request: OutingRemoveUserRequest,
    context: CallContext & CallContextExt
  ): Promise<DeepPartial<Empty>>;
}

export interface OutingsClient<CallOptionsExt = {}> {
  listOutings(
    request: DeepPartial<Empty>,
    options?: CallOptions & CallOptionsExt
  ): Promise<ListOutingsReply>;
  listOutingUsers(
    request: DeepPartial<ListOutingUsersRequest>,
    options?: CallOptions & CallOptionsExt
  ): Promise<ListOutingUsersReply>;
  getOuting(
    request: DeepPartial<GetOutingRequest>,
    options?: CallOptions & CallOptionsExt
  ): Promise<Outing>;
  listUserOutings(
    request: DeepPartial<ListUserOutingsRequest>,
    options?: CallOptions & CallOptionsExt
  ): Promise<ListUserOutingsReply>;
  createOuting(
    request: DeepPartial<CreateOutingRequest>,
    options?: CallOptions & CallOptionsExt
  ): Promise<Outing>;
  updateOuting(
    request: DeepPartial<UpdateOutingRequest>,
    options?: CallOptions & CallOptionsExt
  ): Promise<Outing>;
  addUser(
    request: DeepPartial<OutingAddUserRequest>,
    options?: CallOptions & CallOptionsExt
  ): Promise<Empty>;
  removeUser(
    request: DeepPartial<OutingRemoveUserRequest>,
    options?: CallOptions & CallOptionsExt
  ): Promise<Empty>;
}

export type PhotosDefinition = typeof PhotosDefinition;
export const PhotosDefinition = {
  name: "Photos",
  fullName: "bogos.Photos",
  methods: {
    listOutingPhotos: {
      name: "ListOutingPhotos",
      requestType: ListOutingPhotosRequest,
      requestStream: false,
      responseType: ListOutingPhotosReply,
      responseStream: false,
      options: {},
    },
    listUserPhotos: {
      name: "ListUserPhotos",
      requestType: ListUserPhotosRequest,
      requestStream: false,
      responseType: ListUserPhotosReply,
      responseStream: false,
      options: {},
    },
    uploadPhoto: {
      name: "UploadPhoto",
      requestType: UploadPhotoRequest,
      requestStream: false,
      responseType: UploadPhotoReply,
      responseStream: false,
      options: {},
    },
    deletePhoto: {
      name: "DeletePhoto",
      requestType: DeletePhotoRequest,
      requestStream: false,
      responseType: Empty,
      responseStream: false,
      options: {},
    },
  },
} as const;

export interface PhotosServiceImplementation<CallContextExt = {}> {
  listOutingPhotos(
    request: ListOutingPhotosRequest,
    context: CallContext & CallContextExt
  ): Promise<DeepPartial<ListOutingPhotosReply>>;
  listUserPhotos(
    request: ListUserPhotosRequest,
    context: CallContext & CallContextExt
  ): Promise<DeepPartial<ListUserPhotosReply>>;
  uploadPhoto(
    request: UploadPhotoRequest,
    context: CallContext & CallContextExt
  ): Promise<DeepPartial<UploadPhotoReply>>;
  deletePhoto(
    request: DeletePhotoRequest,
    context: CallContext & CallContextExt
  ): Promise<DeepPartial<Empty>>;
}

export interface PhotosClient<CallOptionsExt = {}> {
  listOutingPhotos(
    request: DeepPartial<ListOutingPhotosRequest>,
    options?: CallOptions & CallOptionsExt
  ): Promise<ListOutingPhotosReply>;
  listUserPhotos(
    request: DeepPartial<ListUserPhotosRequest>,
    options?: CallOptions & CallOptionsExt
  ): Promise<ListUserPhotosReply>;
  uploadPhoto(
    request: DeepPartial<UploadPhotoRequest>,
    options?: CallOptions & CallOptionsExt
  ): Promise<UploadPhotoReply>;
  deletePhoto(
    request: DeepPartial<DeletePhotoRequest>,
    options?: CallOptions & CallOptionsExt
  ): Promise<Empty>;
}

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

function toTimestamp(date: Date): Timestamp {
  const seconds = date.getTime() / 1_000;
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = t.seconds * 1_000;
  millis += t.nanos / 1_000_000;
  return new Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof Date) {
    return o;
  } else if (typeof o === "string") {
    return new Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
