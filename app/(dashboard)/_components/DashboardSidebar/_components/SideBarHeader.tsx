import ChannelAvatar from '@/components/channel-avatar'
import { db } from '@/lib/db'
import React from 'react'

const SideBarHeader = ({channel}:any) => {
    
  return (
    <div className='flex justify-center   items-center flex-col mt-5'>
        <ChannelAvatar size={"sx"}  imageUrl={channel?.imageUrl}channelname={channel?.displayName}/>
        {/* details */}
        <div className="flex flex-col items-center mt-4">
            <span className='text-sm font-semibold'>Your channel</span>
            <span className='text-[13px] text-gray-500'>{channel?.name}</span>
        </div>
    </div>
  )
}

export default SideBarHeader