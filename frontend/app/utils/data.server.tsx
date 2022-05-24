import { z } from "zod";
import invariant from "tiny-invariant";
import { outingsService } from "~/utils/grpc.server";

const UserSchema = z.object({
  id: z.number(),
  username: z.string(),
  avatarUrl: z.string(),
});

export type User = z.infer<typeof UserSchema>;

const PhotoSchema = z.object({
  id: z.number(),
  url: z.string(),
  title: z.string().optional(),
});

export type Photo = z.infer<typeof PhotoSchema>;

const OutingSchema = z.object({
  id: z.number(),
  title: z.string(),
  attendees: z.array(UserSchema),
  photos: z.array(PhotoSchema),
});

export type Outing = z.infer<typeof OutingSchema>;

export const listOutings = async () => {
  const { outings: rawOutings } = await outingsService.listOutings();
  invariant(rawOutings, "No outings returned");
  const outings = rawOutings.map((outing) => OutingSchema.parse(outing));

  for (const outing of outings) {
    const { users: rawUsers } = await outingsService.listOutingUsers(outing.id);
    invariant(rawUsers, "No users returned");
    const users = (outing.attendees = rawUsers.map((user) =>
      UserSchema.parse(user)
    ));
    outing.attendees = users;

    const { photos: rawPhotos } = await outingsService.listOutingPhotos(
      outing.id
    );
    invariant(rawPhotos, "No photos returned");

    const photos = rawPhotos.map((photo) => PhotoSchema.parse(photo));
    outing.photos = photos;
  }

  return outings;
};
