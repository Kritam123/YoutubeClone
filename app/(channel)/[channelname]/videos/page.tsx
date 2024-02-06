import React from 'react'
import VideosContainer from './_components/VideosContainer'
import { getChannelByName } from '@/lib/getChannelByName';

const VideosPage = async ({ params }: { params: { channelname: string } }) => {
  const getChannel = await getChannelByName(params.channelname);
  return (
    <div className='px-16 py-3'>
      <VideosContainer channelId={getChannel.id} />
    </div>
  )
}

export default VideosPage