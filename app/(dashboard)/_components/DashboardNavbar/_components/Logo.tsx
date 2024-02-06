import Image from 'next/image'
import React from 'react'
import { LuAlignJustify } from "react-icons/lu";
import { oswald } from "@/lib/fonts";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
const Logo = () => {
  return (
    <div className="flex items-center gap-5">
      <Button variant={"secondary"} size={"icon"}>
        <LuAlignJustify className="text-2xl font-light" />
      </Button>
        <Link href={"/"} className="flex gap-1 items-center">
          <Image
            width={30}
            height={30}
            src={"/assests/youtube-logo.png"}
            alt="logo"
          />
          <span className={`${oswald.className} select-none font-bold text-xl`}>
           Studio
          </span>
        </Link>
      </div>
  )
}

export default Logo