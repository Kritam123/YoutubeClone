"use client";
import React, { useEffect, useRef, useState } from "react";
import { IoCheckmarkCircle } from "react-icons/io5";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { LuVolumeX } from "react-icons/lu";
import { LuVolume2 } from "react-icons/lu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Video } from "@prisma/client";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { getTimeDifference } from "@/utils/getVideotime";
import { formatNumber } from "@/utils/formateNumber";

interface MovieData {
  item: Video;
}
const CardItem = ({ item }: MovieData) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const totalTimeRef = useRef<HTMLDivElement>(null);
  const totalInTimeRef = useRef<HTMLDivElement>(null);
  const currentTimeRef = React.useRef<HTMLDivElement>(null);
  const timelineContainerRef = React.useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [isMuted, setIsMuted] = useState(false);

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

  const handleMuteChange = () => {
    if (isMuted) {
      setIsMuted(false);
    } else {
      setIsMuted(true);
    }
  };

  const handleClick = () => {
    router.push(`/watch/${item.id}`);
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
        percent?.toString() as string | null
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
      className="group transition relative bg-[#f2f2f2]"
    >
      <div
        onClick={handleMuteChange}
        className="absolute top-2 right-5 z-[50] w-8  flex justify-center  text-center py-1 rounded-sm bg-[#636161]"
      >
        {!isMuted ? (
          <LuVolumeX className="text-lg select-none text-white" />
        ) : (
          <LuVolume2 className="select-none text-white" />
        )}
      </div>
      <CardContent className="xl:w-[23rem] lg:w-[30rem] cursor-pointer relative  group-hover:rounded-none border rounded-xl min-h-52">
        <div
          className={cn(
            "absolute video-control-container  opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity ease-in-out z-[100] right-0  left-0 bottom-0"
          )}
        >
          <div className="duration-container px-1  py-1 inline-flex text-white text-[12px] select-none  gap-1">
            <div ref={currentTimeRef} className="currentime">

            </div>{" "}
            /{" "}
            <div ref={totalTimeRef} className="total-time ">

            </div>
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
        <Link href={`/watch/${item?.id}`}>
          <video
            ref={videoRef}
            onClick={handleClick}
            className="absolute w-full h-full group-hover:rounded-none rounded-xl"
            muted={isMuted ? false : true}
            src={item.videoUrl}
          ></video>
          <Image
            src={item.thumbnailUrl}
            className={cn(
              "absolute z-50 group-hover:hidden  transition rounded-xl group-hover:rounded-none w-full h-full object-cover "
            )}
            onClick={handleClick}
            fill
            alt="videoThumbnail"
          />
        </Link>

        <div className="absolute group-hover:hidden bottom-2 px-1 py-1 rounded-sm  right-3 flex items-center z-50 bg-gray-900 shadow-sm text-white min-w-10 h-4">
          <span className="flex items-center justify-center">
            <div ref={totalInTimeRef} className="mutes">
              00:00
            </div>
          </span>
        </div>
      </CardContent>
      <CardFooter className="mt-2  gap-3 w-[23rem] pb-3 items-start cursor-pointer">
        <Link href={`/${item?.channel?.displayName}`}>
          <Avatar>
            <AvatarImage src={item?.channel?.imageUrl} alt="img" />
            <AvatarFallback className="cursor-pointer">
              {item?.channel?.name[0]}
            </AvatarFallback>
          </Avatar>
        </Link>
        <div className="flex  flex-col">
          <CardDescription
            onClick={handleClick}
            className="w-72  truncate font-bold text-gray-900  text-[14px] "
          >
            {item.title}
          </CardDescription>
          <Link href={`/${item?.channel?.displayName}`}
            className="flex gap-1 mt-1 items-center text-gray-600"
          >
            <span className="text-sm">{item?.channel?.name}</span>
            <IoCheckmarkCircle />
          </Link>
          <Link href={`/watch/${item?.id}`}
            className="flex items-center text-gray-700 gap-2"
          >
             <p className="text-sm">
              <span className="text-sm">{formatNumber(item?.views?.length || 0)}</span> views
            </p>
            <span>.</span>
            <p className="text-sm">
              <span>{getTimeDifference(item?.createdAt)}</span>
            </p>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CardItem;


export const CardItemSkeletion = () => {
  return (
    <div>
      <CardContent className="w-[23rem] cursor-pointer bg-[#f2f2f2f2]  relative  group-hover:rounded-none border rounded-xl min-h-52">

      </CardContent>
      <CardFooter className="mt-2 gap-3 w-[23rem] pb-3 items-start cursor-pointer">

        <Skeleton className="w-10 h-10 rounded-full" />

        <div className="flex flex-col">
          <Skeleton
            className="w-72 h-5 truncate font-bold text-gray-900  text-[14px] "
          />

          <Skeleton
            className="flex w-16 h-5 gap-1 mt-1 items-center text-gray-600"
          >
          </Skeleton>
          <Skeleton
            className="flex w-10 h-5 mt-1 items-center text-gray-700 gap-2"
          >

          </Skeleton>
        </div>
      </CardFooter>
    </div>
  )
} 