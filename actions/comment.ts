"use server";

import {
  commentEdit,
  createComment,
  deleteCommentAndChildren,
  disLikeComment,
  getParentChildComments,
  getParentComments,
  likeCommnet,
  lovedReactCommnet,
  pinnedCommnet,
  unpinnedCommnet,
} from "@/lib/comment-service";

export const CreateCommts = async (
  parentId: string | null,
  videoId: string,
  text: string
) => {
  const res = await createComment(parentId, videoId, text);
  return res;
};
export const getCommnetsParent = async (videoId: string, sort?: boolean) => {
  const res = await getParentComments(videoId, sort);
  return res;
};

export const getChildComments = async (videoId: string, parentId: string) => {
  const res = await getParentChildComments(videoId, parentId);
  return res;
};
export const deleteComment = async (commentId: string) => {
  const res = await deleteCommentAndChildren(commentId);
  return res;
};
export const editComment = async (commentId: string, text: string) => {
  const res = await commentEdit(commentId, text);
  return res;
};

export const pinned = async (commentId: string) => {
  const res = await pinnedCommnet(commentId);
  return res;
};
export const unpinned = async (commentId: string) => {
  const res = await unpinnedCommnet(commentId);
  return res;
};
export const like = async (commentId: string) => {
  const res = await likeCommnet(commentId);
  return res;
};
export const Dislike = async (commentId: string) => {
  const res = await disLikeComment(commentId);
  return res;
};
export const loveReact = async (commnetId: string) => {
  const res = await lovedReactCommnet(commnetId);
  return res;
};
