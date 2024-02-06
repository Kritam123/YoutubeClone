"user client";
import React, { useEffect, useState } from "react";
import Tootip from "@/components/Tootip";
import UserAvatar from "@/components/user-avatar";
import { VscPinned } from "react-icons/vsc";
import { format } from "date-fns";
import { GoReport } from "react-icons/go";
import { BsPatchCheck } from "react-icons/bs";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import { Button } from "@/components/ui/button";
import { BiLike, BiDislike, BiSolidDislike, BiSolidLike } from "react-icons/bi";
import CommentInput from "./CommentInput";
import { CiHeart } from "react-icons/ci";
import { IoHeart } from "react-icons/io5";
import { LuLoader2 } from "react-icons/lu";
import { cn } from "@/lib/utils";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import CommentList from "./CommentList";
import { MdOutlineEdit, MdOutlineDeleteOutline } from "react-icons/md";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  deleteComment,
  editComment,
  getChildComments,
  like,
  pinned,
  unpinned,
  Dislike,
  loveReact
} from "@/actions/comment";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import ChannelAvatar from "@/components/channel-avatar";
const CommentBox = ({ user, comment}: any) => {
  const [isShow, setIsShow] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [childComments, setChildComments] = useState<any>([]);
  const { videoId } = useParams();
  const parentId = comment?.id;
  const isLiked = comment?.CommentLike?.some((item: any) => item.userId === user?.id)
  const isDisliked = comment?.CommentDisLike?.some((item: any) => item.userId === user?.id)
  const isOwn = comment?.video?.userId === user?.id
  const handlechildComments = async () => {
    setLoading(true);
    try {
      const res = await getChildComments(videoId as any, parentId);
      setChildComments(res);
    } catch (error) {
      toast.error("something went wrong");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const func = async () => {
      try {
        const res = await getChildComments(videoId as any, parentId);
        setChildComments(res);
      } catch (error) {
        toast.error("something went wrong");
      }
    };
    func();
  }, [childComments,videoId,parentId]);
  const handleDeleteComments = async () => {
    try {
      const res = await deleteComment(parentId);
      toast.success(res);
    } catch (error) {
      toast.error("something went wrong");
    }
  };
  const handleEditComments = async (text: string) => {
    setLoading(true);
    try {
      const res = await editComment(parentId, text);
      toast.success(res);
    } catch (error) {
      toast.error("something went wrong");
    } finally {
      setIsEdit(false);
      setLoading(false);
    }
  };
  const handlePinnedCommnet = async () => {
    try {
      const res = await pinned(parentId);
      toast.success(res);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  const handleunPinnedCommnet = async () => {
    try {
      const res = await unpinned(parentId);
      toast.success(res);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const likeComment = async () => {
    try {
      const res = await like(parentId);
      if (res) {

        toast.success("Like Commnet..");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }

  }
  const dislikeComment = async () => {
    try {
      const res = await Dislike(parentId);
      if (res) {
        toast.success("Dislike Commnet..");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }

  }
  const handleLoveReact = async()=>{
    try {
     const res = await loveReact(parentId);
     if(res){
      toast.success("Love Commnet...")
     }
    }
     catch (error) {
      toast.error("Something went wrong");
    }
  }
  const handleReplyOpen = () => {
    setIsShow(true);
    setIsFocus(true);
  };
  const handleReplyClose = () => {
    setIsShow(false);
  };
  const handleEditClose = () => {
    setIsEdit(false);
  };
  const toggle = () => {
    setIsOpen(!isOpen);
    !isOpen && handlechildComments();
  };
  return (
    <div className="flex group w-full items-center  justify-between">
      <div className="flex gap-2 w-full">
        <UserAvatar
          imageUrl={comment?.user?.imageUrl}
          size={comment?.parentId === null ? "md" : "sm"}
        />
        <div className="flex flex-col  w-full">
          {/* form pinned comment */}
          {comment?.pinned && (
            <div className="flex items-center">
              <VscPinned className="text-sm " />
              <span className="text-[12px]">{comment?.pinnedBy?.username}</span>
            </div>
          )}
          <div className="flex justify-between  w-full items-center ">
            <div className="flex gap-1   items-center">
              {comment?.video?.userId === comment?.userId ? (
                <Tootip
                  className="bg-slate-500 text-white"
                  title={comment?.user?.username}
                >
                  <span
                    className={cn(
                      "text-white inline-flex gap-1  p-1  rounded-lg cursor-pointer text-[12px] bg-slate-700"
                    )}
                  >
                    <span>@{comment?.user?.username}</span>{" "}
                    <BsPatchCheck className="text-sm" />
                  </span>
                </Tootip>
              ) : (
                <span
                  className={cn(
                    "inline-flex gap-1  p-1  rounded-lg cursor-pointer font-semibold  text-[13px]"
                  )}
                >
                  <span>@{comment?.user?.username}</span>{" "}
                </span>
              )}
              <span className="text-[12px]">
                {format(comment?.createdAt, "yyyy-MM-dd")}{" "}
                {comment.isEdited && "(edited)"}
              </span>
            </div>
            <div className=" group-hover:block h-5 ">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"ghost"}
                    className="rounded-2xl  "
                    size={"icon"}
                  >
                    <PiDotsThreeOutlineFill className="text-black" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-fit space-y-3">
                  {comment?.video?.userId === user?.id && (
                    <>
                      <Button
                        onClick={
                          comment.pinned
                            ? handleunPinnedCommnet
                            : handlePinnedCommnet
                        }
                        variant={"ghost"}
                        className="flex justify-start gap-3 w-full"
                      >
                        <VscPinned className="text-xl" />{" "}
                        <span>{comment?.pinned ? "Unpinned" : "Pinned"}</span>
                      </Button>
                    </>
                  )}
                  {comment?.userId === user?.id ||
                    (comment?.video?.userId === user?.id && (
                      <Button
                        onClick={handleDeleteComments}
                        variant={"ghost"}
                        className="flex gap-3 w-full"
                      >
                        <MdOutlineDeleteOutline className="text-xl" />{" "}
                        <span>Delete</span>
                      </Button>
                    ))}
                  {comment?.userId === user?.id ? (
                    <>
                      <Button
                        onClick={() => setIsEdit(true)}
                        variant={"ghost"}
                        className="flex justify-start gap-3 w-full"
                      >
                        <MdOutlineEdit className="text-xl" /> <span>Edit</span>
                      </Button>
                      <Button
                        onClick={handleDeleteComments}
                        variant={"ghost"}
                        className="flex gap-3  justify-start w-full"
                      >
                        <MdOutlineDeleteOutline className="text-xl" />{" "}
                        <span>Delete</span>
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant={"ghost"} className="flex gap-1 w-full">
                        <GoReport className="text-xl" /> <span>Report</span>
                      </Button>
                    </>
                  )}
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="ml-2">
            {isEdit ? (
              <>
                <div>

                  <CommentInput
                    handleEditClose={handleEditClose}
                    size="sm"
                    isLoading={loading}
                    text={comment.text}
                    isEdit={true}
                    handleEdit={handleEditComments}
                    user={user}
                    parentId={comment?.id}
                  />

                </div>
              </>
            ) : (
              <>
                <p className="text-sm pr-16">{comment?.text}</p>
              </>
            )}
          </div>
          <div className="mt-1 flex gap-1">
            <div className="flex items-center">
              <Tootip title="Like" className="bg-slate-900 text-white">
                <Button
                  onClick={likeComment}
                  variant={"ghost"}
                  size={"icon"}
                  className="rounded-full"
                >
                  {isLiked ? <BiSolidLike className="text-[16px]" /> : <BiLike className="text-[16px]" />}
                </Button>
              </Tootip>
              <span className="text-[12px]">{comment?.CommentLike?.length || 0}</span>
            </div>
            <div className="flex items-center">
              <Tootip title="Dislike" className="bg-slate-900 text-white">
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  onClick={dislikeComment}
                  className="rounded-full"
                >
                  {isDisliked ? <BiSolidDislike className="text-[16px]" /> :
                    <BiDislike className="text-[16px]" />}

                </Button>
              </Tootip>

              <span className="text-[12px]">{comment?.CommentDisLike?.length || 0}</span>
            </div>
            {comment?.video?.userId === user?.id && comment?.userId !== user?.id && !comment.isLove && <div className="flex items-center">
              <Tootip title="Love" className="bg-slate-900 text-white">
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  className="rounded-full"
                  onClick={user && isOwn && handleLoveReact}
                >
                  <CiHeart className="text-lg" />
                </Button>
              </Tootip>
            </div>}
            {comment.isLove  && <Tootip title={isOwn ?"UnLove":  `Love by  ${comment?.video?.channel?.name}` } className="bg-slate-900 text-white">
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  className="rounded-full relative"
                  onClick={user && isOwn && handleLoveReact}
                >
                  <ChannelAvatar imageUrl={comment?.video?.channel?.imageUrl} channelname="ch" size={"vs"}/>
                  <IoHeart className="text-md absolute bottom-[1px] right-[2px] text-red-600" />
                </Button>
              </Tootip>}
            <div className="ml-1 flex items-center">
              <Button
                onClick={handleReplyOpen}
                variant={"ghost"}
                className="rounded-2xl h-8 p-0 px-3 "
              >
                <span className="text-[13px]">Reply</span>
              </Button>
            </div>
          </div>
          <div className={cn(isShow ? "block" : "hidden")}>
            <CommentInput
              handleReplyClose={handleReplyClose}
              replay={true}
              size="sm"
              user={user}
              parentId={comment?.id}
            />
          </div>

          {comment?.relpyComments?.length > 0 && (
            <>
              <Button
                onClick={toggle}
                variant={"ghost"}
                className="text-blue-600 w-fit flex items-center hover:text-blue-500 h-fit gap-2 hover:bg-blue-100 rounded-2xl"
              >
                {isOpen ? (
                  <FaCaretUp className="text-lg" />
                ) : (
                  <FaCaretDown className="text-lg" />
                )}
                <span>{comment?.relpyComments?.length} replies</span>
              </Button>
              {loading ? (
                <div className="w-24 mt-3 flex justify-center">
                  <LuLoader2 className="text-xl animate-spin" />
                </div>
              ) : (
                <div className={cn(isOpen ? "block" : "hidden")}>
                  <CommentList comments={childComments} user={user} />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentBox;
