import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { users } from "~/utils/grpc.server";

type User = {
  username: string;
  avatarUrl: string;
};

type Photo = {
  id: string;
  url: string;
  name?: string;
  description?: string;
};

type Outing = {
  id: string;
  name: string;
  attendees: User[];
  photos: Photo[];
};

type LoaderData = Outing[];

const createFakeOuting = (
  name: string,
  attendees: User[],
  photos: Photo[]
): Outing => ({
  id: name,
  name,
  attendees,
  photos,
});

const jack: User = {
  username: "jack",
  avatarUrl: "https://i.pravatar.cc/150?u=jack",
};

const riley: User = {
  username: "riley",
  avatarUrl: "https://i.pravatar.cc/150?u=riley",
};

const ethan: User = {
  username: "dan",
  avatarUrl: "https://i.pravatar.cc/150?u=ethan",
};

const dan: User = {
  username: "dan",
  avatarUrl: "https://i.pravatar.cc/150?u=dan",
};

const josh: User = {
  username: "josh",
  avatarUrl: "https://i.pravatar.cc/150?u=josh",
};

const generateFakePhotos = (seed: string, count: number): Photo[] => {
  const photos: Photo[] = [];
  for (let i = 0; i < count; i++) {
    const id = i.toString();
    const url = `https://picsum.photos/seed/${seed}${i}/200/300`;
    photos.push({ id, url });
  }
  return photos;
};

const fakeData: Outing[] = [
  createFakeOuting(
    "Outing 1",
    [jack, riley, ethan],
    generateFakePhotos("yeet", 17)
  ),
  createFakeOuting(
    "Outing 2",
    [riley, ethan, dan, josh],
    generateFakePhotos("woah", 5)
  ),
  createFakeOuting("Outing 3", [riley, jack], generateFakePhotos("seed", 10)),
  createFakeOuting(
    "Outing 4",
    [jack, riley, ethan],
    generateFakePhotos("nice", 12)
  ),
];

export const loader: LoaderFunction = async () => {
  users.GetJwt({ username: "invalid", password: "invalid" }, (error, resp) => {
    console.log("error", error);
    console.log("resp", resp);
  });

  const data: LoaderData = fakeData;
  return json(data);
};

export default function Index() {
  const outings = useLoaderData<LoaderData>();

  return (
    <main className="flex flex-col gap-y-10">
      {outings.map((outing) => (
        <div key={outing.id} className="flex flex-col gap-y-4">
          <div className="flex items-center gap-4">
            <h1 className="text-stone-100 text-2xl">{outing.name}</h1>
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
              <img key={photo.id} src={photo.url} alt={photo.name} />
            ))}
          </div>
        </div>
      ))}
    </main>
  );
}
