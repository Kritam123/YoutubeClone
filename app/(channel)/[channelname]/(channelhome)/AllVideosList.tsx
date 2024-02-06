'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { IoIosPlay } from "react-icons/io";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdOutlineArrowForwardIos, MdOutlineArrowBackIosNew } from "react-icons/md";
import ChannelCardItem from './_components/ChannelCardItem';
function SampleNextArrow(props: any) {
    const { onClick } = props;
    return (
        <Button variant={"outline"} className=" flex items-center justify-center absolute top-[45%] -translate-y-[100%] rounded-full  -right-5 shadow-md" size={"icon"} onClick={onClick}>
            <MdOutlineArrowForwardIos className="text-lg" />
        </Button>
    );
}

function SamplePrevArrow(props: any) {
    const { onClick } = props;
    return (
        <Button className=" -left-5 absolute top-[45%] -translate-y-[100%] z-[900] flex items-center justify-center rounded-full shadow-lg" variant={"outline"} size={"icon"} onClick={onClick}>
            <MdOutlineArrowBackIosNew className="text-lg" />
        </Button>
    );
}
var settings = {
    speed: 500,
    slidesToShow: 5,
    infinite: false,
    slidesToScroll: 5,
    nextArrow: <SampleNextArrow />,
    adaptiveHeight:true,
    prevArrow: <SamplePrevArrow />,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 5,
                slidesToScroll: 5,
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
};
const AllVideosList = ({videos}:any) => {
    return (
        <>
        <div className="mt-3 w-full">
            <div className="flex gap-2 items-center">
                <h1 className="text-lg font-bold">Videos</h1>
                <Button className='flex items-center justify-center hover:bg-[#eee9e9] py-0 gap-2 rounded-2xl' variant={"outline"}>
                    <IoIosPlay className="text-xl" />
                    <span className='font-semibold text-sm'>Play all</span>
                </Button>
            </div>
        </div>
        <div className='w-full mt-2 '>
            {
                videos?.length > 5 ?
                    <Slider
                        {...settings}
                        className="relative"
                    >

                        {
                            videos?.map((item: any) => (
                                <ChannelCardItem item={item} smallVideo={true} />
                            ))
                        }
                    </Slider>
                    :
                    <div className='flex gap-1'>
                        {
                            videos?.map((item: any) => (
                                <ChannelCardItem item={item} smallVideo={true} />
                            ))
                        }
                    </div>
            }
        </div>
        </>
    )
}

export default AllVideosList