"use client";

import { FaGoogle } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { useState } from "react";

const GoogleSignInButton = () => {
  const [loading, setLoading] = useState(false);

  async function handleLogIn() {
    setLoading(true)
    await signIn("google");
    setLoading(false)
  }

  return (
    <button
      disabled={loading}
      onClick={handleLogIn}
      className="bg-white text-black border text-lg hover:bg-blue-500 hover:text-white disabled:bg-blue-300 disabled:cursor-wait rounded-md w-full py-4 flex items-center gap-4 justify-center"
    >
      <FaGoogle />
      Sign In With Google
    </button>
  );
};

export default GoogleSignInButton;
