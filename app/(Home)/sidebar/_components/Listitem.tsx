"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { usePathname ,useParams} from "next/navigation";
interface ListitemProps {
  icon: React.ElementType;
  name: string;
  href: string;
  type?: string;
  channelName?: string
  channelId?: string
}
const Listitem = ({ icon: Icon, name, href, type,channelName ,channelId }: ListitemProps) => {
  const pathname = usePathname();
  const {channelname} = useParams();
  return (
    <>
      {type !== "You" ? <Button asChild variant={"ghost"} className={cn("w-full h-10",  channelName === channelname ? href === `/channel/${channelId}` ? "bg-[#e6e6f0] text-black" : "" : pathname === href && "bg-[#e6e6f0] text-black")}>
        <Link href={href || "/"}>
          <div className="flex items-center w-full gap-x-5">
            <Icon className="text-2xl" />
            <p className="truncat font-normal">{name}</p>
          </div>
        </Link>
      </Button> : <Button asChild variant={"ghost"} className={cn("w-full h-10")}>
        <Link href={href}>
          <div className="flex items-center w-full gap-x-2">
            <p className="truncat font-bold text-lg text-gray-700">{name}</p>
            <Icon className="text-xl" />
          </div>
        </Link>
      </Button>}
    </>
  );
};

export default Listitem;
