import React from "react";
import ForYouVideosList from "./ForYouVideosList";
import { getAllChannelVideos } from "@/lib/video-service";

const ForYouVideosContainer = async({getChannelId}:any) => {
    const getAllVideos = await getAllChannelVideos(getChannelId);
  return (
    <>
    <div className="mt-3 w-full">
        <h1 className="text-xl font-bold">For You</h1>
        <ForYouVideosList videos={getAllVideos}/>
    </div>
    </>
  )
};

export default ForYouVideosContainer;
