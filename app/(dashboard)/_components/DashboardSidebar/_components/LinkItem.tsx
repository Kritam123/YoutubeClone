"use client"
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
interface LinkItemProps{
    icon:any
    name:string,
    href:string
}
const LinkItem = ({href,icon:Icon,name}:LinkItemProps) => {
  const pathname =  usePathname()
  return (
    <Link  href={href}  className={cn("w-full relative  flex justify-start h-[3rem] cursor-pointer",href ===pathname && "text-red-500 bg-[#e6e6f0] hover:text-red-500 before:content-[''] before:left-0 before:absolute before:h-full before:w-1 before:bg-red-500 ")}>
        <Button variant={"ghost"} className={("px-5  w-full h-full") }>
          <div className="flex items-center w-full gap-x-5">
            <Icon className={cn("text-2xl text-gray-400",href===pathname && " text-red-500 hover:text-red-500")} />
            <p className={cn(" font-bold text-[13px] text-gray-500",href === pathname && "text-red-500  ")}>{name}</p>
          </div>
        </Button>
      </Link>
  )
}

export default LinkItem