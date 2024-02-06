import React from "react";
import { UserButton, currentUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { BiVideoPlus } from "react-icons/bi";
import Tootip from "@/components/Tootip";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineHelpOutline } from "react-icons/md";
import Link from "next/link";
const Actions = async () => {
  const user = await currentUser();
  return (
    <div className="flex gap-2 items-center">
      <Tootip className="text-sm" title="Help">
        <Button
          variant={"outline"}
          size={"lg"}
          className="rounded-full w-10 h-10 group"
        >
          <MdOutlineHelpOutline className="text-2xl transition text-gray-500 group-hover:text-black" />
        </Button>
      </Tootip>
      <Button
          variant={"outline"}
          size={"lg"}
          className="rounded-md px-2 py-1 flex gap-2 border group "
        >
          <BiVideoPlus className="text-2xl transition text-red-500" />
          <span className="uppercase text-gray-700 font-semibold">Create</span>
        </Button>
      {user ? (
        <UserButton />
      ) : (
        <Link href={"/signin"}>
          <Button
            className="text-md text-[#065FD4] mt-2 hover:text-[#065FD4] border rounded-xl"
            variant={"ghost"}
          >
            <FaUserCircle className=" text-lg " />
            <span className="ml-3">Sign in</span>
          </Button>
        </Link>
      )}
    </div>
  );
};

export default Actions;
