import React from "react";
import Navbar from "@/app/(Home)/navbar";
import Sidebar from "@/app/(Home)/sidebar";
import { currentUser } from "@clerk/nextjs";
import { db } from "@/lib/db";
import ChannelHeader from "../[channelname]/_components/ChannelHeader";
import ChannelNavBar from "../[channelname]/_components/ChannelNavBar";
import { redirect } from "next/navigation";
const ChannelLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await currentUser();
  if (!user) {
    redirect("/signin");
  }
  const dbUser = await db.user.findUnique({
    where: {
      externalUserId: user?.id.toString(),
    },
  });
  const channel = await db.channel.findUnique({
    where: {
      userId: dbUser?.id.toString(),
    },
  });
  if (!channel) {
    redirect("/");
  }
  return (
    <>
      <Navbar />
      <div className="flex w-full h-[calc(100%-50px)] ">
        <Sidebar />
        <main className="ml-60  w-[calc(100%-256px)]  mt-14 h-full">
          <ChannelHeader channel={channel} user={dbUser} />
          <ChannelNavBar channel={channel} user={dbUser} />
          {children}
        </main>
      </div>
    </>
  );
};

export default ChannelLayout;
