import { currentUser } from "@clerk/nextjs";
import { db } from "./db";
import { Comment, CommentDisLike, CommentLike } from "@prisma/client";

export const createComment = async (
  parentId: string | null,
  videoId: string,
  text: string
) => {
  const session = await currentUser();
  if (!session) throw new Error("Unauthentication!");
  const dbUser = await db.user.findUnique({
    where: {
      externalUserId: session.id,
    },
  });
  const video = await db.video.findUnique({
    where: {
      id: videoId,
    },
  });
  if (!video) throw new Error("Video not found");
  await db.comment.create({
    data: {
      text,
      parentId: parentId,
      userId: dbUser?.id,
      videoId,
    } as Comment,
  });
  return true;
};
export const getParentComments = async (videoId: string, sort?: boolean) => {
  const res = await db.comment.findMany({
    where: {
      videoId,
      parentId: null,
    },
    include: {
      pinnedBy: true,
      user: {
        select: {
          imageUrl: true,
          username: true,
          id: true,
        },
      },
      CommentDisLike: true,
      CommentLike: true,
      video: {
        select: {
          userId: true,
          channel:{
            select:{
              imageUrl:true,
              name:true
            }
          }
        },
      },
      relpyComments: {
        select: {
          _count: true,
        },
      },
    },
    orderBy: [{ pinned: "desc" }, { createdAt: sort ? "desc" : "asc" }],
  });
  if (!res) throw new Error("no comments");
  return res;
};

export const getParentChildComments = async (
  videoId: string,
  parentId: string
) => {
  const res = await db.comment.findMany({
    where: {
      videoId,
      parentId,
    },
    include: {
      pinnedBy: true,
      user: {
        select: {
          imageUrl: true,
          username: true,
        },
      },
      CommentDisLike: true,
      CommentLike: true,
      video: {
        select: {
          userId: true,
          channel:{
            select:{
              imageUrl:true,
              name:true
            }
          }
        },
      },
      relpyComments: {
        select: {
          _count: true,
        },
      },
    },
    orderBy: [{ pinned: "desc" }, { createdAt: "asc" }],
  });
  if (!res) throw new Error("no comments");
  return res;
};

// get all comments of video

// commnetfunc
export const commentEdit = async (commnetId: string, text: string) => {
  const session = await currentUser();
  const dbUser = await db.user.findUnique({
    where: {
      externalUserId: session?.id,
    },
  });
  const comment = await db.comment.findUnique({
    where: {
      id: commnetId,
    },
  });
  if (dbUser?.id !== comment?.userId) return "Unauthorised user!";
  await db.comment.update({
    where: {
      id: commnetId,
    },
    data: {
      text,
      isEdited: true,
    },
  });
  return "Edited Comment..";
};
// update commnet pinned ..
export const pinnedCommnet = async (commentId: string) => {
  const session = await currentUser();
  if (!session) throw new Error("Unauthentication!");
  const dbUser = await db.user.findUnique({
    where: {
      externalUserId: session.id,
    },
  });
  const comment = await db.comment.findUnique({
    where: {
      id: commentId,
    },
    include: {
      video: true,
      user: true,
    },
  });
  if (comment?.video.userId !== dbUser?.id)
    throw new Error("UnAuthorised user!");
  await db.comment.update({
    where: {
      id: commentId,
    },
    data: {
      pinned: true,
      pinnedId: dbUser?.id,
    },
  });
  return "Pinned commnet...";
};
// unpinned
export const unpinnedCommnet = async (commentId: string) => {
  const session = await currentUser();
  if (!session) throw new Error("Unauthentication!");
  const dbUser = await db.user.findUnique({
    where: {
      externalUserId: session.id,
    },
  });
  const comment = await db.comment.findUnique({
    where: {
      id: commentId,
    },
    include: {
      video: {
        select: {
          userId: true,
        },
      },
    },
  });
  if (comment?.video.userId !== dbUser?.id)
    throw new Error("UnAuthorised user!");
  await db.comment.update({
    where: {
      id: commentId,
    },
    data: {
      pinned: false,
      pinnedId: null,
    },
  });
  return "Unpinned commnet...";
};
// deleteFunc
export const deleteCommentAndChildren = async (commentId: string) => {
  // Find the comment and its children
  const comment = await db.comment.findUnique({
    where: { id: commentId },
    include: { relpyComments: true },
  });

  if (!comment) {
    console.log("Comment not found");
    return;
  }

  // Recursively delete children
  async function deleteChildren(childrens: any) {
    for (const child of childrens) {
      const comment = await db.comment.findUnique({
        where: { id: child?.id },
        include: { relpyComments: true },
      });
      await deleteChildren(comment?.relpyComments);
      await db.comment.delete({
        where: { id: child?.id },
      });
    }
  }

  // Delete the parent and its children
  await deleteChildren(comment?.relpyComments);
  await db.comment.delete({
    where: { id: commentId },
  });
  return "Comment deleted.";
};

