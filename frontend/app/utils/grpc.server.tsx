import path from "path";
import { promisify } from "util";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import type { ProtoGrpcType } from "~/proto/bogos";
import type { ListOutingsReply__Output } from "~/proto/bogos/ListOutingsReply";
import type { ListOutingUsersReply__Output } from "~/proto/bogos/ListOutingUsersReply";
import { ListOutingPhotosReply__Output } from "~/proto/bogos/ListOutingPhotosReply";

const PROTO_PATH = path.join(__dirname, "../../backend/pkg/proto/bogos.proto");

const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const { bogos } = grpc.loadPackageDefinition(
  packageDefinition
) as unknown as ProtoGrpcType;

const usersClient = new bogos.Users(
  "localhost:9999",
  grpc.credentials.createInsecure()
);

export const users = {
  getJwt: promisify(usersClient.getJwt.bind(usersClient)),
};

const outingsClient = new bogos.Outings(
  "localhost:9999",
  grpc.credentials.createInsecure()
);

// TODO write util to convert grpc response to what we want here instead of doing it explicitly each time

export function listOutings(): Promise<ListOutingsReply__Output> {
  return new Promise((resolve, reject) =>
    outingsClient.listOutings({}, (err, res) => {
      if (err) {
        reject(err);
      }
      if (res) {
        resolve(res);
      }
      reject("No error, but also no response");
    })
  );
}

export function listOutingUsers(
  outingId: number
): Promise<ListOutingUsersReply__Output> {
  return new Promise((resolve, reject) =>
    outingsClient.listOutingUsers({ outingId }, (err, res) => {
      if (err) {
        reject(err);
      }
      if (res) {
        resolve(res);
      }
      reject("No error, but also no response");
    })
  );
}

export function listOutingPhotos(
  outingId: number
): Promise<ListOutingPhotosReply__Output> {
  return new Promise((resolve, reject) =>
    outingsClient.listOutingPhotos({ outingId }, (err, res) => {
      if (err) {
        reject(err);
      }
      if (res) {
        resolve(res);
      }
      reject("No error, but also no response");
    })
  );
}

export const outingsService = {
  listOutings,
  listOutingUsers,
  listOutingPhotos,
};
