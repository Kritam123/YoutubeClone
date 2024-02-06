'use client'
import React, { useState } from "react";
import DasHeader from "./_components/DasHeader";
import DashUploadBox from "./_components/DashUploadBox";
import DashAnalyticsBox from "./_components/DashAnalyticsBox";
import DashStudioBox from "./_components/DashStudioBox";

const DashBoardpage = () => {
  const [open, setOpen] = useState(false)
  return (
    <div className="h-full   px-5 w-full bg-[#F9F9F9]">
      <DasHeader setOpen = {setOpen} open= {open}/>
      <div className="flex gap-5">
        <DashUploadBox setOpen = {setOpen} open= {open}/>
        <DashAnalyticsBox />``
        <DashStudioBox />
      </div>
    </div>
  );
};

export default DashBoardpage;
