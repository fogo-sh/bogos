import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { PhotographIcon } from "@heroicons/react/solid";
import type { Outing } from "~/utils/grpc.server";
import { listOutings } from "~/utils/data.server";
import { getSessionDataFromRequest } from "~/utils/session.server";

type LoaderData = {
  outing: Outing;
  isLoggedIn: boolean;
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const outingId = params.outingId;
  invariant(outingId, "outingId is required");

  const outings = await listOutings();
  const outing = outings.find((outing) => outing.id === Number(outingId));

  const sessionData = await getSessionDataFromRequest(request);

  if (!outing) {
    throw new Error(`No outing found with id ${outingId}`);
  }

  const data: LoaderData = {
    outing,
    isLoggedIn: sessionData !== null,
  };

  return json(data);
};

export default function OutingPage() {
  const { outing, isLoggedIn } = useLoaderData<LoaderData>();

  return (
    <>
      <main className="flex flex-col gap-y-10">
        <div key={outing.id} className="flex flex-col gap-y-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-x-8">
              <h1 className="text-stone-100 text-2xl">{outing.title}</h1>
            </div>
            {outing.attendees.map((attendee) => (
              <img
                className="rounded-full h-8"
                key={attendee.username}
                src={attendee.avatarUrl}
                alt={attendee.username}
              />
            ))}
          </div>
          {isLoggedIn && (
            <Link to="./upload-photos">
              <button className="button">
                <PhotographIcon className="text-stone-100 h-4 w-4" />
                upload photos
              </button>
            </Link>
          )}
          <div className="flex flex-wrap gap-4">
            {outing.photos.length === 0 && (
              <p className="text-stone-300 italic text-center opacity-70">
                No photos
              </p>
            )}
            {outing.photos.map((photo) => (
              <img
                key={photo.id}
                src={photo.url}
                alt={photo.title}
                className="h-64 w-64 object-cover"
              />
            ))}
          </div>
        </div>
      </main>
      <Outlet />
    </>
  );
}
