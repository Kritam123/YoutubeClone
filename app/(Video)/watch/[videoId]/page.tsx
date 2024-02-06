"use client";
import React, { useEffect, useState, useTransition } from "react";
import VideoContainer from "./_components/VideoContainer";
import VideoDetails from "./_components/VideoDetails";
import VideoDescriptions from "./_components/VideoDescriptions";
import VideoComents from "./_components/VideoComents";
import SuggestedVideos from "./_components/SuggestedVideos";
import { getCurrentUser } from "@/actions/user";
import { Channel, User, Video } from "@prisma/client";
import { getSingleVideo, view } from "@/actions/video";
import { useParams } from "next/navigation";
import { getCommnetsParent } from "@/actions/comment";

const page = () => {
  const { videoId }: any = useParams();
  const [user, setUser] = useState<User | undefined | null>();
  const [isPending, startTransition] = useTransition()
  const [video, setVideo] = useState<Video>();
  const [comments, setComments] = useState([]);
  
  
  useEffect(() => {
    if (videoId) {
      startTransition(() => {
        getSingleVideo(videoId)
          .then((res) => {
            setVideo(res);
          })
          .catch((error: any) => {
            console.log(error);
          });
      })

    }
  }, [videoId]);

  useEffect(() => {
    if (videoId) {
      view(videoId).then(() => { }).catch((err) => console.log(err))
    }
  }, [videoId]);

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        setUser(res);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, []);
  // useEffect(() => {
  //   if (videoId) {
  //     (async () => {
  //       const res = await getCommnetsParent(videoId as any);
  //       setComments(res as any);
  //     })();
  //   }
  // }, [videoId, comments]);

  return (
    <div className="flex  h-full">
      <div className="flex-3 w-[70%]">
        <div className="flex  items-center justify-center lg:justify-start">
          <VideoContainer isPending={isPending} videoUrl={video?.videoUrl} />
        </div>
        <div className="ml-6 pr-6 ">
          <VideoDetails isPending={isPending} video={video} userId={user?.id} />
          <VideoDescriptions isPending={isPending} video={video} />
          <VideoComents isPending={isPending} channelImg={video?.channel?.imageUrl} user={user} parentCommnets={comments} setComments={setComments} commentsLength={video?.comments?.length} videoId={videoId} />
        </div>
      </div>
      <div className="flex-1">
        {/* suggested video */}

        <SuggestedVideos videoId={videoId} videoType={video?.videoType} />
      </div>
    </div>
  );
};

export default page;
