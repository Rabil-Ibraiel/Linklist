import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoCaretBackCircle } from "react-icons/io5";

const Error404 = () => {
  return (
    <div className="relative h-screen w-screen overflow-hidden flex items-center justify-center flex-col gap-6 lg:gap-12 select-none">
      <Link
        className="absolute top-3 left-3 bg-blue-500 md:py-2 md:px-8 p-2 rounded-lg text-white font-medium text-xl flex items-center gap-3"
        href={"/"}
      >
        <IoCaretBackCircle className="text-3xl md:text-xl"/>{" "}
        <span className="hidden md:block">Back to Home</span>
      </Link>
      <h1 className="text-7xl font-extrabold">NOT FOUND</h1>
      <div className="relative h-1/2 w-full lg:w-1/2">
        <Image
          src={"/undraw_page_not_found_re_e9o6.svg"}
          alt="NOT FOUND - 404"
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
};

export default Error404;
