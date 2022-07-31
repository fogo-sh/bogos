import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import mime from "mime-types";
import { json } from "@remix-run/node";
import {
  useFetcher,
  useLoaderData,
  useNavigate,
  useParams,
} from "@remix-run/react";
import React, { useEffect, useRef, useState } from "react";
import invariant from "tiny-invariant";
import { Modal } from "~/components/Modal";
import { getSessionDataFromRequest } from "~/utils/session.server";
import type { Outing } from "~/proto/bogos";
import {
  genAuthMetadata,
  outingsService,
  photosService,
} from "~/utils/grpc.server";

type LoaderData = Outing;

export const loader: LoaderFunction = async ({ params }) => {
  const outingId = params.outingId;
  invariant(outingId, "outingId is required");

  const outing = await outingsService.getOuting({ outingId: Number(outingId) });

  return json(outing);
};

export const action: ActionFunction = async ({ request, params }) => {
  const sessionData = await getSessionDataFromRequest(request);

  if (sessionData === null) {
    return redirect("/login");
  }

  const outingId = params.outingId;
  invariant(outingId, "outingId is required");

  const formData = await request.formData();
  const types = formData.get("types");

  if (types === null) {
    throw new Response("Bad Request", { status: 400 });
  }

  const extensions = types
    .toString()
    .split(",")
    .map((type) => {
      const extension = mime.extension(type);
      if (extension === false) {
        throw Error("Invalid type");
      }
      return extension;
    });

  const uploadUrls = await Promise.all(
    extensions.map(async (extension) => {
      let uploadPhotoReply;
      try {
        uploadPhotoReply = await photosService.uploadPhoto(
          {
            extension,
            outingId: Number(outingId),
          },
          { metadata: genAuthMetadata(sessionData.jwt) }
        );
      } catch (error) {
        console.error(error);
        throw new Response("Error getting upload URL", { status: 500 });
      }
      return uploadPhotoReply.uploadUrl;
    })
  );

  return json({ uploadUrls });
};

const uploadFiles = async (files: { file: File; uploadUrl: string }[]) => {
  for (const { file, uploadUrl } of files) {
    await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    });
  }
};

export default function UploadPhoto() {
  const outing = useLoaderData<LoaderData>();
  const { outingId } = useParams();

  const fetcher = useFetcher();

  const navigate = useNavigate();

  const input = useRef<HTMLInputElement>(null);
  const [uploads, setUploads] = useState<
    { file: File; objectUrl: string; type: string }[]
  >([]);

  const [uploading, setUploading] = useState<boolean>(false);

  useEffect(() => {
    if (fetcher.data !== undefined && !uploading) {
      uploadFiles(
        uploads.map(({ file }, index) => ({
          file,
          uploadUrl: fetcher.data.uploadUrls[index], // TODO fix any usage
        }))
      );
      setUploading(true);
    }
  }, [fetcher, uploading, uploads]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    setUploads(
      files.map((file) => ({
        file,
        objectUrl: URL.createObjectURL(file),
        type: file.type,
      }))
    );
  };

  const handleUpload = () => {
    fetcher.submit(
      { types: uploads.map(({ type }) => type).join(",") },
      { method: "post" }
    );
  };

  return (
    <Modal
      title={`Upload photos to '${outing.title}'`}
      onClose={() => {
        navigate(`/outings/${outingId}`);
      }}
    >
      <input
        id="file-input"
        ref={input}
        disabled={fetcher.state !== "idle"}
        type="file"
        onChange={onChange}
        multiple
        accept="image/png, image/jpeg"
        className="text-stone-100 mt-3 p-4 border border-stone-100 w-full"
      />
      {uploads.length !== 0 && (
        <>
          <div className="mt-3 flex flex-wrap">
            {uploads.map(({ objectUrl }) => (
              <img
                key={objectUrl}
                src={objectUrl}
                alt="preview of in-flight upload"
                className="object-cover h-24 w-24 m-2 bg-stone-100"
              />
            ))}
          </div>
          <button
            className="button"
            onClick={handleUpload}
            disabled={fetcher.state !== "idle"}
          >
            upload
          </button>
        </>
      )}
    </Modal>
  );
}
