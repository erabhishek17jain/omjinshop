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

  const banners = [
    gadgetSale,
    kitchenSale,
    poco,
    fashionSale,
    realme,
    oppo,
  ];

  return (
    <>
      <section className="h-44 sm:h-72 w-full rounded-sm shadow relative overflow-hidden">
        <Slider {...settings}>
          {banners.map((el, i) => (
            <img
              draggable="false"
              className="h-44 sm:h-72 w-full object-cover"
              src={el}
              alt="banner"
              key={i}
            />
          ))}
        </Slider>
      </section>
    </>
  );
};

export default Banner;
