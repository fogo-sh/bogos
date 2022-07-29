import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData, useNavigate, useParams } from "@remix-run/react";
import invariant from "tiny-invariant";
import Uppy from "@uppy/core";
import { DragDrop } from "@uppy/react";
import AwsS3 from "@uppy/aws-s3";
import { Modal } from "~/components/Modal";
import { listOutings } from "~/utils/data.server";
import type { Outing } from "~/utils/grpc.server";

const uppy = new Uppy({
  restrictions: { maxNumberOfFiles: 1 },
  autoProceed: true,
});

uppy.on("complete", (result) => {
  const url = result.successful[0].uploadURL;
  console.log({ url });
});

type LoaderData = Outing;

export const loader: LoaderFunction = async ({ request, params }) => {
  const outingId = params.outingId;
  invariant(outingId, "outingId is required");

  // TODO route that fetches specific outing rather than fetching all here
  const outings = await listOutings();
  const outing = outings.find((outing) => outing.id === Number(outingId));

  return json(outing);
};

export const action: ActionFunction = async ({ request, params }) => {
  const outingId = params.outingId;
  invariant(outingId, "outingId is required");

  return redirect(`/outings/${outingId}`);
};

export default function UploadPhoto() {
  const outing = useLoaderData<LoaderData>();
  const { outingId } = useParams();

  const navigate = useNavigate();

  return (
    <Modal
      title={`Upload photos to '${outing.title}'`}
      onClose={() => {
        navigate(`/outings/${outingId}`);
      }}
    >
      <DragDrop
        className="mt-3"
        uppy={uppy}
        locale={{
          strings: {
            dropHereOr: "Drop here or %{browse}",
            browse: "browse",
          },
        }}
      />
    </Modal>
  );
}
