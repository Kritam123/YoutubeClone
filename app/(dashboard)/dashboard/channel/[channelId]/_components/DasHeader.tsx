"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import DialogUploadBox from "@/components/use-Dialog";
import { TfiUpload } from "react-icons/tfi";
import { CiStreamOn } from "react-icons/ci";
interface DasHeaderProps{
  open:boolean
  setOpen:(open:boolean)=>void;
}
const DasHeader = ({open,setOpen}:DasHeaderProps) => {
  return (
    <div className="py-5 px-3 flex justify-between w-full items-center">
      <h1 style={{}} className="text-xl font-semibold">
        Channel dashboard
      </h1>
      <div className="flex gap-2 items-center ">
        <DialogUploadBox open={open} setOpen={setOpen}/>
        <Button onClick={()=>setOpen(true)} className="rounded-full" variant={"outline"} size={"icon"}>
            <TfiUpload className="text-md" />
          </Button>
        <Button className="rounded-full" variant={"outline"} size={"icon"}>
          <CiStreamOn className="text-lg" />
        </Button>
      </div>
    </div>
  );
};

export default DasHeader;
