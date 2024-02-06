"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { IoCheckmarkCircle } from "react-icons/io5";
import Tootip from "@/components/Tootip";
import { getTimeDifference } from "@/utils/getVideotime";
import { Skeleton } from "@/components/ui/skeleton";
interface Video {
  description: string;
  sources: string[];
  subtitle: string;
  thumb: string;
  title: string;
}
interface MovieData {
  item: Video;
}

const SuggestedVideoBox = ({ item }: any) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const totalTimeRef = useRef<HTMLDivElement>(null);
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
    router.push(`/watch/${item?.id}`);
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
  }, [handleTotalDuration]);
  return (
    <>
      <Card
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        className={cn(" group gap-2 border flex transition")}
      >
        <CardContent
          onClick={handleClick}
          className="w-[19rem] cursor-pointer relative   rounded-xl h-[7rem]"
        >
          <video
            ref={videoRef}
            className="absolute  w-full h-full  rounded-xl"
            muted={true}
            src={
              item?.videoUrl
            }
          ></video>
          <Image
            src={
              item?.thumbnailUrl
            }
            className={cn(
              "absolute z-50 group-hover:hidden transition rounded-xl w-full h-full object-cover "
            )}
            fill
            alt="videoThumbnail"
          />
          <div className="absolute group-hover:hidden bottom-2 px-1 py-1 rounded-sm  right-3 flex items-center z-50 bg-gray-900 shadow-sm text-white min-w-10 h-4">
            <span className="flex items-center justify-center">
              <div ref={totalTimeRef} className="mutes">
                00:00
              </div>
            </span>
          </div>
        </CardContent>
        <CardDescription className="w-full">
          <p className="w-fit h-fit font-bold text-gray-900  text-[13px]">
            {item?.title.slice(0, item.title.length).concat("....")}
          </p>
          <div className=" mt-2  text-gray-600">
            <Tootip className="text-[12px] items-center w-fit border flex gap-1 mt-1  bg-slate-600 text-white" title={item?.channel?.name}>
              <span className="text-[12px]">{item?.channel?.name}</span>
              <IoCheckmarkCircle />
            </Tootip>
          </div>
          <div className="flex items-center text-gray-700 gap-2">
            <p className="text-[12px]">
              <span className="text-sm">{item?.views?.length | 0}</span>views
            </p>
            <span className="text-sm">.</span>
            <p className="text-[12px]">
              <span>{getTimeDifference(item?.createdAt)}</span>
            </p>
          </div>
        </CardDescription>
      </Card>
    </>
  );
};

export default SuggestedVideoBox;


export const SuggestedVideoBoxSkeleton = () => {
  return (
    <div
      className="flex gap-2"
    >
      <Skeleton
        className="w-[19rem] cursor-pointer relative mb-1  rounded-xl h-[7rem]"
      >
      </Skeleton>
      <CardDescription className="w-full mt-3">
        <Skeleton className="w-42  h-5 font-bold text-gray-900  text-[13px]">
        </Skeleton>
        <div className=" mt-2  text-gray-600">
          <Skeleton className=" w-12 h-3"></Skeleton>
        </div>
        <div className="flex mt-2 items-center text-gray-700 gap-2">
          <Skeleton className="w-16 h-3"></Skeleton>


        </div>
      </CardDescription>
    </div>
  )
}