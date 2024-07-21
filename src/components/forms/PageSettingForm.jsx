"use client";

import RadioTogglers from "./formsItems/RadioTogglers";
import { IoIosColorPalette } from "react-icons/io";
import { FaRegImage } from "react-icons/fa";
import Image from "next/image";
import { IoIosSave } from "react-icons/io";
import { savePageSetting } from "@/actions/pageSetting";
import SubmitButton from "../buttons/SubmitButton";
import toast from "react-hot-toast";
import { useState } from "react";

const PageSettingForm = ({ page, user }) => {
  const [bgType, setBgType] = useState(page?.bgType);
  const [color, setColor] = useState(page?.bgColor);

  async function handleSubmit(formData) {
    const result = await savePageSetting(formData);
    if (result) {
      toast.success("Saved!");
    } else {
      toast.error("Faild to Save!");
    }
  }

  return (
    <div>
      <form action={handleSubmit}>
        <div
          className="w-full h-60 flex justify-center items-center flex-col"
          style={{ backgroundColor: color }}
        >
          <RadioTogglers
            defaultValue={page?.bgType}
            options={[
              { value: "color", icon: <IoIosColorPalette />, label: "Color" },
              { value: "image", icon: <FaRegImage />, label: "Image" },
            ]}
            onChange={(val) => setBgType(val)}
          />
          {bgType === "color" && (
            <div className="bg-gray-200 p-3 rounded mt-4">
              <label htmlFor="bgColor" className="mr-2 font-bold" font-semibold>
                Color:
              </label>
              <input
                type="color"
                onChange={(e) => setColor(e.target.value)}
                name="bgColor"
                id="bgColor"
              />
            </div>
          )}

          {bgType === "image" && (
            <div className="bg-gray-200 p-3 rounded mt-4">
              <label htmlFor="bgImage" className="mr-4 font-semibold">
                Change Image
              </label>
              <input
                hidden
                type="file"
                onChange={(e) => setColor(e.target.value)}
                name="bgImage"
                id="bgImage"
              />
            </div>
          )}
        </div>

        <div className="relative flex items-center justify-center w-full -top-8 -mb-12 h-max">
          <Image
            src={user?.image}
            alt="avatar"
            width={160}
            height={160}
            className="rounded-full p-2 bg-white shadow shadow-black/50"
          />
        </div>

        <div className="p-6">
          <label className="pageSetting-label" htmlFor="displayName">
            Display Name
          </label>
          <input
            type="text"
            id="displayName"
            name="displayName"
            placeholder="John Doe"
            autoComplete="off"
            autoCorrect="off"
            className="pageSettings-input"
            defaultValue={page?.displayName}
          />

          <label className="pageSetting-label" htmlFor="location">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            placeholder="Somewhere in the WORLD!"
            autoComplete="off"
            autoCorrect="off"
            className="pageSettings-input uppercase"
            defaultValue={page?.location}
          />

          <label className="pageSetting-label" htmlFor="bio">
            Bio
          </label>
          <textarea
            type="text"
            id="bio"
            name="bio"
            placeholder="Your bio goes here..."
            autoComplete="off"
            autoCorrect="off"
            className="pageSettings-input"
            defaultValue={page?.bio}
          ></textarea>

          <SubmitButton
            isPending={true}
            className="flex bg-blue-500 items-center justify-center gap-4 text-white py-1 px-2 rounded w-full"
          >
            <IoIosSave />
            Save
          </SubmitButton>
        </div>
      </form>
    </div>
  );
};

export default PageSettingForm;
