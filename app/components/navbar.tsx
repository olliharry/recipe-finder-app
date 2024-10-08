import React from "react";
import { auth, signIn, signOut } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import { SignIn } from "./signin-button";
import { SignOut } from "./signout-button";
import { Session } from "next-auth";

interface ParentComponentProps {
  children: React.ReactNode;
  session: Session | null;
}

const Navbar: React.FC<ParentComponentProps> = ({ children, session }) => {
  return (
    <div className="drawer ">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col bg-pr">
        <div className="navbar bg-primary w-full">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2 text-2xl font-extrabold">
            <Link href="/" className="">
              Recipe Finder
            </Link>
          </div>
          <div className="hidden flex-none lg:block">
            <ul className="menu menu-horizontal">
              {!session && (
                <li>
                  <SignIn />
                </li>
              )}
              {session && (
                <li>
                  <details>
                    <summary>
                      <p className="text-xl font-extrabold">
                        {session?.user?.name}
                      </p>
                      {session?.user?.image && (
                        <Image
                          src={session?.user?.image}
                          alt={"profile Picture"}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                      )}
                    </summary>

                    <ul className="bg-primary rounded-t-none p-2">
                      <li className="pb-2">
                        <Link href="/favourites" className="btn pb">
                          favourites
                        </Link>
                      </li>
                      <li>
                        <SignOut />
                      </li>
                    </ul>
                  </details>
                </li>
              )}
            </ul>
          </div>
        </div>
        {children}
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 min-h-full w-80 p-4">
          {!session && (
            <li>
              <SignIn />
            </li>
          )}
          {session && (
            <li>
              <details>
                <summary>
                  {session?.user?.name}
                  {session?.user?.image && (
                    <Image
                      src={session?.user?.image}
                      alt={"profile Picture"}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  )}
                </summary>
                <ul className="bg-base-200 rounded-t-none p-2">
                  <li className="pb-2">
                    <Link href="/favourites" className="btn pb">
                      favourites
                    </Link>
                  </li>
                  <li>
                    <SignOut />
                  </li>
                </ul>
              </details>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};
export default Navbar;
