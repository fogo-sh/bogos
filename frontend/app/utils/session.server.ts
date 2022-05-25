import { createCookieSessionStorage, redirect } from "@remix-run/node";
import { z } from "zod";
import { config } from "~/consts";

const SessionDataSchema = z.object({
  jwt: z.string(),
  userId: z.number(),
  username: z.string(),
  avatarUrl: z.string(),
});

type SessionData = z.infer<typeof SessionDataSchema>;

export async function logout(request: Request) {
  const session = await getUserSession(request);
  return redirect("/login", {
    headers: {
      "Set-Cookie": await storage.destroySession(session),
    },
  });
}

export function getUserSession(request: Request) {
  return storage.getSession(request.headers.get("Cookie"));
}

export async function getSessionDataFromRequest(request: Request) {
  const session = await getUserSession(request);
  const sessionData = SessionDataSchema.parse(session);
  return sessionData;
}

if (!config.site.sessionSecret) {
  throw new Error("SITE_SESSION_SECRET must be set");
}

const storage = createCookieSessionStorage({
  cookie: {
    name: "bogos-session",
    secure: process.env.NODE_ENV === "production",
    secrets: [config.site.sessionSecret],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
});

export async function createUserSession(
  sessionData: SessionData,
  redirectTo: string
) {
  const session = await storage.getSession();
  session.set("jwt", sessionData.jwt);
  session.set("userId", sessionData.userId);
  session.set("username", sessionData.username);
  session.set("avatarUrl", sessionData.avatarUrl);

  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await storage.commitSession(session),
    },
  });
}
