import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Link from "next/link";
import LogoutButton from "./buttons/LogoutButton";
import { HiOutlineLink } from "react-icons/hi";

const Header = async () => {
  const session = await getServerSession(authOptions);
  return (
    <header className=" bg-white text-black h-24 px-12 lg:px-32 mx-auto">
      <div className="flex justify-between items-center h-full w-full">
        <div className="flex gap-8 lg:gap-24">
          <Link href={"/"} className="text-xl font-bold flex items-center gap-2 text-blue-600">
            <HiOutlineLink />
            Linklist
          </Link>

          <nav className="flex gap-6 text-gray-600">
            <Link href={"/about"}>About</Link>
            <Link href={"/pricing"}>Pricing</Link>
            <Link href={"/contact"}>Contact</Link>
            {session && <Link href={"/account"}>Account</Link>}
          </nav>
        </div>

        {session ? (
          <div className="flex gap-6 items-center">
            <Link href={'/account'} className="text-md">
              Hello,{" "}
              <span className="font-bold text-xl">
                {session?.user?.name.length > 1
                  ? session.user.name.split(" ")[0]
                  : session.user.name}
              </span>
            </Link>
            <LogoutButton />
          </div>
        ) : (
          <div className="flex gap-6">
            <Link href={"/login"}>Sign In</Link>
            <Link href={"/login"}>Create Account</Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
