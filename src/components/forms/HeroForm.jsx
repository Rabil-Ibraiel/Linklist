"use client";

import { signIn } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";

const HeroForm = ({ session }) => {
  useEffect(() => {
    if (window.localStorage.getItem("desiredUsername")) {
      const username = window.localStorage.getItem("desiredUsername");
      window.localStorage.removeItem("desiredUsername");
      return redirect("/account?desiredUsername=" + username);
    }
  }, []);

  const router = useRouter();
  async function handleSubmit(e) {
    e.preventDefault();
    const username = e.target.querySelector("input").value;
    window.localStorage.setItem("desiredUsername", username);
    if (session === null) {
      await signIn("google");
    } else {
      router.push("/account?desiredUsername=" + username);
    }
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row items-center mt-12"
    >
      <div className="flex items-center w-full sm:w-auto">
        <span className="py-4 bg-white pl-4">linklist.to/</span>
        <input
          className="py-4 w-full"
          type="text"
          placeholder="username"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 w-full mt-2 sm:mt-0 sm:w-auto py-4 px-6 text-white hover:shadow-md"
      >
        Join for Free
      </button>
    </form>
  );
};

export default HeroForm;
