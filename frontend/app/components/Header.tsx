import { Link } from "@remix-run/react";
import { Menu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";

function LoginDropdown({ username }: { username: string }) {
  return (
    <Menu as="div" className="relative inline-block">
      <Menu.Button className="button flex items-center gap-x-2">
        {username} <ChevronDownIcon className="h-4" />
      </Menu.Button>
      <Menu.Items className="absolute right-0 mt-1 origin-top-right flex flex-col bg-stone-900 text-stone-100 border border-stone-100 rounded">
        <Menu.Item>
          {({ active }) => (
            <Link
              to="/profile"
              className={`${active && "bg-stone-700"} py-1 px-3`}
            >
              profile
            </Link>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <Link
              to="/logout"
              className={`${active && "bg-stone-700"} py-1 px-3`}
            >
              logout
            </Link>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
}

export function Header({
  currentUser: { username, avatarUrl } = {},
}: {
  currentUser?: { username?: string; avatarUrl?: string };
}) {
  return (
    <header className="mb-8 flex justify-between">
      <Link to="/" className="text-stone-100 text-xl">
        👽 bogos
      </Link>
      <div className="flex gap-12">
        {username ? (
          <div className="flex gap-x-6 items-center">
            <LoginDropdown username={username} />
          </div>
        ) : (
          <Link to="/login">
            <button className="button">login</button>
          </Link>
        )}
      </div>
    </header>
  );
}
