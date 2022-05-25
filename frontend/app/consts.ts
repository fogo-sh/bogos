const site = {
  sessionSecret: process.env.SITE_SESSION_SECRET ?? "session-secret",
};

export const config = {
  site,
};
