'use client'
import ChannelAvatar from "@/components/channel-avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { GoBell, GoBellSlash } from "react-icons/go";
import { HiBellAlert } from "react-icons/hi2";
import { FiUserMinus } from "react-icons/fi";
import { LuChevronDown } from "react-icons/lu";
import { SubscribedChannel, UnSubscribedChannel } from "@/actions/subscribed";
import { toast } from "sonner";
const ChannelHeader = ({ channel, user }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const isOwnChannel = channel?.userId === user.id;
  const isSubscribed = channel?.Subscribed?.some(
    (item: any) => item.subscribedId === user.id
  );
  const handleSubscribed = async () => {
    setIsLoading(true);
    try {
      const res = await SubscribedChannel(channel.id);
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
      const res = await UnSubscribedChannel(channel?.id);
      toast.success(`unsubscribed ${res?.channel?.name}`);
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="">
      {/* banner */}
      {channel?.bannerImage && (
        <div className="w-full rounded-xl  h-[11rem]  ">
          <img
            src={channel?.bannerImage}
            alt="header-banner-image"
            className="w-full  h-full object-contain rounded-2xl"
          />
        </div>
      )}

      {/* channelDetails */}
      <div className="mt-5 flex gap-6 items-center px-14">
        <ChannelAvatar
          imageUrl={channel?.imageUrl}
          channelname={channel?.displayName}
          size={"xl"}
        />
        <div className="flex flex-col">
          {/* header */}
          <h1 className="inline-flex items-center text-[35px] font-bold">
            {channel?.name} <FaCheckCircle className="ml-1 text-sm" />
          </h1>
          {/* channelname subscribes videos */}
          <div className="flex gap-2 text-sm">
            <span>@{channel?.displayName}</span>.
            <span className="inline-flex">
              {channel?.Subscribed?.length || 0}{" "}
              <p className="ml-1">subscribers</p>
            </span>
            .<span>{channel?.videos?.length || 0} videos</span>
          </div>
          {/* channelDescriptions or About */}
          <div className="">{/* TODO:MODAL IMPLEMENTATION */}</div>
          <div className="mt-5">
            {isOwnChannel ? (
              <div className="flex gap-2">
                <Button
                  variant={"ghost"}
                  className="bg-[#F2F2F2] rounded-3xl space-x-2"
                >
                  <span className="text-md  font-semibold">
                    Customise channel
                  </span>
                </Button>
                <Button
                  variant={"ghost"}
                  className="bg-[#F2F2F2] rounded-3xl space-x-2"
                >
                  <span className="text-md font-semibold">Manage videos</span>
                </Button>
              </div>
            ) : (
              <>
                {isSubscribed ? (
                  <Popover>
                    <PopoverTrigger className="relative">
                      <Button
                        variant={"ghost"}
                        className="bg-[#F2F2F2] rounded-3xl space-x-2"
                      >
                        <GoBell className="text-xl" />
                        <span className="text-md">Subscribed</span>
                        <LuChevronDown className="text-xl" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[12rem] p-0 mt-1 -left-20  z-[500] absolute">
                      <Button
                        variant={"outline"}
                        disabled={isLoading}
                        className="w-full justify-start gap-3"
                      >
                        <HiBellAlert className="text-xl" />
                        <span>All</span>
                      </Button>
                      <Button
                        variant={"outline"}
                        className="w-full justify-start gap-3"
                      >
                        <GoBell className="text-xl" />
                        <span>Personalized</span>
                      </Button>
                      <Button
                        variant={"outline"}
                        className="w-full justify-start gap-3"
                      >
                        <GoBellSlash className="text-xl" />
                        <span>None</span>
                      </Button>
                      <Button
                        variant={"outline"}
                        onClick={handleUnSubscribed}
                        className="w-full justify-start gap-3"
                      >
                        <FiUserMinus className="text-xl" />
                        <span>Unsubscribe</span>
                      </Button>
                    </PopoverContent>
                  </Popover>
                ) : (
                  <Button
                    variant={"ghost"}
                    onClick={handleSubscribed}
                    disabled={isLoading}
                    className="bg-black text-white hover:bg-black hover:text-white rounded-3xl space-x-2"
                  >
                    <span className="text-md">Subscribed</span>
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChannelHeader;
