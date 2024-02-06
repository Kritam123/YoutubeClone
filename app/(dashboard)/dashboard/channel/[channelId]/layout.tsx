import DashBoardNavbar from "@/app/(dashboard)/_components/DashboardNavbar";
import DashBoardSidebar from "@/app/(dashboard)/_components/DashboardSidebar";
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

const DashBoarlayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { channelId: string };
}) => {
  const session = await currentUser();
  if (!session) {
    redirect("/");
  }
  const user = await db.user.findUnique({
    where: {
      externalUserId: session.id,
    },
  });
  const channel = await db.channel.findUnique({
    where: {
      id: params.channelId,
    },
  });
  if (channel?.userId !== user?.id) {
    redirect("/");
  }
  return (
    <>
      <DashBoardNavbar />
      <div className="flex w-full border mt-16  h-full overflow-hidden">
        <DashBoardSidebar channel={channel} />
        <main className="ml-[16rem] w-[calc(100%-256px)]  h-full">{children}</main>
      </div>
    </>
  );
};

export default DashBoarlayout;
