import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import type { Outing } from "~/utils/grpc.server";
import { listOutings } from "~/utils/data.server";
import { PlusCircleIcon } from "@heroicons/react/solid";

type LoaderData = Outing[];

export const loader: LoaderFunction = async () => {
  const data = await listOutings();
  return json(data);
};

export default function Index() {
  const outings = useLoaderData<LoaderData>();

  return (
    <main className="flex flex-col gap-y-10">
      <Link to="/create-outing">
        <button className="button flex items-center gap-x-2">
          <PlusCircleIcon className="h-3" /> create outing
        </button>
      </Link>
      {outings.length === 0 && (
        <p className="text-stone-100 italic text-center opacity-70">
          No outings
        </p>
      )}
      {outings.map((outing) => (
        <div key={outing.id} className="flex flex-col gap-y-4">
          <div className="flex items-center gap-4">
            <Link to={`/outings/${outing.id}`}>
              <h1 className="text-stone-100 text-2xl">{outing.title}</h1>
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
