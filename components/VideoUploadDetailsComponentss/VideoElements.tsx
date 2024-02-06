import React from "react";
import { Button } from "../ui/button";
import { MdOutlineSubtitles } from "react-icons/md";
import { PiScreencast } from "react-icons/pi";
import { RiInformationLine } from "react-icons/ri";
const VideoElements = ({ active, setActive }: any) => {
  return (
    <div className="px-5 mt-5 max-h-[550px]  flex w-full gap-5 ">
      <div className="w-full">
        <h1 className="text-xl font-bold">Video Elements</h1>
        <p className="text-[13px] mt-3">
          Use cards and an end screen to show viewers related videos, websites,
          and calls to action. <span className="text-blue-500">Learn more</span>
        </p>
        <div className="mt-6 flex flex-col gap-5">
          <div className="bg-[#f9f9f9] flex justify-between items-center px-5 w-full h-24">
            <div className="flex items-center gap-10">
              <MdOutlineSubtitles className="text-2xl" />
              <div className="space-y-2">
                <span className="text-md">Add subtitles</span>
                <p className="text-[13px]">
                  Reach a broader audience by adding subtitles to your video
                </p>
              </div>
            </div>
            <div className="">
              <Button variant={"outline"} className="text-blue-500">
                <span className="uppercase"> Add</span>
              </Button>
            </div>
          </div>
          <div className="bg-[#f9f9f9] flex justify-between items-center px-5 w-full h-24">
            <div className="flex items-center gap-10">
              <PiScreencast className="text-2xl" />
              <div className="space-y-2">
                <span className="text-md">Add an end screen</span>
                <p className="text-[13px]">
                  Promote related content at the end of your video
                </p>
              </div>
            </div>
            <div className="space-x-3">
              <Button variant={"outline"} className="text-blue-500">
                <span className="uppercase"> Import Form video</span>
              </Button>
              <Button variant={"outline"} className="text-blue-500">
                <span className="uppercase"> Add</span>
              </Button>
            </div>
          </div>
          <div className="bg-[#f9f9f9] flex justify-between items-center px-5 w-full h-24">
            <div className="flex items-center gap-10">
              <RiInformationLine className="text-2xl" />
              <div className="space-y-2">
                <span className="text-md">Add cards</span>
                <p className="text-[13px]">
                  Promote related content during your video
                </p>
              </div>
            </div>
            <div className="">
              <Button variant={"outline"} className="text-blue-500">
                <span className="uppercase"> Add</span>
              </Button>
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
          onClick={() => setActive(active + 1)}
          className=" bg-blue-600 hover:bg-blue-600 uppercase font-bold text-white "
          variant={"secondary"}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default VideoElements;
