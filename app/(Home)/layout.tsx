import React, { Suspense } from "react";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import Loading from "./loading";
const HomeLayout =({ children }: { children: React.ReactNode }) => {
 
  return (
    <>
      <Navbar />
      <div className="flex w-full h-[calc(100%-50px)] ">
        <Sidebar />
        <main className="ml-60 w-full mt-14 h-full">
          <Suspense fallback={<Loading/>}>
          {children}
          </Suspense>
        </main>
      </div>
    </>
  );
};

export default HomeLayout;
