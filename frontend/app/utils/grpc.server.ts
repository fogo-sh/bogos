import { createChannel, createClient, Metadata } from "nice-grpc";
import type { UsersClient, OutingsClient, PhotosClient } from "~/proto/bogos";
import {
  UsersDefinition,
  OutingsDefinition,
  PhotosDefinition,
} from "~/proto/bogos";
import { config } from "~/consts";
import Long from "long";
import protobufjs from "protobufjs";

// https://github.com/protobufjs/protobuf.js/issues/1745
protobufjs.util.Long = Long;
protobufjs.configure();

const channel = createChannel(config.grpcUrl);

export const genAuthMetadata = (jwt: string) =>
  Metadata({ authorization: jwt });

export const usersService: UsersClient = createClient(UsersDefinition, channel);
export const outingsService: OutingsClient = createClient(
  OutingsDefinition,
  channel
);
export const photosService: PhotosClient = createClient(
  PhotosDefinition,
  channel
);
