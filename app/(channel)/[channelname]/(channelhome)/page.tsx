import { getChannelByName } from "@/lib/getChannelByName";
import BannerVideoContainer from "./BannerVideoContainer";
import ForYouVideosContainer from "./ForYouVideosContainer";
import AllVideosContainer from "./AllVideosContainer";

const ChannelPage = async ({ params }: { params: { channelname: string } }) => {
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

export default ChannelPage;
