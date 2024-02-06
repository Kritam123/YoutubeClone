'use client'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import ChannelCardItem from '../(channelhome)/_components/ChannelCardItem'
import { cn } from '@/lib/utils'
import { getAllVideos } from '@/actions/video'

const VideoListContainer = ({ getAllVideos:allVideos, channelId }: any) => {
    const [sortBy, setSortBy] = useState('desc');
    const [videos, setVideos] = useState(allVideos);
    const [loading, setLoading] = useState(false);
    const func = async () => {
        try {
            setLoading(true);
            const videos = await getAllVideos(channelId, sortBy);
            setVideos(videos as any);
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    }
    const handleDesSort =  () => {
        setSortBy("desc");
        sortBy && func();
    }
    const handeldeAscSort =  () => {
        setSortBy("asc");
       sortBy &&  func();
    }
    const handlePopularSort =  () => {
        setSortBy("popular");
       sortBy && func();
    }
    useEffect (()=>{
        func();
    },[sortBy])
    return (
        <>
            <div className='flex gap-2'>
                <Button disabled={loading} onClick={handleDesSort} variant={"normal"} className={cn('bg-[#f2f2f2] hover:bg-[#ece9e9] text-black font-semibold', sortBy === "desc" && 'bg-black text-white hover:bg-black hover:text-white')} size={"sm"}>Leatest</Button>
                <Button disabled={loading} onClick={handlePopularSort} variant={"normal"} className={cn('bg-[#f2f2f2] hover:bg-[#ece9e9] text-black font-semibold', sortBy === "popular" && 'bg-black text-white hover:bg-black hover:text-white')} size={"sm"} >Popular</Button>
                <Button disabled={loading} onClick={handeldeAscSort} variant={"normal"} className={cn('bg-[#f2f2f2] hover:bg-[#ece9e9] text-black font-semibold', sortBy === "asc" && 'bg-black text-white hover:bg-black hover:text-white')} size={"sm"}>Oldest</Button>
            </div>
            <div className={cn('flex flex-wrap gap-y-10 mt-3',loading && "blur-sm")}>
                {
                    videos && videos?.map((item: any) => (
                        <ChannelCardItem videos={true} key={item?.id} item={item} />
                    ))
                }
            </div>
        </>
    )
}

export default VideoListContainer