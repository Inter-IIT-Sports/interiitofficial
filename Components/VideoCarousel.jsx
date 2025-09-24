"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const videos = [
  "/video/madras1.mp4",
  "/video/madras2.mp4",
  "/video/directors.mp4",
  "/video/directors.mp4",

];

export default function VideoCarousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
    responsive: [
      {
        breakpoint: 1024, // tablets
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640, // mobile
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="cursor-pointer container mx-auto my-10">
      <h3 className="text-center text-2xl font-semibold mb-6">Inter IIT Sports 2025 videos</h3>
      <Slider {...settings}>
        {videos.map((video, index) => (
          <div key={index} className="px-2 w-full">
            <video
              src={index === 0 ? video : undefined}
              data-src={video}
              onMouseEnter={(e) => e.currentTarget.src = e.currentTarget.dataset.src}
              controls
              muted
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
