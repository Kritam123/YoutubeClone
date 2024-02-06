"use client";
import React, { useState } from "react";
import { GoBell } from "react-icons/go";
import { LuChevronDown } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { BiSolidDislike, BiSolidLike } from "react-icons/bi";
import Tootip from "@/components/Tootip";
import { AiOutlineLike } from "react-icons/ai";
import { BiDislike } from "react-icons/bi";
import { PiShareFatLight } from "react-icons/pi";
import { LiaDownloadSolid } from "react-icons/lia";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { Separator } from "@/components/ui/separator";
import ChannelAvatar from "@/components/channel-avatar";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SubscribedChannel, UnSubscribedChannel } from "@/actions/subscribed";
import { toast } from "sonner";
import { dislikeVideo, likeVideofunc } from "@/actions/video";
import { useParams } from "next/navigation";
import { Channel, Video } from "@prisma/client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
interface VideoWithChannelProps {
  channel: Channel & Video;
}
const VideoDetails = ({
  video,
  userId,
  isPending,
}: {
  video: any;
  userId: string;
  isPending: boolean;
}) => {
  // states
  const { videoId }: any = useParams();
  const isOwnChannel = video?.channel?.userId === userId;
  const isSubscribed = video?.channel?.Subscribed.some(
    (item: any) => item.subscribedId === userId
  );
  const isLiked = video?.likes?.some((item: any) => item.userId === userId);
  const isDisliked = video?.disLikes?.some(
    (item: any) => item.userId === userId
  );
  const [isLoading, setIsLoading] = useState(false);

  //  handlefunctions
  const handleSubscribed = async () => {
    setIsLoading(true);
    try {
      const res = await SubscribedChannel(video.channel.id);
      toast.success(`subscribed ${res?.channel?.name}`);
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };
  const handleUnSubscribed = async () => {
    setIsLoading(true);
    try {
      const res = await UnSubscribedChannel(video?.channel?.id);
      toast.success(`unsubscribed ${res?.channel?.name}`);
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };
  const handleSubscribedAndUnSubscribed = () => {
    if (isSubscribed) {
      handleUnSubscribed();
    } else {
      handleSubscribed();
    }
  };
  const handlelikeVideo = async () => {
    try {
      const res = await likeVideofunc(videoId);
      if (res) {
        toast.success("Liked video");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };
  const handleDisLikevideo = async () => {
    try {
      const res = await dislikeVideo(videoId);
      if (res) {
        toast.success("DisLiked video");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };
  if (isPending) {
    return <VideodetailsSkeleton />;
  }
  return (
    <div className=" w-full py-3 h-[20%] ">
      {/* videoDescription */}
      <p className="font-bold text-[20px]">{video?.title}</p>
      <div className="mt-1 flex justify-between">
        <div className="flex gap-8">
          <Link
            href={`/${video?.channel?.displayName}`}
            className="flex gap-3 cursor-pointer"
          >
            <ChannelAvatar
              imageUrl={video?.channel?.imageUrl}
              channelname={video?.channel?.displayName || "Image"}
              size={"md"}
            />
            <div className="flex flex-col">
              <Tootip
                className="bg-gray-600 text-white text-[12px] "
                title={video?.channel?.name}
              >
                <span className="text-gray-800 cursor-pointer text-md font-bold">
                  {video?.channel?.name}
                </span>
              </Tootip>
              <span className="text-[12px]">
                {video?.channel?.Subscribed?.length || 0}
                <span> subscribers</span>
              </span>
            </div>
          </Link>
          {isOwnChannel ? (
            <Link href={`/channel/${video?.channel?.id}`}>
              <Button
                variant={"ghost"}
                disabled={isLoading}
                className={cn(
                  "rounded-3xl space-x-2 bg-[#F2F2F2] text-black hover:bg-[#f2f2f2] hover:text-black"
                )}
              >
                <span className="text-md">Customise Channel</span>
              </Button>
            </Link>
          ) : userId ? (
            <Button
              variant={"ghost"}
              disabled={isLoading}
              onClick={handleSubscribedAndUnSubscribed}
              className={cn(
                " rounded-3xl bg-black text-white hover:bg-black hover:text-white space-x-2",
                isSubscribed &&
                  "bg-[#F2F2F2] text-black hover:bg-[#f2f2f2] hover:text-black"
              )}
            >
              {isSubscribed && <GoBell className="text-xl" />}
              <span className="text-md">Subscribed</span>
              {isSubscribed && <LuChevronDown className="text-xl" />}
            </Button>
          ) : (
            <Popover>
              <PopoverTrigger>
                <Button
                  variant={"ghost"}
                  className={cn(
                    " rounded-3xl space-x-2 bg-[black] hover:bg-[black] text-white hover:text-white"
                  )}
                >
                  <span className="text-md">Subscribed</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-[23rem] shadow-lg max-h-[15rem] "
                align="start"
              >
                <div className="px-3 flex flex-col justify-center py-2">
                  <h1 className="mb-5 ">Want to Subscribe to this channel?</h1>
                  <p className="text-sm text-gray-500 mb-3">
                    Sign in to subscribe to this channel
                  </p>
                  <Link href={"/sign-in"} className="mt-3">
                    <Button
                      className="text-blue-500 px-2 rounded-lg  hover:text-blue-500"
                      variant={"ghost"}
                    >
                      Sign in
                    </Button>
                  </Link>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
        <div className="flex gap-4">
          <div className="flex items-center">
            <Popover>
              <PopoverTrigger>
                <Button
                  onClick={userId ? handlelikeVideo : undefined}
                  variant={"ghost"}
                  className="bg-[#f2f2f2] rounded-r-none rounded-s-2xl  space-x-2"
                >
                  {isLiked ? (
                    <BiSolidLike className="text-xl" />
                  ) : (
                    <AiOutlineLike className="text-xl " />
                  )}
                  <span> {0 || video?.likes?.length}</span>
                </Button>
              </PopoverTrigger>
              {!userId && (
                <PopoverContent
                  className="w-[23rem] shadow-lg max-h-[15rem] "
                  align="start"
                >
                  <div className="px-3 flex flex-col justify-center py-2">
                    <h1 className="mb-5 ">Like this video?</h1>
                    <p className="text-sm text-gray-500 mb-3">
                      Sign in to count your opinion.
                    </p>
                    <Link href={"/sign-in"} className="mt-3">
                      <Button
                        className="text-blue-500 px-2 rounded-lg  hover:text-blue-500"
                        variant={"ghost"}
                      >
                        Sign in
                      </Button>
                    </Link>
                  </div>
                </PopoverContent>
              )}
            </Popover>

            <Separator className="bg-[#e3e3ee]" orientation="vertical" />
            <Popover>
              <PopoverTrigger>
                <Button
                  onClick={userId ? handleDisLikevideo : undefined}
                  variant={"ghost"}
                  className="bg-[#f2f2f2] rounded-r-2xl  flex items-center space-x-2 rounded-l-none "
                >
                  {isDisliked ? (
                    <BiSolidDislike className="text-xl" />
                  ) : (
                    <BiDislike className={"text-xl"} />
                  )}
                  <span> {video?.disLikes?.length || 0}</span>
                </Button>
              </PopoverTrigger>
              {!userId && (
                <PopoverContent
                  className="w-[23rem] shadow-lg max-h-[15rem] "
                  align="start"
                >
                  <div className="px-3 flex flex-col justify-center py-2">
                    <h1 className="mb-5 ">Don't like this video?</h1>
                    <p className="text-sm text-gray-500 mb-3">
                      Sign in to count your opinion.
                    </p>
                    <Link href={"/sign-in"} className="mt-3">
                      <Button
                        className="text-blue-500 px-2 rounded-lg  hover:text-blue-500"
                        variant={"ghost"}
                      >
                        Sign in
                      </Button>
                    </Link>
                  </div>
                </PopoverContent>
              )}
            </Popover>
          </div>
          <div className="">
            <Button
              variant={"ghost"}
              className="bg-[#f2f2f2] rounded-2xl  flex items-center space-x-2 "
            >
              <PiShareFatLight className="text-2xl" />
              <span className="text-md">share</span>
            </Button>
          </div>
          <div className="">
            <Button
              variant={"ghost"}
              className="bg-[#f2f2f2] rounded-2xl  flex items-center space-x-2 "
            >
              <LiaDownloadSolid className="text-2xl" />
              <span className="text-md">Download</span>
            </Button>
          </div>
          <div className="">
            <Button
              size={"icon"}
              variant={"ghost"}
              className="bg-[#f2f2f2] rounded-full   w-10 h-10 "
            >
              <HiOutlineDotsHorizontal className="text-xl" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoDetails;

const VideodetailsSkeleton = () => {
  return (
    <div className=" w-full py-3  h-[20%]">
      {/* videoDescription */}
      <Skeleton className="font-bold w-full h-5 text-[20px]"></Skeleton>
      <div className="mt-1 flex justify-between">
        <div className="flex gap-8">
          <div className="flex gap-3 cursor-pointer">
            <Skeleton className="w-12 h-12 rounded-full" />
            <div className="flex gap-2 flex-col">
              <Skeleton className=" w-16 h-5" />
              <Skeleton className="text-[12px] w-12 h-3" />
            </div>
          </div>
          <Skeleton className=" w-20 h-10 rounded-3xl space-x-2"></Skeleton>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center">
            <Skeleton className=" w-20 h-10 rounded-3xl space-x-2"></Skeleton>

            <Skeleton className=" w-20 h-10 rounded-3xl space-x-2"></Skeleton>
          </div>
          <div className="">
            <Skeleton className=" w-20 h-10 rounded-3xl space-x-2"></Skeleton>
          </div>
          <div className="">
            <Skeleton className=" w-20 h-10 rounded-3xl space-x-2"></Skeleton>
          </div>
          <div className="">
            <Skeleton className=" w-20 h-10 rounded-3xl space-x-2"></Skeleton>
          </div>
        </div>
      </div>
    </div>
  );
};
