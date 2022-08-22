import React, { useEffect, useState } from 'react';
import WorkIcon from '@mui/icons-material/Work';
import StarsIcon from '@mui/icons-material/Stars';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import HelpIcon from '@mui/icons-material/Help';
import paymentMethods from '../../../assets/images/payment-methods.svg';
import { Link, useLocation } from 'react-router-dom';

const Footer = () => {
    const location = useLocation();
    const [adminRoute, setAdminRoute] = useState(false);

    useEffect(() => {
        setAdminRoute(location.pathname.split('/', 2).includes('admin'));
    }, [location]);

    return (
        !adminRoute && (
            <footer>
                <div className='outer-footer'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-lg-4 col-md-6'>
                                <div className='outer-footer__content u-s-m-b-40'>
                                    <span className='outer-footer__content-title'>Contact Us</span>
                                    <div className='outer-footer__text-wrap'>
                                        <i className='fas fa-home'></i>
                                        <span>301, Parasnath Apartment Samarth city Nainod Road Near Gomatgiri Indore (M.P.)</span>
                                    </div>
                                    <div className='outer-footer__text-wrap'>
                                        <i className='fas fa-phone-volume'></i>
                                        <span>(+91) - 8305053048</span>
                                    </div>
                                    <div className='outer-footer__text-wrap'>
                                        <i className='far fa-envelope'></i>
                                        <span>contact@omjinshop.com</span>
                                    </div>
                                    <div className='outer-footer__social'>
                                        <ul>
                                            <li>
                                                <a className='s-fb--color-hover' href='#'>
                                                    <i className='fab fa-facebook-f'></i>
                                                </a>
                                            </li>
                                            <li>
                                                <a className='s-tw--color-hover' href='#'>
                                                    <i className='fab fa-twitter'></i>
                                                </a>
                                            </li>
                                            <li>
                                                <a className='s-youtube--color-hover' href='#'>
                                                    <i className='fab fa-youtube'></i>
                                                </a>
                                            </li>
                                            <li>
                                                <a className='s-insta--color-hover' href='#'>
                                                    <i className='fab fa-instagram'></i>
                                                </a>
                                            </li>
                                            <li>
                                                <a className='s-gplus--color-hover' href='#'>
                                                    <i className='fab fa-google-plus-g'></i>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-4 col-md-6'>
                                <div className='row'>
                                    <div className='col-lg-6 col-md-6'>
                                        <div className='outer-footer__content u-s-m-b-40'>
                                            <span className='outer-footer__content-title'>Information</span>
                                            <div className='outer-footer__list-wrap'>
                                                <ul>
                                                    <li>
                                                        <Link to='/cart'>Cart</Link>
                                                    </li>
                                                    <li>
                                                        <Link to='/account'>Account</Link>
                                                    </li>
                                                    <li>
                                                        <Link to='/'>Manufacturer</Link>
                                                    </li>
                                                    <li>
                                                        <Link to='/'>Finance</Link>
                                                    </li>
                                                    <li>
                                                        <Link to='/'>Shop</Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-lg-6 col-md-6'>
                                        <div className='outer-footer__content u-s-m-b-40'>
                                            <div className='outer-footer__list-wrap'>
                                                <span className='outer-footer__content-title'>Our Company</span>
                                                <ul>
                                                    <li>
                                                        <Link to='/about'>About us</Link>
                                                    </li>
                                                    <li>
                                                        <Link to='/contact'>Contact Us</Link>
                                                    </li>
                                                    <li>
                                                        <Link to='/faqs'>FAQs</Link>
                                                    </li>
                                                    <li>
                                                        <Link to='/'>Delivery</Link>
                                                    </li>
                                                    <li>
                                                        <Link to='/'>Store</Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-4 col-md-12'>
                                <div className='outer-footer__content'>
                                    <span className='outer-footer__content-title'>Join our Newsletter</span>
                                    <form className='newsletter'>
                                        <div className='u-s-m-b-15'>
                                            <div className='radio-box newsletter__radio'>
                                                <input type='radio' id='male' name='gender' />
                                                <div className='radio-box__state radio-box__state--primary'>
                                                    <label className='radio-box__label' htmlFor='male'>
                                                        Male
                                                    </label>
                                                </div>
                                            </div>
                                            <div className='radio-box newsletter__radio'>
                                                <input type='radio' id='female' name='gender' />
                                                <div className='radio-box__state radio-box__state--primary'>
                                                    <label className='radio-box__label' htmlFor='female'>
                                                        Female
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='newsletter__group'>
                                            <label htmlFor='newsletter'></label>

                                            <input className='input-text input-text--only-white' type='text' id='newsletter' placeholder='Enter your Email' />

                                            <button className='btn btn--e-brand newsletter__btn' type='submit'>
                                                SUBSCRIBE
                                            </button>
                                        </div>

                                        <span className='newsletter__text'>
                                            Subscribe to the mailing list to receive updates on promotions, new arrivals, discount and coupons.
                                        </span>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='lower-footer'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-lg-12 col-md-12 col-sm-12'>
                                <div className='lower-footer__content'>
                                    <div className='lower-footer__copyright'>
                                        <span>Copyright © 2022</span>
                                        <a href='#'>Om Jin Shop</a>
                                        <span>All Right Reserved</span>
                                    </div>
                                    <div className='lower-footer__payment'>
                                        <ul>
                                            <li>
                                                <i className='fab fa-cc-stripe'></i>
                                            </li>
                                            <li>
                                                <i className='fab fa-cc-paypal'></i>
                                            </li>
                                            <li>
                                                <i className='fab fa-cc-mastercard'></i>
                                            </li>
                                            <li>
                                                <i className='fab fa-cc-visa'></i>
                                            </li>
                                            <li>
                                                <i className='fab fa-cc-discover'></i>
                                            </li>
                                            <li>
                                                <i className='fab fa-cc-amex'></i>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        )
    );
};

export default Footer;
