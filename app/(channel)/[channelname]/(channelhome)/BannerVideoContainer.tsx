"use client";
import Tootip from "@/components/Tootip";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { getTimeDifference } from "@/utils/getVideotime";
import Image from "next/image";
import { HiOutlineDotsVertical } from "react-icons/hi";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { IoCheckmarkCircle } from "react-icons/io5";
import { PiQueueFill } from "react-icons/pi"
import { BsStopwatch } from "react-icons/bs";
import { PiShareFat } from "react-icons/pi";
import { BiSolidPlaylist } from "react-icons/bi";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const BannerVideoContainer = ({ channel }: any) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const totalTimeRef = useRef<HTMLDivElement>(null);
  const handleEnter = () => {
    if (videoRef.current) {
      videoRef.current.play();
      videoRef.current.currentTime = 0;
    }
  };
  const handleLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };
  const loadingZeroFormatter = new Intl.NumberFormat(undefined, {
    minimumIntegerDigits: 2,
  });
  const formateDuration = (time: any) => {
    const seconds = Math.floor(time % 60);
    const minutes = Math.floor(time / 60) % 60;
    const hours = Math.floor(time / 3600);
    if (hours === 0) {
      return `${minutes} : ${loadingZeroFormatter.format(seconds)}`;
    } else {
      return `${hours}:${loadingZeroFormatter.format(
        minutes
      )}:${loadingZeroFormatter.format(seconds)}`;
    }
  };
  const handleTotalDuration = () => {
    if (totalTimeRef.current) {
      totalTimeRef.current.innerText = formateDuration(
        videoRef.current?.duration
      );
    }
  };
  useEffect(() => {
    videoRef.current &&
      videoRef.current.addEventListener("loadeddata", handleTotalDuration);
    return () => {
      videoRef.current &&
        videoRef.current.removeEventListener("loadeddata", handleTotalDuration);
    };
  }, []);
  return (
    <>
    <div className="w-[80%]   relative">
      <Link href={`/watch/${channel.bannervideo?.id}`}>
        <Card
          className={cn(
            "  relative  gap-5 flex transition"
          )}
        >
          <CardContent
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            className="w-[20rem] cursor-pointer group relative border shadow-md  rounded-xl h-[9rem]"
          >
            <video
              ref={videoRef}
              className="absolute object-cover w-full h-full  rounded-xl"
              muted={true}
              src={channel?.bannervideo?.videoUrl}
            ></video>
            <Image
              src={channel?.bannervideo?.thumbnailUrl}
              className={cn(
                "absolute z-50 group-hover:hidden transition-all rounded-xl w-full h-full object-cover "
              )}
              fill
              alt="videoThumbnail"
            />
            <div className="absolute group-hover:hidden bottom-2 px-1 py-1 rounded-sm  right-3 flex items-center z-50 bg-gray-900 shadow-sm text-white min-w-10 h-4">
              <span className="flex items-center justify-center">
                <div ref={totalTimeRef} className="mutes text-[12px]">
                  00:00
                </div>
              </span>
            </div>
          </CardContent>
          <CardDescription className="w-full">
            <p className="w-fit h-fit font-semibold uppercase text-gray-700  text-lg">
              {channel?.bannervideo?.title}
            </p>
            <div className=" mt-1  text-gray-600">
              <Link href={`/${channel?.displayName}`}>
              <Tootip
                className="text-[12px] items-center w-fit border flex gap-1 mt-1  bg-slate-600 text-white"
                title={channel?.name}
              >
                <span className="text-[12px]">{channel?.name}</span>
                <IoCheckmarkCircle />
              </Tootip>
              </Link>
            </div>
            <div className="flex items-center text-gray-700 gap-2">
              <p className="text-[12px]">
                <span className="text-sm">
                  {channel?.bannervideo?.views?.length | 0}
                </span>{" "}
                views
              </p>
              <span className="text-sm">.</span>
              <p className="text-[12px]">
                <span>{getTimeDifference(channel.bannervideo?.createdAt)}</span>
              </p>
            </div>
          </CardDescription>
          
        </Card>
      </Link>
     <div className="absolute top-0 right-0">
     <Popover>
            <PopoverTrigger>
              <Button
                variant={"outline"}
                size={"icon"}
                className="rounded-full" 
              >
                <HiOutlineDotsVertical className="text-lg" />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="border w-56 py-1 px-0  ">
              <Button variant={"outline"} className="space-x-3 w-full flex justify-start">
                    <PiQueueFill className="text-lg"/>
                    <span>Add to queue</span>
              </Button>
              <Button variant={"outline"} className="space-x-3 w-full flex justify-start">
                    <BsStopwatch className="text-lg"/>
                    <span>Save to watch letter</span>
              </Button>
              <Button variant={"outline"} className="space-x-3 w-full flex justify-start">
                    <BiSolidPlaylist className="text-lg"/>
                    <span>Save to playlist</span>
              </Button>
              <Button variant={"outline"} className="space-x-3 w-full flex justify-start">
                    <PiShareFat className="text-lg"/>
                    <span>Share</span>
              </Button>
            </PopoverContent>
          </Popover>
     </div>
    </div>
      <Separator  className="mt-3"/>
    </>
  );
};

export default BannerVideoContainer;
