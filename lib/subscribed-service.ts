import { currentUser } from "@clerk/nextjs";
import { db } from "./db";
export const subscribedChannel = async (channelId: string) => {
  try {
    const user = await currentUser();
    if (!user) return;
    const channel = await db.channel.findFirst({
      where: {
        id: channelId,
      },
    });
    const dbUser = await db.user.findUnique({
      where: {
        externalUserId: user.id,
      },
    });
    if (dbUser?.id === channel?.userId) {
      throw new Error("Cannot subscribed yourself");
    }
    const existingSubscribed = await db.subscribed.findFirst({
      where: {
        subscribedId: dbUser?.id,
        channelId: channelId,
      },
    });
    if (existingSubscribed) {
      throw new Error("Already Subscribed");
    }
    const subscribe = await db.subscribed.create({
      data: {
        subscribedId: dbUser?.id,
        channelId: channelId,
      } as any,
      include: {
        channel: true,
      },
    });
    return subscribe;
  } catch (error) {
    console.log(error);
  }
};



export const unSubscribedChannel = async (channelId: string) => {
  try {
    const user = await currentUser();
    if (!user) return;
    const channel = await db.channel.findFirst({
      where: {
        id: channelId,
      },
    });
    const dbUser = await db.user.findUnique({
      where: {
        externalUserId: user.id,
      },
    });
    if (dbUser?.id === channel?.userId) {
      throw new Error("Cannot unsubscribed yourself");
    }
    const existingSubscribed = await db.subscribed.findFirst({
      where: {
        subscribedId: dbUser?.id,
        channelId: channelId,
      },
    });
    if (!existingSubscribed) {
      throw new Error("Not Subscribed yet!");
    }
    const unsubscribe = await db.subscribed.delete({
      where: {
        id: existingSubscribed.id,
      },
      include: {
        channel: true,
      },
    });
    return unsubscribe;
  } catch (error) {
    console.log(error);
  }
};
