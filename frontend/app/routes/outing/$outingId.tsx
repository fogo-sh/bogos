import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import {
  PencilAltIcon,
  PhotographIcon,
  TrashIcon,
} from "@heroicons/react/solid";
import { getSessionDataFromRequest } from "~/utils/session.server";
import { outingsService, photosService } from "~/utils/grpc.server";
import type { Outing, Photo, User } from "~/proto/bogos";
import React, { useState } from "react";
import clsx from "clsx";

type LoaderData = {
  outing: Outing;
  photos: Photo[];
  attendees: User[];
  isLoggedIn: boolean;
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const outingId = params.outingId;
  invariant(outingId, "outingId is required");

  const outing = await outingsService.getOuting({ outingId: Number(outingId) });

  if (!outing) {
    throw new Error(`No outing found with id ${outingId}`);
  }

  const { photos } = await photosService.listOutingPhotos({
    outingId: Number(outingId),
  });
  const { users: attendees } = await outingsService.listOutingUsers({
    outingId: Number(outingId),
  });

  const sessionData = await getSessionDataFromRequest(request);

  const data: LoaderData = {
    outing,
    photos,
    attendees,
    isLoggedIn: sessionData !== null,
  };

  return json(data);
};

export default function OutingPage() {
  const { outing, attendees, photos, isLoggedIn } = useLoaderData<LoaderData>();

  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <main className="flex flex-col gap-y-10">
        <div key={outing.id} className="flex flex-col gap-y-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-x-8">
              <h1 className="text-stone-100 text-2xl">{outing.title}</h1>
            </div>
            {attendees.map((attendee) => (
              <img
                className="rounded-full h-8"
                key={attendee.username}
                src={attendee.avatarUrl}
                alt={attendee.username}
              />
            ))}
          </div>
          {isLoggedIn && (
            <div className="flex gap-x-4">
              {!isEditing && (
                <Link to="./upload-photos">
                  <button className="button">
                    <PhotographIcon className="text-stone-100 h-4 w-4" />
                    upload photos
                  </button>
                </Link>
              )}
              <button
                className="button"
                onClick={() => setIsEditing(!isEditing)}
              >
                <PencilAltIcon className="text-stone-100 h-4 w-4" />
                {isEditing ? "stop editing" : "edit outing"}
              </button>
            </div>
          )}
          <div className="flex flex-wrap gap-4">
            {photos.length === 0 && (
              <p className="text-stone-300 italic text-center opacity-70">
                no photos
              </p>
            )}
            {photos.map((photo) => (
              <React.Fragment key={photo.id}>
                {isEditing ? (
                  <div className="flex flex-col gap-y-2">
                    <button className="button">
                      <TrashIcon className="text-stone-100 h-4 w-4" />
                      delete
                    </button>
                    <img
                      src={photo.url}
                      alt={photo.title}
                      className="h-64 w-64 object-cover"
                    />
                  </div>
                ) : (
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="h-64 w-64 object-cover"
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </main>
      <Outlet />
    </>
  );
}
