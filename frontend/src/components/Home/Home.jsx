import React, { useEffect } from 'react';
import Categories from '../Layouts/Categories';
import Banner from './Banner/Banner';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getSliderProducts } from '../../middleware/actions/productAction';
import { useSnackbar } from 'notistack';
import MetaData from '../Layouts/MetaData';
import '../../assets/css/vendor.css';
import '../../assets/css/utility.css';
import '../../assets/css/app.css';
import newsletter from '../../assets/images/newsletter/newsletter.jpg';
import product3 from '../../assets/images/product/electronic/product3.jpg';
import productd1 from '../../assets/images/product/product-d-1.jpg';
import TopTrending from './TopTrending/TopTrending';
import BestDeals from './BestDeals/BestDeals';
import ShopByDeals from './ShopByDeals/ShopByDeals';
import NewArrival from './NewArrival/NewArrival';
import GlobalOffer from './GlobalOffer/GlobalOffer';
import FeaturedProducts from './FeatureProducts/FeaturedProducts';
import InformationSection from './InformationSection/InformationSection';
import EveryDayProducts from './EveryDayProducts/EveryDayProducts';
import OurProducts from './OurProducts/OurProducts';

const Home = () => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const { error, loading } = useSelector((state) => state.products);

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: 'error' });
            dispatch(clearErrors());
        }
        dispatch(getSliderProducts());
    }, [dispatch, error, enqueueSnackbar]);

    return (
        <>
            <MetaData title="Online Shopping Site for Mobiles, Electronics, Furniture, Grocery, Lifestyle, Books & More. Best Offers!" />
            <div id="app">
                {/* App Content */}
                <Banner />
                <ShopByDeals />
                <TopTrending />
                <BestDeals />
                <NewArrival />
                <GlobalOffer />
                <FeaturedProducts />
                <EveryDayProducts />
                <OurProducts />
                <InformationSection />
                <div className="modal fade" id="quick-look">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content modal--shadow">
                            <button className="btn dismiss-button fas fa-times" type="button" data-dismiss="modal"></button>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-lg-5">
                                        {/* Product Breadcrumb */}
                                        <div className="pd-breadcrumb u-s-m-b-30">
                                            <ul className="pd-breadcrumb__list">
                                                <li className="has-separator">
                                                    <a href="index.hml">Home</a>
                                                </li>
                                                <li className="has-separator">
                                                    <a href="#">Electronics</a>
                                                </li>
                                                <li className="has-separator">
                                                    <a href="#">DSLR Cameras</a>
                                                </li>
                                                <li className="is-marked">
                                                    <a href="#">Nikon Cameras</a>
                                                </li>
                                            </ul>
                                        </div>
                                        {/* End - Product Breadcrumb */}

                                        {/* Product Detail */}
                                        <div className="pd u-s-m-b-30">
                                            <div className="pd-wrap">
                                                <div id="js-product-detail-modal">
                                                    <div>
                                                        <img className="u-img-fluid" src={productd1} alt="" />
                                                    </div>
                                                    <div>
                                                        <img className="u-img-fluid" src={productd1} alt="" />
                                                    </div>
                                                    <div>
                                                        <img className="u-img-fluid" src={productd1} alt="" />
                                                    </div>
                                                    <div>
                                                        <img className="u-img-fluid" src={productd1} alt="" />
                                                    </div>
                                                    <div>
                                                        <img className="u-img-fluid" src={productd1} alt="" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="u-s-m-t-15">
                                                <div id="js-product-detail-modal-thumbnail">
                                                    <div>
                                                        <img className="u-img-fluid" src={productd1} alt="" />
                                                    </div>
                                                    <div>
                                                        <img className="u-img-fluid" src={productd1} alt="" />
                                                    </div>
                                                    <div>
                                                        <img className="u-img-fluid" src={productd1} alt="" />
                                                    </div>
                                                    <div>
                                                        <img className="u-img-fluid" src={productd1} alt="" />
                                                    </div>
                                                    <div>
                                                        <img className="u-img-fluid" src={productd1} alt="" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* End - Product Detail */}
                                    </div>
                                    <div className="col-lg-7">
                                        {/* Product Right Side Details */}
                                        <div className="pd-detail">
                                            <div>
                                                <span className="pd-detail__name">Nikon Camera 4k Lens Zoom Pro</span>
                                            </div>
                                            <div>
                                                <div className="pd-detail__inline">
                                                    <span className="pd-detail__price">$6.99</span>

                                                    <span className="pd-detail__discount">(76% OFF)</span>
                                                    <del className="pd-detail__del">$28.97</del>
                                                </div>
                                            </div>
                                            <div className="u-s-m-b-15">
                                                <div className="pd-detail__rating gl-rating-style">
                                                    <i className="fas fa-star"></i>
                                                    <i className="fas fa-star"></i>
                                                    <i className="fas fa-star"></i>
                                                    <i className="fas fa-star"></i>
                                                    <i className="fas fa-star-half-alt"></i>

                                                    <span className="pd-detail__review u-s-m-l-4">
                                                        <a href="product-#">23 Reviews</a>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="u-s-m-b-15">
                                                <div className="pd-detail__inline">
                                                    <span className="pd-detail__stock">200 in stock</span>

                                                    <span className="pd-detail__left">Only 2 left</span>
                                                </div>
                                            </div>
                                            <div className="u-s-m-b-15">
                                                <span className="pd-detail__preview-desc">
                                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                                                    the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of
                                                    type and scrambled it to make a type specimen book.
                                                </span>
                                            </div>
                                            <div className="u-s-m-b-15">
                                                <div className="pd-detail__inline">
                                                    <span className="pd-detail__click-wrap">
                                                        <i className="far fa-heart u-s-m-r-6"></i>

                                                        <a href="#">Add to Wishlist</a>

                                                        <span className="pd-detail__click-count">(222)</span>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="u-s-m-b-15">
                                                <div className="pd-detail__inline">
                                                    <span className="pd-detail__click-wrap">
                                                        <i className="far fa-envelope u-s-m-r-6"></i>

                                                        <a href="#">Email me When the price drops</a>

                                                        <span className="pd-detail__click-count">(20)</span>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="u-s-m-b-15">
                                                <ul className="pd-social-list">
                                                    <li>
                                                        <a className="s-fb--color-hover" href="#">
                                                            <i className="fab fa-facebook-f"></i>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a className="s-tw--color-hover" href="#">
                                                            <i className="fab fa-twitter"></i>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a className="s-insta--color-hover" href="#">
                                                            <i className="fab fa-instagram"></i>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a className="s-wa--color-hover" href="#">
                                                            <i className="fab fa-whatsapp"></i>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a className="s-gplus--color-hover" href="#">
                                                            <i className="fab fa-google-plus-g"></i>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="u-s-m-b-15">
                                                <form className="pd-detail__form">
                                                    <div className="pd-detail-inline-2">
                                                        <div className="u-s-m-b-15">
                                                            {/* Input Counter */}
                                                            <div className="input-counter">
                                                                <span className="input-counter__minus fas fa-minus"></span>

                                                                <input
                                                                    className="input-counter__text input-counter--text-primary-style"
                                                                    type="text"
                                                                    defaultValue="1"
                                                                    data-min="1"
                                                                    data-max="1000"
                                                                />

                                                                <span className="input-counter__plus fas fa-plus"></span>
                                                            </div>
                                                            {/* End - Input Counter */}
                                                        </div>
                                                        <div className="u-s-m-b-15">
                                                            <button className="btn btn--e-brand-b-2" type="submit">
                                                                Add to Cart
                                                            </button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="u-s-m-b-15">
                                                <span className="pd-detail__label u-s-m-b-8">Product Policy:</span>
                                                <ul className="pd-detail__policy-list">
                                                    <li>
                                                        <i className="fas fa-check-circle u-s-m-r-8"></i>

                                                        <span>Buyer Protection.</span>
                                                    </li>
                                                    <li>
                                                        <i className="fas fa-check-circle u-s-m-r-8"></i>

                                                        <span>Full Refund if you don't receive your order.</span>
                                                    </li>
                                                    <li>
                                                        <i className="fas fa-check-circle u-s-m-r-8"></i>

                                                        <span>Returns accepted if product not as described.</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        {/* End - Product Right Side Details */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="add-to-cart">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content modal-radius modal-shadow">
                            <button className="btn dismiss-button fas fa-times" type="button" data-dismiss="modal"></button>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-lg-6 col-md-12">
                                        <div className="success u-s-m-b-30">
                                            <div className="success__text-wrap">
                                                <i className="fas fa-check"></i>

                                                <span>Item is added successfully!</span>
                                            </div>
                                            <div className="success__img-wrap">
                                                <img className="u-img-fluid" src={product3} alt="" />
                                            </div>
                                            <div className="success__info-wrap">
                                                <span className="success__name">Beats Bomb Wireless Headphone</span>

                                                <span className="success__quantity">Quantity: 1</span>

                                                <span className="success__price">$170.00</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-12">
                                        <div className="s-option">
                                            <span className="s-option__text">1 item (s) in your cart</span>
                                            <div className="s-option__link-box">
                                                <a className="s-option__link btn--e-white-brand-shadow" data-dismiss="modal">
                                                    CONTINUE SHOPPING
                                                </a>

                                                <a className="s-option__link btn--e-white-brand-shadow" href="#">
                                                    VIEW CART
                                                </a>

                                                <a className="s-option__link btn--e-brand-shadow" href="#">
                                                    PROCEED TO CHECKOUT
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade new-l" id="newsletter-modal">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content modal--shadow">
                            <button className="btn new-l__dismiss fas fa-times" type="button" data-dismiss="modal"></button>
                            <div className="modal-body">
                                <div className="row u-s-m-x-0">
                                    <div className="col-lg-6 new-l__col-1 u-s-p-x-0">
                                        <a className="new-l__img-wrap u-d-block" href="#">
                                            <img className="u-img-fluid u-d-block" src={newsletter} alt="" />
                                        </a>
                                    </div>
                                    <div className="col-lg-6 new-l__col-2">
                                        <div className="new-l__section u-s-m-t-30">
                                            <div className="u-s-m-b-8 new-l--center">
                                                <h3 className="new-l__h3">Newsletter</h3>
                                            </div>
                                            <div className="u-s-m-b-30 new-l--center">
                                                <p className="new-l__p1">
                                                    Sign up for emails to get the scoop on new arrivals, special sales and more.
                                                </p>
                                            </div>
                                            <form className="new-l__form">
                                                <div className="u-s-m-b-15">
                                                    <input className="news-l__input" type="text" placeholder="E-mail Address" />
                                                </div>
                                                <div className="u-s-m-b-15">
                                                    <button className="btn btn--e-brand-b-2" type="submit">
                                                        Sign up!
                                                    </button>
                                                </div>
                                            </form>
                                            <div className="u-s-m-b-15 new-l--center">
                                                <p className="new-l__p2">
                                                    By Signing up, you agree to receive Reshop offers,
                                                    <br />
                                                    promotions and other commercial messages. You may unsubscribe at any time.
                                                </p>
                                            </div>
                                            <div className="u-s-m-b-15 new-l--center">
                                                <a className="new-l__link" data-dismiss="modal">
                                                    No Thanks
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <Categories /> */}
            <main></main>
        </>
    );
};

export default Home;
