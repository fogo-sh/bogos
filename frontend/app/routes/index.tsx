import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";

// type LoaderData = null;

export const loader: LoaderFunction = async () => {
  return json(null);
};

export default function Index() {
  // const data = useLoaderData<LoaderData>();

  return (
    <main>
      <p className="text-slate-100">hello, world</p>
    </main>
  );
}
