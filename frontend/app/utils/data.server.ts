import type { Outing, Photo, User } from "~/proto/bogos";
import { outingsService, photosService } from "~/utils/grpc.server";

export type EnrichedOuting = Outing & {
  attendees: User[];
  photos: Photo[];
};

export const listOutings = async () => {
  const { outings } = await outingsService.listOutings({});

  const enrichedOutings = [] as EnrichedOuting[];

  for (const outing of outings) {
    const { users: attendees } = await outingsService.listOutingUsers({
      outingId: outing.id,
    });
    const { photos } = await photosService.listOutingPhotos({
      outingId: outing.id,
    });

    enrichedOutings.push({
      ...outing,
      attendees,
      photos,
    });
  }

  return enrichedOutings;
};
