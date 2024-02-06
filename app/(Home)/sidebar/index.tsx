import React from "react";
import HomeActions from "./_components/HomeActions";
import UserActions from "./_components/UserActions";
import Subscriptions from "./_components/Subscriptions";
import SettingActions from "./_components/SettingActions";
import Wrapper from "./_components/Wrapper";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";
const Sidebar = async () => {
  const user = await currentUser();
  let dbUser, channel, subscribers;
  if (user) {
    dbUser = await db.user.findUnique({
      where: {
        externalUserId: user?.id.toString(),
      },
    });
    channel = await db.channel.findUnique({
      where: {
        userId: dbUser?.id.toString(),
      },
    });
    subscribers = await db.subscribed.findMany({
      where: {
        subscribedId: dbUser?.id
      },
      include:{
        channel:true
      }
    })
  }
  return (
    <Wrapper>
      <HomeActions />
      <Separator />
      <UserActions user={dbUser} channel={channel} />
      <Separator />
      <Subscriptions subscribers={subscribers} user={dbUser} />
      <Separator />
      <SettingActions />
      <Separator />
    </Wrapper>
  );
};

export default Sidebar;
