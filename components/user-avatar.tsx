import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
const avatarSizes = cva("", {
  variants: {
    size: {
      default: "h-8 w-8",
      lg: "h-14 w-14",
      sm: "h-6 w-6",
      md: "h-10 w-10"
    },
  },
  defaultVariants: {
    size: "default",
  },
});
interface UserAvatarProps extends VariantProps<typeof avatarSizes> {
  imageUrl: string;
  username?: string;
}
const UserAvatar = ({
  imageUrl,
  username,
  size,
}: UserAvatarProps) => {
  return (
    <div className="relative">
      <Avatar
        className={cn(
          avatarSizes({ size })
        )}
      >
        {
          imageUrl ?
            <AvatarImage src={imageUrl} className="object-cover" />
            :
            <AvatarImage src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD116U9ZCk8bEaanCeB5rSCC2uqY5Ka_2_EA&usqp=CAU"} className="object-cover" />
        }
        <AvatarFallback>
          {username}
        </AvatarFallback>
      </Avatar>
    </div>
  );
};

export default UserAvatar;
