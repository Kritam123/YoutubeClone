'use client'
import React from "react";
import CommentBox from "./CommentItem";
const CommentList = ({ user, comments}: any) => {
  return (
    <>
      {comments?.map((comment:any) => (
        <div key ={comment} className="my-2">
          <CommentBox  user={user} comment={comment} />
        </div>
      ))}
    </>
  );
};

export default CommentList;
