import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Searchbar from './Searchbar';
import logo from '../../../assets/images/logo.png';
import PrimaryDropDownMenu from './PrimaryDropDownMenu';
import SecondaryDropDownMenu from './SecondaryDropDownMenu';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import logo1 from '../../../assets/images/logo/logo.png';
import bannerMega0 from '../../../assets/images/banners/banner-mega-0.jpg';
import bannerMega1 from '../../../assets/images/banners/banner-mega-1.jpg';
import bannerMega2 from '../../../assets/images/banners/banner-mega-2.jpg';
import bannerMega3 from '../../../assets/images/banners/banner-mega-3.jpg';
import bannerMega4 from '../../../assets/images/banners/banner-mega-4.jpg';
import bannerMega5 from '../../../assets/images/banners/banner-mega-5.jpg';
import bannerMega6 from '../../../assets/images/banners/banner-mega-6.jpg';
import bannerMega7 from '../../../assets/images/banners/banner-mega-7.jpg';
import bannerMega8 from '../../../assets/images/banners/banner-mega-8.jpg';
import bannerMega9 from '../../../assets/images/banners/banner-mega-9.jpg';
import product3 from '../../../assets/images/product/electronic/product3.jpg';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector(
    (state) => state.user
  );
  const { cartItems } = useSelector((state) => state.cart);
  const [togglePrimaryDropDown, setTogglePrimaryDropDown] =
    useState(false);
  const [toggleSecondaryDropDown, setToggleSecondaryDropDown] =
    useState(false);
  const [openMegaMenu, setOpenMegaMenu] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
    enqueueSnackbar('Logout Successfully', { variant: 'success' });
  };

  return (
    <>
      <header className="header--style-1">
        <nav className="primary-nav primary-nav-wrapper--border">
          <div className="container">
            <div className="primary-nav">
              <Link className="main-logo" to="/">
                <img src={logo1} alt="" />
              </Link>
              <Searchbar />
              <div className="menu-init" id="navigation">
                <button
                  className="btn btn--icon toggle-button toggle-button--secondary fas fa-cogs"
                  type="button"
                ></button>
                <div className="ah-lg-mode">
                  <span className="ah-close">✕ Close</span>
                  <ul className="ah-list ah-list--design1 ah-list--link-color-secondary">
                    <li
                      className="has-dropdown"
                      data-tooltip="tooltip"
                      data-placement="left"
                      title="Account"
                    >
                      <a>
                        <i className="far fa-user-circle"></i>
                      </a>
                      <span className="js-menu-toggle"></span>
                      <ul style={{ width: 120 }}>
                        {isAuthenticated ? (
                          <>
                            <li>
                              <Link to="/">
                                <i className="fas fa-user-circle u-s-m-r-6"></i>
                                <span>Account</span>
                              </Link>
                            </li>
                            <li>
                              <a href="#" onClick={handleLogout}>
                                <i className="fas fa-lock-open u-s-m-r-6"></i>
                                <span>Signout</span>
                              </a>
                            </li>
                          </>
                        ) : (
                          <>
                            <li>
                              <Link to="/">
                                <i className="fas fa-user-plus u-s-m-r-6"></i>
                                <span>Signup</span>
                              </Link>
                            </li>
                            <li>
                              <Link to="/">
                                <i className="fas fa-lock u-s-m-r-6"></i>
                                <span>Signin</span>
                              </Link>
                            </li>
                          </>
                        )}
                      </ul>
                    </li>
                    <li
                      className="has-dropdown"
                      data-tooltip="tooltip"
                      data-placement="left"
                      title="Settings"
                    >
                      <a>
                        <i className="fas fa-user-cog"></i>
                      </a>
                      <span className="js-menu-toggle"></span>
                      <ul style={{ width: 120 }}>
                        <li className="has-dropdown has-dropdown--ul-right-100">
                          <a>
                            Language
                            <i className="fas fa-angle-down u-s-m-l-6"></i>
                          </a>
                          <span className="js-menu-toggle"></span>
                          <ul style={{ width: 120 }}>
                            <li>
                              <a className="u-c-brand">ENGLISH</a>
                            </li>
                            <li>
                              <a>ARABIC</a>
                            </li>
                            <li>
                              <a>FRANCAIS</a>
                            </li>
                            <li>
                              <a>ESPANOL</a>
                            </li>
                          </ul>
                        </li>
                        <li className="has-dropdown has-dropdown--ul-right-100">
                          <a>
                            Currency
                            <i className="fas fa-angle-down u-s-m-l-6"></i>
                          </a>
                          <span className="js-menu-toggle"></span>
                          <ul style={{ width: 225 }}>
                            <li>
                              <a className="u-c-brand">
                                $ - US DOLLAR
                              </a>
                            </li>
                            <li>
                              <a>£ - BRITISH POUND STERLING</a>
                            </li>
                            <li>
                              <a>€ - EURO</a>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                    <li
                      data-tooltip="tooltip"
                      data-placement="left"
                      title="Contact"
                    >
                      <a href="tel:+0900901904">
                        <i className="fas fa-phone-volume"></i>
                      </a>
                    </li>
                    <li
                      data-tooltip="tooltip"
                      data-placement="left"
                      title="Mail"
                    >
                      <a href="mailto:contact@domain.com">
                        <i className="far fa-envelope"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <nav className="secondary-nav-wrapper">
          <div className="container">
            <div className="secondary-nav">
              <div className="menu-init" id="navigation1">
                <button
                  class="btn btn--icon toggle-mega-text toggle-button"
                  type="button"
                >
                  M
                </button>
                <div className="ah-lg-mode">
                  <span className="ah-close">✕ Close</span>
                  <ul className="ah-list">
                    <li className="has-dropdown">
                      <span
                        className={
                          openMegaMenu
                            ? 'mega-text js-open'
                            : 'mega-text'
                        }
                        onClick={() => setOpenMegaMenu(!openMegaMenu)}
                      >
                        M
                      </span>
                      <span className="js-menu-toggle"></span>
                      <div className="mega-menu">
                        <div className="mega-menu-wrap">
                          <div className="mega-menu-list">
                            <ul>
                              <li className="js-active">
                                <a href="shop-side-version-2.html">
                                  <i className="fas fa-tv u-s-m-r-6"></i>

                                  <span>Electronics</span>
                                </a>

                                <span className="js-menu-toggle js-toggle-mark"></span>
                              </li>
                              <li>
                                <a href="shop-side-version-2.html">
                                  <i className="fas fa-female u-s-m-r-6"></i>

                                  <span>Women's Clothing</span>
                                </a>

                                <span className="js-menu-toggle"></span>
                              </li>
                              <li>
                                <a href="shop-side-version-2.html">
                                  <i className="fas fa-male u-s-m-r-6"></i>

                                  <span>Men's Clothing</span>
                                </a>

                                <span className="js-menu-toggle"></span>
                              </li>
                              <li>
                                <a href="index.html">
                                  <i className="fas fa-utensils u-s-m-r-6"></i>

                                  <span>Food & Supplies</span>
                                </a>

                                <span className="js-menu-toggle"></span>
                              </li>
                              <li>
                                <a href="index.html">
                                  <i className="fas fa-couch u-s-m-r-6"></i>

                                  <span>Furniture & Decor</span>
                                </a>

                                <span className="js-menu-toggle"></span>
                              </li>
                              <li>
                                <a href="index.html">
                                  <i className="fas fa-football-ball u-s-m-r-6"></i>

                                  <span>Sports & Game</span>
                                </a>

                                <span className="js-menu-toggle"></span>
                              </li>
                              <li>
                                <a href="index.html">
                                  <i className="fas fa-heartbeat u-s-m-r-6"></i>

                                  <span>Beauty & Health</span>
                                </a>

                                <span className="js-menu-toggle"></span>
                              </li>
                            </ul>
                          </div>
                          <div className="mega-menu-content js-active">
                            <div className="row">
                              <div className="col-lg-3">
                                <ul>
                                  <li className="mega-list-title">
                                    <a href="shop-side-version-2.html">
                                      3D PRINTER & SUPPLIES
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      3d Printer
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      3d Printing Pen
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      3d Printing Accessories
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      3d Printer Module Board
                                    </a>
                                  </li>
                                </ul>
                              </div>
                              <div className="col-lg-3">
                                <ul>
                                  <li className="mega-list-title">
                                    <a href="shop-side-version-2.html">
                                      HOME AUDIO & VIDEO
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      TV Boxes
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      TC Receiver & Accessories
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      Display Dongle
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      Home Theater System
                                    </a>
                                  </li>
                                </ul>
                              </div>
                              <div className="col-lg-3">
                                <ul>
                                  <li className="mega-list-title">
                                    <a href="shop-side-version-2.html">
                                      MEDIA PLAYERS
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      Earphones
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      Mp3 Players
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      Speakers & Radios
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      Microphones
                                    </a>
                                  </li>
                                </ul>
                              </div>
                              <div className="col-lg-3">
                                <ul>
                                  <li className="mega-list-title">
                                    <a href="shop-side-version-2.html">
                                      VIDEO GAME ACCESSORIES
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      Nintendo Video Games Accessories
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      Sony Video Games Accessories
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      Xbox Video Games Accessories
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <br />

                            <div className="row">
                              <div className="col-lg-3">
                                <ul>
                                  <li className="mega-list-title">
                                    <a href="shop-side-version-2.html">
                                      SECURITY & PROTECTION
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      Security Cameras
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      Alarm System
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      Security Gadgets
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      CCTV Security & Accessories
                                    </a>
                                  </li>
                                </ul>
                              </div>
                              <div className="col-lg-3">
                                <ul>
                                  <li className="mega-list-title">
                                    <a href="shop-side-version-2.html">
                                      PHOTOGRAPHY & CAMERA
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      Digital Cameras
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      Sport Camera & Accessories
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      Camera Accessories
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      Lenses & Accessories
                                    </a>
                                  </li>
                                </ul>
                              </div>
                              <div className="col-lg-3">
                                <ul>
                                  <li className="mega-list-title">
                                    <a href="shop-side-version-2.html">
                                      ARDUINO COMPATIBLE
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      Raspberry Pi & Orange Pi
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      Module Board
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      Smart Robot
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      Board Kits
                                    </a>
                                  </li>
                                </ul>
                              </div>
                              <div className="col-lg-3">
                                <ul>
                                  <li className="mega-list-title">
                                    <a href="shop-side-version-2.html">
                                      DSLR Camera
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      Nikon Cameras
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      Canon Camera
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      Sony Camera
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      DSLR Lenses
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <br />

                            <div className="row">
                              <div className="col-lg-3">
                                <ul>
                                  <li className="mega-list-title">
                                    <a href="shop-side-version-2.html">
                                      NECESSARY ACCESSORIES
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      Flash Cards
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      Memory Cards
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      Flash Pins
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      Compact Discs
                                    </a>
                                  </li>
                                </ul>
                              </div>
                              <div className="col-lg-9 mega-image">
                                <div className="mega-banner">
                                  <a
                                    className="u-d-block"
                                    href="shop-side-version-2.html"
                                  >
                                    <img
                                      className="u-img-fluid u-d-block"
                                      src={bannerMega0}
                                      alt=""
                                    />
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="mega-menu-content">
                            <div className="row">
                              <div className="col-lg-6 mega-image">
                                <div className="mega-banner">
                                  <a
                                    className="u-d-block"
                                    href="shop-side-version-2.html"
                                  >
                                    <img
                                      className="u-img-fluid u-d-block"
                                      src={bannerMega1}
                                      alt=""
                                    />
                                  </a>
                                </div>
                              </div>
                              <div className="col-lg-6 mega-image">
                                <div className="mega-banner">
                                  <a
                                    className="u-d-block"
                                    href="shop-side-version-2.html"
                                  >
                                    <img
                                      className="u-img-fluid u-d-block"
                                      src={bannerMega2}
                                      alt=""
                                    />
                                  </a>
                                </div>
                              </div>
                            </div>
                            <br />

                            <div className="row">
                              <div className="col-lg-3">
                                <ul>
                                  <li className="mega-list-title">
                                    <a href="shop-side-version-2.html">
                                      HOT CATEGORIES
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      Dresses
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      Blouses & Shirts
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      T-shirts
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      Rompers
                                    </a>
                                  </li>
                                </ul>
                              </div>
                              <div className="col-lg-3">
                                <ul>
                                  <li className="mega-list-title">
                                    <a href="shop-side-version-2.html">
                                      INTIMATES
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      Bras
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      Brief Sets
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      Bustiers & Corsets
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      Panties
                                    </a>
                                  </li>
                                </ul>
                              </div>
                              <div className="col-lg-3">
                                <ul>
                                  <li className="mega-list-title">
                                    <a href="shop-side-version-2.html">
                                      WEDDING & EVENTS
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      Wedding Dresses
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      Evening Dresses
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      Prom Dresses
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      Flower Dresses
                                    </a>
                                  </li>
                                </ul>
                              </div>
                              <div className="col-lg-3">
                                <ul>
                                  <li className="mega-list-title">
                                    <a href="shop-side-version-2.html">
                                      BOTTOMS
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      Skirts
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      Shorts
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      Leggings
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      Jeans
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <br />

                            <div className="row">
                              <div className="col-lg-3">
                                <ul>
                                  <li className="mega-list-title">
                                    <a href="shop-side-version-2.html">
                                      OUTWEAR
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      Blazers
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      Basics Jackets
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      Trench
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      Leather & Suede
                                    </a>
                                  </li>
                                </ul>
                              </div>
                              <div className="col-lg-3">
                                <ul>
                                  <li className="mega-list-title">
                                    <a href="shop-side-version-2.html">
                                      JACKETS
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      Denim Jackets
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      Trucker Jackets
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      Windbreaker Jackets
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      Leather Jackets
                                    </a>
                                  </li>
                                </ul>
                              </div>
                              <div className="col-lg-3">
                                <ul>
                                  <li className="mega-list-title">
                                    <a href="shop-side-version-2.html">
                                      ACCESSORIES
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      Tech Accessories
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      Headwear
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      Baseball Caps
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      Belts
                                    </a>
                                  </li>
                                </ul>
                              </div>
                              <div className="col-lg-3">
                                <ul>
                                  <li className="mega-list-title">
                                    <a href="shop-side-version-2.html">
                                      OTHER ACCESSORIES
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      Bags
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      Wallets
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      Watches
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      Sunglasses
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <br />

                            <div className="row">
                              <div className="col-lg-9 mega-image">
                                <div className="mega-banner">
                                  <a
                                    className="u-d-block"
                                    href="shop-side-version-2.html"
                                  >
                                    <img
                                      className="u-img-fluid u-d-block"
                                      src={bannerMega3}
                                      alt=""
                                    />
                                  </a>
                                </div>
                              </div>
                              <div className="col-lg-3 mega-image">
                                <div className="mega-banner">
                                  <a
                                    className="u-d-block"
                                    href="shop-side-version-2.html"
                                  >
                                    <img
                                      className="u-img-fluid u-d-block"
                                      src={bannerMega4}
                                      alt=""
                                    />
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="mega-menu-content">
                            <div className="row">
                              <div className="col-lg-4 mega-image">
                                <div className="mega-banner">
                                  <a
                                    className="u-d-block"
                                    href="shop-side-version-2.html"
                                  >
                                    <img
                                      className="u-img-fluid u-d-block"
                                      src={bannerMega5}
                                      alt=""
                                    />
                                  </a>
                                </div>
                              </div>
                              <div className="col-lg-4 mega-image">
                                <div className="mega-banner">
                                  <a
                                    className="u-d-block"
                                    href="shop-side-version-2.html"
                                  >
                                    <img
                                      className="u-img-fluid u-d-block"
                                      src={bannerMega6}
                                      alt=""
                                    />
                                  </a>
                                </div>
                              </div>
                              <div className="col-lg-4 mega-image">
                                <div className="mega-banner">
                                  <a
                                    className="u-d-block"
                                    href="shop-side-version-2.html"
                                  >
                                    <img
                                      className="u-img-fluid u-d-block"
                                      src={bannerMega7}
                                      alt=""
                                    />
                                  </a>
                                </div>
                              </div>
                            </div>
                            <br />

                            <div className="row">
                              <div className="col-lg-3">
                                <ul>
                                  <li className="mega-list-title">
                                    <a href="shop-side-version-2.html">
                                      HOT SALE
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      T-Shirts
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      Tank Tops
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      Polo
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      Shirts
                                    </a>
                                  </li>
                                </ul>
                              </div>
                              <div className="col-lg-3">
                                <ul>
                                  <li className="mega-list-title">
                                    <a href="shop-side-version-2.html">
                                      OUTWEAR
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      Hoodies
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      Trench
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      Parkas
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      Sweaters
                                    </a>
                                  </li>
                                </ul>
                              </div>
                              <div className="col-lg-3">
                                <ul>
                                  <li className="mega-list-title">
                                    <a href="shop-side-version-2.html">
                                      BOTTOMS
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      Casual Pants
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      Cargo Pants
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      Jeans
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      Shorts
                                    </a>
                                  </li>
                                </ul>
                              </div>
                              <div className="col-lg-3">
                                <ul>
                                  <li className="mega-list-title">
                                    <a href="shop-side-version-2.html">
                                      UNDERWEAR
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      Boxers
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      Briefs
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      Robes
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      Socks
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <br />

                            <div className="row">
                              <div className="col-lg-3">
                                <ul>
                                  <li className="mega-list-title">
                                    <a href="shop-side-version-2.html">
                                      JACKETS
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      Denim Jackets
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      Trucker Jackets
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      Windbreaker Jackets
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      Leather Jackets
                                    </a>
                                  </li>
                                </ul>
                              </div>
                              <div className="col-lg-3">
                                <ul>
                                  <li className="mega-list-title">
                                    <a href="shop-side-version-2.html">
                                      SUNGLASSES
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      Pilot
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      Wayfarer
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      Square
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      Round
                                    </a>
                                  </li>
                                </ul>
                              </div>
                              <div className="col-lg-3">
                                <ul>
                                  <li className="mega-list-title">
                                    <a href="shop-side-version-2.html">
                                      ACCESSORIES
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      Eyewear Frames
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      Scarves
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      Hats
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      Belts
                                    </a>
                                  </li>
                                </ul>
                              </div>
                              <div className="col-lg-3">
                                <ul>
                                  <li className="mega-list-title">
                                    <a href="shop-side-version-2.html">
                                      OTHER ACCESSORIES
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      Bags
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      Wallets
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      Watches
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop-side-version-2.html">
                                      Tech Accessories
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <br />

                            <div className="row">
                              <div className="col-lg-6 mega-image">
                                <div className="mega-banner">
                                  <a
                                    className="u-d-block"
                                    href="shop-side-version-2.html"
                                  >
                                    <img
                                      className="u-img-fluid u-d-block"
                                      src={bannerMega8}
                                      alt=""
                                    />
                                  </a>
                                </div>
                              </div>
                              <div className="col-lg-6 mega-image">
                                <div className="mega-banner">
                                  <a
                                    className="u-d-block"
                                    href="shop-side-version-2.html"
                                  >
                                    <img
                                      className="u-img-fluid u-d-block"
                                      src={bannerMega9}
                                      alt=""
                                    />
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="mega-menu-content">
                            <h5>No Categories</h5>
                          </div>
                          <div className="mega-menu-content">
                            <h5>No Categories</h5>
                          </div>
                          <div className="mega-menu-content">
                            <h5>No Categories</h5>
                          </div>
                          <div className="mega-menu-content">
                            <h5>No Categories</h5>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="menu-init" id="navigation2">
                <button
                  className="btn btn--icon toggle-button toggle-button--secondary fas fa-cog"
                  type="button"
                ></button>

                <div className="ah-lg-mode">
                  <span className="ah-close">✕ Close</span>
                  <ul className="ah-list ah-list--design2 ah-list--link-color-secondary">
                    <li>
                      <a href="shop-side-version-2.html">
                        NEW ARRIVALS
                      </a>
                    </li>
                    <li className="has-dropdown">
                      <a>
                        PAGES
                        <i className="fas fa-angle-down u-s-m-l-6"></i>
                      </a>
                      <span className="js-menu-toggle"></span>
                      <ul style={{ width: 170 }}>
                        <li className="has-dropdown has-dropdown--ul-left-100">
                          <a>
                            Home
                            <i className="fas fa-angle-down i-state-right u-s-m-l-6"></i>
                          </a>
                          <span className="js-menu-toggle"></span>
                          <ul style={{ width: 118 }}>
                            <li>
                              <a href="index.html">Home 1</a>
                            </li>
                            <li>
                              <a href="index-2.html">Home 2</a>
                            </li>
                            <li>
                              <a href="index-3.html">Home 3</a>
                            </li>
                          </ul>
                        </li>
                        <li className="has-dropdown has-dropdown--ul-left-100">
                          <a>
                            Account
                            <i className="fas fa-angle-down i-state-right u-s-m-l-6"></i>
                          </a>
                          <span className="js-menu-toggle"></span>
                          <ul style={{ width: 200 }}>
                            <li>
                              <a href="signin.html">
                                Signin / Already Registered
                              </a>
                            </li>
                            <li>
                              <a href="signup.html">
                                Signup / Register
                              </a>
                            </li>
                            <li>
                              <a href="lost-password.html">
                                Lost Password
                              </a>
                            </li>
                          </ul>
                        </li>
                        <li className="has-dropdown has-dropdown--ul-left-100">
                          <a href="dashboard.html">
                            Dashboard
                            <i className="fas fa-angle-down i-state-right u-s-m-l-6"></i>
                          </a>
                          <span className="js-menu-toggle"></span>
                          <ul style={{ width: 200 }}>
                            <li className="has-dropdown has-dropdown--ul-left-100">
                              <a href="dashboard.html">
                                Manage My Account
                                <i className="fas fa-angle-down i-state-right u-s-m-l-6"></i>
                              </a>
                              <span className="js-menu-toggle"></span>
                              <ul style={{ width: 180 }}>
                                <li>
                                  <a href="dash-edit-profile.html">
                                    Edit Profile
                                  </a>
                                </li>
                                <li>
                                  <a href="dash-address-book.html">
                                    Edit Address Book
                                  </a>
                                </li>
                                <li>
                                  <a href="dash-manage-order.html">
                                    Manage Order
                                  </a>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <a href="dash-my-profile.html">
                                My Profile
                              </a>
                            </li>
                            <li className="has-dropdown has-dropdown--ul-left-100">
                              <a href="dash-address-book.html">
                                Address Book
                                <i className="fas fa-angle-down i-state-right u-s-m-l-6"></i>
                              </a>
                              <span className="js-menu-toggle"></span>
                              <ul style={{ width: 180 }}>
                                <li>
                                  <a href="dash-address-make-default.html">
                                    Address Make Default
                                  </a>
                                </li>
                                <li>
                                  <a href="dash-address-add.html">
                                    Add New Address
                                  </a>
                                </li>
                                <li>
                                  <a href="dash-address-edit.html">
                                    Edit Address Book
                                  </a>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <a href="dash-track-order.html">
                                Track Order
                              </a>
                            </li>
                            <li>
                              <a href="dash-my-order.html">
                                My Orders
                              </a>
                            </li>
                            <li>
                              <a href="dash-payment-option.html">
                                My Payment Options
                              </a>
                            </li>
                            <li>
                              <a href="dash-cancellation.html">
                                My Returns & Cancellations
                              </a>
                            </li>
                          </ul>
                        </li>
                        <li className="has-dropdown has-dropdown--ul-left-100">
                          <a>
                            Empty
                            <i className="fas fa-angle-down i-state-right u-s-m-l-6"></i>
                          </a>

                          <span className="js-menu-toggle"></span>
                          <ul style={{ width: 200 }}>
                            <li>
                              <a href="empty-search.html">
                                Empty Search
                              </a>
                            </li>
                            <li>
                              <a href="empty-cart.html">Empty Cart</a>
                            </li>
                            <li>
                              <a href="empty-wishlist.html">
                                Empty Wishlist
                              </a>
                            </li>
                          </ul>
                        </li>
                        <li className="has-dropdown has-dropdown--ul-left-100">
                          <a>
                            Product Details
                            <i className="fas fa-angle-down i-state-right u-s-m-l-6"></i>
                          </a>

                          <span className="js-menu-toggle"></span>
                          <ul style={{ width: 200 }}>
                            <li>
                              <a href="product-detail.html">
                                Product Details
                              </a>
                            </li>
                            <li>
                              <a href="product-detail-variable.html">
                                Product Details Variable
                              </a>
                            </li>
                            <li>
                              <a href="product-detail-affiliate.html">
                                Product Details Affiliate
                              </a>
                            </li>
                          </ul>
                        </li>
                        <li className="has-dropdown has-dropdown--ul-left-100">
                          <a>
                            Shop Grid Layout
                            <i className="fas fa-angle-down i-state-right u-s-m-l-6"></i>
                          </a>

                          <span className="js-menu-toggle"></span>
                          <ul style={{ width: 200 }}>
                            <li>
                              <a href="shop-grid-left.html">
                                Shop Grid Left Sidebar
                              </a>
                            </li>
                            <li>
                              <a href="shop-grid-right.html">
                                Shop Grid Right Sidebar
                              </a>
                            </li>
                            <li>
                              <a href="shop-grid-full.html">
                                Shop Grid Full Width
                              </a>
                            </li>
                            <li>
                              <a href="shop-side-version-2.html">
                                Shop Side Version 2
                              </a>
                            </li>
                          </ul>
                        </li>
                        <li className="has-dropdown has-dropdown--ul-left-100">
                          <a>
                            Shop List Layout
                            <i className="fas fa-angle-down i-state-right u-s-m-l-6"></i>
                          </a>

                          <span className="js-menu-toggle"></span>
                          <ul style={{ width: 200 }}>
                            <li>
                              <a href="shop-list-left.html">
                                Shop List Left Sidebar
                              </a>
                            </li>
                            <li>
                              <a href="shop-list-right.html">
                                Shop List Right Sidebar
                              </a>
                            </li>
                            <li>
                              <a href="shop-list-full.html">
                                Shop List Full Width
                              </a>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <a href="cart.html">Cart</a>
                        </li>
                        <li>
                          <a href="wishlist.html">Wishlist</a>
                        </li>
                        <li>
                          <a href="checkout.html">Checkout</a>
                        </li>
                        <li>
                          <a href="faq.html">FAQ</a>
                        </li>
                        <li>
                          <a href="about.html">About us</a>
                        </li>
                        <li>
                          <a href="contact.html">Contact</a>
                        </li>
                        <li>
                          <a href="404.html">404</a>
                        </li>
                      </ul>
                    </li>
                    <li className="has-dropdown">
                      <a>
                        BLOG
                        <i className="fas fa-angle-down u-s-m-l-6"></i>
                      </a>

                      <span className="js-menu-toggle"></span>
                      <ul style={{ width: 200 }}>
                        <li>
                          <a href="blog-left-sidebar.html">
                            Blog Left Sidebar
                          </a>
                        </li>
                        <li>
                          <a href="blog-right-sidebar.html">
                            Blog Right Sidebar
                          </a>
                        </li>
                        <li>
                          <a href="blog-sidebar-none.html">
                            Blog Sidebar None
                          </a>
                        </li>
                        <li>
                          <a href="blog-masonry.html">Blog Masonry</a>
                        </li>
                        <li>
                          <a href="blog-detail.html">Blog Details</a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="shop-side-version-2.html">
                        VALUE OF THE DAY
                      </a>
                    </li>
                    <li>
                      <a href="shop-side-version-2.html">
                        GIFT CARDS
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="menu-init" id="navigation3">
                <button
                  className="btn btn--icon toggle-button toggle-button--secondary fas fa-shopping-bag toggle-button-shop"
                  type="button"
                ></button>

                <span className="total-item-round">2</span>

                <div className="ah-lg-mode">
                  <span className="ah-close">✕ Close</span>

                  <ul className="ah-list ah-list--design1 ah-list--link-color-secondary">
                    <li>
                      <a href="index.html">
                        <i className="fas fa-home u-c-brand"></i>
                      </a>
                    </li>
                    <li>
                      <a href="wishlist.html">
                        <i className="far fa-heart"></i>
                      </a>
                    </li>
                    <li className="has-dropdown">
                      <a className="mini-cart-shop-link">
                        <i className="fas fa-shopping-bag"></i>

                        <span className="total-item-round">2</span>
                      </a>

                      <span className="js-menu-toggle"></span>
                      <div className="mini-cart">
                        <div className="mini-product-container gl-scroll u-s-m-b-15">
                          <div className="card-mini-product">
                            <div className="mini-product">
                              <div className="mini-product__image-wrapper">
                                <a
                                  className="mini-product__link"
                                  href="product-detail.html"
                                >
                                  <img
                                    className="u-img-fluid"
                                    src={product3}
                                    alt=""
                                  />
                                </a>
                              </div>
                              <div className="mini-product__info-wrapper">
                                <span className="mini-product__category">
                                  <a href="shop-side-version-2.html">
                                    Electronics
                                  </a>
                                </span>

                                <span className="mini-product__name">
                                  <a href="product-detail.html">
                                    Yellow Wireless Headphone
                                  </a>
                                </span>

                                <span className="mini-product__quantity">
                                  1 x
                                </span>

                                <span className="mini-product__price">
                                  $8
                                </span>
                              </div>
                            </div>

                            <a className="mini-product__delete-link far fa-trash-alt"></a>
                          </div>
                          <div className="card-mini-product">
                            <div className="mini-product">
                              <div className="mini-product__image-wrapper">
                                <a
                                  className="mini-product__link"
                                  href="product-detail.html"
                                >
                                  <img
                                    className="u-img-fluid"
                                    src={product3}
                                    alt=""
                                  />
                                </a>
                              </div>
                              <div className="mini-product__info-wrapper">
                                <span className="mini-product__category">
                                  <a href="shop-side-version-2.html">
                                    Electronics
                                  </a>
                                </span>

                                <span className="mini-product__name">
                                  <a href="product-detail.html">
                                    Nikon DSLR Camera 4k
                                  </a>
                                </span>

                                <span className="mini-product__quantity">
                                  1 x
                                </span>

                                <span className="mini-product__price">
                                  $8
                                </span>
                              </div>
                            </div>

                            <a className="mini-product__delete-link far fa-trash-alt"></a>
                          </div>
                          <div className="card-mini-product">
                            <div className="mini-product">
                              <div className="mini-product__image-wrapper">
                                <a
                                  className="mini-product__link"
                                  href="product-detail.html"
                                >
                                  <img
                                    className="u-img-fluid"
                                    src={product3}
                                    alt=""
                                  />
                                </a>
                              </div>
                              <div className="mini-product__info-wrapper">
                                <span className="mini-product__category">
                                  <a href="shop-side-version-2.html">
                                    Women Clothing
                                  </a>
                                </span>

                                <span className="mini-product__name">
                                  <a href="product-detail.html">
                                    New Dress D Nice Elegant
                                  </a>
                                </span>

                                <span className="mini-product__quantity">
                                  1 x
                                </span>

                                <span className="mini-product__price">
                                  $8
                                </span>
                              </div>
                            </div>

                            <a className="mini-product__delete-link far fa-trash-alt"></a>
                          </div>
                          <div className="card-mini-product">
                            <div className="mini-product">
                              <div className="mini-product__image-wrapper">
                                <a
                                  className="mini-product__link"
                                  href="product-detail.html"
                                >
                                  <img
                                    className="u-img-fluid"
                                    src={product3}
                                    alt=""
                                  />
                                </a>
                              </div>
                              <div className="mini-product__info-wrapper">
                                <span className="mini-product__category">
                                  <a href="shop-side-version-2.html">
                                    Men Clothing
                                  </a>
                                </span>

                                <span className="mini-product__name">
                                  <a href="product-detail.html">
                                    New Fashion D Nice Elegant
                                  </a>
                                </span>

                                <span className="mini-product__quantity">
                                  1 x
                                </span>

                                <span className="mini-product__price">
                                  $8
                                </span>
                              </div>
                            </div>

                            <a className="mini-product__delete-link far fa-trash-alt"></a>
                          </div>
                        </div>
                        <div className="mini-product-stat">
                          <div className="mini-total">
                            <span className="subtotal-text">
                              SUBTOTAL
                            </span>

                            <span className="subtotal-defaultValue">
                              $16
                            </span>
                          </div>
                          <div className="mini-action">
                            <a
                              className="mini-link btn--e-brand-b-2"
                              href="checkout.html"
                            >
                              PROCEED TO CHECKOUT
                            </a>

                            <a
                              className="mini-link btn--e-transparent-secondary-b-2"
                              href="cart.html"
                            >
                              VIEW CART
                            </a>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* <header className="bg-primary-blue fixed top-0 py-2.5 w-full z-10">
        <div className="w-full sm:w-9/12 px-1 sm:px-4 m-auto flex justify-between items-center relative">
          <div className="flex items-center flex-1">
            <Link className="h-7 mr-1 sm:mr-4" to="/">
              <img
                draggable="false"
                className="h-full w-full object-contain"
                src={logo}
                alt="Omjinshop Logo"
              />
            </Link>

            <Searchbar />
          </div>
          <div className="flex items-center justify-between ml-1 sm:ml-0 gap-0.5 sm:gap-7 relative">
            {isAuthenticated === false ? (
              <Link
                to="/login"
                className="px-3 sm:px-9 py-0.5 text-primary-blue bg-white border font-medium rounded-sm cursor-pointer"
              >
                Login
              </Link>
            ) : (
              <span
                className="userDropDown flex items-center text-white font-medium gap-1 cursor-pointer"
                onClick={() =>
                  setTogglePrimaryDropDown(!togglePrimaryDropDown)
                }
              >
                {user.name && user.name.split(' ', 1)}
                <span>
                  {togglePrimaryDropDown ? (
                    <ExpandLessIcon sx={{ fontSize: '16px' }} />
                  ) : (
                    <ExpandMoreIcon sx={{ fontSize: '16px' }} />
                  )}
                </span>
              </span>
            )}

            {togglePrimaryDropDown && (
              <PrimaryDropDownMenu
                setTogglePrimaryDropDown={setTogglePrimaryDropDown}
                user={user}
              />
            )}

            <span
              className="moreDropDown hidden sm:flex items-center text-white font-medium gap-1 cursor-pointer"
              onClick={() =>
                setToggleSecondaryDropDown(!toggleSecondaryDropDown)
              }
            >
              More
              <span>
                {toggleSecondaryDropDown ? (
                  <ExpandLessIcon sx={{ fontSize: '16px' }} />
                ) : (
                  <ExpandMoreIcon sx={{ fontSize: '16px' }} />
                )}
              </span>
            </span>

            {toggleSecondaryDropDown && <SecondaryDropDownMenu />}

            <Link
              to="/cart"
              className="flex items-center text-white font-medium gap-2 relative"
            >
              <span>
                <ShoppingCartIcon />
              </span>
              {cartItems.length > 0 && (
                <div className="w-5 h-5 p-2 bg-red-500 text-xs rounded-full absolute -top-2 left-3 flex justify-center items-center border">
                  {cartItems.length}
                </div>
              )}
              Cart
            </Link>
          </div>
        </div>
      </header> */}
    </>
  );
};

export default Header;
