import React from "react";
const VideoOptions = ({ active, setActive }: any) => {
  const options = ["Details", "Video elements", "Visiblity"];
  return (
    <div className="flex mt-5 justify-center">
      {options.map((option: string, index: number) => (
        <div
          onClick={() => setActive(index)}
          className="w-full flex-col cursor-pointer hover:bg-[#f9f9f9] items-center gap-3 flex "
          key={index}
        >
          <h5
            className={`text-[13px] ${
              active === index
                ? "text-blue-500 dark:text-white to-black"
                : "dark:text-white to-black"
            } font-Poppins font-bold`}
          >
            {option}
          </h5>
          <div
            className={`w-[25px] h-[25px]  relative rounded-full flex items-center justify-center ${
              active + 1 > index ? "bg-blue-500" : "bg-[#384766]"
            } `}
          >
            {index !== options.length - 1 && (
              <div
                className={`absolute  h-[2px] w-[280px] ${
                  active > index ? "bg-blue-500" : "bg-[#384766]"
                } left-6`}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoOptions;
