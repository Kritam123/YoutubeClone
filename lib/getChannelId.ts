import { currentUser } from "@clerk/nextjs";
import { db } from "./db";
import { getUserId } from "./getUserId";
export const getChannelId = async () => {
  const user = await currentUser();
  if (!user) return "UnAuthentication!";
  const userId = await getUserId();
  const channel = await db.channel.findUnique({
    where: {
      userId: userId,
    },
  });
  if (!channel) return "Channel not found";
  let channelId = channel.id;
  let channelUserId = channel.userId;
  return {
    channelId,
    channelUserId,
  }
};