// likeComments func

export const likeCommnet = async (commentId: string) => {
  try {
    const user = await currentUser();
    if (!user) throw new Error("Unauthentication!");
    const dbUser = await db.user.findUnique({
      where: {
        externalUserId: user.id,
      },
    });

    const existingLiked = await db.commentLike.findFirst({
      where: {
        commentId,
        userId: dbUser?.id,
      },
    });
    if (existingLiked) {
      await db.commentLike.delete({
        where: {
          id: existingLiked.id,
        },
      });
      return false;
    } else {
      const existingDisLiked = await db.commentDisLike.findFirst({
        where: {
          commentId,
          userId: dbUser?.id,
        },
      });
      if (existingDisLiked) {
        await db.commentDisLike.delete({
          where: {
            id: existingDisLiked.id,
          },
        });
      }
      await db.commentLike.create({
        data: {
          userId: dbUser?.id,
          commentId,
        } as CommentLike,
      });
      return true;
    }
  } catch (error) {
    console.log(error);
  }
};
// dislikeComments func
export const disLikeComment = async (commentId: string) => {
  try {
    const user = await currentUser();
    if (!user) throw new Error("Unauthentication!");
    const dbUser = await db.user.findUnique({
      where: {
        externalUserId: user.id,
      },
    });

    const existingDisLiked = await db.commentDisLike.findFirst({
      where: {
        commentId,
        userId: dbUser?.id,
      },
    });
    if (existingDisLiked) {
      await db.commentDisLike.delete({
        where: {
          id: existingDisLiked.id,
        },
      });
      return false;
    } else {
      const existingLiked = await db.commentLike.findFirst({
        where: {
          commentId,
          userId: dbUser?.id,
        },
      });
      if (existingLiked) {
        await db.commentLike.delete({
          where: {
            id: existingLiked.id,
          },
        });
      }
      await db.commentDisLike.create({
        data: {
          userId: dbUser?.id,
          commentId,
        } as CommentDisLike,
      });
      return true;
    }
  } catch (error) {
    console.log(error);
  }
};

export const lovedReactCommnet = async (commentId: string) => {
  const user = await currentUser();
  if (!user) throw new Error("Unauthentication!");
  const dbUser = await db.user.findUnique({
    where: {
      externalUserId: user.id,
    },
  });
  const commnet = await db.comment.findUnique({
    where: {
      id: commentId,
    },
    include: {
      video: {
        select: {
          userId: true,
        },
      },
    },
  });

  if (commnet?.video.userId !== dbUser?.id) throw new Error("UnAuthorised");
  if (commnet?.isLove) {
    await db.comment.update({
      where: {
        id: commentId,
      },
      data: {
        isLove: false,
      },
    });
    return false;
  } else {
    await db.comment.update({
      where: {
        id: commentId,
      },
      data: {
        isLove: true,
      },
    });
    return true;
  }
};
