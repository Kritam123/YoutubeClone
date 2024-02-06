import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import React from "react";

const DashAnalyticsBox = () => {
  return (
    <>
      {/* top-section */}
      <div className="w-[22rem] shadow-sm rounded-sm border p-5  bg-white h-[25.5rem]">
        <h1 className="font-bold">Channel analytics</h1>
        <p className="text-[13px] mt-2">current subscribers</p>
        <span className="text-[2rem] font-normal">0</span>
        {/* middle-section */}
        <div className="mt-10">
          <Separator />
          <div className="py-3 pb-6 space-y-3">
            <div className="leading-4 ">
              <h3 className="text-sm font-semibold">Summary</h3>
              <span className="text-[12px]">Last 28 days</span>
            </div>
            <div className="flex justify-between text-[13px]">
              <h3>views</h3>
              <span>0 -</span>
            </div>
            <div className="flex justify-between text-[13px]">
              <h3>Watch time(hours)</h3>
              <span>0.0 -</span>
            </div>
          </div>
          <Separator />
        </div>
        {/* button-section */}
        <div className="py-3">
          <div className="leading-4 ">
            <h3 className="text-sm font-semibold">Top videos</h3>
            <span className="text-[12px]">Last 48 hours . Views</span>
          </div>
          <Button asChild variant={"ghost"} className="mt-2 text-blue-400 uppercase hover:text-blue-400" size={"sm"}>
          <Link  href={`/dashboard/channel/659fce352186210b7ee44eb6/analytics`}>
           Go to channel Analytics
           </Link>
          </Button>
          
        </div>
      </div>
    </>
  );
};

export default DashAnalyticsBox;
