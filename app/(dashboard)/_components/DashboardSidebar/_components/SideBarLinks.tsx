"use client"
import React from "react";
import {
  MdOutlineVideoLibrary,
  MdDashboard,
  MdOutlinePermMedia,
  MdOutlineAnalytics,
  MdOutlineCopyright,
  MdOutlineComment,
  MdOutlineSubtitles,
} from "react-icons/md";
import { PiCurrencyDollarSimpleLight } from "react-icons/pi";
import { LiaUserEditSolid } from "react-icons/lia";
import LinkItem from "./LinkItem";
interface ChannelProps {
  channel: any;
}

const SideBarLinks = ({ channel }: ChannelProps) => {
  const linksItem = [
    {
      href: `/dashboard/channel/${channel?.id}`,
      icon: MdDashboard,
      name: "Dashboard",
    },
    {
      href: `/dashboard/channel/${channel?.id}/videos/upload`,
      icon: MdOutlineVideoLibrary,
      name: "Content",
    },
    {
      href: `/dashboard/channel/${channel?.id}/analytics`,
      icon: MdOutlineAnalytics,
      name: "Analytics",
    },
    {
      href: `/dashboard/channel/${channel?.id}/comments/inbox`,
      icon: MdOutlineComment,
      name: "Comments",
    },
    {
      href: `/dashboard/channel/${channel?.id}/translations`,
      icon: MdOutlineSubtitles,
      name: "Subtitles",
    },
    {
      href: `/dashboard/channel/${channel?.id}/copyright/history`,
      icon: MdOutlineCopyright,
      name: "Copyright",
    },
    {
      href: `/dashboard/channel/${channel?.id}/monitization`,
      icon: PiCurrencyDollarSimpleLight,
      name: "Earns",
    },
    {
      href: `/dashboard/channel/${channel?.id}/editing/sections`,
      icon: LiaUserEditSolid,
      name: "Customization",
    },
    {
      href: `/dashboard/channel/${channel?.id}/music`,
      icon: MdOutlinePermMedia,
      name: "Audio Libary",
    },
  ];
  return (
    <div className="mt-2 h-[24rem] pr-1 overflow-auto sidebar w-full">
      {linksItem.map((nav) => (
        <LinkItem key={nav.name} icon={nav.icon} href={nav.href} name={nav.name} />
      ))}
    </div>
  );
};

export default SideBarLinks;
