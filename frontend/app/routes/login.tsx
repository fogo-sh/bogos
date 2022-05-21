import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import { withZod } from "@remix-validated-form/with-zod";
import { ValidatedForm, validationError } from "remix-validated-form";
import invariant from "tiny-invariant";
import { z } from "zod";
import { FormInput } from "~/components/form/FormInput";
import { SubmitButton } from "~/components/form/SubmitButton";
import { users } from "~/utils/grpc.server";

export const validator = withZod(
  z.object({
    username: z.string().nonempty("Username is required"),
    password: z.string().nonempty("Password is required"),
  })
);

export const action: ActionFunction = async ({ request }) => {
  const { formId, data, error } = await validator.validate(
    await request.formData()
  );

  if (error) return validationError(error);

  const { username, password } = data;

  let reply;

  try {
    reply = await users.getJwt({ username, password });
  } catch (error) {
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

  invariant(reply);

  // return createUserSession(user.id, "/");

  return json(reply);
};

export default function Login() {
  const reply = useActionData();

  return (
    <main className="flex flex-col gap-y-10">
      <ValidatedForm validator={validator} method="post">
        <FormInput name="username" label="username" />
        <FormInput name="password" label="password" type="password" />
        <SubmitButton
          className="mt-3"
          submit="login"
          submitting="logging in..."
        />
      </ValidatedForm>
      <code className="text-slate-100 overflow-y-auto">
        reply: <pre>{JSON.stringify(reply, null, 2)}</pre>
      </code>
    </main>
  );
}
