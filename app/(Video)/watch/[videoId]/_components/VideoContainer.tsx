"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { IoMdPause, IoMdPlay } from "react-icons/io";
import { MdSkipNext } from "react-icons/md";
import { LuLoader, LuRectangleHorizontal } from "react-icons/lu";
import { MdFullscreen } from "react-icons/md";
import { MdTab } from "react-icons/md";
import { cn } from "@/lib/utils";
import { RiFullscreenExitLine } from "react-icons/ri";
import { TbVolumeOff, TbVolume, TbVolume2 } from "react-icons/tb";
import { Skeleton } from "@/components/ui/skeleton";
const VideoContainer = ({ videoUrl, isPending }: any) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const totalTimeRef = React.useRef<HTMLDivElement>(null);
  const playBackRef = React.useRef<HTMLButtonElement>(null);
  const currentTimeRef = React.useRef<HTMLDivElement>(null);
  const timelineContainerRef = React.useRef<HTMLDivElement>(null);
  const isPaused = videoRef.current && videoRef.current.paused;
  const [playPaused, setPlayPaused] = useState(false);
  const [minSize, setMinSize] = useState(false);
  const [isFullSize, setIsFullSize] = useState(false);
  const [miniPlayer, setMiniPlayer] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState<number>(50);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setPlayPaused(true);
    }
  };
  const handlePaused = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setPlayPaused(false);
    }
  };
  const toggleMuted = () => {
    if (videoRef.current) {
      if (videoRef.current?.muted) {
        videoRef.current.muted = false;
        setIsMuted(false);
      } else {
        videoRef.current.muted = true;
        setIsMuted(true);
      }
    }
  };
  const handleClick = () => {
    if (videoRef.current?.paused) {
      handlePlay();
    } else {
      handlePaused();
    }
  };
  const handleMinPlayer = () => {
    if (miniPlayer) {
      document.exitPictureInPicture();
      setMiniPlayer(false);
    } else {
      videoRef.current?.requestPictureInPicture();
      setMiniPlayer(true);
    }
  };

  const videoPlay = (e: KeyboardEvent) => {
    switch (e.key.toLowerCase()) {
      case "k":
        handleClick();
        break;
      case " ":
        handleClick();
        break;
      case "f":
      case "esc":
        handleIsFullSize();
        break;
      case "t":
        handleMinSize();
        break;
      case "i":
        handleMinPlayer();
        break;
      case "m":
        toggleMuted();
      case "arrowleft":
      case "j":
        skip(-5);
        break;
      case "arrowright":
      case "l":
        skip(5);
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    document.addEventListener("keydown", videoPlay);
    return () => {
      document.removeEventListener("keydown", videoPlay);
    };
  }, [videoPlay]);
  const handleVolumeChange = (e: any) => {
    if (videoRef.current) {
      e.preventDefault();
      setVolume(e.target.value);
      videoRef.current.volume = volume / 100;
    }
  };

  const handleMinSize = () => {
    if (minSize) {
      setMinSize(false);
    } else {
      setMinSize(true);
    }
  };
  const loadingZeroFormatter = new Intl.NumberFormat(undefined, {
    minimumIntegerDigits: 2,
  });
  const formateDuration = (time: any) => {
    const seconds = Math.floor(time % 60);
    const minutes = Math.floor(time / 60) % 60;
    const hours = Math.floor(time / 3600);
    if (hours === 0) {
      return `${minutes} : ${loadingZeroFormatter.format(seconds)}`;
    } else {
      return `${hours}:${loadingZeroFormatter.format(
        minutes
      )}:${loadingZeroFormatter.format(seconds)}`;
    }
  };
  const handleIsFullSize = () => {
    if (isFullSize) {
      setIsFullSize(false);
    } else {
      setIsFullSize(true);
    }
  };
  const handleTotalDuration = () => {
    if (totalTimeRef.current) {
      totalTimeRef.current.innerText = formateDuration(
        videoRef.current?.duration
      );
    }
  };
  const handleCurrentTime = () => {
    if (currentTimeRef.current) {
      currentTimeRef.current.innerText = formateDuration(
        videoRef.current?.currentTime
      );

      const percent =
        videoRef.current &&
        videoRef.current?.currentTime / videoRef.current?.duration;

      timelineContainerRef.current?.style.setProperty(
        "--progress-position",
        percent?.toString() as string |null
      );
    }
  };
  const skip = (duration: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += duration;
    }
  };
  const changePlayblackSpeed = () => {
    if (videoRef.current) {
      let newPlayBackRate = videoRef.current.playbackRate + 0.25;
      if (newPlayBackRate && newPlayBackRate > 2) {
        newPlayBackRate = 0.25;
      }
      videoRef.current.playbackRate = newPlayBackRate;
      if (playBackRef.current) {
        playBackRef.current.innerText = `${newPlayBackRate}x`;
      }
    }
  };
  useEffect(() => {
    videoRef.current?.addEventListener("loadeddata", handleTotalDuration);
    videoRef.current?.addEventListener("timeupdate", handleCurrentTime);
    playBackRef.current?.addEventListener("click", changePlayblackSpeed);
    return () => {
      videoRef.current?.removeEventListener("loadeddata", handleTotalDuration);
      videoRef.current?.removeEventListener("timeupdate", handleCurrentTime);
      videoRef.current?.removeEventListener("click", changePlayblackSpeed);
    };
  }, [handleCurrentTime,handleTotalDuration]);
  // timelineSection
  let isScrubbing = false;
  const toggleScrubbing = (e: MouseEvent) => {
    e.preventDefault();
    const rect =
      timelineContainerRef.current &&
      timelineContainerRef.current?.getBoundingClientRect();
    if (rect) {
      const percent =
        Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width;
      isScrubbing = (e.buttons & 1) === 1;
      let wasPaused = videoRef.current && videoRef.current.paused;
      if (isScrubbing) {
        videoRef.current?.pause();
        setPlayPaused(false);
      } else {
        if (videoRef.current)
          videoRef.current.currentTime = percent * videoRef.current.duration;
        if (!wasPaused) {
          videoRef.current?.play();
          setPlayPaused(true);
        }
      }
      timeLineUpdate(e);
    }
  };
  const timeLineUpdate = (e: MouseEvent) => {
    e.preventDefault();
    const rect =
      timelineContainerRef.current &&
      timelineContainerRef.current?.getBoundingClientRect();
    if (rect) {
      const percent =
        Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width;
      timelineContainerRef.current.style.setProperty(
        "--preview-position",
        percent.toString()
      );
    }
  };
  useEffect(() => {
    timelineContainerRef.current?.addEventListener("mousemove", timeLineUpdate);
    timelineContainerRef.current?.addEventListener(
      "mousedown",
      toggleScrubbing
    );
    document.addEventListener("mousemove", (e) => {
      if (isScrubbing) timeLineUpdate(e);
    });
    document.addEventListener("mouseup", (e) => {
      if (isScrubbing) toggleScrubbing(e);
    });
    return () => {
      timelineContainerRef.current?.removeEventListener(
        "mousedown",
        toggleScrubbing
      );
      timelineContainerRef.current?.removeEventListener(
        "mousemove",
        timeLineUpdate
      );
    };
  }, [isScrubbing,toggleScrubbing]);

  if (isPending) {
    return (
      <VideoContainerSkeleton />
    )
  }
  return (
    <>
      <div
        className={cn(
          "w-full flex justify-center mx-6 border h-[72vh] bg-[#f2f2f2]  group relative mt-1 max-w-[1950px]",
          minSize && "threater",
          isFullSize && "fullScreen"

        )}
      >
        <div
          className={cn(
            "absolute video-control-container  opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity ease-in-out z-[100] right-0  left-0 bottom-0",
            isPaused && "opacity-100"
          )}
        >
          <div
            ref={timelineContainerRef}
            className="h-[7px] mx-[0.5rem] timeline-Container flex items-center cursor-pointer"
          >
            <div className="bg-[#333333] h-[3px] timeline relative w-full">
              
              <div className="thumb-indicator"></div>
            </div>
          </div>
          <div className="flex items-center justify-between px-5">
            <div className="text-white flex items-center py-1 gap-2 ">
              <Button
                onClick={handleClick}
                variant={"normal"}
                className="bg-transparent px-1 py-1 outline-none  cursor-pointer"
              >
                {playPaused ? (
                  <IoMdPause className="text-2xl cursor-pointer" />
                ) : (
                  <IoMdPlay className="text-2xl cursor-pointer" />
                )}
              </Button>
              <Button
                variant={"normal"}
                className="bg-transparent px-1 py-1 cursor-pointer "
              >
                <MdSkipNext className="text-3xl cursor-pointer" />
              </Button>
              <div className="flex  hover:w-[8rem] items-center  ">
                <Button
                  onClick={toggleMuted}
                  variant={"normal"}
                  className="bg-transparent volume-container  px-1 py-1 cursor-pointer "
                >
                  {isMuted || volume <= 1 ? (
                    <TbVolumeOff className="text-2xl cursor-pointer" />
                  ) : volume <= 40 && volume !== 0 ? (
                    <TbVolume2 className="text-2xl cursor-pointer" />
                  ) : (
                    <TbVolume className="text-2xl cursor-pointer" />
                  )}
                </Button>
                <input
                  type="range"
                  value={volume}
                  onChange={(e) => handleVolumeChange(e)}
                  min={0}
                  max={100}
                  className="w-0 h-1 hidden   volume-range  text-white"
                />
              </div>
              <div className="duration-container text-[12px] select-none flex gap-1">
                <div ref={currentTimeRef} className="currentime">
                  {"00 : 00 "}
                </div>{" "}
                / <div ref={totalTimeRef} className="total-time "></div>
              </div>
            </div>
            <div className="text-white flex gap-3 items-center">
              <Button
                ref={playBackRef}
                variant={"normal"}
                className={cn("px-1 outline-none text-md py-1")}
              >
                1x
              </Button>
              <Button
                onClick={handleMinPlayer}
                variant={"normal"}
                className={cn("px-0 outline-none py-0", isFullSize && "hidden")}
              >
                <MdTab className="text-2xl" />
              </Button>
              <Button
                onClick={handleMinSize}
                variant={"normal"}
                className={cn("px-0 py-0 outline-none", isFullSize && "hidden")}
              >
                {!minSize ? (
                  <LuRectangleHorizontal className="text-3xl" />
                ) : (
                  <LuRectangleHorizontal className="text-2xl font-bold" />
                )}
              </Button>
              <Button
                onClick={handleIsFullSize}
                variant={"normal"}
                className="px-0 outline-none py-0"
              >
                {!isFullSize ? (
                  <MdFullscreen className="text-3xl" />
                ) : (
                  <RiFullscreenExitLine className="text-2xl" />
                )}
              </Button>
            </div>
          </div>
        </div>

        <video
          onClick={handleClick}
          ref={videoRef}
          preload="auto"
          loop
          src={videoUrl}
          className="w-full object-cover  rounded-xl h-full video"
        ></video>
      </div>
    </>
  );
};

