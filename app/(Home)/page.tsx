import { getVideos } from "@/actions/video";
import CardItem from "./_components/CardItem";
const page = async () => {
  const videos = await getVideos();
  if (videos) return (
    <>
      <div className="flex py-5  px-4 flex-wrap justify-start  gap-4">
        {
          videos && videos.map((item) =>
            <CardItem key={item.id} item={item} />
          )
        }
        {
          videos.length < 0 && (
            <>
              <div className="flex items-center w-full h-screen justify-center">
                <p className="text-black">
                  Videos are not found... in Youtube Clone Servers,please upload the videos....
                </p>
              </div>
            </>
          )
        }
      </div>
    </>
  )
};
export default page;

