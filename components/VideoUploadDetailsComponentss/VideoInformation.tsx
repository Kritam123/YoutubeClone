"use client";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { FiHelpCircle } from "react-icons/fi";
import { CgChevronDown } from "react-icons/cg";
import { MdOutlinePlaylistAdd, MdOutlinePodcasts } from "react-icons/md";
import { UploadDropzone } from "@/utils/uploadthing";
import "@uploadthing/react/styles.css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MdContentCopy } from "react-icons/md";
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
const VideoInformation = ({
  videoUrl,
  setActive,
  active,
  videoName,
  thumbnailUrl,
  setThumbnailUrl,
  title,
  setDescription,
  description,
  setTitle,
  setVideoType
}: any) => {
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const titlelabelRef = useRef<HTMLTextAreaElement>(null);
  const descriptionLabelRef = useRef<HTMLTextAreaElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    titleRef.current?.addEventListener("focusin", () => {
      if (titlelabelRef.current) {
        titlelabelRef.current.classList.add("text-blue-500");
      }
    });
    titleRef.current?.addEventListener("focusout", () => {
      if (titlelabelRef.current) {
        titlelabelRef.current.classList.remove("text-blue-500");
      }
    });
    descriptionRef.current?.addEventListener("focusin", () => {
      if (descriptionLabelRef.current) {
        descriptionLabelRef.current.classList.add("text-blue-500");
      }
    });
    descriptionRef.current?.addEventListener("focusout", () => {
      if (descriptionLabelRef.current) {
        descriptionLabelRef.current.classList.remove("text-blue-500");
      }
    });
    return () => {
      titleRef.current?.removeEventListener("focusin", () => {
        if (titlelabelRef.current) {
          titlelabelRef.current.classList.add("text-blue-500");
        }
      });
      titleRef.current?.removeEventListener("focusout", () => {
        if (titlelabelRef.current) {
          titlelabelRef.current.classList.remove("text-blue-500");
        }
      });
      descriptionRef.current?.removeEventListener("focusin", () => {
        if (descriptionLabelRef.current) {
          descriptionLabelRef.current.classList.add("text-blue-500");
        }
      });
      descriptionRef.current?.removeEventListener("focusout", () => {
        if (descriptionLabelRef.current) {
          descriptionLabelRef.current.classList.remove("text-blue-500");
        }
      });
    };
  }, []);
  const handleCopylink = () => {
    if (linkRef.current) {
      navigator.clipboard.writeText(linkRef.current.innerHTML);
      alert(linkRef.current.innerHTML);
    }
  };
  const handleNext = () => {
    setActive(active + 1);
  };
  return (
    <div className="px-5 mt-3 max-h-[550px] overflow-y-scroll flex w-full gap-5 ">
      <div className="w-full h-full">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-xl">Details</h1>
          <Button
            variant={"ghost"}
            className="text-blue-500 hover:bg-transparent hover:text-blue-500 uppercase"
          >
            Reuse Details
          </Button>
        </div>
        <div className="space-y-6 mt-3">
          <div className="relative ">
            <label
              htmlFor="title"
              className="absolute text-[12px] flex items-center gap-1 top-1 left-3"
            >
              <span ref={titlelabelRef}>Title(required)</span>{" "}
              <FiHelpCircle className="text-md" />
            </label>
            <Textarea
              id="title"
              ref={titleRef}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="hover:border-color-black hover:cursor-auto focus-visible:ring-blue-500 focus-visible:ring-1 py-5 "
            />
          </div>
          <div className="relative">
            <label
              htmlFor="title"
              className="absolute text-[12px]   flex items-center gap-1 top-1 left-3"
            >
              <span ref={descriptionLabelRef} className="">
                Description
              </span>{" "}
              <FiHelpCircle className="text-md" />
            </label>
            <Textarea
              ref={descriptionRef}
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              placeholder="Tell viewers about your video."
              style={{
                height: 150,
              }}
              className="hover:border-color-black hover:cursor-auto focus-visible:ring-blue-500 focus-visible:ring-1 py-5 "
            />
          </div>
        </div>
        {/* thumbnail */}
        <div className="mt-5">
          <h1 className="font-bold text-sm">Thumbnail</h1>
          <p className="leading-4 mt-2 text-[13px]">
            Select or upload a picture that shows what's in your video. A good
            thumbnail stands out and draws viewers' attention.{" "}
            <span className="text-blue-500">Learn more</span>
          </p>
          {thumbnailUrl ? (
            <div className="relative">
              <Image
                src={thumbnailUrl}
                width={600}
                height={400}
                alt="thumbnail_preview"
              />
            </div>
          ) : (
            <UploadDropzone
              onClientUploadComplete={(res) => {
                setThumbnailUrl(res[0].url);
              }}
              endpoint="thumbnailUploader"
            />
          )}
        </div>
        <div className="mt-5">
          <h1 className="font-bold text-sm">Playlists</h1>
          <p className="leading-4 mt-2 text-[13px]">
            Add your video to one or more playlists to organize your content for
            viewers. <span className="text-blue-500">Learn more</span>.
          </p>
          <div className="mt-5 min-h-[50px]">
            <Select>
              <SelectTrigger className="focus-visible:ring-0 ring-offset-0 focus:ring-0  w-[200px]">
                <SelectValue placeholder="PlayLists..." />
              </SelectTrigger>
              <SelectContent className="w-[400px]  h-[300px] z-[9999]">
                <SelectItem value="light">Kritam wedding</SelectItem>
                <SelectItem value="dark">Web DevelopMent</SelectItem>
                <SelectItem value="system">App Development</SelectItem>
                <div className="absolute flex justify-between border-t bottom-0 px-2 py-2 left-0 right-0 w-full">
                  <Popover>
                    <PopoverTrigger>
                      <Button variant={"outline"}>
                        <span className="uppercase text-blue-500">
                          New Playlists
                        </span>
                        <CgChevronDown className="text-lg text-blue-500" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="z-[9999] w-fit">
                      <Button variant={"outline"} className="flex gap-2">
                        <MdOutlinePlaylistAdd className="text-xl" />
                        <span className="text-md">New Playlists</span>
                      </Button>
                      <Button variant={"outline"} className="flex gap-2">
                        <MdOutlinePodcasts className="text-xl" />
                        <span className="text-md">New podcast</span>
                      </Button>
                    </PopoverContent>
                  </Popover>
                </div>
              </SelectContent>
            </Select>
          </div>
          <h1 className="font-bold text-sm">Video Type</h1>
          <p className="leading-4 mt-2 text-[13px]">
            Add your videotype And help in recommned to your video for viewers <span className="text-blue-500">Learn more</span>.
          </p>
          <div className="mt-5 min-h-[50px]">
            <Select onValueChange={(e)=>setVideoType(e)}>
              <SelectTrigger className="focus-visible:ring-0 ring-offset-0 focus:ring-0  w-[200px]">
                <SelectValue placeholder="VideoTypes.." />
              </SelectTrigger>
              <SelectContent  className="w-[400px]  h-[300px] z-[9999]">
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="hacking">Hacking</SelectItem>
                <SelectItem value="music">Music</SelectItem>
                <SelectItem value="movie">Movie</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <div className=" w-[450px] sticky top-[-50px]  h-full">
        <div className="h-fit pb-2 mt-[52px] bg-[#f9f9f9] border">
          <div className="w-full">
            <video className="w-full" controls src={videoUrl}></video>
            <div className="px-2 py-2 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">video link</span>
                <a
                  ref={linkRef}
                  className="text-sm text-blue-500 truncate w-[250px]"
                  href={videoUrl}
                >
                  {videoUrl}
                </a>
              </div>
              <Button onClick={handleCopylink} variant={"ghost"} size={"icon"}>
                <MdContentCopy className="text-xl cursor-pointer" />
              </Button>
            </div>

            <div className="flex flex-col px-2">
              <span className="text-sm text-gray-500">Filename</span>
              <span className="text-sm truncate h-10 w-[300px]">
                {videoName}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex gap-5 bottom-3 right-16">
        <Button
          onClick={handleNext}
          className=" bg-blue-600 hover:bg-blue-600 uppercase font-bold text-white "
          variant={"secondary"}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default VideoInformation;
