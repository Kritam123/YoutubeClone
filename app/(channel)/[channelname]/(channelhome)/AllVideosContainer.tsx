import React from 'react'
import AllVideosList from './AllVideosList'
import { getAllChannelVideos } from '@/lib/video-service';

const AllVideosContainer = async({getChannelId}:any) => {
    const getAllVideos = await getAllChannelVideos(getChannelId);
  return (
    <AllVideosList videos={getAllVideos}/>
  )
}

export default AllVideosContainer