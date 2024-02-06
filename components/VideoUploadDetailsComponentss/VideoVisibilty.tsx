"use client";
import React, { useRef, useState } from "react";
import { Button } from "../ui/button";
import { LuChevronDown } from "react-icons/lu";

import { MdContentCopy } from "react-icons/md";
import { cn } from "@/lib/utils";
const VideoVisiblity = ({
  videoUrl,
  setActive,
  active,
  videoName,
  upload,
  isPending,
}: any) => {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const [saveExpand, setSaveExpand] = useState(false);
  const [scheduleExpand, setScheduleExpand] = useState(false);
  const handleCopylink = () => {
    if (linkRef.current) {
      navigator.clipboard.writeText(linkRef.current.innerHTML);
      alert(linkRef.current.innerHTML);
    }
  };
  const handleSave = () => {
    if (scheduleExpand) {
      setScheduleExpand(false);
    }
    setSaveExpand(true);
  };
  const handleSchedule = () => {
    if (saveExpand) {
      setSaveExpand(false);
    }
    setScheduleExpand(true);
  };
  return (
    <div className="px-5 mt-3 max-h-[550px] overflow-y-auto flex w-full gap-5 ">
      <div className="w-full h-full">
        <h1 className="text-xl font-bold">Visibility</h1>
        <p className="text-[13px]">
          Choose when to publish and who can see your video
        </p>
        <div className="space-y-6 mt-3">
          <div
            className={cn(
              "w-full h-[5rem] border rounded-md overflow-hidden",
              saveExpand && "h-72 border border-black"
            )}
          >
            <div className="flex py-5 justify-between px-4  items-center ">
              <div className="">
                <span className="text-sm text-black">Save or publish</span>
                <p className="text-[13px]">
                  Make your video <span className="text-gray-800">public</span>,{" "}
                  <span className="text-gray-800">unlisted</span>, or{" "}
                  <span className="text-gray-800">private</span>
                </p>
              </div>
              {!saveExpand && (
                <Button
                  className="rounded-full"
                  onClick={handleSave}
                  variant={"ghost"}
                  size={"icon"}
                >
                  <LuChevronDown className="text-2xl" />
                </Button>
              )}
            </div>
            <div className={cn("px-10 space-y-5")}>
              <div className="flex  items-start gap-2">
                <input type="radio" className="" name="" id="" />
                <div className="flex flex-col justify-center">
                  <span className="text-[14px]">Private</span>
                  <p className="text-[13px]">
                    only you and people you choose can watch your video
                  </p>
                </div>
              </div>
              <div className="flex  items-start gap-2">
                <input type="radio" className="" name="" id="" />
                <div className="flex flex-col justify-center">
                  <span className="text-[14px]">Unlisted</span>
                  <p className="text-[13px]">
                    Anyone with the link can watch your video{" "}
                  </p>
                </div>
              </div>
              <div className="flex  items-start gap-2">
                <input type="radio" className="" name="" id="" />
                <div className="flex flex-col justify-center">
                  <span className="text-[14px]">Public</span>
                  <p className="text-[13px]">Every can watch your video</p>
                </div>
              </div>
            </div>
          </div>
          <div
            className={cn(
              "w-full h-[5rem] border",
              scheduleExpand && "h-72 border rounded-md border-black"
            )}
          >
            <div className="flex py-5 justify-between px-4  items-center ">
              <div className="">
                <span className="text-sm text-black">Schedule</span>
                <p className="text-[13px]">
                  Select a date to make your video{" "}
                  <span className="text-gray-800">public</span>.{" "}
                </p>
              </div>
              {!scheduleExpand && (
                <Button
                  className="rounded-full"
                  onClick={handleSchedule}
                  variant={"ghost"}
                  size={"icon"}
                >
                  <LuChevronDown className="text-2xl" />
                </Button>
              )}
            </div>
          </div>
        </div>
        <div className=""></div>
      </div>
      <div className=" w-[450px] sticky top-[-50px]  h-full">
        <div className="h-fit pb-2 mt-[52px] bg-[#f9f9f9] border">
          <div className="w-full">
            <video className="w-full" controls src={videoUrl}></video>
            <div className="px-2 py-2 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">video link</span>
                <a
                  ref={linkRef}
                  className="text-sm text-blue-500 truncate w-[250px]"
                  href={videoUrl}
                >
                  {videoUrl}
                </a>
              </div>
              <Button onClick={handleCopylink} variant={"ghost"} size={"icon"}>
                <MdContentCopy className="text-xl cursor-pointer" />
              </Button>
            </div>

            <div className="flex flex-col px-2">
              <span className="text-sm text-gray-500">Filename</span>
              <span className="text-sm truncate h-10 w-[300px]">
                {videoName}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex gap-5 bottom-3 right-16">
        <Button
          onClick={() => setActive(active - 1)}
          className="  uppercase font-bold"
          variant={"secondary"}
        >
          Back
        </Button>
        <Button
          disabled={isPending}
          onClick={() => upload()}
          className=" bg-blue-600 hover:bg-blue-600 uppercase font-bold text-white "
          variant={"secondary"}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default VideoVisiblity;
