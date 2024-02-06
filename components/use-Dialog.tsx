"use client";
import React, { useState } from "react";
import "@uploadthing/react/styles.css";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { UploadDropzone } from "@/utils/uploadthing";
import VideoUploadContainer from "./VideoUploadDetailsComponentss/VideoUploadContainer";
const DialogUploadBox = ({ open, setOpen }: { open: boolean, setOpen: (open: boolean) => void }) => {
  const [videoUrl, setVideoUrl] = useState("");
  const [videoContent, setVideoContent] = useState<any>([]);
  return (
    <Dialog open={open} onOpenChange={() => setOpen(false)}>
      <DialogContent>
        {videoUrl ? (
          <>
            <VideoUploadContainer setOpen={setOpen} setVideoUrl={setVideoUrl} videoContent={videoContent} />
          </>
        ) : (
          <>
            <DialogHeader className="h-fit">
              <h1 className="font-bold">Upload videos</h1>
            </DialogHeader>
            <UploadDropzone
              appearance={{
                container: {
                  width: "100%",
                  height: "70vh",
                },
                uploadIcon: {
                  width: "100",
                },
              }}
              endpoint="VideoUploader"
              onUploadError={(res) => {
                console.log(res.cause);
              }}
              onClientUploadComplete={(res: any) => {
                console.log("file", res);
                setVideoUrl(res[0].url);
                setVideoContent(res);
              }}
              className="border h-full"
            />
            <DialogFooter className=" flex items-center px-16 pt-10  justify-center">
              <p className="text-center text-[12px]">
                By submitting your videos to YouTube, you acknowledge that you
                agree to YouTube&apos;s{" "}
                <span className="text-blue-500">Terms of Service</span> and{" "}
                <span className="text-blue-500">Community Guidelines </span>.
                Please be sure not to violate others&apos; copyright or privacy
                rights. <span className=" text-blue-500">Learn more</span>
              </p>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DialogUploadBox;
