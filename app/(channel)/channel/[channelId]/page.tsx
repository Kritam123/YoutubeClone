import React from "react";
import BannerVideoContainer from "../../[channelname]/(channelhome)/BannerVideoContainer";
import ForYouVideosContainer from "../../[channelname]/(channelhome)/ForYouVideosContainer";
import AllVideosContainer from "../../[channelname]/(channelhome)/AllVideosContainer";
import { getChannelByName } from "@/lib/getChannelByName";

const page = async ({ params }: { params: { channelname: string } }) => {
  const getChannel = await getChannelByName(params.channelname);
  return (
    <div className="px-10 w-full  py-5">
      {
        getChannel.bannervideo && <BannerVideoContainer channel={getChannel} />
      }
      {/* for you videos */}
      <ForYouVideosContainer getChannelId={getChannel.id}/>
      {/* all video playlists */}
      <AllVideosContainer  getChannelId={getChannel.id}/>
    </div>
  );
};

export default page;
