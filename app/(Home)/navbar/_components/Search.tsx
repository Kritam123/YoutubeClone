"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import React, { useState } from "react";
import { TfiClose } from "react-icons/tfi";
const Search = () => {
  const [value, setValue] = useState<string>();
  const onClear = () => {
    setValue("");
  };
  return (
    <form
      onSubmit={() => {}}
      className="relative rounded-full  hidden md:w-[500px] w-[400px]  flex-grow-0 dark:border-neutral-300   border  lg:w-[600px] md:flex items-center"
    >
      <SearchIcon className="text-sm group-focus:block   hidden w-5 ml-3 font-thin" />
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search"
        className=" placeholder:text-md text-md group pr-12 bg-transparent border-t-0 border-b-0 border-l-0   rounded-full rounded-r-none focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:ring-offset-0"
      />
      {value && (
        <Button
          variant={"secondary"}
          size={"sm"}
          className="border-none rounded-full absolute   right-16 outline-none"
        >
          <TfiClose
            className="h-3 w-3  font-bold    text-muted-foreground cursor-pointer  transition"
            onClick={onClear}
          />
        </Button>
      )}
      <Button
        size="sm"
        variant="secondary"
        className="rounded-l-none  rounded-r-full ml-[1px] px-5 py-5 w-[60px]"
      >
        <SearchIcon className=" text-lg h-5 w-5 text-muted-foreground" />
      </Button>
    </form>
  );
};

export default Search;
