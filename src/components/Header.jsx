import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { HiOutlineLink } from "react-icons/hi";
import HeaderNav from "./HeaderNav";

const Header = async () => {
  const session = await getServerSession(authOptions);
  return (
    <header className="select-none lg:select-text bg-white text-black h-24 px-12 lg:px-32 mx-auto relative">
      <div className="flex justify-between items-center h-full w-full ">
        <div className="flex lg:mr-24">
          <Link
            href={"/"}
            className="text-xl font-bold flex items-center gap-2 text-blue-600"
          >
            <HiOutlineLink />
            Linklist
          </Link>
        </div>
        <HeaderNav session={session}/>
      </div>
    </header>
  );
};

export default Header;
