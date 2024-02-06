import Navbar from "@/app/(Home)/navbar";
import Sidebar from "@/app/(Home)/sidebar";
import React from "react";
import ChannelHeader from "./_components/ChannelHeader";
import ChannelNavBar from "./_components/ChannelNavBar";
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const ChannelPageLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { channelname: string };
}) => {
  const session = await currentUser();
  let user ;
  if(session){
   user = await db.user.findUnique({
      where: {
        externalUserId: session?.id,
      },
    });
  }
 
  const channel = await db.channel.findFirst({
    where: {
      displayName: params.channelname,
    },
    include:{
      Subscribed:true,
      videos:true
    }
  });
  if (!channel) {
    redirect("/");
  }
  return (
    <>
      <Navbar />
      <div className="flex w-full min-h-[calc(100vh-50px)]">
        <Sidebar />
        <main className="ml-60 w-[calc(100%-256px)] mt-14 h-full">
          <ChannelHeader channel={channel} user={user} />
          <ChannelNavBar channel={channel} user={user} />
          {children}
        </main>
      </div>
    </>
  );
};

export default ChannelPageLayout;
