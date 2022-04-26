import path from "path";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import type { ProtoGrpcType } from "~/proto/bogos";

const PROTO_PATH = path.join(__dirname, "../../backend/pkg/proto/bogos.proto");

const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const { bogos } = grpc.loadPackageDefinition(
  packageDefinition
) as unknown as ProtoGrpcType;

export const users = new bogos.Users(
  "localhost:9999",
  grpc.credentials.createInsecure()
);
