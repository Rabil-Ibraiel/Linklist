import React from "react";
import { IoCheckmark } from "react-icons/io5";

const pricingTiers = [
  {
    title: "Free",
    monthlyPrice: 0,
    buttonText: "Get started for free",
    popular: false,
    inverse: false,
    features: [
      "Up to 10 links",
      "Basic analytics",
      "Standard themes",
      "Social media integration",
      "Basic support",
    ],
  },
  {
    title: "Pro",
    monthlyPrice: 9,
    buttonText: "Sign up now",
    popular: true,
    inverse: true,
    features: [
      "Unlimited links",
      "Advanced analytics",
      "Custom themes",
      "Priority support",
      "No branding",
      "Scheduled links",
      "Multiple pages",
    ],
  },
  {
    title: "Business",
    monthlyPrice: 19,
    buttonText: "Sign up now",
    popular: false,
    inverse: false,
    features: [
      "Unlimited links",
      "Advanced analytics with detailed insights",
      "Custom themes and CSS",
      "Dedicated account manager",
      "Team collaboration with roles and permissions",
      "API access",
      "Custom domains with SSL support",
      "Advanced security features",
    ],
  },
];

const page = () => {
  return (
    <div className="w-screen h-full py-6 overflow-x-hidden overflow-y-auto">
      <h1 className="mainTitle text-6xl">pricing</h1>
      <h3 className="text-center text-blue-950 text-sm lg:text-lg uppercase mb-12 lg:mb-0">
        coming soon. <span className="font-bold">its free for now.</span>
      </h3>
      <div className="flex flex-col lg:flex-row mt-0 md:mt-12 lg:mt-24 w-full h-fit items-end gap-6 justify-between px-6 lg:px-12 pb-8 lg:pb-0">
        {pricingTiers.map((item) => (
          <div
            key={item.title}
            className={`border-2 rounded-md w-full h-fit lg:h-fit lg:w-1/3 p-6 ${
              item.inverse
                ? "border-white text-white bg-black"
                : "border-black/75 text-black bg-white"
            }`}
          >
            <div
              className={`flex items-center justify-between ${
                item.inverse ? "text-white" : "text-black/75"
              } ${item.popular ? "font-extrabold" : "font-semibold"}`}
            >
              <h2 className="text-4xl ">{item.title}</h2>
              {item.popular && (
                <span className="font-light uppercase bg-gradient-to-b from-black from-0% via-white via-50% to-black to-90%  text-transparent bg-clip-text rounded-md ">
                  most popular
                </span>
              )}
            </div>
            <p className="mt-10 mb-16">
              <span
                className={`font-extrabold text-5xl ${
                  item.inverse ? "text-white" : "text-black/75"
                }`}
              >
                ${item.monthlyPrice}
              </span>
              /monthly
            </p>

            <ul className="flex flex-col gap-3 text-lg cursor-default">
              {item.features.map((feature) => (
                <li
                  key={feature}
                  className={`flex items-center text-current ${
                    item.inverse
                      ? "hover:bg-white hover:text-black"
                      : "hover:bg-black hover:text-white"
                  } w-fit hover:px-1 hover:rounded-md`}
                >
                  <IoCheckmark className="mr-2  min-w-6 max-w-6" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
