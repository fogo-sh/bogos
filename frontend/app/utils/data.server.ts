import { outingsService } from "~/utils/grpc.server";

export const listOutings = async () => {
  const outings = await outingsService.listOutings();

  for (const outing of outings) {
    const users = await outingsService.listOutingUsers(outing.id);
    outing.attendees = users;

    const photos = await outingsService.listOutingPhotos(outing.id);
    outing.photos = photos;
  }

  return outings;
};
