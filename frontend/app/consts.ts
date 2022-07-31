const grpcUrl = process.env.SITE_GRPC_URL ?? "localhost:9999";

const site = {
  sessionSecret: process.env.SITE_SESSION_SECRET ?? "session-secret",
};

export const config = {
  grpcUrl,
  site,
};
