"use client";

import { usePathname } from "next/navigation";
import { FaFileAlt } from "react-icons/fa";
import { IoAnalyticsSharp } from "react-icons/io5";
import LogoutButton from "@/components/buttons/LogoutButton";
import Link from "next/link";

const AppSideLinks = () => {
  const path = usePathname();

  return (
    <nav className="flex flex-col gap-6 text-2xl mt-12 h-full ">
      <Link
        className={`${
          path === "/account"
            ? "text-blue-500 hover:text-blue-500"
            : "text-gray-700  hover:text-black"
        } flex items-center w-full gap-3 font-bold`}
        href={"/account"}
      >
        <FaFileAlt />
        My Page
      </Link>
      <Link
        className={`${
          path === "/analytics"
            ? "text-blue-500 hover:text-blue-500"
            : "text-gray-700  hover:text-black"
        } flex items-center w-full gap-3 font-bold`}
        href={"/analytics"}
      >
        <IoAnalyticsSharp />
        Analytics
      </Link>
      <LogoutButton
        className={
          "flex flex-row-reverse w-full items-center justify-end gap-3 font-bold text-gray-700 hover:text-black "
        }
        size={false}
      />
    </nav>
  );
};

export default AppSideLinks;
