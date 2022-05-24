import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { Outing } from "~/utils/data.server";
import { listOutings } from "~/utils/data.server";

type LoaderData = Outing[];

export const loader: LoaderFunction = async () => {
  const data = await listOutings();
  return json(data);
};

export default function Index() {
  const outings = useLoaderData<LoaderData>();

  return (
    <main className="flex flex-col gap-y-10">
      {outings.map((outing) => (
        <div key={outing.id} className="flex flex-col gap-y-4">
          <div className="flex items-center gap-4">
            <h1 className="text-stone-100 text-2xl">{outing.title}</h1>
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
            {outing.photos.map((photo) => (
              <img key={photo.id} src={photo.url} alt={photo.title} />
            ))}
          </div>
        </div>
      ))}
    </main>
  );
}
