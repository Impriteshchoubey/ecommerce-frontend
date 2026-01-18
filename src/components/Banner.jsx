import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const data = [
    {
      image: "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0",
      title: "Summer Collection",
      subtitle: "Discover our latest styles",
      cta: "Shop Now",
    },
    {
      image: "https://images.unsplash.com/photo-1521566652839-697aa473761a",
      title: "New Arrivals",
      subtitle: "Fresh looks for the season",
      cta: "Explore",
    },
    {
      image: "https://images.unsplash.com/photo-1481437156560-3205f6a55735",
      title: "Limited Edition",
      subtitle: "Exclusive pieces, limited time",
      cta: "Get It Now",
    },
    {
      image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04",
      title: "Clearance Sale",
      subtitle: "Up to 70% off selected items",
      cta: "Shop Sale",
    },
  ];

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? data.length - 1 : currentSlide - 1);
  };

  const nextSlide = () => {
    setCurrentSlide(currentSlide === data.length - 1 ? 0 : currentSlide + 1);
  };

  return (
    <div className="relative w-full h-162.5 overflow-hidden">
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {data.map((slide, index) => (
          <div key={index} className="w-full h-full shrink-0 relative">
            <img src={slide.image} className="w-full h-full object-cover" />
            <div className="absolute inset-0  bg-opacity-80 flex items-center justify-center">
              <div className="text-center text-white">
                <h2 className="text-4xl font-bold mb-2">{slide.title}</h2>
                <p className="text-xl mb-4">{slide.subtitle}</p>
                <Link to="/#shop" className="bg-white text-black px-6 py-2">
                  {slide.cta}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button onClick={prevSlide} className="absolute top-1/2 left-4">
        <ChevronLeft />
      </button>
      <button onClick={nextSlide} className="absolute top-1/2 right-4">
        <ChevronRight />
      </button>
    </div>
  );
};

export default Banner;
