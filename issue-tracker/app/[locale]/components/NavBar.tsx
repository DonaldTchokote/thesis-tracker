"use client";
import { Skeleton } from "@/app/[locale]/components";
import { Flex } from "@radix-ui/themes";
import classnames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { IoClose, IoMenu } from "react-icons/io5";
import { getInitials } from "./utils";
import LocaleSwitcher from "./LocaleSwitcher";

interface Link {
  label: string;
  href: string;
  startLink: string;
}
interface Translations {
  links: Link[];
  action: string;
  logout:string;
}

const NavBar = ({ translations }: { translations: Translations }) => {
  const { links, action, logout } = translations;
  const [navbar, setNavbar] = useState(false);

  return (
    <nav className="w-full  bg-gray-100 shadow sticky top-0 z-50">
      <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
        <div>
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            {/*Logo*/}
            <Link href="/dashbord" className="text-lg font-bold">
              T-Track
            </Link>

            {/*Mobile Navigation*/}
            <div className="md:hidden">
              <button
                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? <IoClose /> : <IoMenu />}
              </button>
            </div>
          </div>
        </div>
        <div>
          {/*Menü*/}
          <div
            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
              navbar ? "block" : "hidden"
            }`}
          >
            <NavLinks links={links} />
          </div>
        </div>

        <LocaleSwitcher />

        {/*User Dropdown*/}
        <div
          className={`dropdown dropdown-end pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
            navbar ? "block" : "hidden"
          }`}
        >
          <AuthStatus action={action} logout={logout} />
        </div>
      </div>
    </nav>
  );
};

const NavLinks = ({ links }: { links: Link[] }) => {
  const currentPath = usePathname();

  return (
    <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
      {links.map((link) => {
        return (
          <li
            key={link.href}
            className="flex text-zinc-600 hover:text-zinc-950 transition-colors"
          >
            <Link
              href={link.href}
              className={classnames({
                active:
                  link.href === currentPath ||
                  currentPath.includes(link.startLink),
                "nav-link": true,
                "!text-zinc-950":
                  link.href === currentPath ||
                  currentPath.startsWith(link.startLink),
              })}
            >
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

const AuthStatus = ({ action, logout }: { action: string, logout:string }) => {
  const { status, data: session } = useSession();

  if (status === "loading") return <Skeleton width="9rem" />;

  if (status === "unauthenticated")
    return (
      <Link className="nav-link" href="/api/auth/signin">
        {action}
      </Link>
    );

  return (
    <Flex gap="1" align="center">
      <div className="relative">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
          <div className="w-10 h-10 rounded-full bg-slate-300 flex items-center justify-center">
            <span className="text-xl">{getInitials(session?.user?.name)}</span>
          </div>
        </div>
        {status === "authenticated" && (
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-white rounded-box w-25"
          >
            <li>
              {" "}
              <Link href="/api/auth/signout">{logout}</Link>
            </li>
          </ul>
        )}
      </div>
      {status === "authenticated" && <span>{session.user?.name}</span>}
    </Flex>
  );
};

export default NavBar;
