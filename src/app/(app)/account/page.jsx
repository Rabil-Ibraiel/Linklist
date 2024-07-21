import UsernameForm from "@/components/forms/UsernameForm";
import Page from "@/models/Page";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import mongoose from "mongoose";
import PageSettingForm from "@/components/forms/PageSettingForm";

const page = async ({ searchParams }) => {
  const desiredUsername = searchParams?.desiredUsername;
  const session = await getServerSession(authOptions);
  mongoose.connect(process.env.MONGODB_URI);
  const page = await Page.findOne({
    owner: session?.user?.email,
  });

  if (page) {
    return <PageSettingForm page={page} user={session?.user} />;
  }

  if (!session) {
    return redirect("/");
  } else {
    return <UsernameForm desiredUsername={desiredUsername} page={page} />;
  }
};

export default page;
