import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Pagination from '@mui/material/Pagination';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Slider from '@mui/material/Slider';
import { useSnackbar } from 'notistack';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  clearErrors,
  getProducts,
} from '../../actions/productAction';
import Loader from '../Layouts/Loader';
import MinCategory from '../Layouts/MinCategory';
import Product from './Product';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import StarIcon from '@mui/icons-material/Star';
import { categories } from '../../utils/constants';
import MetaData from '../Layouts/MetaData';
import { useLocation } from 'react-router-dom';
import product3 from '../../assets/images/product/electronic/product3.jpg';

const Products = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const params = useParams();
  const location = useLocation();

  const [price, setPrice] = useState([0, 200000]);
  const [category, setCategory] = useState(
    location.search ? location.search.split('=')[1] : ''
  );
  const [ratings, setRatings] = useState(0);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);

  // filter toggles
  const [categoryToggle, setCategoryToggle] = useState(true);
  const [ratingsToggle, setRatingsToggle] = useState(true);

  const {
    products,
    loading,
    error,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);
  const keyword = params.keyword;

  const priceHandler = (e, newPrice) => {
    setPrice(newPrice);
  };

  const clearFilters = () => {
    setPrice([0, 200000]);
    setCategory('');
    setRatings(0);
  };

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: 'error' });
      dispatch(clearErrors());
    }
    dispatch(
      getProducts(keyword, category, price, ratings, currentPage)
    );
  }, [
    dispatch,
    keyword,
    category,
    price,
    ratings,
    currentPage,
    error,
    enqueueSnackbar,
  ]);

  return (
    <div className="u-s-p-y-90">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-12">
            <div className="shop-w-master">
              <h1 className="shop-w-master__heading u-s-m-b-30">
                <i className="fas fa-filter u-s-m-r-8"></i>

                <span>FILTERS</span>
              </h1>
              <div className="shop-w-master__sidebar">
                <div className="u-s-m-b-30">
                  <div className="shop-w shop-w--style">
                    <div className="shop-w__intro-wrap">
                      <h1 className="shop-w__h">CATEGORY</h1>

                      <span
                        className="fas fa-minus shop-w__toggle"
                        data-target="#s-category"
                        data-toggle="collapse"
                      ></span>
                    </div>
                    <div
                      className="shop-w__wrap collapse show"
                      id="s-category"
                    >
                      <ul className="shop-w__category-list gl-scroll">
                        <li className="has-list">
                          <a href="#">Electronics</a>

                          <span className="category-list__text u-s-m-l-6">
                            (23)
                          </span>

                          <span className="js-shop-category-span is-expanded fas fa-plus u-s-m-l-6"></span>
                          <ul style={{ display: 'block' }}>
                            <li className="has-list">
                              <a href="#">3D Printer & Supplies</a>

                              <span className="js-shop-category-span fas fa-plus u-s-m-l-6"></span>
                              <ul>
                                <li>
                                  <a href="#">3d Printer</a>
                                </li>
                                <li>
                                  <a href="#">3d Printing Pen</a>
                                </li>
                                <li>
                                  <a href="#">
                                    3d Printing Accessories
                                  </a>
                                </li>
                                <li>
                                  <a href="#">
                                    3d Printer Module Board
                                  </a>
                                </li>
                              </ul>
                            </li>
                            <li className="has-list">
                              <a href="#">Home Audio & Video</a>

                              <span className="js-shop-category-span fas fa-plus u-s-m-l-6"></span>
                              <ul>
                                <li>
                                  <a href="#">TV Boxes</a>
                                </li>
                                <li>
                                  <a href="#">
                                    TV Receiver & Accessories
                                  </a>
                                </li>
                                <li>
                                  <a href="#">
                                    3d Printing Accessories
                                  </a>
                                </li>
                                <li>
                                  <a href="#">
                                    3d Printer Module Board
                                  </a>
                                </li>
                              </ul>
                            </li>
                            <li className="has-list">
                              <a href="#">Media Players</a>

                              <span className="js-shop-category-span fas fa-plus u-s-m-l-6"></span>
                              <ul>
                                <li>
                                  <a href="#">Earphones</a>
                                </li>
                                <li>
                                  <a href="#">Mp3 Players</a>
                                </li>
                                <li>
                                  <a href="#">Speakers & Radios</a>
                                </li>
                                <li>
                                  <a href="#">Microphones</a>
                                </li>
                              </ul>
                            </li>
                            <li className="has-list">
                              <a href="#">Video Game Accessories</a>

                              <span className="js-shop-category-span fas fa-plus u-s-m-l-6"></span>
                              <ul>
                                <li>
                                  <a href="#">
                                    Nintendo Video Games Accessories
                                  </a>
                                </li>
                                <li>
                                  <a href="#">
                                    Sony Video Games Accessories
                                  </a>
                                </li>
                                <li>
                                  <a href="#">
                                    Xbox Video Games Accessories
                                  </a>
                                </li>
                              </ul>
                            </li>
                            <li className="has-list">
                              <a href="#">Security & Protection</a>

                              <span className="js-shop-category-span fas fa-plus u-s-m-l-6"></span>
                              <ul>
                                <li>
                                  <a href="#">Security Cameras</a>
                                </li>
                                <li>
                                  <a href="#">Alarm System</a>
                                </li>
                                <li>
                                  <a href="#">Security Gadgets</a>
                                </li>
                                <li>
                                  <a href="#">
                                    CCTV Security Accessories
                                  </a>
                                </li>
                              </ul>
                            </li>
                            <li className="has-list">
                              <a href="#">Home Audio & Video</a>

                              <span className="js-shop-category-span is-expanded fas fa-plus u-s-m-l-6"></span>
                              <ul style={{ display: 'block' }}>
                                <li>
                                  <a href="#">TV Boxes</a>
                                </li>
                                <li>
                                  <a href="#">
                                    TV Receiver & Accessories
                                  </a>
                                </li>
                                <li>
                                  <a href="#">
                                    3d Printing Accessories
                                  </a>
                                </li>
                                <li>
                                  <a href="#">
                                    3d Printer Module Board
                                  </a>
                                </li>
                              </ul>
                            </li>
                            <li className="has-list">
                              <a href="#">Photography & Camera</a>

                              <span className="js-shop-category-span fas fa-plus u-s-m-l-6"></span>
                              <ul>
                                <li>
                                  <a href="#">Digital Cameras</a>
                                </li>
                                <li>
                                  <a href="#">
                                    Sport Camera & Accessories
                                  </a>
                                </li>
                                <li>
                                  <a href="#">Camera Accessories</a>
                                </li>
                                <li>
                                  <a href="#">Lenses & Accessories</a>
                                </li>
                              </ul>
                            </li>
                            <li className="has-list">
                              <a href="#">Arduino Compatible</a>

                              <span className="js-shop-category-span fas fa-plus u-s-m-l-6"></span>
                              <ul>
                                <li>
                                  <a href="#">
                                    Raspberry Pi & Orange Pi
                                  </a>
                                </li>
                                <li>
                                  <a href="#">Module Board</a>
                                </li>
                                <li>
                                  <a href="#">Smart Robot</a>
                                </li>
                                <li>
                                  <a href="#">Board Kits</a>
                                </li>
                              </ul>
                            </li>
                            <li className="has-list">
                              <a href="#">DSLR Camera</a>

                              <span className="js-shop-category-span fas fa-plus u-s-m-l-6"></span>
                              <ul>
                                <li>
                                  <a href="#">Nikon Camera</a>
                                </li>
                                <li>
                                  <a href="#">Canon Camera</a>
                                </li>
                                <li>
                                  <a href="#">Sony Camera</a>
                                </li>
                                <li>
                                  <a href="#">DSLR Lenses</a>
                                </li>
                              </ul>
                            </li>
                            <li className="has-list">
                              <a href="#">Necessary Accessories</a>

                              <span className="js-shop-category-span fas fa-plus u-s-m-l-6"></span>
                              <ul>
                                <li>
                                  <a href="#">Flash Cards</a>
                                </li>
                                <li>
                                  <a href="#">Memory Cards</a>
                                </li>
                                <li>
                                  <a href="#">Flash Pins</a>
                                </li>
                                <li>
                                  <a href="#">Compact Discs</a>
                                </li>
                              </ul>
                            </li>
                          </ul>
                        </li>
                        <li className="has-list">
                          <a href="#">Women's Clothing</a>

                          <span className="category-list__text u-s-m-l-6">
                            (5)
                          </span>

                          <span className="js-shop-category-span fas fa-plus u-s-m-l-6"></span>
                          <ul>
                            <li className="has-list">
                              <a href="#">Hot Categories</a>

                              <span className="js-shop-category-span fas fa-plus u-s-m-l-6"></span>
                              <ul>
                                <li>
                                  <a href="#">Dresses</a>
                                </li>
                                <li>
                                  <a href="#">Blouses & Shirts</a>
                                </li>
                                <li>
                                  <a href="#">T-shirts</a>
                                </li>
                                <li>
                                  <a href="#">Rompers</a>
                                </li>
                              </ul>
                            </li>
                            <li className="has-list">
                              <a href="#">Intimates</a>

                              <span className="js-shop-category-span fas fa-plus u-s-m-l-6"></span>
                              <ul>
                                <li>
                                  <a href="#">Bras</a>
                                </li>
                                <li>
                                  <a href="#">Brief Sets</a>
                                </li>
                                <li>
                                  <a href="#">Bustiers & Corsets</a>
                                </li>
                                <li>
                                  <a href="#">Panties</a>
                                </li>
                              </ul>
                            </li>
                            <li className="has-list">
                              <a href="#">Wedding & Events</a>

                              <span className="js-shop-category-span fas fa-plus u-s-m-l-6"></span>
                              <ul>
                                <li>
                                  <a href="#">Wedding Dresses</a>
                                </li>
                                <li>
                                  <a href="#">Evening Dresses</a>
                                </li>
                                <li>
                                  <a href="#">Prom Dresses</a>
                                </li>
                                <li>
                                  <a href="#">Flower Dresses</a>
                                </li>
                              </ul>
                            </li>
                            <li className="has-list">
                              <a href="#">Bottoms</a>

                              <span className="js-shop-category-span fas fa-plus u-s-m-l-6"></span>
                              <ul>
                                <li>
                                  <a href="#">Skirts</a>
                                </li>
                                <li>
                                  <a href="#">Shorts</a>
                                </li>
                                <li>
                                  <a href="#">Leggings</a>
                                </li>
                                <li>
                                  <a href="#">Jeans</a>
                                </li>
                              </ul>
                            </li>
                            <li className="has-list">
                              <a href="#">Outwear</a>

                              <span className="js-shop-category-span fas fa-plus u-s-m-l-6"></span>
                              <ul>
                                <li>
                                  <a href="#">Blazers</a>
                                </li>
                                <li>
                                  <a href="#">Basic Jackets</a>
                                </li>
                                <li>
                                  <a href="#">Trench</a>
                                </li>
                                <li>
                                  <a href="#">Leather & Suede</a>
                                </li>
                              </ul>
                            </li>
                            <li className="has-list">
                              <a href="#">Jackets</a>

                              <span className="js-shop-category-span fas fa-plus u-s-m-l-6"></span>
                              <ul>
                                <li>
                                  <a href="#">Denim Jackets</a>
                                </li>
                                <li>
                                  <a href="#">Trucker Jackets</a>
                                </li>
                                <li>
                                  <a href="#">Windbreaker Jackets</a>
                                </li>
                                <li>
                                  <a href="#">Leather Jackets</a>
                                </li>
                              </ul>
                            </li>
                            <li className="has-list">
                              <a href="#">Accessories</a>

                              <span className="js-shop-category-span fas fa-plus u-s-m-l-6"></span>
                              <ul>
                                <li>
                                  <a href="#">Tech Accessories</a>
                                </li>
                                <li>
                                  <a href="#">Headwear</a>
                                </li>
                                <li>
                                  <a href="#">Baseball Caps</a>
                                </li>
                                <li>
                                  <a href="#">Belts</a>
                                </li>
                              </ul>
                            </li>
                            <li className="has-list">
                              <a href="#">Other Accessories</a>

                              <span className="js-shop-category-span fas fa-plus u-s-m-l-6"></span>
                              <ul>
                                <li>
                                  <a href="#">Bags</a>
                                </li>
                                <li>
                                  <a href="#">Wallets</a>
                                </li>
                                <li>
                                  <a href="#">Watches</a>
                                </li>
                                <li>
                                  <a href="#">Sunglasses</a>
                                </li>
                              </ul>
                            </li>
                          </ul>
                        </li>
                        <li className="has-list">
                          <a href="#">Men's Clothing</a>

                          <span className="category-list__text u-s-m-l-6">
                            (5)
                          </span>

                          <span className="js-shop-category-span fas fa-plus u-s-m-l-6"></span>
                          <ul>
                            <li className="has-list">
                              <a href="#">Hot Sale</a>

                              <span className="js-shop-category-span fas fa-plus u-s-m-l-6"></span>
                              <ul>
                                <li>
                                  <a href="#">T-Shirts</a>
                                </li>
                                <li>
                                  <a href="#">Tank Tops</a>
                                </li>
                                <li>
                                  <a href="#">Polo</a>
                                </li>
                                <li>
                                  <a href="#">Shirts</a>
                                </li>
                              </ul>
                            </li>
                            <li className="has-list">
                              <a href="#">Outwear</a>

                              <span className="js-shop-category-span fas fa-plus u-s-m-l-6"></span>
                              <ul>
                                <li>
                                  <a href="#">Hoodies</a>
                                </li>
                                <li>
                                  <a href="#">Trench</a>
                                </li>
                                <li>
                                  <a href="#">Parkas</a>
                                </li>
                                <li>
                                  <a href="#">Sweaters</a>
                                </li>
                              </ul>
                            </li>
                            <li className="has-list">
                              <a href="#">Bottoms</a>

                              <span className="js-shop-category-span fas fa-plus u-s-m-l-6"></span>
                              <ul>
                                <li>
                                  <a href="#">Casual Pants</a>
                                </li>
                                <li>
                                  <a href="#">Cargo Pants</a>
                                </li>
                                <li>
                                  <a href="#">Jeans</a>
                                </li>
                                <li>
                                  <a href="#">Shorts</a>
                                </li>
                              </ul>
                            </li>
                            <li className="has-list">
                              <a href="#">Underwear</a>

                              <span className="js-shop-category-span fas fa-plus u-s-m-l-6"></span>
                              <ul>
                                <li>
                                  <a href="#">Boxers</a>
                                </li>
                                <li>
                                  <a href="#">Briefs</a>
                                </li>
                                <li>
                                  <a href="#">Robes</a>
                                </li>
                                <li>
                                  <a href="#">Socks</a>
                                </li>
                              </ul>
                            </li>
                            <li className="has-list">
                              <a href="#">Jackets</a>

                              <span className="js-shop-category-span fas fa-plus u-s-m-l-6"></span>
                              <ul>
                                <li>
                                  <a href="#">Denim Jackets</a>
                                </li>
                                <li>
                                  <a href="#">Trucker Jackets</a>
                                </li>
                                <li>
                                  <a href="#">Windbreaker Jackets</a>
                                </li>
                                <li>
                                  <a href="#">Leather Jackets</a>
                                </li>
                              </ul>
                            </li>
                            <li className="has-list">
                              <a href="#">Sunglasses</a>

                              <span className="js-shop-category-span fas fa-plus u-s-m-l-6"></span>
                              <ul>
                                <li>
                                  <a href="#">Pilot</a>
                                </li>
                                <li>
                                  <a href="#">Wayfarer</a>
                                </li>
                                <li>
                                  <a href="#">Square</a>
                                </li>
                                <li>
                                  <a href="#">Round</a>
                                </li>
                              </ul>
                            </li>
                            <li className="has-list">
                              <a href="#">Accessories</a>

                              <span className="js-shop-category-span fas fa-plus u-s-m-l-6"></span>
                              <ul>
                                <li>
                                  <a href="#">Eyewear Frames</a>
                                </li>
                                <li>
                                  <a href="#">Scarves</a>
                                </li>
                                <li>
                                  <a href="#">Hats</a>
                                </li>
                                <li>
                                  <a href="#">Belts</a>
                                </li>
                              </ul>
                            </li>
                            <li className="has-list">
                              <a href="#">Other Accessories</a>

                              <span className="js-shop-category-span fas fa-plus u-s-m-l-6"></span>
                              <ul>
                                <li>
                                  <a href="#">Bags</a>
                                </li>
                                <li>
                                  <a href="#">Wallets</a>
                                </li>
                                <li>
                                  <a href="#">Watches</a>
                                </li>
                                <li>
                                  <a href="#">Tech Accessories</a>
                                </li>
                              </ul>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <a href="#">Food & Supplies</a>

                          <span className="category-list__text u-s-m-l-6">
                            (0)
                          </span>
                        </li>
                        <li>
                          <a href="#">Furniture & Decor</a>

                          <span className="category-list__text u-s-m-l-6">
                            (0)
                          </span>
                        </li>
                        <li>
                          <a href="#">Sports & Game</a>

                          <span className="category-list__text u-s-m-l-6">
                            (0)
                          </span>
                        </li>
                        <li>
                          <a href="#">Beauty & Health</a>

                          <span className="category-list__text u-s-m-l-6">
                            (0)
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="u-s-m-b-30">
                  <div className="shop-w shop-w--style">
                    <div className="shop-w__intro-wrap">
                      <h1 className="shop-w__h">RATING</h1>

                      <span
                        className="fas fa-minus shop-w__toggle"
                        data-target="#s-rating"
                        data-toggle="collapse"
                      ></span>
                    </div>
                    <div
                      className="shop-w__wrap collapse show"
                      id="s-rating"
                    >
                      <ul className="shop-w__list gl-scroll">
                        <li>
                          <div className="rating__check">
                            <input type="checkbox" />
                            <div className="rating__check-star-wrap">
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                            </div>
                          </div>

                          <span className="shop-w__total-text">
                            (2)
                          </span>
                        </li>
                        <li>
                          <div className="rating__check">
                            <input type="checkbox" />
                            <div className="rating__check-star-wrap">
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="far fa-star"></i>

                              <span>& Up</span>
                            </div>
                          </div>

                          <span className="shop-w__total-text">
                            (8)
                          </span>
                        </li>
                        <li>
                          <div className="rating__check">
                            <input type="checkbox" />
                            <div className="rating__check-star-wrap">
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="far fa-star"></i>
                              <i className="far fa-star"></i>

                              <span>& Up</span>
                            </div>
                          </div>

                          <span className="shop-w__total-text">
                            (10)
                          </span>
                        </li>
                        <li>
                          <div className="rating__check">
                            <input type="checkbox" />
                            <div className="rating__check-star-wrap">
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="far fa-star"></i>
                              <i className="far fa-star"></i>
                              <i className="far fa-star"></i>

                              <span>& Up</span>
                            </div>
                          </div>

                          <span className="shop-w__total-text">
                            (12)
                          </span>
                        </li>
                        <li>
                          <div className="rating__check">
                            <input type="checkbox" />
                            <div className="rating__check-star-wrap">
                              <i className="fas fa-star"></i>
                              <i className="far fa-star"></i>
                              <i className="far fa-star"></i>
                              <i className="far fa-star"></i>
                              <i className="far fa-star"></i>

                              <span>& Up</span>
                            </div>
                          </div>

                          <span className="shop-w__total-text">
                            (1)
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="u-s-m-b-30">
                  <div className="shop-w shop-w--style">
                    <div className="shop-w__intro-wrap">
                      <h1 className="shop-w__h">SHIPPING</h1>

                      <span
                        className="fas fa-minus shop-w__toggle"
                        data-target="#s-shipping"
                        data-toggle="collapse"
                      ></span>
                    </div>
                    <div
                      className="shop-w__wrap collapse show"
                      id="s-shipping"
                    >
                      <ul className="shop-w__list gl-scroll">
                        <li>
                          {/* Check Box */}
                          <div className="check-box">
                            <input
                              type="checkbox"
                              id="free-shipping"
                            />
                            <div className="check-box__state check-box__state--primary">
                              <label
                                className="check-box__label"
                                htmlFor="free-shipping"
                              >
                                Free Shipping
                              </label>
                            </div>
                          </div>
                          {/* End - Check Box */}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="u-s-m-b-30">
                  <div className="shop-w shop-w--style">
                    <div className="shop-w__intro-wrap">
                      <h1 className="shop-w__h">PRICE</h1>

                      <span
                        className="fas fa-minus shop-w__toggle"
                        data-target="#s-price"
                        data-toggle="collapse"
                      ></span>
                    </div>
                    <div
                      className="shop-w__wrap collapse show"
                      id="s-price"
                    >
                      <form className="shop-w__form-p">
                        <div className="shop-w__form-p-wrap">
                          <div>
                            <label htmlFor="price-min"></label>

                            <input
                              className="input-text input-text--primary-style"
                              type="text"
                              id="price-min"
                              placeholder="Min"
                            />
                          </div>
                          <div>
                            <label htmlFor="price-max"></label>

                            <input
                              className="input-text input-text--primary-style"
                              type="text"
                              id="price-max"
                              placeholder="Max"
                            />
                          </div>
                          <div>
                            <button
                              className="btn btn--icon fas fa-angle-right btn--e-transparent-platinum-b-2"
                              type="submit"
                            ></button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="u-s-m-b-30">
                  <div className="shop-w shop-w--style">
                    <div className="shop-w__intro-wrap">
                      <h1 className="shop-w__h">MANUFACTURER</h1>

                      <span
                        className="fas fa-minus shop-w__toggle"
                        data-target="#s-manufacturer"
                        data-toggle="collapse"
                      ></span>
                    </div>
                    <div
                      className="shop-w__wrap collapse show"
                      id="s-manufacturer"
                    >
                      <ul className="shop-w__list-2">
                        <li>
                          <div className="list__content">
                            <input type="checkbox" checked />

                            <span>Calvin Klein</span>
                          </div>

                          <span className="shop-w__total-text">
                            (23)
                          </span>
                        </li>
                        <li>
                          <div className="list__content">
                            <input type="checkbox" />

                            <span>Diesel</span>
                          </div>

                          <span className="shop-w__total-text">
                            (2)
                          </span>
                        </li>
                        <li>
                          <div className="list__content">
                            <input type="checkbox" />

                            <span>Polo</span>
                          </div>

                          <span className="shop-w__total-text">
                            (2)
                          </span>
                        </li>
                        <li>
                          <div className="list__content">
                            <input type="checkbox" />

                            <span>Tommy Hilfiger</span>
                          </div>

                          <span className="shop-w__total-text">
                            (9)
                          </span>
                        </li>
                        <li>
                          <div className="list__content">
                            <input type="checkbox" />

                            <span>Ndoge</span>
                          </div>

                          <span className="shop-w__total-text">
                            (3)
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="u-s-m-b-30">
                  <div className="shop-w shop-w--style">
                    <div className="shop-w__intro-wrap">
                      <h1 className="shop-w__h">COLOR</h1>

                      <span
                        className="fas fa-minus shop-w__toggle"
                        data-target="#s-color"
                        data-toggle="collapse"
                      ></span>
                    </div>
                    <div
                      className="shop-w__wrap collapse show"
                      id="s-color"
                    >
                      <ul className="shop-w__list gl-scroll">
                        <li>
                          <div className="color__check">
                            <input type="checkbox" id="jet" />

                            <label
                              className="color__check-label"
                              htmlFor="jet"
                              style={{ backgroundColor: '#333333' }}
                            ></label>
                          </div>

                          <span className="shop-w__total-text">
                            (2)
                          </span>
                        </li>
                        <li>
                          <div className="color__check">
                            <input type="checkbox" id="folly" />

                            <label
                              className="color__check-label"
                              htmlFor="folly"
                              style={{ backgroundColor: '#FF0055' }}
                            ></label>
                          </div>

                          <span className="shop-w__total-text">
                            (4)
                          </span>
                        </li>
                        <li>
                          <div className="color__check">
                            <input type="checkbox" id="yellow" />

                            <label
                              className="color__check-label"
                              htmlFor="yellow"
                              style={{ backgroundColor: '#FFFF00' }}
                            ></label>
                          </div>

                          <span className="shop-w__total-text">
                            (6)
                          </span>
                        </li>
                        <li>
                          <div className="color__check">
                            <input
                              type="checkbox"
                              id="granite-gray"
                            />

                            <label
                              className="color__check-label"
                              htmlFor="granite-gray"
                              style={{ backgroundColor: '#605F5E' }}
                            ></label>
                          </div>

                          <span className="shop-w__total-text">
                            (8)
                          </span>
                        </li>
                        <li>
                          <div className="color__check">
                            <input type="checkbox" id="space-cadet" />

                            <label
                              className="color__check-label"
                              htmlFor="space-cadet"
                              style={{
                                backgroundColor:
                                  'background-color: #1D3461',
                              }}
                            ></label>
                          </div>

                          <span className="shop-w__total-text">
                            (10)
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="u-s-m-b-30">
                  <div className="shop-w shop-w--style">
                    <div className="shop-w__intro-wrap">
                      <h1 className="shop-w__h">SIZE</h1>

                      <span
                        className="fas fa-minus collapsed shop-w__toggle"
                        data-target="#s-size"
                        data-toggle="collapse"
                      ></span>
                    </div>
                    <div
                      className="shop-w__wrap collapse"
                      id="s-size"
                    >
                      <ul className="shop-w__list gl-scroll">
                        <li>
                          {/* Check Box */}
                          <div className="check-box">
                            <input type="checkbox" id="xs" />
                            <div className="check-box__state check-box__state--primary">
                              <label
                                className="check-box__label"
                                htmlFor="xs"
                              >
                                XS
                              </label>
                            </div>
                          </div>
                          {/* End - Check Box */}

                          <span className="shop-w__total-text">
                            (2)
                          </span>
                        </li>
                        <li>
                          {/* Check Box */}
                          <div className="check-box">
                            <input type="checkbox" id="small" />
                            <div className="check-box__state check-box__state--primary">
                              <label
                                className="check-box__label"
                                htmlFor="small"
                              >
                                Small
                              </label>
                            </div>
                          </div>
                          {/* End - Check Box */}

                          <span className="shop-w__total-text">
                            (4)
                          </span>
                        </li>
                        <li>
                          {/* Check Box */}
                          <div className="check-box">
                            <input type="checkbox" id="medium" />
                            <div className="check-box__state check-box__state--primary">
                              <label
                                className="check-box__label"
                                htmlFor="medium"
                              >
                                Medium
                              </label>
                            </div>
                          </div>
                          {/* End - Check Box */}

                          <span className="shop-w__total-text">
                            (6)
                          </span>
                        </li>
                        <li>
                          {/* Check Box */}
                          <div className="check-box">
                            <input type="checkbox" id="large" />
                            <div className="check-box__state check-box__state--primary">
                              <label
                                className="check-box__label"
                                htmlFor="large"
                              >
                                Large
                              </label>
                            </div>
                          </div>
                          {/* End - Check Box */}

                          <span className="shop-w__total-text">
                            (8)
                          </span>
                        </li>
                        <li>
                          {/* Check Box */}
                          <div className="check-box">
                            <input type="checkbox" id="xl" />
                            <div className="check-box__state check-box__state--primary">
                              <label
                                className="check-box__label"
                                htmlFor="xl"
                              >
                                XL
                              </label>
                            </div>
                          </div>
                          {/* End - Check Box */}

                          <span className="shop-w__total-text">
                            (10)
                          </span>
                        </li>
                        <li>
                          {/* Check Box */}
                          <div className="check-box">
                            <input type="checkbox" id="xxl" />
                            <div className="check-box__state check-box__state--primary">
                              <label
                                className="check-box__label"
                                htmlFor="xxl"
                              >
                                XXL
                              </label>
                            </div>
                          </div>
                          {/* End - Check Box */}

                          <span className="shop-w__total-text">
                            (12)
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-9 col-md-12">
            <div className="shop-p">
              <div className="shop-p__toolbar u-s-m-b-30">
                <div className="shop-p__meta-wrap u-s-m-b-60">
                  <span className="shop-p__meta-text-1">
                    FOUND 18 RESULTS
                  </span>
                  <div className="shop-p__meta-text-2">
                    <span>Related Searches:</span>

                    <a
                      className="gl-tag btn--e-brand-shadow"
                      href="#"
                    >
                      men's clothing
                    </a>

                    <a
                      className="gl-tag btn--e-brand-shadow"
                      href="#"
                    >
                      mobiles & tablets
                    </a>

                    <a
                      className="gl-tag btn--e-brand-shadow"
                      href="#"
                    >
                      books & audible
                    </a>
                  </div>
                </div>
                <div className="shop-p__tool-style">
                  <div className="tool-style__group u-s-m-b-8">
                    <span className="js-shop-grid-target is-active">
                      Grid
                    </span>

                    <span className="js-shop-list-target">List</span>
                  </div>
                  <form>
                    <div className="tool-style__form-wrap">
                      <div className="u-s-m-b-8">
                        <select className="select-box select-box--transparent-b-2">
                          <option>Show: 8</option>
                          <option selected>Show: 12</option>
                          <option>Show: 16</option>
                          <option>Show: 28</option>
                        </select>
                      </div>
                      <div className="u-s-m-b-8">
                        <select className="select-box select-box--transparent-b-2">
                          <option selected>
                            Sort By: Newest Items
                          </option>
                          <option>Sort By: Latest Items</option>
                          <option>Sort By: Best Selling</option>
                          <option>Sort By: Best Rating</option>
                          <option>Sort By: Lowest Price</option>
                          <option>Sort By: Highest Price</option>
                        </select>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="shop-p__collection">
                <div className="row is-grid-active">
                  <div className="col-lg-4 col-md-6 col-sm-6">
                    <div className="product-m">
                      <div className="product-m__thumb">
                        <a
                          className="aspect aspect--bg-grey aspect--square u-d-block"
                          href="product-detail.html"
                        >
                          <img
                            className="aspect__img"
                            src={product3}
                            alt=""
                          />
                        </a>
                        <div className="product-m__quick-look">
                          <a
                            className="fas fa-search"
                            data-modal="modal"
                            data-modal-id="#quick-look"
                            data-tooltip="tooltip"
                            data-placement="top"
                            title="Quick Look"
                          ></a>
                        </div>
                        <div className="product-m__add-cart">
                          <a
                            className="btn--e-brand"
                            data-modal="modal"
                            data-modal-id="#add-to-cart"
                          >
                            Add to Cart
                          </a>
                        </div>
                      </div>
                      <div className="product-m__content">
                        <div className="product-m__category">
                          <a href="shop-side-version-2.html">
                            Men Clothing
                          </a>
                        </div>
                        <div className="product-m__name">
                          <a href="product-detail.html">
                            New Fashion B Nice Elegant
                          </a>
                        </div>
                        <div className="product-m__rating gl-rating-style">
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star-half-alt"></i>
                          <i className="far fa-star"></i>
                          <i className="far fa-star"></i>

                          <span className="product-m__review">
                            (23)
                          </span>
                        </div>
                        <div className="product-m__price">
                          $125.00
                        </div>
                        <div className="product-m__hover">
                          <div className="product-m__preview-description">
                            <span>
                              Lorem Ipsum is simply dummy text of the
                              printing and typesetting industry. Lorem
                              Ipsum has been the industry's standard
                              dummy text ever since the 1500s, when an
                              unknown printer took a galley of type
                              and scrambled it to make a type specimen
                              book.
                            </span>
                          </div>
                          <div className="product-m__wishlist">
                            <a
                              className="far fa-heart"
                              href="#"
                              data-tooltip="tooltip"
                              data-placement="top"
                              title="Add to Wishlist"
                            ></a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-6">
                    <div className="product-m">
                      <div className="product-m__thumb">
                        <a
                          className="aspect aspect--bg-grey aspect--square u-d-block"
                          href="product-detail.html"
                        >
                          <img
                            className="aspect__img"
                            src={product3}
                            alt=""
                          />
                        </a>
                        <div className="product-m__quick-look">
                          <a
                            className="fas fa-search"
                            data-modal="modal"
                            data-modal-id="#quick-look"
                            data-tooltip="tooltip"
                            data-placement="top"
                            title="Quick Look"
                          ></a>
                        </div>
                        <div className="product-m__add-cart">
                          <a
                            className="btn--e-brand"
                            data-modal="modal"
                            data-modal-id="#add-to-cart"
                          >
                            Add to Cart
                          </a>
                        </div>
                      </div>
                      <div className="product-m__content">
                        <div className="product-m__category">
                          <a href="shop-side-version-2.html">
                            Women Clothing
                          </a>
                        </div>
                        <div className="product-m__name">
                          <a href="product-detail.html">
                            New Dress A Nice Elegant
                          </a>
                        </div>
                        <div className="product-m__rating gl-rating-style">
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star-half-alt"></i>
                          <i className="far fa-star"></i>
                          <i className="far fa-star"></i>

                          <span className="product-m__review">
                            (23)
                          </span>
                        </div>
                        <div className="product-m__price">
                          $125.00
                        </div>
                        <div className="product-m__hover">
                          <div className="product-m__preview-description">
                            <span>
                              Lorem Ipsum is simply dummy text of the
                              printing and typesetting industry. Lorem
                              Ipsum has been the industry's standard
                              dummy text ever since the 1500s, when an
                              unknown printer took a galley of type
                              and scrambled it to make a type specimen
                              book.
                            </span>
                          </div>
                          <div className="product-m__wishlist">
                            <a
                              className="far fa-heart"
                              href="#"
                              data-tooltip="tooltip"
                              data-placement="top"
                              title="Add to Wishlist"
                            ></a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-6">
                    <div className="product-m">
                      <div className="product-m__thumb">
                        <a
                          className="aspect aspect--bg-grey aspect--square u-d-block"
                          href="product-detail.html"
                        >
                          <img
                            className="aspect__img"
                            src={product3}
                            alt=""
                          />
                        </a>
                        <div className="product-m__quick-look">
                          <a
                            className="fas fa-search"
                            data-modal="modal"
                            data-modal-id="#quick-look"
                            data-tooltip="tooltip"
                            data-placement="top"
                            title="Quick Look"
                          ></a>
                        </div>
                        <div className="product-m__add-cart">
                          <a
                            className="btn--e-brand"
                            data-modal="modal"
                            data-modal-id="#add-to-cart"
                          >
                            Add to Cart
                          </a>
                        </div>
                      </div>
                      <div className="product-m__content">
                        <div className="product-m__category">
                          <a href="shop-side-version-2.html">
                            Women Clothing
                          </a>
                        </div>
                        <div className="product-m__name">
                          <a href="product-detail.html">
                            New Dress B Nice Elegant
                          </a>
                        </div>
                        <div className="product-m__rating gl-rating-style">
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star-half-alt"></i>
                          <i className="far fa-star"></i>
                          <i className="far fa-star"></i>

                          <span className="product-m__review">
                            (23)
                          </span>
                        </div>
                        <div className="product-m__price">
                          $125.00
                        </div>
                        <div className="product-m__hover">
                          <div className="product-m__preview-description">
                            <span>
                              Lorem Ipsum is simply dummy text of the
                              printing and typesetting industry. Lorem
                              Ipsum has been the industry's standard
                              dummy text ever since the 1500s, when an
                              unknown printer took a galley of type
                              and scrambled it to make a type specimen
                              book.
                            </span>
                          </div>
                          <div className="product-m__wishlist">
                            <a
                              className="far fa-heart"
                              href="#"
                              data-tooltip="tooltip"
                              data-placement="top"
                              title="Add to Wishlist"
                            ></a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-6">
                    <div className="product-m">
                      <div className="product-m__thumb">
                        <a
                          className="aspect aspect--bg-grey aspect--square u-d-block"
                          href="product-detail.html"
                        >
                          <img
                            className="aspect__img"
                            src={product3}
                            alt=""
                          />
                        </a>
                        <div className="product-m__quick-look">
                          <a
                            className="fas fa-search"
                            data-modal="modal"
                            data-modal-id="#quick-look"
                            data-tooltip="tooltip"
                            data-placement="top"
                            title="Quick Look"
                          ></a>
                        </div>
                        <div className="product-m__add-cart">
                          <a
                            className="btn--e-brand"
                            data-modal="modal"
                            data-modal-id="#add-to-cart"
                          >
                            Add to Cart
                          </a>
                        </div>
                      </div>
                      <div className="product-m__content">
                        <div className="product-m__category">
                          <a href="shop-side-version-2.html">
                            Women Clothing
                          </a>
                        </div>
                        <div className="product-m__name">
                          <a href="product-detail.html">
                            New Dress C Nice Elegant
                          </a>
                        </div>
                        <div className="product-m__rating gl-rating-style">
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star-half-alt"></i>
                          <i className="far fa-star"></i>
                          <i className="far fa-star"></i>

                          <span className="product-m__review">
                            (23)
                          </span>
                        </div>
                        <div className="product-m__price">
                          $125.00
                        </div>
                        <div className="product-m__hover">
                          <div className="product-m__preview-description">
                            <span>
                              Lorem Ipsum is simply dummy text of the
                              printing and typesetting industry. Lorem
                              Ipsum has been the industry's standard
                              dummy text ever since the 1500s, when an
                              unknown printer took a galley of type
                              and scrambled it to make a type specimen
                              book.
                            </span>
                          </div>
                          <div className="product-m__wishlist">
                            <a
                              className="far fa-heart"
                              href="#"
                              data-tooltip="tooltip"
                              data-placement="top"
                              title="Add to Wishlist"
                            ></a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-6">
                    <div className="product-m">
                      <div className="product-m__thumb">
                        <a
                          className="aspect aspect--bg-grey aspect--square u-d-block"
                          href="product-detail.html"
                        >
                          <img
                            className="aspect__img"
                            src={product3}
                            alt=""
                          />
                        </a>
                        <div className="product-m__quick-look">
                          <a
                            className="fas fa-search"
                            data-modal="modal"
                            data-modal-id="#quick-look"
                            data-tooltip="tooltip"
                            data-placement="top"
                            title="Quick Look"
                          ></a>
                        </div>
                        <div className="product-m__add-cart">
                          <a
                            className="btn--e-brand"
                            data-modal="modal"
                            data-modal-id="#add-to-cart"
                          >
                            Add to Cart
                          </a>
                        </div>
                      </div>
                      <div className="product-m__content">
                        <div className="product-m__category">
                          <a href="shop-side-version-2.html">
                            Men Clothing
                          </a>
                        </div>
                        <div className="product-m__name">
                          <a href="product-detail.html">
                            New Fashion E Nice Elegant
                          </a>
                        </div>
                        <div className="product-m__rating gl-rating-style">
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star-half-alt"></i>
                          <i className="far fa-star"></i>
                          <i className="far fa-star"></i>

                          <span className="product-m__review">
                            (23)
                          </span>
                        </div>
                        <div className="product-m__price">
                          $125.00
                        </div>
                        <div className="product-m__hover">
                          <div className="product-m__preview-description">
                            <span>
                              Lorem Ipsum is simply dummy text of the
                              printing and typesetting industry. Lorem
                              Ipsum has been the industry's standard
                              dummy text ever since the 1500s, when an
                              unknown printer took a galley of type
                              and scrambled it to make a type specimen
                              book.
                            </span>
                          </div>
                          <div className="product-m__wishlist">
                            <a
                              className="far fa-heart"
                              href="#"
                              data-tooltip="tooltip"
                              data-placement="top"
                              title="Add to Wishlist"
                            ></a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-6">
                    <div className="product-m">
                      <div className="product-m__thumb">
                        <a
                          className="aspect aspect--bg-grey aspect--square u-d-block"
                          href="product-detail.html"
                        >
                          <img
                            className="aspect__img"
                            src={product3}
                            alt=""
                          />
                        </a>
                        <div className="product-m__quick-look">
                          <a
                            className="fas fa-search"
                            data-modal="modal"
                            data-modal-id="#quick-look"
                            data-tooltip="tooltip"
                            data-placement="top"
                            title="Quick Look"
                          ></a>
                        </div>
                        <div className="product-m__add-cart">
                          <a
                            className="btn--e-brand"
                            data-modal="modal"
                            data-modal-id="#add-to-cart"
                          >
                            Add to Cart
                          </a>
                        </div>
                      </div>
                      <div className="product-m__content">
                        <div className="product-m__category">
                          <a href="shop-side-version-2.html">
                            Men Clothing
                          </a>
                        </div>
                        <div className="product-m__name">
                          <a href="product-detail.html">
                            New Fashion F Nice Elegant
                          </a>
                        </div>
                        <div className="product-m__rating gl-rating-style">
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star-half-alt"></i>
                          <i className="far fa-star"></i>
                          <i className="far fa-star"></i>

                          <span className="product-m__review">
                            (23)
                          </span>
                        </div>
                        <div className="product-m__price">
                          $125.00
                        </div>
                        <div className="product-m__hover">
                          <div className="product-m__preview-description">
                            <span>
                              Lorem Ipsum is simply dummy text of the
                              printing and typesetting industry. Lorem
                              Ipsum has been the industry's standard
                              dummy text ever since the 1500s, when an
                              unknown printer took a galley of type
                              and scrambled it to make a type specimen
                              book.
                            </span>
                          </div>
                          <div className="product-m__wishlist">
                            <a
                              className="far fa-heart"
                              href="#"
                              data-tooltip="tooltip"
                              data-placement="top"
                              title="Add to Wishlist"
                            ></a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-6">
                    <div className="product-m">
                      <div className="product-m__thumb">
                        <a
                          className="aspect aspect--bg-grey aspect--square u-d-block"
                          href="product-detail.html"
                        >
                          <img
                            className="aspect__img"
                            src={product3}
                            alt=""
                          />
                        </a>
                        <div className="product-m__quick-look">
                          <a
                            className="fas fa-search"
                            data-modal="modal"
                            data-modal-id="#quick-look"
                            data-tooltip="tooltip"
                            data-placement="top"
                            title="Quick Look"
                          ></a>
                        </div>
                        <div className="product-m__add-cart">
                          <a
                            className="btn--e-brand"
                            data-modal="modal"
                            data-modal-id="#add-to-cart"
                          >
                            Add to Cart
                          </a>
                        </div>
                      </div>
                      <div className="product-m__content">
                        <div className="product-m__category">
                          <a href="shop-side-version-2.html">
                            Electronics
                          </a>
                        </div>
                        <div className="product-m__name">
                          <a href="product-detail.html">
                            Red Wireless Headphone
                          </a>
                        </div>
                        <div className="product-m__rating gl-rating-style">
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star-half-alt"></i>
                          <i className="far fa-star"></i>
                          <i className="far fa-star"></i>

                          <span className="product-m__review">
                            (23)
                          </span>
                        </div>
                        <div className="product-m__price">
                          $125.00
                        </div>
                        <div className="product-m__hover">
                          <div className="product-m__preview-description">
                            <span>
                              Lorem Ipsum is simply dummy text of the
                              printing and typesetting industry. Lorem
                              Ipsum has been the industry's standard
                              dummy text ever since the 1500s, when an
                              unknown printer took a galley of type
                              and scrambled it to make a type specimen
                              book.
                            </span>
                          </div>
                          <div className="product-m__wishlist">
                            <a
                              className="far fa-heart"
                              href="#"
                              data-tooltip="tooltip"
                              data-placement="top"
                              title="Add to Wishlist"
                            ></a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-6">
                    <div className="product-m">
                      <div className="product-m__thumb">
                        <a
                          className="aspect aspect--bg-grey aspect--square u-d-block"
                          href="product-detail.html"
                        >
                          <img
                            className="aspect__img"
                            src={product3}
                            alt=""
                          />
                        </a>
                        <div className="product-m__quick-look">
                          <a
                            className="fas fa-search"
                            data-modal="modal"
                            data-modal-id="#quick-look"
                            data-tooltip="tooltip"
                            data-placement="top"
                            title="Quick Look"
                          ></a>
                        </div>
                        <div className="product-m__add-cart">
                          <a
                            className="btn--e-brand"
                            data-modal="modal"
                            data-modal-id="#add-to-cart"
                          >
                            Add to Cart
                          </a>
                        </div>
                      </div>
                      <div className="product-m__content">
                        <div className="product-m__category">
                          <a href="shop-side-version-2.html">
                            Electronics
                          </a>
                        </div>
                        <div className="product-m__name">
                          <a href="product-detail.html">
                            Yellow Wireless Headphone
                          </a>
                        </div>
                        <div className="product-m__rating gl-rating-style">
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star-half-alt"></i>
                          <i className="far fa-star"></i>
                          <i className="far fa-star"></i>

                          <span className="product-m__review">
                            (23)
                          </span>
                        </div>
                        <div className="product-m__price">
                          $125.00
                          <span className="product-m__discount">
                            $22.00
                          </span>
                        </div>
                        <div className="product-m__hover">
                          <div className="product-m__preview-description">
                            <span>
                              Lorem Ipsum is simply dummy text of the
                              printing and typesetting industry. Lorem
                              Ipsum has been the industry's standard
                              dummy text ever since the 1500s, when an
                              unknown printer took a galley of type
                              and scrambled it to make a type specimen
                              book.
                            </span>
                          </div>
                          <div className="product-m__wishlist">
                            <a
                              className="far fa-heart"
                              href="#"
                              data-tooltip="tooltip"
                              data-placement="top"
                              title="Add to Wishlist"
                            ></a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-6">
                    <div className="product-m">
                      <div className="product-m__thumb">
                        <a
                          className="aspect aspect--bg-grey aspect--square u-d-block"
                          href="product-detail.html"
                        >
                          <img
                            className="aspect__img"
                            src={product3}
                            alt=""
                          />
                        </a>
                        <div className="product-m__quick-look">
                          <a
                            className="fas fa-search"
                            data-modal="modal"
                            data-modal-id="#quick-look"
                            data-tooltip="tooltip"
                            data-placement="top"
                            title="Quick Look"
                          ></a>
                        </div>
                        <div className="product-m__add-cart">
                          <a
                            className="btn--e-brand"
                            data-modal="modal"
                            data-modal-id="#add-to-cart"
                          >
                            Add to Cart
                          </a>
                        </div>
                      </div>
                      <div className="product-m__content">
                        <div className="product-m__category">
                          <a href="shop-side-version-2.html">
                            Electronics
                          </a>
                        </div>
                        <div className="product-m__name">
                          <a href="product-detail.html">
                            Hover Skateboard Scooter
                          </a>
                        </div>
                        <div className="product-m__rating gl-rating-style">
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star-half-alt"></i>
                          <i className="far fa-star"></i>
                          <i className="far fa-star"></i>

                          <span className="product-m__review">
                            (23)
                          </span>
                        </div>
                        <div className="product-m__price">
                          $125.00
                          <span className="product-m__discount">
                            $22.00
                          </span>
                        </div>
                        <div className="product-m__hover">
                          <div className="product-m__preview-description">
                            <span>
                              Lorem Ipsum is simply dummy text of the
                              printing and typesetting industry. Lorem
                              Ipsum has been the industry's standard
                              dummy text ever since the 1500s, when an
                              unknown printer took a galley of type
                              and scrambled it to make a type specimen
                              book.
                            </span>
                          </div>
                          <div className="product-m__wishlist">
                            <a
                              className="far fa-heart"
                              href="#"
                              data-tooltip="tooltip"
                              data-placement="top"
                              title="Add to Wishlist"
                            ></a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-6">
                    <div className="product-m">
                      <div className="product-m__thumb">
                        <a
                          className="aspect aspect--bg-grey aspect--square u-d-block"
                          href="product-detail.html"
                        >
                          <img
                            className="aspect__img"
                            src={product3}
                            alt=""
                          />
                        </a>
                        <div className="product-m__quick-look">
                          <a
                            className="fas fa-search"
                            data-modal="modal"
                            data-modal-id="#quick-look"
                            data-tooltip="tooltip"
                            data-placement="top"
                            title="Quick Look"
                          ></a>
                        </div>
                        <div className="product-m__add-cart">
                          <a
                            className="btn--e-brand"
                            data-modal="modal"
                            data-modal-id="#add-to-cart"
                          >
                            Add to Cart
                          </a>
                        </div>
                      </div>
                      <div className="product-m__content">
                        <div className="product-m__category">
                          <a href="shop-side-version-2.html">
                            Electronics
                          </a>
                        </div>
                        <div className="product-m__name">
                          <a href="product-detail.html">
                            Hover Red Skateboard Scooter
                          </a>
                        </div>
                        <div className="product-m__rating gl-rating-style">
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star-half-alt"></i>
                          <i className="far fa-star"></i>
                          <i className="far fa-star"></i>

                          <span className="product-m__review">
                            (23)
                          </span>
                        </div>
                        <div className="product-m__price">
                          $125.00
                          <span className="product-m__discount">
                            $22.00
                          </span>
                        </div>
                        <div className="product-m__hover">
                          <div className="product-m__preview-description">
                            <span>
                              Lorem Ipsum is simply dummy text of the
                              printing and typesetting industry. Lorem
                              Ipsum has been the industry's standard
                              dummy text ever since the 1500s, when an
                              unknown printer took a galley of type
                              and scrambled it to make a type specimen
                              book.
                            </span>
                          </div>
                          <div className="product-m__wishlist">
                            <a
                              className="far fa-heart"
                              href="#"
                              data-tooltip="tooltip"
                              data-placement="top"
                              title="Add to Wishlist"
                            ></a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-6">
                    <div className="product-m">
                      <div className="product-m__thumb">
                        <a
                          className="aspect aspect--bg-grey aspect--square u-d-block"
                          href="product-detail.html"
                        >
                          <img
                            className="aspect__img"
                            src={product3}
                            alt=""
                          />
                        </a>
                        <div className="product-m__quick-look">
                          <a
                            className="fas fa-search"
                            data-modal="modal"
                            data-modal-id="#quick-look"
                            data-tooltip="tooltip"
                            data-placement="top"
                            title="Quick Look"
                          ></a>
                        </div>
                        <div className="product-m__add-cart">
                          <a
                            className="btn--e-brand"
                            data-modal="modal"
                            data-modal-id="#add-to-cart"
                          >
                            Add to Cart
                          </a>
                        </div>
                      </div>
                      <div className="product-m__content">
                        <div className="product-m__category">
                          <a href="shop-side-version-2.html">
                            Electronics
                          </a>
                        </div>
                        <div className="product-m__name">
                          <a href="product-detail.html">
                            Canon DSLR Camera 4k
                          </a>
                        </div>
                        <div className="product-m__rating gl-rating-style">
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star-half-alt"></i>
                          <i className="far fa-star"></i>
                          <i className="far fa-star"></i>

                          <span className="product-m__review">
                            (23)
                          </span>
                        </div>
                        <div className="product-m__price">
                          $125.00
                          <span className="product-m__discount">
                            $22.00
                          </span>
                        </div>
                        <div className="product-m__hover">
                          <div className="product-m__preview-description">
                            <span>
                              Lorem Ipsum is simply dummy text of the
                              printing and typesetting industry. Lorem
                              Ipsum has been the industry's standard
                              dummy text ever since the 1500s, when an
                              unknown printer took a galley of type
                              and scrambled it to make a type specimen
                              book.
                            </span>
                          </div>
                          <div className="product-m__wishlist">
                            <a
                              className="far fa-heart"
                              href="#"
                              data-tooltip="tooltip"
                              data-placement="top"
                              title="Add to Wishlist"
                            ></a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-6">
                    <div className="product-m">
                      <div className="product-m__thumb">
                        <a
                          className="aspect aspect--bg-grey aspect--square u-d-block"
                          href="product-detail.html"
                        >
                          <img
                            className="aspect__img"
                            src={product3}
                            alt=""
                          />
                        </a>
                        <div className="product-m__quick-look">
                          <a
                            className="fas fa-search"
                            data-modal="modal"
                            data-modal-id="#quick-look"
                            data-tooltip="tooltip"
                            data-placement="top"
                            title="Quick Look"
                          ></a>
                        </div>
                        <div className="product-m__add-cart">
                          <a
                            className="btn--e-brand"
                            data-modal="modal"
                            data-modal-id="#add-to-cart"
                          >
                            Add to Cart
                          </a>
                        </div>
                      </div>
                      <div className="product-m__content">
                        <div className="product-m__category">
                          <a href="shop-side-version-2.html">
                            Electronics
                          </a>
                        </div>
                        <div className="product-m__name">
                          <a href="product-detail.html">
                            Nikon DSLR Camera 4k
                          </a>
                        </div>
                        <div className="product-m__rating gl-rating-style">
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star-half-alt"></i>
                          <i className="far fa-star"></i>
                          <i className="far fa-star"></i>

                          <span className="product-m__review">
                            (23)
                          </span>
                        </div>
                        <div className="product-m__price">
                          $125.00
                          <span className="product-m__discount">
                            $22.00
                          </span>
                        </div>
                        <div className="product-m__hover">
                          <div className="product-m__preview-description">
                            <span>
                              Lorem Ipsum is simply dummy text of the
                              printing and typesetting industry. Lorem
                              Ipsum has been the industry's standard
                              dummy text ever since the 1500s, when an
                              unknown printer took a galley of type
                              and scrambled it to make a type specimen
                              book.
                            </span>
                          </div>
                          <div className="product-m__wishlist">
                            <a
                              className="far fa-heart"
                              href="#"
                              data-tooltip="tooltip"
                              data-placement="top"
                              title="Add to Wishlist"
                            ></a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="u-s-p-y-60">
                {/* Pagination */}
                <ul className="shop-p__pagination">
                  <li className="is-active">
                    <a href="shop-side-version-2.html">1</a>
                  </li>
                  <li>
                    <a href="shop-side-version-2.html">2</a>
                  </li>
                  <li>
                    <a href="shop-side-version-2.html">3</a>
                  </li>
                  <li>
                    <a href="shop-side-version-2.html">4</a>
                  </li>
                  <li>
                    <a
                      className="fas fa-angle-right"
                      href="shop-side-version-2.html"
                    ></a>
                  </li>
                </ul>
                {/* End - Pagination */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <>
    //   <MetaData title="All Products | Omjinshop" />
    //   <MinCategory />
    //   <main className="w-full mt-14 sm:mt-0">
    //     {/* <!-- row --> */}
    //     <div className="flex gap-3 mt-2 sm:mt-2 sm:mx-3 m-auto mb-7">
    //       {/* <!-- sidebar column  --> */}
    //       <div className="hidden sm:flex flex-col w-1/5 px-1">
    //         {/* <!-- nav tiles --> */}
    //         <div className="flex flex-col bg-white rounded-sm shadow">
    //           {/* <!-- filters header --> */}
    //           <div className="flex items-center justify-between gap-5 px-4 py-2 border-b">
    //             <p className="text-lg font-medium">Filters</p>
    //             <span
    //               className="uppercase text-primary-blue text-xs cursor-pointer font-medium"
    //               onClick={() => clearFilters()}
    //             >
    //               clear all
    //             </span>
    //           </div>

    //           <div className="flex flex-col gap-2 py-3 text-sm overflow-hidden">
    //             {/* price slider filter */}
    //             <div className="flex flex-col gap-2 border-b px-4">
    //               <span className="font-medium text-xs">PRICE</span>

    //               <Slider
    //                 value={price}
    //                 onChange={priceHandler}
    //                 valueLabelDisplay="auto"
    //                 getAriaLabel={() => 'Price range slider'}
    //                 min={0}
    //                 max={200000}
    //               />

    //               <div className="flex gap-3 items-center justify-between mb-2 min-w-full">
    //                 <span className="flex-1 border px-4 py-1 rounded-sm text-gray-800 bg-gray-50">
    //                   ₹{price[0].toLocaleString()}
    //                 </span>
    //                 <span className="font-medium text-gray-400">
    //                   to
    //                 </span>
    //                 <span className="flex-1 border px-4 py-1 rounded-sm text-gray-800 bg-gray-50">
    //                   ₹{price[1].toLocaleString()}
    //                 </span>
    //               </div>
    //             </div>
    //             {/* price slider filter */}

    //             {/* category filter */}
    //             <div className="flex flex-col border-b px-4">
    //               <div
    //                 className="flex justify-between cursor-pointer py-2 pb-4 items-center"
    //                 onClick={() => setCategoryToggle(!categoryToggle)}
    //               >
    //                 <p className="font-medium text-xs uppercase">
    //                   Category
    //                 </p>
    //                 {categoryToggle ? (
    //                   <ExpandLessIcon sx={{ fontSize: '20px' }} />
    //                 ) : (
    //                   <ExpandMoreIcon sx={{ fontSize: '20px' }} />
    //                 )}
    //               </div>

    //               {categoryToggle && (
    //                 <div className="flex flex-col pb-1">
    //                   <FormControl>
    //                     <RadioGroup
    //                       aria-labelledby="category-radio-buttons-group"
    //                       onChange={(e) =>
    //                         setCategory(e.target.value)
    //                       }
    //                       name="category-radio-buttons"
    //                       value={category}
    //                     >
    //                       {categories.map((el, i) => (
    //                         <FormControlLabel
    //                           value={el}
    //                           control={<Radio size="small" />}
    //                           label={
    //                             <span className="text-sm" key={i}>
    //                               {el}
    //                             </span>
    //                           }
    //                         />
    //                       ))}
    //                     </RadioGroup>
    //                   </FormControl>
    //                 </div>
    //               )}
    //             </div>
    //             {/* category filter */}

    //             {/* ratings filter */}
    //             <div className="flex flex-col border-b px-4">
    //               <div
    //                 className="flex justify-between cursor-pointer py-2 pb-4 items-center"
    //                 onClick={() => setRatingsToggle(!ratingsToggle)}
    //               >
    //                 <p className="font-medium text-xs uppercase">
    //                   ratings
    //                 </p>
    //                 {ratingsToggle ? (
    //                   <ExpandLessIcon sx={{ fontSize: '20px' }} />
    //                 ) : (
    //                   <ExpandMoreIcon sx={{ fontSize: '20px' }} />
    //                 )}
    //               </div>

    //               {ratingsToggle && (
    //                 <div className="flex flex-col pb-1">
    //                   <FormControl>
    //                     <RadioGroup
    //                       aria-labelledby="ratings-radio-buttons-group"
    //                       onChange={(e) => setRatings(e.target.value)}
    //                       value={ratings}
    //                       name="ratings-radio-buttons"
    //                     >
    //                       {[4, 3, 2, 1].map((el, i) => (
    //                         <FormControlLabel
    //                           value={el}
    //                           key={i}
    //                           control={<Radio size="small" />}
    //                           label={
    //                             <span className="flex items-center text-sm">
    //                               {el}
    //                               <StarIcon
    //                                 sx={{ fontSize: '12px', mr: 0.5 }}
    //                               />{' '}
    //                               & above
    //                             </span>
    //                           }
    //                         />
    //                       ))}
    //                     </RadioGroup>
    //                   </FormControl>
    //                 </div>
    //               )}
    //             </div>
    //             {/* ratings filter */}
    //           </div>
    //         </div>
    //         {/* <!-- nav tiles --> */}
    //       </div>
    //       {/* <!-- sidebar column  --> */}

    //       {/* <!-- search column --> */}
    //       <div className="flex-1">
    //         {!loading && products?.length === 0 && (
    //           <div className="flex flex-col items-center justify-center gap-3 bg-white shadow-sm rounded-sm p-6 sm:p-16">
    //             <img
    //               draggable="false"
    //               className="w-1/2 h-44 object-contain"
    //               src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/error-no-search-results_2353c5.png"
    //               alt="Search Not Found"
    //             />
    //             <h1 className="text-2xl font-medium text-gray-900">
    //               Sorry, no results found!
    //             </h1>
    //             <p className="text-xl text-center text-primary-grey">
    //               Please check the spelling or try searching for
    //               something else
    //             </p>
    //           </div>
    //         )}

    //         {loading ? (
    //           <Loader />
    //         ) : (
    //           <div className="flex flex-col gap-2 pb-4 justify-center items-center w-full overflow-hidden bg-white">
    //             <div className="grid grid-cols-1 sm:grid-cols-4 w-full place-content-start overflow-hidden pb-4 border-b">
    //               {products?.map((product) => (
    //                 <Product {...product} key={product._id} />
    //               ))}
    //             </div>
    //             {filteredProductsCount > resultPerPage && (
    //               <Pagination
    //                 count={Number(
    //                   (
    //                     (filteredProductsCount + 6) /
    //                     resultPerPage
    //                   ).toFixed()
    //                 )}
    //                 page={currentPage}
    //                 onChange={(e, val) => setCurrentPage(val)}
    //                 color="primary"
    //               />
    //             )}
    //           </div>
    //         )}
    //       </div>
    //       {/* <!-- search column --> */}
    //     </div>
    //     {/* <!-- row --> */}
    //   </main>
    // </>
  );
};

export default Products;
