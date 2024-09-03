import React from "react";
import Banner2 from "../assets/Banner2.jpeg";
import Banner3 from "../assets/Banner3.png";
import Banner4 from "../assets/Banner4.png";
import Banner5 from "../assets/Banner5.jpg";

const Banner = () => {
  const banners = [Banner2, Banner3, Banner4, Banner5];

  return (
    <div
      id="carouselExampleIndicators"
      className="carousel slide mt-4"
      data-bs-ride="carousel"
      data-bs-interval="2000"
    >
      <div className="carousel-indicators">
        {banners.map((_, index) => (
          <button
            key={index}
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to={index}
            className={index === 0 ? "active" : ""}
            aria-current={index === 0 ? "true" : undefined}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>

      <div className="carousel-inner">
        {banners.map((banner, index) => (
          <div
            key={index}
            className={`carousel-item ${index === 0 ? "active" : ""}`}
          >
            <img
              src={banner}
              className="d-block mx-auto h-64 md:h-96 lg:h-[600px] w-[2000px] object-cover"
              style={{ objectFit: "cover", height: "auto" }}
              alt={`Slide ${index + 1}`}
            />
          </div>
        ))}
      </div>

      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>

      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Banner;
