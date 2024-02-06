"use server";
import { getChannelId } from "@/lib/getChannelId";
import { db } from "@/lib/db";
import { getUserId } from "@/lib/getUserId";
import { currentUser } from "@clerk/nextjs/server";
import { disLikeVideo, getAllChannelVideos, likeVideo, recommendedVideoByVideoType, viewsVideo } from "@/lib/video-service";
import { Video } from "@prisma/client";
export const videoUpload = async (data: any) => {
  const user = await currentUser();
  if (!user) return "UnAuthentication!";
  const { channelId, channelUserId }: any = await getChannelId();
  const userId = await getUserId();
  if (userId !== channelUserId) return "UnAuthorisation!";
  await db.video.create({
    data: {
      title: data.title,
      videoType:data.videoType,
      description: data.description,
      thumbnailUrl: data.thumbnailUrl,
      videoUrl: data.videoUrl,
      channelId: channelId,
      userId: userId,

    } as Video,
  });
};
export const getVideos = async () => {
  const videos = await db.video.findMany({
    include: {
      channel: true,
      views:true
    },
  });
  return videos;
};
export const getSingleVideo = async (id: string) => {
  const video = await db.video.findUnique({
    where: {
      id: id,
    },
    include: {
      views: true,
      channel: {
        include: {
          Subscribed: true,
        },
      },
      disLikes: true,
      likes: true,
      comments: {
        select: {
          _count: true,
        },
      },
    },
  });
  if (!video) return;
  return video;
};

export const likeVideofunc = async (videoId: any) => {
  const result = await likeVideo(videoId);
  return result;
};
export const dislikeVideo = async (videoId: any) => {
  const result = await disLikeVideo(videoId);
  return result;
};

export const view = async (videoId: string) => {
  const res = await viewsVideo(videoId);
  return res;
};

export const videoRecommended =async (videoId:string,videoType:string) => {
  const res =await recommendedVideoByVideoType(videoId,videoType);
  return res;
}

export const getAllVideos = async (channelId:string,sortBy?:string) => {
  const res = await getAllChannelVideos(channelId,sortBy);
  return res;
}
