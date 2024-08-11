"use client";

import Link from "next/link";
import { useState } from "react";
import { FaArrowDown } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

const UrlOnHoverBtn = ({ icon, value, itemKey }) => {
  const [visable, setVisable] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
      if (value === "") return;
      toast.success("Copied to clipboard");
    } catch (err) {
      return;
    }
  }

  if (value.includes("https://")) {
    return (
      <Link
        href={value}
        target="_blank"
        onMouseEnter={() => setVisable(true)}
        onMouseLeave={() => setVisable(false)}
        className="bg-white relative text-black text-3xl p-2 rounded-full"
      >
        {icon}

        {visable && (
          <div className="absolute -top-[2.8rem] left-1/2 z-50 -translate-x-1/2 text-lg w-max rounded-md px-2 py-1 bg-white text-black">
            <FaArrowDown className="absolute top-4 z-10 left-1/2 text-3xl text-white -translate-x-1/2" />

            <span className=" relative z-50 capitalize text-sm">{itemKey}</span>
          </div>
        )}
      </Link>
    );
  } else {
    return (
      <div>
        <div
          onMouseEnter={() => setVisable(true)}
          onMouseLeave={() => setVisable(false)}
          onClick={handleCopy}
          className="bg-white relative text-black text-3xl p-2 rounded-full"
        >
          {icon}

          {visable && (
            <div className="absolute -top-[2.8rem] left-1/2 z-50 -translate-x-1/2 text-lg w-max min-w-24 min-h-9 rounded-md px-2 py-1 bg-white text-black">
              <FaArrowDown className="absolute top-4 z-10 left-1/2 text-3xl text-white -translate-x-1/2" />

              <span className=" relative z-50 text-sm">{value === "" ? itemKey : value}</span>
            </div>
          )}
        </div>
        <Toaster />
      </div>
    );
  }
};

export default UrlOnHoverBtn;
