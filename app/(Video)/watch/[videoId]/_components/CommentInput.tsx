"use client";
import React, { useEffect, useRef, useState } from "react";
import UserAvatar from "@/components/user-avatar";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { BsEmojiSmile } from "react-icons/bs";
import dynamic from "next/dynamic";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { EmojiClickData } from "emoji-picker-react";
import { CreateCommts, editComment } from "@/actions/comment";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

const Picker = dynamic(
  () => {
    return import("emoji-picker-react");
  },
  { ssr: false }
);
interface CommentInputProps {
  user: any;
  size?: "md" | "lg" | "default" | "sm";
  replay?: boolean;
  handleReplyClose?: () => void;
  parentId?: string;
  isEdit?: boolean;
  text?: string;
  handleEdit?: (text: string) => void;
  handleEditClose?: () => void;
  isLoading?: boolean;
}
const CommentInput = ({
  user,
  size,
  replay,
  isLoading: loading,
  handleReplyClose,
  handleEditClose,
  handleEdit,
  parentId,
  text,
  isEdit,
}: CommentInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [comment, setComment] = useState(text || "");
  const [isFocus, setIsFocus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { videoId } = useParams();
  const redirect = useRouter();
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.addEventListener("focusin", () => {
        setIsFocus(true);
      });
      inputRef.current.addEventListener("focusout", () => {
        setIsFocus(false);
      });
    }

    return () => {
      if (inputRef.current) {
        inputRef.current.removeEventListener("focusin", () => {
          setIsFocus(true);
        });
        inputRef.current.removeEventListener("focusout", () => {
          setIsFocus(false);
        });
      }
    };
  }, []);
  const onClickEmoji = (e: EmojiClickData) => {
    setComment(comment + e.emoji);
  };
  const handleComment = () => {
    if (replay && handleReplyClose) {
      handleReplyClose();
    }
    setComment("");
  };
  isFocus && inputRef.current?.focus();

  const handleCommentSubmit = async () => {
    setIsLoading(true);
    try {
      const res = await CreateCommts(
        parentId ? parentId : null,
        videoId as any,
        comment
      );
      toast.success("comment video");
      setComment("");
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
      handleComment();
    }
  };
  const handleCommentEdit = () => {
    handleEdit(comment);
  };
  const handleRedirect = () => {
    if (!user) {
      redirect.push("/sign-in");
    }
  };
  return (
    <div className="mt-3 flex gap-5">
      <UserAvatar
        size={size || "md"}
        username={user?.username}
        imageUrl={user?.imageUrl}
      />
      <div className="w-full ">
        <div
          onClick={handleRedirect}
          className="w-full  group flex  items-center justify-center relative"
        >
          <input
            type="text"
            ref={inputRef}
            onClick={handleRedirect}
            value={comment}
            readOnly={!user}
            onChange={(e) => setComment(e.target.value)}
            placeholder={
              isEdit
                ? "Edit a commnet..."
                : replay
                  ? "Reply a comments..."
                  : "Add a comments..."
            }
            className={cn(
              "w-full relative  border-b border-gray-600 placeholder:text-sm  outline-none",
              replay && "text-sm"
            )}
          />
          {user && (
            <div
              className={cn(
                "w-0 transition-all duration-300 absolute h-[2px] bg-black bottom-0",
                isFocus && "w-full"
              )}
            ></div>
          )}
        </div>
        {user && (
          <div className="flex mt-3 justify-between">
            <div>
              <Popover>
                <PopoverTrigger>
                  <Button className="" size={"icon"} variant={"ghost"}>
                    <BsEmojiSmile className="text-lg" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="z-[100] min-w-22 ml-10 min-h-22 flex items-center justify-center ">
                  <Picker onEmojiClick={onClickEmoji} />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-x-3">
              <Button
                onClick={isEdit ? handleEditClose : handleComment}
                className={cn(
                  "rounded-2xl px-4 py-2",
                  replay || (isEdit && "px-3 py-1")
                )}
                variant={"ghost"}
              >
                cancel
              </Button>
              <Button
                disabled={isLoading || !comment || loading}
                onClick={isEdit ? handleCommentEdit : handleCommentSubmit}
                className={cn(
                  "bg-[#f2f2f2] px-5 py-3 rounded-2xl text-gray-400",
                  !isLoading && comment && !loading
                    ? "bg-blue-500 text-white hover:text-white hover:bg-blue-600"
                    : "text-gray-600 ",
                  replay && "px-3 py-1"
                )}
                variant={"ghost"}
              >
                {isEdit ? "Edit" : replay ? "Reply" : "Comment"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentInput;

export const CommentInputSkeleton = () => {
  return (
    <>
      <div className="mt-3 flex gap-5">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="w-full ">
          <div className="w-full  group flex  items-center justify-center relative">
            <Skeleton className="w-full h-5" />
          </div>
          <div className="flex mt-3 justify-between">
            <div></div>
            <div className="space-x-3 flex ">
              <Skeleton className="w-24 h-10 rounded-lg"></Skeleton>
              <Skeleton className="w-24 h-10 rounded-lg"></Skeleton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
