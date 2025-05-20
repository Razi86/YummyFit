import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

function YummySlider({foodList}) {
  // Slider settings
    var settings = {
        dots: true,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
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

    return (
      <div className="slider-container w-full mx-auto px-0">
        <Slider {...settings}>
          {foodList?.map((food, index) => {
            const title = food.title; 
  
            return (
              <Link
                key={index}
                to={`/foodType/${title}`}
                className="slider-card mb-[10px] border-1 border-[#7fcfb054] shadow-[-1px_0px_5px_rgba(183,211,198,0.8)] rounded-lg overflow-hidden hover:shadow-md transition"
              >
                {food.image && (
                  <img
                    src={food.image}
                    alt={title}
                    className="slider-image w-full h-[150px] object-cover"
                  />
                )}
                <div className="slider-content flex items-center justify-center p-2 bg-white">
                  <h3 className="slider-title text-center text-sm font-medium">
                    {title}
                  </h3>
                </div>
              </Link>
            );
          })}
        </Slider>
      </div>
    );
  }

export default YummySlider