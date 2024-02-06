import React from "react";
import { RiVideoAddLine } from "react-icons/ri";
import { IoMdNotificationsOutline } from "react-icons/io";
import { UserButton, currentUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Tootip from "@/components/Tootip";
import { FaUserCircle } from "react-icons/fa";
import Link from "next/link";
import { RiVideoLine } from "react-icons/ri";
import { CiStreamOn } from "react-icons/ci";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { db } from "@/lib/db";
const Actions = async () => {
  const user = await currentUser();
  let channel, dbUser;
  if (user) {
    dbUser = await db.user.findUnique({
      where: {
        externalUserId: user.id
      }
    })
    channel = await db.channel.findUnique({
      where: {
        userId: dbUser?.id
      }
    })
  }
  return (
    <div className="flex gap-2 items-center" suppressHydrationWarning={true}>

      <Popover>
        <PopoverTrigger>
          <Tootip title="Create">
            <Button
              variant={"outline"}
              size={"lg"}
              className="rounded-full w-10 h-10"
            >
              <RiVideoAddLine className="text-2xl" />
            </Button>
          </Tootip>
        </PopoverTrigger>
        <PopoverContent className="w-fit flex items-start justify-start flex-col  z-[999]">
          <Link href={`/dashboard/channel/${channel?.id}/videos/upload`}>
            <Button variant={"outline"} className="flex gap-2 w-full">
              <RiVideoLine className="text-lg" />
              <span> Upload video</span>
            </Button>
          </Link>
          <Button variant={"outline"} className="flex gap-2 w-full">
            <CiStreamOn className="text-lg" />
            <span> Go live</span>
          </Button>
        </PopoverContent>
      </Popover>


      <div className="relative mr-3">
       
        <Tootip title="Notifications">
        <Badge
          className="absolute flex justify-center w-6 h-6 -right-1"
          variant="destructive"
        >
          <span className="">+9</span>
        </Badge>
          <Button
            variant={"outline"}
            size={"lg"}
            className=" rounded-full w-10 h-10"
          >
            <IoMdNotificationsOutline className="text-2xl" />
          </Button>
        </Tootip>
      </div>

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
