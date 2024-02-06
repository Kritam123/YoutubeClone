import React from 'react';
import { CardItemSkeletion } from "./_components/CardItem";
import { getVideos } from '@/actions/video';
const Loading = async () => {
  const videos = await getVideos();
  return (
    <div className="flex py-5  px-4 flex-wrap justify-start item  gap-4">
      {
        [...Array(videos.length)].map((_, i) => (
          <CardItemSkeletion key={i} />
        ))
      }
    </div>
  )

}

export default Loading;