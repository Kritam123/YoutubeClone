"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { formatNumber } from "@/utils/formateNumber";
import { getTimeDifference } from "@/utils/getVideotime";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";
import { BiSolidPlaylist } from "react-icons/bi";
import { BsStopwatch } from "react-icons/bs";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IoCheckmarkCircle } from "react-icons/io5";
import { PiQueueFill, PiShareFat } from "react-icons/pi";

const ChannelCardItem = ({ item, smallVideo,videos }: any) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const totalTimeRef = useRef<HTMLDivElement>(null);
  const totalInTimeRef = useRef<HTMLDivElement>(null);
  const currentTimeRef = React.useRef<HTMLDivElement>(null);
  const timelineContainerRef = React.useRef<HTMLDivElement>(null);
  const router = useRouter();

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

  const handleClick = () => {
    router.push(``);
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
    if (totalTimeRef.current && totalInTimeRef.current) {
      totalTimeRef.current.innerText = formateDuration(
        videoRef.current?.duration
      );
      totalInTimeRef.current.innerText = formateDuration(
        videoRef.current?.duration
      );
    }
  };
  const handleCurrentTime = () => {
    if (currentTimeRef.current) {
      currentTimeRef.current.innerText = formateDuration(
        videoRef.current?.currentTime
      );

      const percent =
        videoRef.current &&
        videoRef.current?.currentTime / videoRef.current?.duration;

      timelineContainerRef.current?.style.setProperty(
        "--progress-position",
        percent?.toString() as null | string
      );
    }
  };
  useEffect(() => {
    videoRef.current &&
      videoRef.current.addEventListener("loadeddata", handleTotalDuration);
    videoRef.current?.addEventListener("playing", handleTotalDuration);
    videoRef.current?.addEventListener("timeupdate", handleCurrentTime);
    return () => {
      videoRef.current &&
        videoRef.current.removeEventListener("loadeddata", handleTotalDuration);
      videoRef.current?.removeEventListener("timeupdate", handleCurrentTime);
    };
  }, []);
  let isScrubbing = false;
  const toggleScrubbing = (e: MouseEvent) => {
    e.preventDefault();
    const rect =
      timelineContainerRef.current &&
      timelineContainerRef.current?.getBoundingClientRect();
    if (rect) {
      const percent =
        Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width;
      isScrubbing = (e.buttons & 1) === 1;
      if (isScrubbing) {
        videoRef.current?.pause();
      } else {
        if (videoRef.current) {
          videoRef.current.currentTime = percent * videoRef.current.duration;
          videoRef.current?.play();
        }
      }
      timeLineUpdate(e);
    }
  };
  const timeLineUpdate = (e: MouseEvent) => {
    e.preventDefault();
    const rect =
      timelineContainerRef.current &&
      timelineContainerRef.current?.getBoundingClientRect();
    if (rect) {
      const percent =
        Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width;
      timelineContainerRef.current.style.setProperty(
        "--preview-position",
        percent.toString()
      );
    }
  };
  useEffect(() => {
    timelineContainerRef.current?.addEventListener("mousemove", timeLineUpdate);
    timelineContainerRef.current?.addEventListener(
      "mousedown",
      toggleScrubbing
    );
    document.addEventListener("mousemove", (e) => {
      if (isScrubbing) timeLineUpdate(e);
    });
    document.addEventListener("mouseup", (e) => {
      if (isScrubbing) toggleScrubbing(e);
    });
    return () => {
      timelineContainerRef.current?.removeEventListener(
        "mousedown",
        toggleScrubbing
      );
      timelineContainerRef.current?.removeEventListener(
        "mousemove",
        timeLineUpdate
      );
    };
  }, [timelineContainerRef.current]);
  return (
    <Card
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={cn("group transition relative", smallVideo && "w-[13rem]", videos && "w-[16rem] h-[10rem]")}
    >
      <Link href={`/watch/${item?.id}`}>
        <CardContent
          className={cn(
            "w-[22.5rem]  cursor-pointer relative   border rounded-xl h-[13rem]",
            smallVideo && "w-[13rem] h-[8rem]",
            videos && "w-[15rem] h-[8rem]"
          )}
        >
          <div
            className={cn(
              "absolute video-control-container  opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity ease-in-out z-[100] right-0  left-0 bottom-0"
            )}
          >
            <div className="duration-container px-1  py-1 inline-flex text-white text-[12px] select-none  gap-1">
              <div ref={currentTimeRef} className="currentime"></div> /{" "}
              <div ref={totalTimeRef} className="total-time "></div>
            </div>
            <div
              ref={timelineContainerRef}
              className="h-[7px] timeline-Container  flex items-center cursor-pointer"
            >
              <div className="bg-[#333333] h-[3px] timeline relative w-full">
                <img src="" alt="" />
                <div className="thumb-indicator"></div>
              </div>
            </div>
          </div>

          <video
            ref={videoRef}
            className="absolute w-full h-full  rounded-xl"
            muted={true}
            src={item?.videoUrl}
          ></video>
          <Image
            src={item?.thumbnailUrl}
            className={cn(
              "absolute z-50 group-hover:hidden  transition-all rounded-xl  w-full h-full object-cover "
            )}
            onClick={handleClick}
            fill
            alt="videoThumbnail"
          />

          <div className="absolute group-hover:hidden bottom-2 px-1 py-1 rounded-sm  right-3 flex items-center z-50 bg-gray-900 shadow-sm text-white min-w-10 h-4">
            <span className="flex items-center justify-center">
              <div ref={totalInTimeRef} className="mutes">
                00:00
              </div>
            </span>
          </div>
        </CardContent>
      </Link>
      <CardFooter
        className={cn(
          "mt-2  gap-3 w-[22.5rem] pb-3 justify-between items-start cursor-pointer",
          smallVideo && "w-[13rem]",
          videos && "w-[16rem]"
        )}
      >
        <div className="flex  flex-col">
          <Link href={`/watch/${item.id}`}>
            <CardDescription className=" text-wrap  font-semibold text-gray-900   text-[14px] ">
              {item.title}
            </CardDescription>
          </Link>

          <div className="flex items-center text-gray-700 gap-2">
            <p className="text-sm">
              <span className="text-sm">
                {formatNumber(item?.views?.length || 0)}
              </span>{" "}
              views
            </p>
            <span>.</span>
            <p className="text-sm">
              <span>{getTimeDifference(item?.createdAt)}</span>
            </p>
          </div>
        </div>
        <div className="">
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
            <PopoverContent
              align="start"
              className="border w-56 py-1 px-0 z-[500]  "
            >
              <Button
                variant={"outline"}
                className="space-x-3 w-full flex justify-start"
              >
                <PiQueueFill className="text-lg" />
                <span>Add to queue</span>
              </Button>
              <Button
                variant={"outline"}
                className="space-x-3 w-full flex justify-start"
              >
                <BsStopwatch className="text-lg" />
                <span>Save to watch letter</span>
              </Button>
              <Button
                variant={"outline"}
                className="space-x-3 w-full flex justify-start"
              >
                <BiSolidPlaylist className="text-lg" />
                <span>Save to playlist</span>
              </Button>
              <Button
                variant={"outline"}
                className="space-x-3 w-full flex justify-start"
              >
                <PiShareFat className="text-lg" />
                <span>Share</span>
              </Button>
            </PopoverContent>
          </Popover>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ChannelCardItem;
