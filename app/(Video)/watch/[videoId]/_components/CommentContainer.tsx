'use client'
import React from "react";
// import {comments} from "@/utils/commentData"
import CommentList from "./CommentList";

// interface CommentsWithProps {
//   user:{
//     username:string,
//     imageUrl:string
//   } & {
//     comment:Comment
//   }
// }

const CommentContainer = ({ user,comments}: any) => {
  // states
  
  return (
    <div className="min-h-[100vh] flex flex-col gap-1  mt-5">
      <div className="mt-4">
        {comments && comments?.length >0 &&  (
          <CommentList   comments={comments} user={user} />
        )}
      </div>
    </div>
  );
};

export default CommentContainer;
