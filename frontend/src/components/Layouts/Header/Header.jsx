import React, { useState } from 'react';
import { useSnackbar } from 'notistack';
import Searchbar from './Searchbar';
import logo1 from '../../../assets/images/logo/logo.png';
import { logoutUser } from '../../../middleware/actions/userAction';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import MegaMenu from './MegaMenu';
import HeaderCart from '../../Cart/HeaderCart/HeaderCart';

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const { isAuthenticated, user } = useSelector((state) => state.user);
    const { cartItems } = useSelector((state) => state.cart);
    const [togglePrimaryDropDown, setTogglePrimaryDropDown] = useState(false);
    const [toggleSecondaryDropDown, setToggleSecondaryDropDown] = useState(false);
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
                                <button className="btn btn--icon toggle-button toggle-button--secondary fas fa-cogs" type="button"></button>
                                <div className="ah-lg-mode">
                                    <span className="ah-close">✕ Close</span>
                                    <ul className="ah-list ah-list--design1 ah-list--link-color-secondary">
                                        <li className="has-dropdown" data-tooltip="tooltip" data-placement="left" title="Account">
                                            <a>
                                                <i className="far fa-user-circle"></i>
                                            </a>
                                            <span className="js-menu-toggle"></span>
                                            <ul style={{ width: 120 }}>
                                                {isAuthenticated ? (
                                                    <>
                                                        <li>
                                                            <Link to="/account">
                                                                <i className="fas fa-user-circle u-s-m-r-6"></i>
                                                                <span>{user.name && user.name.split(' ', 1)}</span>
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
                                                            <Link to="/login">
                                                                <i className="fas fa-lock u-s-m-r-6"></i>
                                                                <span>Signin</span>
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link to="/register">
                                                                <i className="fas fa-user-plus u-s-m-r-6"></i>
                                                                <span>Signup</span>
                                                            </Link>
                                                        </li>
                                                    </>
                                                )}
                                            </ul>
                                        </li>
                                        <li data-tooltip="tooltip" data-placement="left" title="Contact">
                                            <a href="tel:+918305053048">
                                                <i className="fas fa-phone-volume"></i>
                                            </a>
                                        </li>
                                        <li data-tooltip="tooltip" data-placement="left" title="Whatsapp">
                                            <a href="https://api.whatsapp.com/send?phone=918305053048&forceIntent=true">
                                                <i className="fas fa-map-marker-alt"></i>
                                            </a>
                                        </li>
                                        <li data-tooltip="tooltip" data-placement="left" title="Mail">
                                            <a href="mailto:contact@domain.com">
                                                <i className="far fa-envelope"></i>
                                            </a>
                                        </li>
                                        <li className="has-dropdown" data-tooltip="tooltip" data-placement="left" title="Settings">
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
                                                    </ul>
                                                </li>
                                            </ul>
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
                                <button className="btn btn--icon toggle-mega-text toggle-button" type="button">
                                    M
                                </button>
                                <div className="ah-lg-mode">
                                    <span className="ah-close">✕ Close</span>
                                    <ul className="ah-list">
                                        <li className="has-dropdown">
                                            <span
                                                className={openMegaMenu ? 'mega-text js-open' : 'mega-text'}
                                                onClick={() => setOpenMegaMenu(!openMegaMenu)}
                                            >
                                                M
                                            </span>
                                            <MegaMenu />
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="menu-init" id="navigation2">
                                <button className="btn btn--icon toggle-button toggle-button--secondary fas fa-cog" type="button"></button>
                                <div className="ah-lg-mode">
                                    <span className="ah-close">✕ Close</span>
                                    <ul className="ah-list ah-list--design2 ah-list--link-color-secondary">
                                        <li>
                                            <Link to="/products">NEW ARRIVALS</Link>
                                        </li>
                                        <li>
                                            <Link to="/todaysOffers">VALUE OF THE DAY</Link>
                                        </li>
                                        <li>
                                            <Link to="/topOffers">TOP OFFER</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="menu-init" id="navigation3">
                                <button
                                    type="button"
                                    className="btn btn--icon toggle-button toggle-button--secondary fas fa-shopping-bag toggle-button-shop"
                                ></button>
                                <span className="total-item-round">2</span>
                                <div className="ah-lg-mode">
                                    <span className="ah-close">✕ Close</span>
                                    <ul className="ah-list ah-list--design1 ah-list--link-color-secondary">
                                        <li>
                                            <Link to="/">
                                                <i className="fas fa-home u-c-brand"></i>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/account/wishlist">
                                                <i className="far fa-heart"></i>
                                            </Link>
                                        </li>
                                        <li className="has-dropdown">
                                            <a className="mini-cart-shop-link">
                                                <i className="fas fa-shopping-bag"></i>
                                                <span className="total-item-round">{cartItems.length}</span>
                                            </a>
                                            <HeaderCart />
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
