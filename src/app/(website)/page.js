import HeroForm from "@/components/forms/HeroForm";
import Page from "@/models/Page";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import mongoose from "mongoose";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { MdAccountCircle } from "react-icons/md";

export default async function Home() {
  const session = await getServerSession(authOptions);
  mongoose.connect(process.env.MONGODB_URI);
  const page = await Page.findOne({ owner: session?.user?.email });
  return (
    <main className=" h-[calc(100vh-6rem)] w-screen overflow-x-hidden overflow-y-auto">
      <section className="p-8 pb-0 lg:pb-8 flex flex-col lg:flex-row md:gap-12 justify-center items-center w-full h-full bg-gradient-to-tr from-purple-300 to-gray-200">
        <div
          id="text-area"
          className="xl:w-1/2 xl:h-full w-full h-1/2 text-center flex flex-col itme-center justify-center"
        >
          <h1 className="mb-4 mainTitle">Your one link for EVERYTHING!</h1>
          <h2 className="font-light lg:font-normal text-sm md:text-md">
            Share your links, Social profiles, Contact info and more on one
            page.
          </h2>
          <div className="flex justify-center w-full">
            {!page ? (
              <HeroForm session={session} />
            ) : (
              <Link href={"/account"} className="flex justify-center w-full">
                <p className="bg-blue-500 flex items-center w-fit gap-3 text-white text-xl mt-4 px-6 py-2 rounded-md">
                  <MdAccountCircle className="w-6 h-6" />
                  My Account
                </p>
              </Link>
            )}
          </div>
        </div>
        <div
          id="img-area"
          className=" relative xl:w-[40%] xl:h-full w-full h-1/2 animate-[ownBounce_2.5s_ease-in-out_infinite] overflow-hidden"
        >
          <Image src={"/undraw_share_link_re_54rx.svg"} alt="" fill />
        </div>
      </section>
    </main>
  );
}
