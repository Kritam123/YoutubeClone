import { db } from "./db";

export const getChannelByName = async (channelname: string) => {
  const channel = await db.channel.findFirst({
    where: {
      displayName: channelname,
    },
    include: {
      bannervideo: {
        include: {
          views: true,
        },
      },
    },
  });
  if (!channel) {
    throw new Error("Channel not found!");
  }
  return channel;
};