export default VideoContainer;


const VideoContainerSkeleton = () => {
  return (
    <Skeleton
      className={(
        "w-full flex justify-center mx-6 h-[72vh]  group relative mt-1 max-w-[950px]"

      )}
    >

      <Skeleton
        className="h-[7px] mx-[0.5rem] timeline-Container flex items-center cursor-pointer"
      >

      </Skeleton>
      <div className="flex items-center justify-between px-5">
        <div className=" flex items-center py-1 gap-2 ">
          <Skeleton
            className="w-5 h-5 rounded-md"
          >
          </Skeleton>
          <Skeleton
            className="w-5 h-5 rounded-md"
          >
          </Skeleton>
          <div className="flex  hover:w-[8rem] items-center  ">
            <Skeleton
              className="w-5 h-5 rounded-md"
            >
            </Skeleton>

          </div>

        </div>
        <div className=" flex gap-3 items-center">
          <Skeleton
            className="w-5 h-5 rounded-md"
          >
          </Skeleton>
          <Skeleton
            className="w-5 h-5 rounded-md"
          >
          </Skeleton>
          <Skeleton
            className="w-5 h-5 rounded-md"
          >

          </Skeleton>
          <Skeleton
            className="px-0 outline-none py-0"
          >
          </Skeleton>
        </div>
      </div>
      <Skeleton
        className="w-full rounded-xl h-full"
      ></Skeleton>
    </Skeleton>
  )
}