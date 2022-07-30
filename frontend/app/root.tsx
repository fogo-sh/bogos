import React from "react";
import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData,
} from "@remix-run/react";

import tailwindStyles from "~/tailwind.css";
import { getSessionDataFromRequest } from "~/utils/session.server";
import { Header } from "./components/Header";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: tailwindStyles },
  { rel: "icon", href: "/favicon.svg" },
];

export const meta: MetaFunction = () => {
  return { title: "bogos" };
};

function Document({
  children,
  currentUser,
}: {
  children: React.ReactNode;
  currentUser?: { username?: string; avatarUrl?: string };
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-stone-900 px-10 pb-10 pt-8">
        <Header currentUser={currentUser} />
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

type LoaderData = {
  username?: string;
  avatarUrl?: string;
};

export const loader: LoaderFunction = async ({ request }) => {
  const sessionData = await getSessionDataFromRequest(request);

  if (sessionData !== null) {
    const data: LoaderData = {
      username: sessionData.username,
      avatarUrl: sessionData.avatarUrl,
    };
    return json(data);
  }

  return json({});
};

export default function App() {
  const data = useLoaderData<LoaderData>();

  return (
    <Document currentUser={data}>
      <Outlet />
    </Document>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  return (
    <Document>
      <h1 className="text-red-500">Oops, something went wrong!</h1>
      <div className="px-3 py-2 border rounded-md  mt-4 bg-stone-50">
        <pre className="text-red-500 font-semibold whitespace-pre-wrap">
          {error.message}
        </pre>
      </div>
    </Document>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  console.error(caught);

  return (
    <Document>
      <h1 className="text-red-500 text-3xl text-center my-2">
        {caught.status} {caught.statusText}
      </h1>
    </Document>
  );
}
