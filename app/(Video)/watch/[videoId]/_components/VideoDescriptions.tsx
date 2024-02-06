import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getTimeDifference } from "@/utils/getVideotime";
import { format } from "date-fns";
import React from "react";

const VideoDescriptions = ({ video, isPending }: any) => {
  if (isPending) {
    return <VideoDescriptionsSkeleton />;
  }
  return (
    <>
      <Button
        variant={"ghost"}
        className="bg-[#f2f2f2] flex px-5  h-16 flex-col items-start justify-center w-full"
      >
        <div className="flex gap-5">
          <span>{video?.views?.length} views</span>
          <span>{getTimeDifference(video?.createdAt)}</span>
        </div>
        <div className="">{video?.description}</div>
      </Button>
    </>
  );
};

export default VideoDescriptions;

const VideoDescriptionsSkeleton = () => {
  return <Skeleton className="  h-16  w-full"></Skeleton>;
};
