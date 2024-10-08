"use client";

import Link from "next/link";
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";

import LogoutButton from "./buttons/LogoutButton";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const HeaderNav = ({ session }) => {
  const [open, setOpen] = useState(false);
  const pathName = usePathname();
  console.log(pathName);
  useEffect(() => {
    setOpen(false);
  }, [pathName]);

  return (
    <>
      {!open && (
        <IoMenu
          className="text-4xl block lg:hidden cursor-pointer"
          onClickCapture={() => setOpen((prev) => !prev)}
        />
      )}

      {open && (
        <IoClose
          className="text-4xl block lg:hidden cursor-pointer"
          onClickCapture={() => setOpen((prev) => !prev)}
        />
      )}

      <div
        className={`flex flex-col lg:flex-row w-full items-center justify-between absolute lg:static top-24 py-12 lg:py-0 right-0 bg-white lg:bg-transparent ${
          !open && "hidden lg:flex"
        }`}
      >
        <nav className="flex flex-col lg:flex-row justify-center gap-6 text-gray-600 mb-6 lg:mb-0">
          <Link href={"/pricing"}>Pricing</Link>
          <Link href={"/contact"}>Contact</Link>
          {session && <Link href={"/account"}>Account</Link>}
        </nav>

        {session ? (
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            <Link href={"/account"} className="text-md">
              Hello,{" "}
              <span className="font-bold text-xl">
                {session?.user?.name.length > 1
                  ? session.user.name.split(" ")[0]
                  : session.user.name}
              </span>
            </Link>
            <LogoutButton />
          </div>
        ) : (
          <div className="flex flex-col items-center lg:flex-row gap-6">
            <Link href={"/login"}>Sign In</Link>
          </div>
        )}
      </div>
    </>
  );
};

export default HeaderNav;
