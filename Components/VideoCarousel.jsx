"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const videos = [
  "https://firebasestorage.googleapis.com/v0/b/firstproject-dbb92.appspot.com/o/madras1.mp4?alt=media&token=3392f600-0a5d-4d19-b7e5-5ff065f45e2e",
  "https://firebasestorage.googleapis.com/v0/b/firstproject-dbb92.appspot.com/o/madras2.mp4?alt=media&token=75c0f11e-32bb-431e-a925-a64321420d57",
  "https://firebasestorage.googleapis.com/v0/b/firstproject-dbb92.appspot.com/o/directors.mp4?alt=media&token=e4cd90e3-c681-4d85-9945-0c9b9df37cd4",
  "https://firebasestorage.googleapis.com/v0/b/firstproject-dbb92.appspot.com/o/directors.mp4?alt=media&token=e4cd90e3-c681-4d85-9945-0c9b9df37cd4",

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
              src={video}
              className="rounded-lg shadow-lg w-full"
              loop
              autoPlay
              muted
              controls
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
