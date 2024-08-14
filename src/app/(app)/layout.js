import { Inter } from "next/font/google";
import "../globals.css";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";

import { authOptions } from "../api/auth/[...nextauth]/route";
import { IoCaretBackCircle } from "react-icons/io5";
import AppSideLinks from "@/components/AppSideLinks";
import mongoose from "mongoose";
import Page from "@/models/Page";
import Header from "@/components/Header";
import { Toaster } from "react-hot-toast";
import { IoIosLink } from "react-icons/io";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ACreate Next App",
  description: "Generated by create next app",
};

export default async function AppLayout({ children }) {
  const session = await getServerSession(authOptions);
  await mongoose.connect(process.env.MONGODB_URI);

  const page = await Page.findOne({
    owner: session?.user?.email,
  });

  if (!session) {
    return redirect("/");
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster />
        {page ? (
          <div className="flex flex-col lg:flex-row relative h-screen w-screen gap-6 px-4 overflow-x-hidden">
            <aside className="p-4 lg:sticky lg:top-0 relative lg:h-full h-fit lg:w-1/5 w-full flex lg:flex-col flex-row items-center gap-5 justify-center bg-white shadow-md ">
              <div className="flex items-center flex-col">
                <div className="rounded-full overflow-hidden relative min-w-[126px] min-h-[126px]">
                  <Image src={session?.user?.image} alt="avatar" fill />
                </div>
                <Link
                  href={"/" + page.uri}
                  target="_blank"
                  className="flex items-center gap-1 mt-2"
                >
                  <IoIosLink className="text-2xl text-blue-500 " />{" "}
                  <p className="font-bold text-xl">
                    <span className="font-light text-lg">/</span>
                    {page.uri}
                  </p>
                </Link>
              </div>
              <AppSideLinks />
              <Link
                className="flex absolute lg:static top-2 left-2  text-lg mt-auto mb-6 items-center gap-1 bg-blue-500 text-white p-1 lg:py-2 lg:px-4 rounded-full lg:rounded-lg "
                href={"/"}
              >
                <IoCaretBackCircle className="lg:w-5 lg:h-5 h-8 w-8" />
                <span className="hidden lg:block">Back to home</span>
              </Link>
            </aside>
            <div className="lg:py-6 lg:px-12  lg:w-4/5 w-full ">
              <div className="text-2xl">{children}</div>
            </div>
          </div>
        ) : (
          <div>
            <Header />
            {children}
          </div>
        )}
      </body>
    </html>
  );
}
