'use client'

import { FaGoogle } from "react-icons/fa";
import { signIn } from "next-auth/react";

const GoogleSignInButton = () => {
  return (
    <button
      onClick={() => signIn("google")}
      className="bg-white text-black border text-lg hover:bg-blue-500 hover:text-white rounded-md w-full py-4 flex items-center gap-4 justify-center"
    >
      <FaGoogle />
      Sign In With Google
    </button>
  );
};

export default GoogleSignInButton;
