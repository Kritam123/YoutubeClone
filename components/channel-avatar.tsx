import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
const avatarSizes = cva("", {
    variants: {
      size: {
        default: "h-8 w-8",
        lg: "h-14 w-14",
        sm:"h-6 w-6",
        md:"h-10 w-10",
        xl:"h-40 w-40",
        sx:"h-28 w-28",
        vs:"h-4 w-4"
      },
    },
    defaultVariants: {
      size: "default",
    },
  });
  interface ChannelAvatarProps extends VariantProps<typeof avatarSizes> {
    imageUrl: string;
    channelname: string;
  }

const ChannelAvatar = ({
    imageUrl,
    channelname,
    size,
  }: ChannelAvatarProps) => {
  return (
    <div className="relative">
      <Avatar
        className={cn(
          avatarSizes({ size })
        )}
      >
        <AvatarImage src={imageUrl} className="object-cover"/>
        <AvatarFallback>
          {channelname[0]}
          {channelname[channelname.length - 1]}
        </AvatarFallback>
      </Avatar>
    </div>
  )
}

export default ChannelAvatar