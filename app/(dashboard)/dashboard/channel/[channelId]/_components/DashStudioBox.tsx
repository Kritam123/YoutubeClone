import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import React from "react";
import { CiShare1 } from "react-icons/ci";
const DashStudioBox = () => {
  return (
    <div className="w-[23rem] p-5  shadow-sm rounded-sm border  bg-white h-[16rem]">
      <h3 className="font-bold">What's new in Studio</h3>
      <div className="mt-5 mb-5  ">
        <Link
          href={"#"}
          className="flex justify-between group items-center hover:text-blue-700  "
        >
          <span className="text-[13px]">
            Upload and set video&apos;s monetization status in YouTube Studio mobile
          </span>
          <CiShare1 className="text-2xl hidden group-hover:block" />
        </Link>
      </div>
      <Separator />
      <div className="mt-5  mb-5">
        <Link
          href={"#"}
          className="flex justify-between group items-center hover:text-blue-700  "
        >
          <span className="text-[13px]">Expansion of channel permissions</span>
          <CiShare1 className="hidden group-hover:block text-lg" />
        </Link>
      </div>
      <Separator />
      <div className="mt-5  mb-5">
        <Link
          href={"#"}
          className="flex group justify-between items-center hover:text-blue-700  "
        >
          <span className="text-[13px]">
            Upcoming changes to Community Guidelines warnings
          </span>
          <CiShare1 className="hidden  group-hover:block text-xl" />
        </Link>
      </div>
    </div>
  );
};

export default DashStudioBox;
