import Navbar from '@/app/(Home)/navbar'
import React from 'react'

const VideoDetailsLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <>
    <Navbar/>
    <div className='mt-14 min-h-[120vh]'>{children}</div>
    </>
  )
}

export default VideoDetailsLayout;