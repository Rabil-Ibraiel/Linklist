"use client";

import SubmitButton from "@/components/buttons/SubmitButton";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="py-6 overflow-hidden h-[calc(100vh-6rem)] w-screen ">
      <h1 className="text-6xl lg:text-7xl mainTitle mb-8 lg:mb-0">
        contact
      </h1>
      <div className="h-full w-full flex flex-col lg:flex-row items-center justify-between gap-0 lg:gap-12 px-8 lg:px-24">
        <div className="w-full h-full lg:w-1/2">
          <form className="w-full h-full flex flex-col justify-center -mt-12 gap-3">
            <label
              className="text-xl font-extrabold text-black/50 uppercase tracking-wide"
              htmlFor="username"
            >
              Username:
            </label>
            <input
              type="text"
              id="username"
              required
              className="text-2xl font-medium py-1 px-3 rounded"
            />

            <label
              className="text-xl font-extrabold text-black/50 uppercase tracking-wide mt-8 lg:mt-2"
              htmlFor="email"
            >
              email:
            </label>
            <input
              type="email"
              id="email"
              required
              className="text-2xl font-medium py-1 px-3 rounded"
            />

            <label
              className="text-xl font-extrabold text-black/50 uppercase tracking-wide mt-8 lg:mt-2"
              htmlFor="message"
            >
              message:
            </label>

            <textarea
              rows={6}
              id="message"
              className="text-2xl font-medium py-1 px-3 rounded overflow-x-hidden overflow-y-auto"
            ></textarea>

            <SubmitButton isPending={true}>Send</SubmitButton>
          </form>
        </div>

        <div className="relative hidden lg:block w-1/2 h-full">
          <Image
            src={"/undraw_online_message_re_3m5v.svg"}
            alt="message"
            fill
            className="animate-[ownBounce_3s_ease-in-out_infinite] overflow-hidden"
          />
        </div>
      </div>
    </div>
  );
};

export default page;
