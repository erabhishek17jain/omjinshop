import React, { useState } from 'react';
import { useSnackbar } from 'notistack';
import Searchbar from './Searchbar';
import logo1 from '../../../assets/images/logo/logo.png';
import { signOutUser } from '../../../middleware/actions/userAction';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import MegaMenu from './MegaMenu';
import HeaderCart from '../../Cart/HeaderCart/HeaderCart';
import { setPath } from '../../../middleware/actions/pathAction';

const Header = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const { isAuthenticated, user } = useSelector((state) => state.user);
    const { pathItems } = useSelector((state) => state.path);
    const { cartItems } = useSelector((state) => state.cart);
    const [openMegaMenu, setOpenMegaMenu] = useState(false);
    const profile = { title: 'Profile', path: '/account/profile', tab: 'profile' };
    const signIn = { title: 'SignIn', path: '/signIn/', tab: 'signIn' };
    const signUp = { title: 'Sign Up', path: '/signUp/', tab: 'signUp' };

    const handleSignout = () => {
        dispatch(signOutUser());
        navigate('/signIn');
        enqueueSnackbar('Signout Successfully', { variant: 'success' });
    };

    const redirectTo = (e, path, i) => {
        e.preventDefault();
        let newPath = pathItems;
        if (newPath.length === i) {
            newPath[newPath.length - 1] = path;
        } else if (newPath.length < i) {
            newPath.push(path);
        } else if (newPath.length > i) {
            newPath.splice(i, newPath.length - 1);
            newPath[newPath.length - 1] = path;
        }
        dispatch(setPath(newPath)).then(() => {
            navigate(path.path);
        });
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
                                                            <a href="#" onClick={(e) => redirectTo(e, profile, profile.path.split('/').length - 1)}>
                                                                <i className="fas fa-user-circle u-s-m-r-6"></i>
                                                                <span>{user.name && user.name.split(' ', 1)}</span>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#" onClick={handleSignout}>
                                                                <i className="fas fa-lock-open u-s-m-r-6"></i>
                                                                <span>Signout</span>
                                                            </a>
                                                        </li>
                                                    </>
                                                ) : (
                                                    <>
                                                        <li>
                                                            <a href="#" onClick={(e) => redirectTo(e, signIn, signIn.path.split('/').length - 1)}>
                                                                <i className="fas fa-lock u-s-m-r-6"></i>
                                                                <span>Signin</span>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#" onClick={(e) => redirectTo(e, signUp, signUp.path.split('/').length - 1)}>
                                                                <i className="fas fa-user-plus u-s-m-r-6"></i>
                                                                <span>Signup</span>
                                                            </a>
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
                                                <i className="fa fa-whatsapp"></i>
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
                {/* {location.pathname.indexOf('admin') === -1 && ( */}
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
                                            <Link to="/signIn?redirect=account/wishlist">
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
                {/* )} */}
            </header>
        </>
    );
};

export default Header;
