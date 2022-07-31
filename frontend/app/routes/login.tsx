import type { ActionFunction } from "@remix-run/node";
import { withZod } from "@remix-validated-form/with-zod";
import { ValidatedForm, validationError } from "remix-validated-form";
import { z } from "zod";
import { FormInput } from "~/components/form/FormInput";
import { SubmitButton } from "~/components/form/SubmitButton";
import { genAuthMetadata, usersService } from "~/utils/grpc.server";
import { createUserSession } from "~/utils/session.server";

export const validator = withZod(
  z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(1, "Password is required"),
  })
);

export const action: ActionFunction = async ({ request }) => {
  const { formId, data, error } = await validator.validate(
    await request.formData()
  );

  if (error) return validationError(error);

  const { username, password } = data;

  try {
    const { jwt } = await usersService.getJwt({ username, password });
    const currentUser = await usersService.getCurrentUser(
      {},
      { metadata: genAuthMetadata(jwt) }
    );

    return createUserSession(
      {
        jwt,
        userId: currentUser.id,
        username: currentUser.username,
        avatarUrl: currentUser.avatarUrl,
      },
      "/"
    );
  } catch (error) {
    console.error(error);
    return validationError(
      {
        fieldErrors: {
          password: "Login failed",
        },
        formId: formId,
      },
      data
    );
  }
};

export default function Login() {
  return (
    <main className="flex flex-col gap-y-10 max-w-[20rem] mx-auto">
      <ValidatedForm validator={validator} method="post">
        <FormInput name="username" label="username" />
        <FormInput name="password" label="password" type="password" />
        <SubmitButton
          className="mt-3"
          submit="login"
          submitting="logging in..."
        />
      </ValidatedForm>
    </main>
  );
}
