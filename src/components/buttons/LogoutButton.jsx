'use client'
import { signOut } from "next-auth/react";
import React from "react";
import { MdOutlineLogout } from "react-icons/md";


const LogoutButton = ({
  className = 'border shadow-md px-4 py-2 flex gap-2 items-center',
  size=true
}) => {
  return (
    <button onClick={() => signOut()} className={className}>
      Log Out
      <MdOutlineLogout className={size && 'text-lg'}/>
    </button>
  );
};

export default LogoutButton;
