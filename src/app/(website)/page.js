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
    <main>
      <section className="py-32 px-8 sm:px-12 md:px-16 lg:px-24 md:flex md:gap-12 md:items-center md:h-[calc(100vh-6rem)] md:w-screen md:overflow-hidden">
        <div id="text-area" className="xl:w-1/2 ">
          <h1 className="text-5xl lg:text-6xl font-bold mb-4">
            Your one link
            <br />
            for{" "}
            <span className="hover:bg-gray-900 hover:text-white hover:rounded-md">
              EVERYTHING!
            </span>
          </h1>
          <h2>
            Share your links, Social profiles, Contact info and more on one
            page.
          </h2>
          {!page ? (
            <HeroForm session={session} />
          ) : (
            <Link href={"/account"}>
              <p className="bg-blue-500 flex items-center gap-3 text-white w-fit text-xl mt-4 px-6 py-2 rounded-md">
                <MdAccountCircle className="w-6 h-6"/>
                My Account
              </p>
            </Link>
          )}
        </div>
        <div
          id="img-area"
          className="hidden xl:block relative w-[40%] h-full animate-[ownBounce_2.5s_ease-in-out_infinite]"
        >
          <Image src={"/undraw_share_link_re_54rx.svg"} alt="" fill />
        </div>
      </section>
    </main>
  );
}
