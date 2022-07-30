import path from "path";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import type { Timestamp } from "~/proto/google/protobuf/Timestamp";
import { z } from "zod";
import type { ProtoGrpcType } from "~/proto/bogos";

const PROTO_PATH = path.join(__dirname, "../../backend/pkg/proto/bogos.proto");

const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const { bogos } = grpc.loadPackageDefinition(
  packageDefinition
) as unknown as ProtoGrpcType;

const StringSchema = z.string();

const UserSchema = z.object({
  id: z.number(),
  username: z.string(),
  avatarUrl: z.string().optional(),
});

export type User = z.infer<typeof UserSchema>;

const PhotoSchema = z.object({
  id: z.number(),
  url: z.string(),
  title: z.string().optional(),
});

export type Photo = z.infer<typeof PhotoSchema>;

const OutingSchema = z.object({
  id: z.number(),
  title: z.string(),
  attendees: z.array(UserSchema).default([] as User[]),
  photos: z.array(PhotoSchema).default([] as Photo[]),
});

export type Outing = z.infer<typeof OutingSchema>;

const UploadPhotoReplySchema = z.object({
  uploadUrl: z.string(),
});

export type UploadPhotoReply = z.infer<typeof UploadPhotoReplySchema>;

function credentialsFromJwt(jwt: string): grpc.CallCredentials {
  const credentials = grpc.credentials.createFromMetadataGenerator(
    (_args, callback) => {
      const metadata: grpc.Metadata = new grpc.Metadata();
      metadata.set("authorization", jwt);
      callback(null, metadata);
    }
  );
  return credentials;
}

// TODO write util to convert grpc response to what we want here instead of doing it explicitly each time

const usersClient = new bogos.Users(
  "localhost:9999",
  grpc.credentials.createInsecure()
);

function getJwt(username: string, password: string): Promise<string> {
  return new Promise((resolve, reject) =>
    usersClient.getJwt({ username, password }, (err, res) => {
      try {
        if (err) {
          reject(err);
        }
        if (res) {
          resolve(StringSchema.parse(res.jwt));
        }
        reject("No error, but also no response");
      } catch (e) {
        reject(e);
      }
    })
  );
}

function getCurrentUser(jwt: string): Promise<User> {
  return new Promise((resolve, reject) =>
    usersClient.getCurrentUser(
      {},
      { credentials: credentialsFromJwt(jwt) },
      (err, res) => {
        try {
          if (err) {
            reject(err);
          }
          if (res) {
            resolve(UserSchema.parse(res));
          }
          reject("No error, but also no response");
        } catch (e) {
          reject(e);
        }
      }
    )
  );
}

export const usersService = { getJwt, getCurrentUser };

const outingsClient = new bogos.Outings(
  "localhost:9999",
  grpc.credentials.createInsecure()
);

export function listOutings(): Promise<Outing[]> {
  return new Promise((resolve, reject) =>
    outingsClient.listOutings({}, (err, res) => {
      try {
        if (err) {
          reject(err);
        }
        if (res) {
          const outings = (res.outings ?? []).map((outing) =>
            OutingSchema.parse(outing)
          );
          resolve(outings);
        }
        reject("No error, but also no response");
      } catch (e) {
        reject(e);
      }
    })
  );
}

export function listOutingUsers(outingId: number): Promise<User[]> {
  return new Promise((resolve, reject) =>
    outingsClient.listOutingUsers({ outingId }, (err, res) => {
      try {
        if (err) {
          reject(err);
        }
        if (res) {
          const users = (res.users ?? []).map((user) => UserSchema.parse(user));
          resolve(users);
        }
        reject("No error, but also no response");
      } catch (e) {
        reject(e);
      }
    })
  );
}

export function listOutingPhotos(outingId: number): Promise<Photo[]> {
  return new Promise((resolve, reject) =>
    outingsClient.listOutingPhotos({ outingId }, (err, res) => {
      try {
        if (err) {
          reject(err);
        }
        if (res) {
          const photos = (res.photos ?? []).map((photo) =>
            PhotoSchema.parse(photo)
          );
          resolve(photos);
        }
        reject("No error, but also no response");
      } catch (e) {
        reject(e);
      }
    })
  );
}

export function createOuting(
  jwt: string,
  title: string,
  date: Date
): Promise<Outing> {
  const timestamp: Timestamp = { seconds: +date };
  return new Promise((resolve, reject) =>
    outingsClient.createOuting(
      { title, date: timestamp },
      { credentials: credentialsFromJwt(jwt) },
      (err, res) => {
        try {
          if (err) {
            reject(err);
          }
          if (res) {
            const outing = OutingSchema.parse(res);
            resolve(outing);
          }
          reject("No error, but also no response");
        } catch (e) {
          reject(e);
        }
      }
    )
  );
}

export function uploadPhoto(
  jwt: string,
  extension: string,
  outingId: number
): Promise<UploadPhotoReply> {
  return new Promise((resolve, reject) =>
    outingsClient.uploadPhoto(
      { extension, outingId },
      { credentials: credentialsFromJwt(jwt) },
      (err, res) => {
        try {
          if (err) {
            reject(err);
          }
          if (res) {
            const uploadPhotoReply = UploadPhotoReplySchema.parse(res);
            resolve(uploadPhotoReply);
          }
          reject("No error, but also no response");
        } catch (e) {
          reject(e);
        }
      }
    )
  );
}

export const outingsService = {
  listOutings,
  listOutingUsers,
  listOutingPhotos,
  createOuting,
  uploadPhoto,
};
