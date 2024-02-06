"use client"
import React from "react";
import { MdHomeFilled } from "react-icons/md";
import { SiYoutubeshorts } from "react-icons/si";
import { MdOutlineSubscriptions } from "react-icons/md";
import Listitem from "./Listitem";
const HomeActions = () => {
  return (
    <div className="pb-3">
      {homeActions &&
        homeActions.map(({icon,name,href}) => (
          <Listitem key={name} icon= {icon} name={name} href={href} />
        ))}
    </div>
  );
};

export default HomeActions;
export const homeActions = [
  {
    icon: MdHomeFilled,
    name: "Home",
    href: "/",
  },
  {
    icon: SiYoutubeshorts,
    name: "Shorts",
    href: "/shorts/:id",
  },
  {
    icon: MdOutlineSubscriptions,
    name: "Subscriptions",
    href: "/feed/subscriptions",
  },
];