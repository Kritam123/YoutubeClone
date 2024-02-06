"use client";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React from "react";
import { MdSort } from "react-icons/md";
import CommentInput, { CommentInputSkeleton } from "./CommentInput";
import CommentContainer from "./CommentContainer";
import { getCommnetsParent } from "@/actions/comment";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
const VideoComents = ({
  user,
  videoId,
  commentsLength,
  parentCommnets,
  setComments,
  isPending
}: any) => {
  let sort;
  const handleNewstCommets = async () => {
    const res = await getCommnetsParent(videoId as any, (sort = true));
    toast.success("New Comments");
    setComments(res as any);
  };

  if(isPending){
    return(
      <VideocommentsSkeleton/>
    )
  }
  return (
    <div className="mt-3">
      <div className="flex gap-5 items-center">
        <h1 className="text-xl font-bold">{`${
          commentsLength || 0
        } Comments`}</h1>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant={"ghost"} className="flex gap-3">
              <MdSort className="text-2xl" />
              <span>Sort by</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="space-y-3">
            <Button variant={"outline"} className="w-full">
              Top Comments
            </Button>
            <Button
              onClick={handleNewstCommets}
              variant={"outline"}
              className="w-full"
            >
              Newest first
            </Button>
          </PopoverContent>
        </Popover>
      </div>
      <CommentInput user={user} />
      <CommentContainer
        user={user}
        comments={parentCommnets}
      />
    </div>
  );
};

export default VideoComents;

const VideocommentsSkeleton = () => {
  return (
    <div className="mt-3 w-full h-full">
      <div className="flex gap-5 items-center">
        <Skeleton className="w-[8rem] h-8 "/>
        <Skeleton className="w-[8rem] h-8 rounded-md "/>
      </div>
      <CommentInputSkeleton />
    </div>
  );
};
