"use client";
import Event from "@/models/Event";
import mongoose from "mongoose";
import Link from "next/link";
import { IoIosLink } from "react-icons/io";

const UrlLinksBtn = ({ item, uri }) => {
  async function handleClick() {
    const res = {url:item.url, uri}
    await fetch("/api/click", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(res),
    });
  }

  return (
    <Link
      onClick={handleClick}
      target="_blank"
      href={item.url}
      key={item.id}
      className="flex items-center gap-2 shadow-md border-2 border-white/60 p-2 rounded-sm w-full"
    >
      <span className="text-6xl">
        <IoIosLink />
      </span>

      <div className="">
        <h3 className="text-3xl font-bold">{item.title}</h3>
        <p className="tetx-lg text-white/60">{item.subtitle}</p>
      </div>
    </Link>
  );
};

export default UrlLinksBtn;
