import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Banner.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import gadgetSale from '../../../assets/images/banners/gadget-sale.jpg';
import kitchenSale from '../../../assets/images/banners/kitchen-sale.jpg';
import poco from '../../../assets/images/banners/poco-m4-pro.webp';
import realme from '../../../assets/images/banners/realme-9-pro.webp';
import fashionSale from '../../../assets/images/banners/fashionsale.jpg';
import oppo from '../../../assets/images/banners/oppo-reno7.webp';
import React from 'react';

export const PreviousBtn = ({ className, onClick }) => {
  return (
    <div className={className} onClick={onClick}>
      <ArrowBackIosIcon />
    </div>
  );
};

export const NextBtn = ({ className, onClick }) => {
  return (
    <div className={className} onClick={onClick}>
      <ArrowForwardIosIcon />
    </div>
  );
};

const Banner = () => {
  const settings = {
    autoplay: true,
    autoplaySpeed: 2000,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PreviousBtn />,
    nextArrow: <NextBtn />,
  };

  const banners = [gadgetSale, kitchenSale, poco, fashionSale, realme, oppo];

  return (
    <>
      <div className="s-skeleton s-skeleton--h-600 s-skeleton--bg-grey">
        <div className="owl-carousel primary-style-1" id="hero-slider">
          <div className="hero-slide hero-slide--1">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="slider-content slider-content--animation">
                    <span className="content-span-1 u-c-secondary">Latest Update Stock</span>
                    <span className="content-span-2 u-c-secondary">30% Off On Electronics</span>
                    <span className="content-span-3 u-c-secondary">
                      Find electronics on best prices, Also Discover most selling products of electronics
                    </span>
                    <span className="content-span-4 u-c-secondary">
                      Starting At
                      <span className="u-c-brand">$1050.00</span>
                    </span>
                    <a className="shop-now-link btn--e-brand" href="#">
                      SHOP NOW
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="hero-slide hero-slide--2">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="slider-content slider-content--animation">
                    <span className="content-span-1 u-c-white">Find Top Brands</span>
                    <span className="content-span-2 u-c-white">10% Off On Electronics</span>
                    <span className="content-span-3 u-c-white">
                      Find electronics on best prices, Also Discover most selling products of electronics
                    </span>
                    <span className="content-span-4 u-c-white">
                      Starting At
                      <span className="u-c-brand">$380.00</span>
                    </span>
                    <a className="shop-now-link btn--e-brand" href="#">
                      SHOP NOW
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="hero-slide hero-slide--3">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="slider-content slider-content--animation">
                    <span className="content-span-1 u-c-secondary">Find Top Brands</span>
                    <span className="content-span-2 u-c-secondary">10% Off On Electronics</span>
                    <span className="content-span-3 u-c-secondary">
                      Find electronics on best prices, Also Discover most selling products of electronics
                    </span>
                    <span className="content-span-4 u-c-secondary">
                      Starting At
                      <span className="u-c-brand">$550.00</span>
                    </span>
                    <a className="shop-now-link btn--e-brand" href="#">
                      SHOP NOW
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <section className="h-44 sm:h-72 w-full rounded-sm shadow relative overflow-hidden">
        <Slider {...settings}>
          {banners.map((el, i) => (
            <img draggable="false" className="h-44 sm:h-72 w-full object-cover" src={el} alt="banner" key={i} />
          ))}
        </Slider>
      </section> */}
    </>
  );
};

export default Banner;
