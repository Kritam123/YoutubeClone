import React from 'react'
import SubscriptionList from "./SubscriptionList"
// import { userchannel } from '@/utils/sidebarData'
import { Button } from '@/components/ui/button'
import { FaUserCircle } from "react-icons/fa";
import Link from 'next/link';
const Subscriptions = ({user,subscribers}:any) => {
  console.log()
  return (
    <div className="py-3 ">
      {
        user && <span className='font-bold text-sm px-3 pb-3'>Subscriptions</span>
      }
      {user ? 
      ( subscribers?.length>0 ? subscribers.map((item:any)=>(
        <SubscriptionList key={item.id} image={item.channel.imageUrl} displayName={item?.channel?.displayName} name={item.channel.name}/>
      )):<>
        <Button className='mt-3'>Browse to Subsrcibes</Button>
      </>)
    :(
      <div className='flex justify-center flex-col items-center'>
       <p className='text-sm'>Sign in to like videos, comment, and subscribe.</p> 
      <Link href={"/signin"}>
      <Button className='text-md text-[#065FD4] mt-2 hover:text-[#065FD4] border rounded-xl' variant={"ghost"}>
        <FaUserCircle className=" text-lg "/>
          <span className='ml-3'>Sign in</span>
       </Button>
      </Link>
      </div>
    )  
    }
    </div>
  )
}

export default Subscriptions