import GoogleSignInButton from "@/components/buttons/GoogleSignInButton";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const page = async() => {
  const status = await getServerSession(authOptions);
  if (status?.user?.name !== undefined) {
    return redirect('/')
  }
  return (
    <section className="py-32 px-8 lg:px-32">
      <div className="mx-auto py-4 max-w-xs text-center px-4">
        <h1 className="text-6xl font-bold ">Sign In</h1>
        <p className="text-md text-gray-500 mb-12 mt-4">
          Sign in to your account using one of the provided method:
        </p>

        <GoogleSignInButton />
      </div>
    </section>
  );
};

export default page;
