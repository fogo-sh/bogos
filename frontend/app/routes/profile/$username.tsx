import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import type { Outing, Photo, User } from "~/proto/bogos";
import {
  outingsService,
  photosService,
  usersService,
} from "~/utils/grpc.server";

type LoaderData = {
  user: User;
  outings: Outing[];
  photos: Photo[];
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const username = params.username;
  invariant(username, "username is required");

  const user = await usersService.getUserByUsername({ username });
  const { outings } = await outingsService.listUserOutings({ userId: user.id });
  const { photos } = await photosService.listUserPhotos({ userId: user.id });

  const data: LoaderData = {
    user,
    outings,
    photos,
  };

  return json(data);
};

export default function ProfilePage() {
  const { user, outings, photos } = useLoaderData<LoaderData>();

  return (
    <main className="flex flex-col gap-y-5">
      <h1 className="text-stone-100 text-2xl">{user.username}</h1>
      <h1 className="text-stone-100 text-xl">outings</h1>
      {outings.length === 0 && (
        <p className="text-stone-300 italic opacity-70">no outings</p>
      )}
      {outings.map((outing) => (
        <p key={outing.id}>{outing.title}</p>
      ))}
      <h1 className="text-stone-100 text-xl">photos</h1>
      {photos.length === 0 && (
        <p className="text-stone-300 italic opacity-70">no photos</p>
      )}
      <div className="flex flex-wrap gap-4">
        {photos.map((photo) => (
          <img
            key={photo.id}
            src={photo.url}
            alt={photo.title}
            className="h-64 w-64 object-cover"
          />
        ))}
      </div>
    </main>
  );
}
