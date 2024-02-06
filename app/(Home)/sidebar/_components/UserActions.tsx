'use client'
import React from "react";
import { PiUserSquare } from "react-icons/pi";
import { VscHistory } from "react-icons/vsc";
import { GoVideo } from "react-icons/go";
import { MdOutlineWatchLater } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { GrLike } from "react-icons/gr";
import Listitem from "./Listitem";
const UserActions = ({ channel, user }: any) => {
  const userActions = [
    {
      icon: PiUserSquare,
      name: "Your channel",
      href: `/channel/${channel?.id}`,
    },
    {
      icon: VscHistory,
      name: "History",
      href: "/feed/history",
    },
    {
      icon: GoVideo,
      name: "Your videos",
      href: `/channel/${channel?.id}/videos`,
    },
    {
      icon: MdOutlineWatchLater,
      name: "Watch later",
      href: "/playlist?list=WL",
    },
    {
      icon: GrLike,
      name: "Liked videos",
      href: "/playlist?list=LL",
    },
  ];

  return (
    <div className="py-3">
      <Listitem
        type="You"
        name="You"
        icon={IoIosArrowForward}
        href="/feed/you"
      />
      {user ? (
        userActions &&
        userActions.map(({ icon, name, href }) => (
          <Listitem key={name} channelId={channel.id} channelName={channel?.displayName} icon={icon} name={name} href={href} />
        ))
      ) : (
        <Listitem name="History" icon={VscHistory} href="/feed/history" />
      )}
    </div>
  );
};

export default UserActions;
