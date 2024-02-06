'use client'
import React, { useState } from 'react'
import ChannelCardItem from './_components/ChannelCardItem'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button } from '@/components/ui/button';
import { MdOutlineArrowForwardIos, MdOutlineArrowBackIosNew } from "react-icons/md";
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
    slidesToShow: 3,
    infinite: false,
    slidesToScroll: 3,
    adaptiveHeight:true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
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
const ForYouVideosList = ({ videos }: any) => {

    return (
        <div className='w-full mt-2  '>
            {
                videos.length > 3 ?
                    <Slider
                        {...settings}
                        className="relative"
                    >

                        {
                            videos?.map((item: any) => (
                                <ChannelCardItem item={item} />
                            ))
                        }
                    </Slider>
                    :
                    <div className='flex gap-1'>
                        {
                            videos?.map((item: any) => (
                                <ChannelCardItem item={item} />
                            ))
                        }
                    </div>
            }
        </div>
    )
}
export default ForYouVideosList