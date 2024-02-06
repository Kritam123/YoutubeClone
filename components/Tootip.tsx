'use client'
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const Tootip = ({
  title,
  children,
  className
}: {
  title: string;
  children: React.ReactNode;
  className?:string
}) => {
  return (
    <TooltipProvider disableHoverableContent delayDuration={0}>
      <Tooltip>
        <TooltipTrigger className="flex gap-1">{children}</TooltipTrigger>
        <TooltipContent  className={cn("bg-white mt-2 z-[9000] text-black text-sm shadow-none",className)}>
          <p className="">{title}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default Tootip;
