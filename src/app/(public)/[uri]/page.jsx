import Page from "@/models/Page";
import mongoose from "mongoose";
import Image from "next/image";
import React from "react";
import { MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";

import { FaGithub } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import UrlOnHoverBtn from "@/components/buttons/UrlOnHoverBtn";

import Event from "@/models/Event";
import Link from "next/link";
import { IoIosLink } from "react-icons/io";
import UrlLinksBtn from "@/components/buttons/UrlLinksBtn";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const page = async ({ params }) => {
  const uri = params.uri;
  await mongoose.connect(process.env.MONGODB_URI);
  const sesstion = await getServerSession(authOptions);
  const page = await Page.findOne({ uri });
  if (page.owner !== sesstion?.user?.email) {
    await Event.create({ url: page.uri });
  }

  const buttons = [
    { key: "email", icon: <MdEmail />, placeholder: "test@example.com" },
    { key: "phone", icon: <FaPhone />, placeholder: "+9647501111111" },
    { key: "linkedIn", icon: <FaLinkedin />, placeholder: "" },
    { key: "Instagram", icon: <AiFillInstagram />, placeholder: "" },
    { key: "Facebook", icon: <FaFacebook />, placeholder: "" },
    { key: "Youtube", icon: <FaYoutube />, placeholder: "" },
    { key: "Twitter", icon: <BsTwitterX />, placeholder: "" },
    { key: "Github", icon: <FaGithub />, placeholder: "" },
  ];

  return (
    <div
      style={{ backgroundColor: page.bgColor }}
      className="h-screen w-screen overflow-x-hidden text-white  py-12 lg:px-36 md:px-16 px-8 flex justify-center"
    >
      <div className="bg-black/20 shadow-lg h-fit w-fit max-w-full pt-6 pb-8 px-12 rounded-md">
        <div className="w-fit flex items-center justify-end flex-col gap-4">
          <div className="flex w-full flex-col items-center  md:flex-row md:items-stretch gap-2">
            <Image
              src={page.image}
              width={140}
              height={140}
              className="rounded-lg overflow-hidden shadow-md"
            />
            <div className="flex flex-col justify-between py-2">
              <h1 className="capitalize text-5xl lg:text-7xl font-bold">
                {page.displayName}
              </h1>
              <span className="uppercase flex items-center gap-1 text-lg text-white/60">
                <IoLocationSharp />
                {page.location}
              </span>
            </div>
          </div>
          <div className=" flex flex-col gap-3 my-6 mr-auto">
            <label className="font-bold text-3xl">Bio: </label>
            <p className="lg:text-xl rounded-sm text-md font-light whitespace-pre-line break-words w-[24rem] md:w-fit max-w-lg text-white/75">
              {page.bio}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 md:gap-6 mt-14 w-full flex-wrap">
          {page.buttons.map((item) => (
            <UrlOnHoverBtn
              value={item.value}
              icon={buttons.find((btn) => btn.key === item.key).icon}
              itemKey={item.key}
            />
          ))}
        </div>

        <div>
          <h2 className="font-bold text-3xl mb-6">Links:</h2>
          <div className="flex flex-col gap-4">
            {page.links.map((item) => (
              <UrlLinksBtn item={item} uri={page.uri} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
