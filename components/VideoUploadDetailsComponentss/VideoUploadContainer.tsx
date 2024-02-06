"use client";
import React, { useTransition, useState } from "react";
import VideoOptions from "./VideoOptions";
import VideoInformation from "./VideoInformation";
import { toast } from "sonner";
import VideoElements from "./VideoElements";
import VideoVisibilty from "./VideoVisibilty";
import { videoUpload } from "@/actions/video";
const VideoUploadContainer = ({ setOpen, videoContent, setVideoUrl }: any) => {
  const [isPending, startTransition] = useTransition();
  const [active, setActive] = useState(0);
  const [title, setTitle] = useState(videoContent[0]?.name.split(".")[0]);
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [videoType, setVideoType] = useState("");
  const [description, setDescription] = useState("");
  const url = videoContent[0]?.url;
  const data = {
    title: title,
    videoType:videoType,
    thumbnailUrl: thumbnailUrl,
    videoUrl: url,
    description: description,
  };
  const upload = (data: any) => {
    startTransition(() => {
      videoUpload(data)
        .then(() => {
          toast.success("Video Upload Successfully");
          setThumbnailUrl("");
          setDescription("");
          setTitle("");
          setVideoUrl("");
          setOpen(false);
        })
        .catch((error) => {
          console.log(error);
          toast.error("Something went wrong");
        });
    });
  };
  const handleUpload = () => {
    upload(data);
  };
  return (
    <div>
      {active === 0 && (
        <>
          <VideoOptions setActive={setActive} active={0} title={title} />
          <VideoInformation
            title={title}
            setTitle={setTitle}
            videoUrl={url}
            videoName={videoContent[0]?.name}
            thumbnailUrl={thumbnailUrl}
            setThumbnailUrl={setThumbnailUrl}
            setActive={setActive}
            setVideoType= {setVideoType}
            setDescription={setDescription}
            description={description}
            active={active}
          />
        </>
      )}
      {active === 1 && (
        <>
          <VideoOptions setActive={setActive} active={1} />
          <VideoElements setActive={setActive} active={active} />
        </>
      )}
      {active === 2 && (
        <>
          <VideoOptions setActive={setActive} active={2} />
          <VideoVisibilty
            videoUrl={url}
            videoName={videoContent[0]?.name}
            setActive={setActive}
            active={active}
            upload={handleUpload}
            isPending={isPending}
          />
        </>
      )}
    </div>
  );
};

export default VideoUploadContainer;
