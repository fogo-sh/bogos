import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { listOutings } from "~/utils/data.server";
import type { EnrichedOuting } from "~/utils/data.server";
import { PlusCircleIcon } from "@heroicons/react/solid";

type LoaderData = EnrichedOuting[];

export const loader: LoaderFunction = async () => {
  const data: LoaderData = await listOutings();
  return json(data);
};

export default function Index() {
  const outings = useLoaderData<LoaderData>();

  return (
    <main className="flex flex-col gap-y-4">
      <Link to="/create-outing">
        <button className="button">
          <PlusCircleIcon className="h-3" /> create outing
        </button>
      </Link>
      {outings.length === 0 && (
        <p className="text-stone-100 italic text-center opacity-70">
          No outings
        </p>
      )}
      {outings.map((outing) => (
        <div
          key={outing.id}
          className="flex flex-col gap-y-4 my-4 first-of-type:mt-4"
        >
          <div className="flex items-center gap-4">
            <Link to={`/outings/${outing.id}`}>
              <h1 className="text-stone-300 text-3xl underline hover:text-stone-50">
                {outing.title}
              </h1>
            </Link>
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
              <p className="text-stone-100 italic text-center opacity-70">
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
      ))}
    </main>
  );
}
