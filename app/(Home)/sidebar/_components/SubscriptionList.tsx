"use client"
import React from 'react'
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import UserAvatar from '@/components/user-avatar';
interface ListitemProps {
    image:string
    name: string;
    href?: string;
    displayName:string
  }
const SubscriptionList = ({image,name,displayName}:ListitemProps) => {
  const pathname = usePathname()
  return (
    <Button asChild variant={"ghost"} className={cn("w-full h-10",pathname.split("/")[1] ===displayName && "bg-[#e6e3e3]")}>
    <Link href={`/${displayName}`}>
      <div className="flex items-center w-full gap-x-5">
        <UserAvatar size={"sm"} username={name} imageUrl={image} />
        <p className="truncat font-normal  text-sm ">{name}</p>
      </div>
    </Link>
  </Button>
  )
}

export default SubscriptionList