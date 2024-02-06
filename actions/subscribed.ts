"use server";
import {
  subscribedChannel,
  unSubscribedChannel,
} from "@/lib/subscribed-service";

export const SubscribedChannel = async (channelId: string) => {
  const result = await subscribedChannel(channelId);
  return result;
};

export const UnSubscribedChannel = async (channelId: string) => {
  const result = await unSubscribedChannel(channelId);

  return result;
};
