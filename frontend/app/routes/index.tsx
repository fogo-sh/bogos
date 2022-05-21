import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { outings } from "~/utils/grpc.server";

type User = {
  id: number;
  username: string;
  avatarUrl: string;
};

type Photo = {
  id: number;
  url: string;
  title?: string;
};

type Outing = {
  id: number;
  title: string;
  attendees: User[];
  photos: Photo[];
};

type LoaderData = Outing[];

export const loader: LoaderFunction = async () => {
  const listOutingsResponse = await outings.listOutings({});
  invariant(listOutingsResponse);

  const listOfOutings = listOutingsResponse.outings;
  invariant(listOfOutings);

  const data: Outing[] = [];

  for (const outing of listOfOutings) {
    const outingId = outing.id;
    invariant(outingId);

    const outingUsersResponse = await outings.listOutingUsers({ outingId });
    invariant(outingUsersResponse);

    const outingUsers = outingUsersResponse.users;
    invariant(outingUsers);

    const attendees = outingUsers.map((user) => {
      const userId = user.id;
      invariant(userId);

      const username = user.username;
      invariant(username);

      const avatarUrl = user.avatarUrl;
      invariant(avatarUrl);

      return {
        id: userId,
        username,
        avatarUrl,
      };
    });

    const outingPhotosResponse = await outings.listOutingPhotos({ outingId });
    invariant(outingPhotosResponse);

    const outingPhotos = outingPhotosResponse.photos;
    invariant(outingPhotos);

    const photos = outingPhotos.map((photo) => {
      const photoId = photo.id;
      invariant(photoId);

      const url = photo.url;
      invariant(url);

      const title = photo.title;

      return {
        id: photoId,
        url,
        title,
      };
    });

    const title = outing.title;
    invariant(title);

    data.push({ id: outingId, title, attendees, photos });
  }

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
