import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { PhotographIcon } from "@heroicons/react/solid";
import type { Outing } from "~/utils/grpc.server";
import { listOutings } from "~/utils/data.server";

type LoaderData = Outing;

export const loader: LoaderFunction = async ({ params }) => {
  const outingId = params.outingId;
  invariant(outingId, "outingId is required");

  // TODO route that fetches specific outing rather than fetching all here
  const outings = await listOutings();
  const outing = outings.find((outing) => outing.id === Number(outingId));

  if (!outing) {
    throw new Error(`No outing found with id ${outingId}`);
  }

  return json(outing);
};

export default function OutingPage() {
  const outing = useLoaderData<LoaderData>();

  return (
    <>
      <main className="flex flex-col gap-y-10">
        <div key={outing.id} className="flex flex-col gap-y-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-x-8">
              <h1 className="text-stone-100 text-2xl">{outing.title}</h1>
              <Link
                to="./upload-photos"
                className="text-stone-100 text-xl border border-stone-100 rounded-sm pr-3 pl-2.5 py-1 flex items-center gap-2"
              >
                <PhotographIcon className="text-slate-100 h-4 w-4" />
                upload photos
              </Link>
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
          <div className="flex flex-wrap gap-4">
            {outing.photos.length === 0 && (
              <p className="text-slate-100 italic text-center opacity-70">
                No photos
              </p>
            )}
            {outing.photos.map((photo) => (
              <img key={photo.id} src={photo.url} alt={photo.title} />
            ))}
          </div>
        </div>
      </main>
      <Outlet />
    </>
  );
}
