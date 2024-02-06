import { currentUser } from "@clerk/nextjs";
import { db } from "./db";
import { Like, Views } from "@prisma/client";

export const viewsVideo = async (videoId: string) => {
  const user = await currentUser();
  if (!user) throw new Error("Unauthentication!");
  const dbUser = await db.user.findUnique({
    where: {
      externalUserId: user.id,
    },
  });
  const existingView = await db.views.findFirst({
    where: {
      userId: dbUser?.id,
      videoId,
    },
  });
  if (!existingView) {
    await db.views.create({
      data: {
        userId: dbUser?.id,
        videoId,
      } as Views,
    });
  }
};

export const likeVideo = async (videoId: string) => {
  try {
    const user = await currentUser();
    if (!user) throw new Error("Unauthentication!");
    const dbUser = await db.user.findUnique({
      where: {
        externalUserId: user.id,
      },
    });

    const existingLiked = await db.like.findFirst({
      where: {
        videoId,
        userId: dbUser?.id,
      },
    });
    if (existingLiked) {
      await db.like.delete({
        where: {
          id: existingLiked.id,
        },
      });
      return false;
    } else {
      const existingDisLiked = await db.disLike.findFirst({
        where: {
          videoId,
          userId: dbUser?.id,
        },
      });
      if (existingDisLiked) {
        await db.disLike.delete({
          where: {
            id: existingDisLiked.id,
          },
        });
      }
      await db.like.create({
        data: {
          userId: dbUser?.id,
          videoId,
        } as Like,
      });
      return true;
    }
  } catch (error) {
    console.log(error);
  }
};

export const disLikeVideo = async (videoId: string) => {
  try {
    const user = await currentUser();
    if (!user) throw new Error("Unauthentication!");
    const dbUser = await db.user.findUnique({
      where: {
        externalUserId: user.id,
      },
    });

    const existingDisLiked = await db.disLike.findFirst({
      where: {
        videoId,
        userId: dbUser?.id,
      },
    });
    if (existingDisLiked) {
      await db.disLike.delete({
        where: {
          id: existingDisLiked.id,
        },
      });
      return false;
    } else {
      const existingLiked = await db.like.findFirst({
        where: {
          videoId,
          userId: dbUser?.id,
        },
      });
      if (existingLiked) {
        await db.like.delete({
          where: {
            id: existingLiked.id,
          },
        });
      }
      await db.disLike.create({
        data: {
          userId: dbUser?.id,
          videoId,
        } as Like,
      });
      return true;
    }
  } catch (error) {
    console.log(error);
  }
};

//  recommended the more video

export const recommendedVideoByVideoType = async (
  videoId: string,
  videoType: string
) => {
  const recommendedVideos = await db.video.findMany({
    where: {
      videoType,
      NOT: {
        id: videoId,
      },
    },
    include: {
      views: true,
      channel: true,
    },
  });
  return recommendedVideos;
};
// get  channel  all videos

export const getAllChannelVideos = async (channelId: string, sortBy?: string) => {
  const channel = await db.channel.findUnique({
    where: {
      id: channelId,
    },
  });
  if (!channel) {
    throw new Error("Channel not found");
  }

  let orderBy: any = {};
  if (sortBy === "asc" || sortBy === "desc") {
    orderBy = {
      createdAt: sortBy,
    };
  } else if (sortBy === "popular") {
    orderBy = {
      views: {
        _count: "desc",
      },
    };
  }

  const getAllvideos = await db.video.findMany({
    where: {
      channelId,
    },
    include: {
      channel: true,
      views: true,
    },
    orderBy,
  });

  return getAllvideos;
};