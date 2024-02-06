import React from "react";
import { ModeToggle } from "./_components/ModeToggle";
import Logo from "./_components/Logo";
import Search from "./_components/Search";
import Actions from "./_components/Actions";

const Navbar = () => {
  return (
    <div className="h-14 fixed w-full shadow-sm z-[999] top-0 px-4 py-1 gap-5 items-center flex justify-between dark:bg-black bg-white">
      <Logo/>
      <Search/>
      <Actions/>
    </div>
  );
};

export default Navbar;
