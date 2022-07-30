import type { ActionFunction } from "@remix-run/node";
import { redirect, json } from "@remix-run/node";
import { withZod } from "@remix-validated-form/with-zod";
import { ValidatedForm, validationError } from "remix-validated-form";
import { z } from "zod";
import { FormInput } from "~/components/form/FormInput";
import { SubmitButton } from "~/components/form/SubmitButton";
import { outingsService } from "~/utils/grpc.server";
import { getSessionDataFromRequest } from "~/utils/session.server";

export const validator = withZod(
  z.object({
    title: z.string().min(1),
    date: z.preprocess((date) => {
      if (typeof date === "string") {
        const [y, m, d] = date.split("-").map((i) => Number(i));
        return new Date(y, m - 1, d);
      }
      return null;
    }, z.date()),
  })
);

export const action: ActionFunction = async ({ request }) => {
  const sessionData = await getSessionDataFromRequest(request);

  if (sessionData === null) {
    return redirect("/login");
  }

  const { data, error } = await validator.validate(await request.formData());

  if (error) return validationError(error);

  const { title, date } = data;

  let outing;

  try {
    outing = await outingsService.createOuting(sessionData.jwt, title, date);
  } catch (error) {
    console.error(error);
    return json({ error: "Outing creation failed" });
  }

  return redirect(`/outings/${outing.id}`);
};

export default function NewOuting() {
  return (
    <main className="flex flex-col gap-y-10 max-w-[20rem] mx-auto">
      <ValidatedForm validator={validator} method="post">
        <FormInput name="title" label="title" />
        <FormInput name="date" label="date" type="date" />
        <SubmitButton
          className="mt-3"
          submit="create outing"
          submitting="creating outing..."
        />
      </ValidatedForm>
    </main>
  );
}
