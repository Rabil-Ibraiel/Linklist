"use client";

import RadioTogglers from "./formsItems/RadioTogglers";
import { IoIosColorPalette } from "react-icons/io";
import Image from "next/image";
import { IoIosSave } from "react-icons/io";
import {
  buttonsSave,
  linksSave,
  savePageSetting,
} from "@/actions/pageSetting";
import SubmitButton from "../buttons/SubmitButton";
import toast from "react-hot-toast";
import { useState } from "react";
import { MdEmail } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";

import { FaGithub } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { IoIosWarning } from "react-icons/io";
import PageSection from "../PageSection";
import { FaCirclePlus } from "react-icons/fa6";

const PageSettingForm = ({ page, user }) => {
  const [activeButtons, setActiveButtons] = useState(page?.buttons);

  const [displayNameLength, setDisplayNameLength] = useState(
    page?.displayName.length
  );
  const [locationLength, setLocationLength] = useState(page?.location.length);
  const [textAreaLength, setTextAreaLength] = useState(page?.bio.length);
  const [bgType, setBgType] = useState(page?.bgType);
  const [color, setColor] = useState(page?.bgColor);

  async function handleSubmit(formData) {
    try {
      const result = await savePageSetting(formData);
      toast.success("Updated!");
    } catch (err) {
      toast.error(err.message);
    }
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

  function addButtonToProfile(e) {
    const btn = e.currentTarget.name;
    if (!activeButtons.find((bt) => bt.key === btn)) {
      const btnClass = buttons.filter((item) => item.key === btn)[0];
      setActiveButtons((prev) => [...prev, btnClass]);
    }
  }

  function removeButtonFromProfile(currentItem) {
    setActiveButtons((prev) => prev.filter((item) => item !== currentItem));
  }

  const activeBtns = activeButtons.map(({ key }) => ({ key }));

  async function handleButtonsSave(formData) {
    const result = await buttonsSave(formData);
    if (result) {
      toast.success("Saved!");
    } else {
      toast.error("Faild to Save!");
    }
  }

  const [links, setLinks] = useState(page?.links);

  async function handleLinksSave(formData) {
    try {
      await linksSave(formData);
      toast.success("Saved!");
    } catch (err) {
      toast.error(err.message);
    }
  }

  return (
    <div className="flex flex-col gap-8 pb-8 max-w-full">
      <PageSection>
        <form action={handleSubmit}>
          <div
            className="w-full h-60 flex justify-center items-center flex-col"
            style={{ backgroundColor: color }}
          >
            <RadioTogglers
              defaultValue={page?.bgType}
              options={[
                { value: "color", icon: <IoIosColorPalette />, label: "Color" },
              ]}
              onChange={(val) => setBgType(val)}
            />
            {bgType === "color" && (
              <div className="bg-gray-200 p-3 rounded mt-4">
                <label htmlFor="bgColor" className="mr-2 font-bold">
                  Color:
                </label>
                <input
                  type="color"
                  onChange={(e) => setColor(e.target.value)}
                  name="bgColor"
                  id="bgColor"
                  defaultValue={page?.bgColor}
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
            <label
              className="pageSetting-label flex justify-between"
              htmlFor="bio"
            >
              <span>Display name</span>
              <span className="flex items-center">
                {displayNameLength > 20 && (
                  <IoIosWarning className="text-red-500/75 mr-1" />
                )}
                {displayNameLength}/20
              </span>
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
              onChange={(e) => setDisplayNameLength(e.target.value.length)}
            />

            <label
              className="pageSetting-label flex justify-between"
              htmlFor="bio"
            >
              <span>Location</span>
              <span className="flex items-center">
                {locationLength > 20 && (
                  <IoIosWarning className="text-red-500/75 mr-1" />
                )}
                {locationLength}/20
              </span>
            </label>
            <input
              type="text"
              onChange={(e) => setLocationLength(e.target.value.length)}
              id="location"
              name="location"
              placeholder="Somewhere in the WORLD!"
              autoComplete="off"
              autoCorrect="off"
              className="pageSettings-input uppercase"
              defaultValue={page?.location}
            />

            <label
              className="pageSetting-label flex justify-between"
              htmlFor="bio"
            >
              <span>Bio</span>
              <span className="flex items-center">
                {textAreaLength > 150 && (
                  <IoIosWarning className="text-red-500/75 mr-1" />
                )}
                {textAreaLength}/150
              </span>
            </label>
            <textarea
              type="text"
              id="bio"
              name="bio"
              placeholder="Your bio goes here..."
              autoComplete="off"
              autoCorrect="off"
              className="pageSettings-input disabled:bg-red-300/50 disabled:text-black/50"
              defaultValue={page?.bio}
              rows={5}
              onChange={(e) => setTextAreaLength(e.target.value.length)}
            ></textarea>

            <input
              name="image"
              type="text"
              hidden
              className="hidden"
              value={user?.image}
            />

            <SubmitButton
              isPending={true}
              className="flex bg-blue-500 items-center justify-center gap-4 text-white py-1 px-2 rounded w-full"
            >
              <IoIosSave />
              Save
            </SubmitButton>
          </div>
        </form>
      </PageSection>

      <PageSection>
        <h3 className="title">Buttons:</h3>
        <form action={handleButtonsSave}>
          <div>
            {activeButtons.map((item) => (
              <div
                key={item.key}
                className="flex w-full items-center lg:text-2xl text-lg lg:gap-4 gap-2 pt-4 "
              >
                <div className="font-bold capitalize flex items-center lg:gap-3 gap-1 lg:min-w-44">
                  <span className="text-2xl">
                    {buttons.find((btn) => btn.key === item.key).icon}
                  </span>
                  <span className="hidden lg:block">{item.key}</span>:
                </div>
                <input
                  name={item.key}
                  type="text"
                  required
                  defaultValue={item.value}
                  className="bg-slate-200 px-2 py-1 w-full font-semibold rounded-sm"
                  placeholder={item.placeholder}
                  maxLength={30}
                />
                <span
                  className="cursor-pointer"
                  onClick={() => removeButtonFromProfile(item)}
                >
                  <MdDelete className="text-5xl text-red-600" />
                </span>
              </div>
            ))}
          </div>
          <input
            type="text"
            name="activeButtons"
            hidden
            className="hidden"
            value={JSON.stringify(activeBtns)}
          />
          <SubmitButton
            isPending={true}
            className="flex bg-blue-500 items-center justify-center gap-4 mt-8 text-white py-1 px-2 rounded w-full"
          >
            <IoIosSave />
            Save
          </SubmitButton>
        </form>
        <div className="w-full border-2 border-black/25 rounded-3xl my-8"></div>
        <div className="flex gap-1 md:gap-4 items-center flex-wrap text-[1rem] lg:text-2xl">
          {buttons.map((item) => (
            <button
              disabled={activeButtons.find((bt) => bt.key === item.key)}
              name={item.key}
              onClick={(e) => addButtonToProfile(e)}
              key={item.key}
              className="flex items-center gap-1 bg-gray-600 text-white rounded-sm py-1 px-2 lg:py-2 lg:px-4"
            >
              {item.icon}
              <span className="capitalize">{item.key}</span>
              <FaPlus className="font-extralight ml-2" />
            </button>
          ))}
        </div>
      </PageSection>

      <PageSection>
        <h3 className="title">Links:</h3>
        <buttons
          onClick={() =>
            setLinks((prev) => [
              ...prev,
              {
                id: Date.now().toString(),
                title: "",
                subtitle: "",
                url: "",
              },
            ])
          }
          className="flex items-center cursor-pointer text-3xl gap-2"
        >
          <FaCirclePlus className="text-blue-500 rounded-sm" />
          <span className="font-bold">Add New</span>
        </buttons>
        <div className="w-full border-2 border-black/25 rounded-3xl my-8"></div>
        <form action={handleLinksSave}>
          <div
            list={links}
            setList={setLinks}
            className="flex flex-col gap-12 lg:gap-8"
          >
            {links.map((item, index) => (
              <div
                key={item.id}
                className={`flex gap-2 lg:gap-6 text-2xl items-center ${
                  index % 2 !== 0 && "bg-black/5 py-3 rounded-md"
                }`}
              >
                <div className="flex flex-col w-full gap-3">
                  <input
                    type="text"
                    hidden
                    className="hidden"
                    name={"id-" + index}
                    defaultValue={Date.now().toString()}
                  />
                  <input
                    type="text"
                    placeholder="title"
                    defaultValue={item.title}
                    className="p-1 bg-gray-200 font-medium rounded-sm"
                    required
                    name={"title-" + index}
                  />
                  <input
                    type="text"
                    placeholder="subtitle"
                    defaultValue={item.subtitle}
                    name={"subtitle-" + index}
                    className="p-1 bg-gray-200 font-medium rounded-sm"
                  />
                  <input
                    type="text"
                    placeholder="url"
                    defaultValue={item.url}
                    required
                    name={"url-" + index}
                    className="p-1 bg-gray-200 font-medium rounded-sm"
                  />

                  <button
                    onClick={() =>
                      setLinks((prev) => prev.filter((itm) => itm !== item))
                    }
                    className="block md:hidden w-fit self-end px-2 py-1 rounded bg-red-600 text-white mr-2"
                  >
                    <MdDelete className="text-3xl"/>
                  </button>
                </div>
                <MdDelete
                  onClick={() =>
                    setLinks((prev) => prev.filter((itm) => itm !== item))
                  }
                  className="hidden md:block text-5xl w-fit cursor-pointer text-red-600"
                />
              </div>
            ))}
          </div>

          <input
            type="text"
            name="links"
            hidden
            className="hidden"
            defaultValue={JSON.stringify(links)}
          />
          <SubmitButton
            isPending={true}
            className="flex bg-blue-500 items-center justify-center gap-4 mt-8 text-white py-1 px-2 rounded w-full"
          >
            <IoIosSave />
            Save
          </SubmitButton>
        </form>
      </PageSection>
    </div>
  );
};

export default PageSettingForm;
