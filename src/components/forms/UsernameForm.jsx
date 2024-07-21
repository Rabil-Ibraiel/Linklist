"use client";

import { grapUsername } from "@/actions/usernameActions";
import { useState } from "react";
import SubmitButton from "../buttons/SubmitButton";
import { redirect, useRouter } from "next/navigation";
import { GoArrowRight } from "react-icons/go";

const UsernameForm = ({ desiredUsername }) => {
  const [taken, setTaken] = useState(false);
  const route = useRouter();
  async function handleSubmit(formData) {
    const result = await grapUsername(formData);
    setTaken(!result);

    if (result) {
      route.refresh();
      return redirect("/account?create=" + result);
    } else {
      return;
    }
  }

  return (
    <div className="py-32 px-8 sm:px-12 md:px-16 lg:px-24 h-[calc(100vh-6rem)] w-screen flex flex-col   items-center">
      <h1 className="text-4xl font-bold">
        Grap your{" "}
        <b className="bg-black text-gray-200 px-4 rounded-md animate-[ownPing_1.5s_ease-in-out_infinite] ">
          Username
        </b>
      </h1>
      <p className="mt-2 mb-8 text-gray-500">Choose your username</p>
      <form action={handleSubmit} className="flex flex-col w-96 gap-4">
        <input
          type="text"
          name="username"
          defaultValue={desiredUsername}
          required
          placeholder="username"
          className="h-12 rounded-sm text-center text-xl font-bold hover:border focus:border"
          autoComplete="off"
          autoCorrect="off"
        />
        <input
          type="text"
          name="username"
          value={desiredUsername}
          className="hidden"
        />

        {taken && (
          <p className="bg-red-800 text-white text-2xl py-2 text-center">
            Username is alredy taken
          </p>
        )}
        <SubmitButton>
          Claim your username
          <GoArrowRight className="text-3xl" />
        </SubmitButton>
      </form>
    </div>
  );
};

export default UsernameForm;
