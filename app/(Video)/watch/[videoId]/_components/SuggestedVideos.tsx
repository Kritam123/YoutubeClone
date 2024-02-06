'use client'
import React, { useState, useEffect, useTransition } from 'react'
import SuggestedList, { SuggestedListSkeleton } from './SuggestedList'
import { Video } from '@prisma/client';
import { videoRecommended } from '@/actions/video';
import { Skeleton } from '@/components/ui/skeleton';

const SuggestedVideos = ({ videoId, videoType }: any) => {
  const [recommendeds, setRecommendeds] = useState<Video[]>([]);
  const [isPending, startTransition] = useTransition()
  useEffect(() => {
    if (videoId && videoType) {
      startTransition(() => {
        videoRecommended(videoId, videoType && videoType)
          .then((res) => {
            setRecommendeds(res);
          })
          .catch((error: any) => {
            console.log(error);
          });
      })
    }

  }, [videoType, videoId]);
  if (isPending) {
    return (
      <div className='h-full'>
        <Skeleton className='w-[10rem] mt-3 mb-5 h-5' />
        <SuggestedListSkeleton />
      </div>
    )

  }
  return (
    <div className='h-full '>
      {recommendeds && <h1 className="text-xl font-semibold mb-3">Suggestions</h1>}
      <SuggestedList recommendeds={recommendeds} />
    </div>
  )
}

export default SuggestedVideos