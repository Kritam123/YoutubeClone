"use client";
import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import DialogUploadBox from "@/components/use-Dialog";
interface DasUploadProps{
  open:boolean
  setOpen:(open:boolean)=>void;
}
const DashUploadBox = ({open,setOpen}:DasUploadProps) => {
  return (
    <div className="w-[23rem]  shadow-sm rounded-sm border grid place-items-center bg-white h-[30rem]">
      <div className="w-[21.5rem] border grid place-items-center bg-white h-[28.5rem]">
        <div className="flex items-center  flex-col">
          <Image
            src={
              "https://www.gstatic.com/youtube/img/creator/no_content_illustration_upload_video_v3.svg"
            }
            alt="upload-Image"
            width={150}
            height={150}
          />
          <p className="text-center text-[13px] px-5 text-gray-600">
            Want to see metrics on your recent video? Upload and publish a video
            to get started.
          </p>
          <DialogUploadBox open={open} setOpen={setOpen}/>
            <Button
            onClick={()=>setOpen(true)}
              className="hover:bg-blue-500 mt-5 bg-blue-500"
              variant={"secondary"}
            >
              <span className="text-white font-bold ">Upload videos</span>
            </Button>
        </div>
      </div>
    </div>
  );
};

export default DashUploadBox;
