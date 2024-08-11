import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AnalyticsChart from "@/components/AnalyticsChart";
import PageSection from "@/components/PageSection";
import Event from "@/models/Event";
import Page from "@/models/Page";
import { format } from "date-fns";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { IoIosLink } from "react-icons/io";

const page = async () => {
  const session = await getServerSession(authOptions);
  const page = await Page.findOne({ owner: session?.user?.email });
  const viewEvents = await Event.aggregate([
    {
      $match: {
        type: "view",
        url: page?.uri,
      },
    },
    {
      $group: {
        _id: {
          $dateToString: {
            date: "$createdAt",
            format: "%Y-%m-%d",
          },
        },
        count: {
          $count: {},
        },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  const totalViews = viewEvents
    .map((item) => item.count)
    .reduce((acc, curr) => acc + curr, 0);

  const today = format(new Date(), "yyyy-MM-dd");

  const todayViews = viewEvents
    .filter((item) => item._id === today)
    .map((item) => item.count)
    .reduce((acc, curr) => acc + curr, 0);

  const clickEvents = await Event.aggregate([
    {
      $match: {
        type: "click",
        url: page?.uri,
      },
    },

    {
      $group: {
        _id: {
          $dateToString: {
            date: "$createdAt",
            format: "%Y-%m-%d",
          },
        },

        count: {
          $count: {},
        },

        clickedTo: {
          $first: "$clickedTo",
        },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  return (
    <div className="flex flex-col gap-6 pt-4 pb-12">
      <PageSection className="shadow-lg py-2 px-4 my-3">
        <h2 className="title">Profile Views:</h2>
        <div className="flex items-center justify-between gap-12 px-4 overflow-hidden">
          <div className="border-2 border-black/40 w-1/2  py-6 rounded-md flex flex-col items-center justify-center text-center">
            <span className="text-4xl lg:text-6xl px-2 font-bold overflow-x-auto overflow-y-hidden w-full">
              {todayViews}
            </span>
            <p className="text-black/60 uppercase mt-3 font-light">today</p>
          </div>
          <div className="border-2 border-black/40 w-1/2 py-6 rounded-md flex flex-col items-center justify-center text-center">
            <span className="text-4xl px-2 lg:text-6xl font-bold overflow-x-auto overflow-y-hidden w-full">
              {totalViews}
            </span>
            <p className="text-black/60 uppercase mt-3 font-light">All Time</p>
          </div>
        </div>
      </PageSection>
      <PageSection className="shadow-lg py-2 px-4 my-3">
        <h2 className="title">Link Clicks:</h2>
        {page.links.length < 1 ? (
          <h3 className="text-2xl text-red-600 text-center">
            You have no <span className="font-bold">Links</span> to display!
          </h3>
        ) : (
          <div>
            {page.links.map((item) => {
              let sum = 0;
              const allTimeClicks = clickEvents
                .filter((click) => click.clickedTo === item.url)
                .map((item) => item.count);

              if (allTimeClicks) {
                sum = allTimeClicks?.reduce((acc, curr) => acc + curr, 0);
              }

              let todaySum = 0;
              const todayClicks = clickEvents
                .filter((click) => click.clickedTo === item.url)
                .filter((click) => click._id === today)
                .map((item) => item.count);

              if (allTimeClicks) {
                todaySum = todayClicks.reduce((acc, curr) => acc + curr, 0);
              }

              return (
                <div>
                  <div className="w-full border-2 border-black/25 rounded-3xl my-8"></div>

                  <div className="flex flex-col lg:flex-row items-center justify-between">
                    <Link
                      target="_blank"
                      href={item.url}
                      className="flex items-center gap-3"
                    >
                      <span>
                        <IoIosLink className="text-5xl text-blue-500" />
                      </span>
                      <div className="flex flex-col">
                        <h3 className="text-4xl font-bold mb-3">
                          {item.title}
                        </h3>
                        <p>{item.subtitle}</p>
                        <span className="text-black/50 text-sm">
                          {item.url}
                        </span>
                      </div>
                    </Link>

                    <div className="flex items-center gap-6 w-full lg:w-fit mt-8 lg:mt-0">
                      <div className="border-2 border-black/40 py-2 lg:py-5 w-1/2 lg:w-40 rounded-md flex flex-col items-center justify-center text-center">
                        <span className="text-4xl lg:text-6xl  font-bold overflow-x-auto overflow-y-hidden w-full">
                          {todaySum}
                        </span>
                        <p className="text-black/60 uppercase mt-3 font-light">
                          Today
                        </p>
                      </div>
                      <div className="border-2 border-black/40 py-2 lg:py-5 w-1/2 lg:w-40  rounded-md flex flex-col items-center justify-center text-center">
                        <span className="text-4xl lg:text-6xl font-bold overflow-x-auto overflow-y-hidden w-full">
                          {sum}
                        </span>
                        <p className="text-black/60 uppercase mt-3 font-light">
                          All Time
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </PageSection>
    </div>
  );
};

export default page;
