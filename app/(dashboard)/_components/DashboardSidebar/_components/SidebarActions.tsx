import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineFeedback } from "react-icons/md";
const SidebarActions = ({ channel }: any) => {
  return (
    <div className="mt-2 space-y-1">
      <Link
        href={`/dashboard/channel/${channel?.id}/settings`}
        className={
          "w-full relative  flex justify-start h-[3rem] cursor-pointer"
        }
      >
        <Button variant={"ghost"} className="w-full px-5 h-full">
          <div className="flex items-center w-full gap-x-5">
            <IoSettingsOutline className="text-2xl text-gray-400" />
            <p className={"truncat font-bold text-sm text-gray-500"}>
              Settings
            </p>
          </div>
        </Button>
      </Link>
      <Link
        href={"/dashboard/channel/feedback"}
        className={
          "w-full relative  flex justify-start h-[3rem] cursor-pointer"
        }
      >
        <Button variant={"ghost"} className="w-full px-5 h-full">
          <div className="flex items-center w-full gap-x-5">
            <MdOutlineFeedback className="text-2xl text-gray-400" />
            <p className={"truncat font-bold text-sm text-gray-500"}>
              Send feedback
            </p>
          </div>
        </Button>
      </Link>
    </div>
  );
};

export default SidebarActions;
