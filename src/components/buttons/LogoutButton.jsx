'use client'
import { signOut } from "next-auth/react";
import React, { useState } from "react";
import { MdOutlineLogout } from "react-icons/md";


const LogoutButton = ({
  className = 'border shadow-md px-4 py-2 flex gap-2 items-center disabled:bg-gray-100 disabled:cursor-wait',
  size=true
}) => {
  const [loading, setLoading]= useState(false)
  async function handleSignOut(){
    setLoading(true)
    await signOut()
    setLoading(false)
  }

  return (
    <button disabled={loading} onClick={handleSignOut} className={className}>
      Log Out
      <MdOutlineLogout className={size && 'text-lg'}/>
    </button>
  );
};

export default LogoutButton;
