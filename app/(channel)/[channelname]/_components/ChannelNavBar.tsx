"use client";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { CiSearch } from "react-icons/ci";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";

const ChannelNavBar = ({ channel, user }: any) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocus, setIsFocus] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.addEventListener("focusin", () => {
        setIsFocus(true);
      });
      inputRef.current.addEventListener("focusout", () => {
        setIsFocus(false);
      });
    }

    return () => {
      if (inputRef.current) {
        inputRef.current.removeEventListener("focusin", () => {
          setIsFocus(true);
        });
        inputRef.current.removeEventListener("focusout", () => {
          setIsFocus(false);
        });
      }
    };
  }, [isFocus]);
  const handleOpenSearch = () => {
    setIsOpen(true);
  };
  const navlinks = [
    {
      href: `/${channel?.displayName}`,
      name: "Home",
    },
    {
      href: `/${channel?.displayName}/videos`,
      name: "Videos",
    },
    {
      href: `/${channel?.displayName}/shorts`,
      name: "Shorts",
    },
    {
      href: `/${channel?.displayName}/streams`,
      name: "Live",
    },
    {
      href: `/${channel?.displayName}/playlists`,
      name: "Playlists",
    },
    {
      href: `/${channel?.displayName}/community`,
      name: "Community",
    },
  ];
  const navlinksUser = [
    {
      href: `/${channel?.displayName}`,
      name: "Home",
    },
    {
      href: `/${channel?.displayName}/playlists`,
      name: "Playlists",
    },
  ];
  return (
    <nav className="mt-10 sticky top-[56px] z-[500]  bg-[#ffff] flex border-b h-[3rem] items-center  border-gray-300 px-16">
      <ul className="flex gap-5">
        {channel?.userId === user?.id
          ? navlinksUser.map((nav) => (
            <li key={nav.name} className="flex items-center">
              <Link

                href={nav.href}
                className={cn(
                  " py-3 before:absolute capitalize text-gray-500 font-semibold relative before:w-full hover:before:block before:hidden  before:h-[2px] transition-all before:bottom-0 before:content-[''] before:bg-gray-400 before:left-0 ",
                  pathname === `/channel/${channel?.id}` ? nav.href === `/${channel?.displayName}` ? "before:bg-black before:block text-black":"" : nav.href === pathname &&
                    "before:bg-black before:block text-black"
                )}
              >
                {nav.name}
              </Link>
            </li>
          ))
          : navlinks.map((nav) => (
            <li key={nav.name} className="flex items-center">
              <Link
                href={nav.href}
                className={cn(
                  " py-3 before:absolute capitalize text-gray-500 font-semibold relative before:w-full hover:before:block before:hidden  before:h-[2px] transition-all before:bottom-0 before:content-[''] before:bg-gray-400 before:left-0 ",
                  nav.href === pathname &&
                  "before:bg-black before:block text-black"
                )}
              >
                {nav.name}
              </Link>
            </li>
          ))}
      </ul>
      <div className="ml-10 flex  gap-1">
        <Button
          onClick={handleOpenSearch}
          variant={"outline"}
          size={"icon"}
          className="p-0 "
        >
          <CiSearch className="text-xl" />
        </Button>
        {isOpen && (
          <div className="relative flex justify-center">
            <input
              placeholder="Search"
              ref={inputRef}
              type="text"
              className="border-b border-gray-600 outline-none px-0 py-0"
            />
            <div
              className={cn(
                "w-0 transition-all duration-200 absolute h-[2px] bg-black bottom-0",
                isFocus && "w-full"
              )}
            />
          </div>
        )}
      </div>
    </nav>
  );
};

export default ChannelNavBar;
