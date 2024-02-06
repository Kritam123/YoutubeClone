import React from "react";
import VideoListContainer from "../VideoListContainer";
import { getAllVideos } from "@/actions/video";

const VideosContainer = async ({ channelId }: any) => {
    const videos = await getAllVideos(channelId);
    return (
        <>
            <VideoListContainer getAllVideos={videos} channelId={channelId} />
        </>
    );
};

export default VideosContainer;
