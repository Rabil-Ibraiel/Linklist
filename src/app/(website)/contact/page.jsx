"use client";

import SubmitButton from "@/components/buttons/SubmitButton";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="py-6 overflow-x-hidden overflow-y-auto  h-[calc(100vh-6rem)] w-screen ">
      <h1 className="text-6xl mainTitle mb-2">contact</h1>
      <h3 className="text-center text-blue-950 text-sm lg:text-xl uppercase mb-12 xl:mb-0">
        Send a <span className="font-bold">message.</span>
      </h3>
      <div className="mt-12 w-full xl:h-full flex flex-col xl:flex-row items-center justify-between gap-0 xl:gap-12 px-4 md:px-12 lg:px-24">
        <div className="w-full h-full xl:w-1/2">
          <form className="w-full h-fit flex flex-col justify-center xl:justify-start  gap-4">
            <label
              className="lg:text-xl font-extrabold text-black/50 uppercase tracking-wide"
              htmlFor="username"
            >
              Username:
            </label>
            <input
              type="text"
              id="username"
              required
              className="text-xl lg:text-2xl font-medium py-1 px-3 rounded"
            />

            <label
              className="xl:text-xl font-extrabold text-black/50 uppercase tracking-wide xl:mt-4 mt-2"
              htmlFor="email"
            >
              email:
            </label>
            <input
              type="email"
              id="email"
              required
              className="text-xl lg:text-2xl font-medium py-1 px-3 rounded"
            />

            <label
              className="xl:text-xl font-extrabold text-black/50 uppercase tracking-wide xl:mt-4 mt-2"
              htmlFor="message"
            >
              message:
            </label>

            <textarea
              rows={7}
              id="message"
              className="text-xl lg:text-2xl font-medium py-1 px-3 rounded overflow-x-hidden overflow-y-auto resize-none"
            ></textarea>

            <SubmitButton isPending={true}>Send</SubmitButton>
          </form>
        </div>

        <div className="relative hidden xl:block w-1/2 h-full overflow-hidden">
          <Image
            src={"/undraw_online_message_re_3m5v.svg"}
            alt="message"
            fill
            className="overflow-hidden"
          />
        </div>
      </div>
    </div>
  );
};

export default page;
