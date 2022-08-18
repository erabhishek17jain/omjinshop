import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Slider from 'react-slick';
import { clearErrors, getProductDetails, getSimilarProducts, newReview } from '../../../middleware/actions/productAction';
import { NextBtn, PreviousBtn } from '../../Home/Banner/Banner';
import Loader from '../../Layouts/Loader';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import StarIcon from '@mui/icons-material/Star';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import CachedIcon from '@mui/icons-material/Cached';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import { NEW_REVIEW_RESET } from '../../../constants/productConstants';
import { addItemsToCart } from '../../../middleware/actions/cartAction';
import { getDeliveryDate, getDiscount } from '../../../utils/services';
import { addToWishlist, removeFromWishlist } from '../../../middleware/actions/wishlistAction';
import MinCategory from '../../Layouts/MinCategory';
import MetaData from '../../Layouts/MetaData';

const ProductDetails = () => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const params = useParams();
    const navigate = useNavigate();

    // reviews toggle
    const [open, setOpen] = useState(false);
    const [viewAll, setViewAll] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const { product, loading, error } = useSelector((state) => state.productDetails);
    const { success, error: reviewError } = useSelector((state) => state.newReview);
    const { cartItems } = useSelector((state) => state.cart);
    const { wishlistItems } = useSelector((state) => state.wishlist);

    const settings = {
        autoplay: true,
        autoplaySpeed: 2000,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: <PreviousBtn />,
        nextArrow: <NextBtn />,
    };

    const productId = params.id;
    const itemInWishlist = wishlistItems.some((i) => i.product === productId);

    const addToWishlistHandler = () => {
        if (itemInWishlist) {
            dispatch(removeFromWishlist(productId));
            enqueueSnackbar('Remove From Wishlist', { variant: 'success' });
        } else {
            dispatch(addToWishlist(productId));
            enqueueSnackbar('Added To Wishlist', { variant: 'success' });
        }
    };

    const reviewSubmitHandler = () => {
        if (rating === 0 || !comment.trim()) {
            enqueueSnackbar('Empty Review', { variant: 'error' });
            return;
        }
        const formData = new FormData();
        formData.set('rating', rating);
        formData.set('comment', comment);
        formData.set('productId', productId);
        dispatch(newReview(formData));
        setOpen(false);
    };

    const addToCartHandler = () => {
        dispatch(addItemsToCart(productId));
        enqueueSnackbar('Product Added To Cart', { variant: 'success' });
    };

    const handleDialogClose = () => {
        setOpen(!open);
    };

    const itemInCart = cartItems.some((i) => i.product === productId);

    const goToCart = () => {
        navigate('/cart');
    };

    const buyNow = () => {
        addToCartHandler();
        navigate('/account/shipping');
    };

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: 'error' });
            dispatch(clearErrors());
        }
        if (reviewError) {
            enqueueSnackbar(reviewError, { variant: 'error' });
            dispatch(clearErrors());
        }
        if (success) {
            enqueueSnackbar('Review Submitted Successfully', { variant: 'success' });
            dispatch({ type: NEW_REVIEW_RESET });
        }
        dispatch(getProductDetails(productId));
        // eslint-disable-next-line
    }, [dispatch, productId, error, reviewError, success, enqueueSnackbar]);

    useEffect(() => {
        dispatch(getSimilarProducts(product?.category));
    }, [dispatch, product, product.category]);

    return (
        <>
            <div className="u-s-p-t-90">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5">
                            <div className="pd-breadcrumb u-s-m-b-30">
                                <ul className="pd-breadcrumb__list">
                                    <li className="has-separator">
                                        <a href="index.hml">Home</a>
                                    </li>
                                    <li className="has-separator">
                                        <a href="shop-side-version-2.html">Electronics</a>
                                    </li>
                                    <li className="has-separator">
                                        <a href="shop-side-version-2.html">DSLR Cameras</a>
                                    </li>
                                    <li className="is-marked">
                                        <a href="shop-side-version-2.html">Nikon Cameras</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="pd u-s-m-b-30">
                                <div className="pd-wrap">
                                    <div id="pd-o-initiate" className="slick-initialized slick-slider">
                                        <div className="slick-list draggable">
                                            <div className="slick-track" style={{ opacity: 1, width: 2225 }}>
                                                <div
                                                    className="slick-slide slick-current slick-active"
                                                    data-slick-index="0"
                                                    aria-hidden="false"
                                                    style={{ width: 445, position: 'relative', left: 0, top: 0, zIndex: 999, opacity: 1 }}
                                                >
                                                    <div>
                                                        <div
                                                            className="pd-o-img-wrap"
                                                            data-src="images/product/product-d-1.1ade8af621f424e959fa483d03d4f322.jpg"
                                                            style={{ width: '100%', display: 'inline-block' }}
                                                        >
                                                            <img
                                                                className="u-img-fluid"
                                                                src="images/product/product-d-1.1ade8af621f424e959fa483d03d4f322.jpg"
                                                                data-zoom-image="images/product/product-d-1.1ade8af621f424e959fa483d03d4f322.jpg"
                                                                alt=""
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div
                                                    className="slick-slide"
                                                    data-slick-index="1"
                                                    aria-hidden="true"
                                                    style={{ width: 445, position: 'relative', left: -445, top: 0, zIndex: 998, opacity: 0 }}
                                                    tabindex="-1"
                                                >
                                                    <div>
                                                        <div
                                                            className="pd-o-img-wrap"
                                                            data-src="images/product/product-d-2.69d0b1076353c1aa6a6f07ba752b762b.jpg"
                                                            style={{ width: '100%', display: 'inline-block' }}
                                                        >
                                                            <img
                                                                className="u-img-fluid"
                                                                src="images/product/product-d-2.69d0b1076353c1aa6a6f07ba752b762b.jpg"
                                                                data-zoom-image="images/product/product-d-2.69d0b1076353c1aa6a6f07ba752b762b.jpg"
                                                                alt=""
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div
                                                    className="slick-slide"
                                                    data-slick-index="2"
                                                    aria-hidden="true"
                                                    style={{ width: 445, position: 'relative', left: -890, top: 0, zIndex: 998, opacity: 0 }}
                                                    tabindex="-1"
                                                >
                                                    <div>
                                                        <div
                                                            className="pd-o-img-wrap"
                                                            data-src="images/product/product-d-3.cbe00bd2f53599119f5ce8620b274c09.jpg"
                                                            style={{ width: '100%', display: 'inline-block' }}
                                                        >
                                                            <img
                                                                className="u-img-fluid"
                                                                src="images/product/product-d-3.cbe00bd2f53599119f5ce8620b274c09.jpg"
                                                                data-zoom-image="images/product/product-d-3.cbe00bd2f53599119f5ce8620b274c09.jpg"
                                                                alt=""
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div
                                                    className="slick-slide"
                                                    data-slick-index="3"
                                                    aria-hidden="true"
                                                    style={{ width: 445, position: 'relative', left: -1335, top: 0, zIndex: 998, opacity: 0 }}
                                                    tabindex="-1"
                                                >
                                                    <div>
                                                        <div
                                                            className="pd-o-img-wrap"
                                                            data-src="images/product/product-d-4.32280333b4f92bdb093fc569c61bb93a.jpg"
                                                            style={{ width: '100%', display: 'inline-block' }}
                                                        >
                                                            <img
                                                                className="u-img-fluid"
                                                                src="images/product/product-d-4.32280333b4f92bdb093fc569c61bb93a.jpg"
                                                                data-zoom-image="images/product/product-d-4.32280333b4f92bdb093fc569c61bb93a.jpg"
                                                                alt=""
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div
                                                    className="slick-slide"
                                                    data-slick-index="4"
                                                    aria-hidden="true"
                                                    style={{ width: 445, position: 'relative', left: -1780, top: 0, zIndex: 998, opacity: 0 }}
                                                    tabindex="-1"
                                                >
                                                    <div>
                                                        <div
                                                            className="pd-o-img-wrap"
                                                            data-src="images/product/product-d-5.09d1c09cfc871f96c471b756a71abab7.jpg"
                                                            style={{ width: '100%', display: 'inline-block' }}
                                                        >
                                                            <img
                                                                className="u-img-fluid"
                                                                src="images/product/product-d-5.09d1c09cfc871f96c471b756a71abab7.jpg"
                                                                data-zoom-image="images/product/product-d-5.09d1c09cfc871f96c471b756a71abab7.jpg"
                                                                alt=""
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <span className="pd-text">Click for larger zoom</span>
                                </div>
                                <div className="u-s-m-t-15">
                                    <div>
                                        <div id="pd-o-thumbnail" className="slick-initialized slick-slider">
                                            <div className="pt-prev slick-arrow slick-disabled" aria-disabled="true">
                                                <i className="fas fa-angle-left"></i>
                                            </div>
                                            <div className="slick-list draggable">
                                                <div
                                                    className="slick-track"
                                                    style={{ opacity: 1, width: 560, transform: 'translate3d(0px, 0px, 0px)' }}
                                                >
                                                    <div
                                                        className="slick-slide slick-current slick-active"
                                                        data-slick-index="0"
                                                        aria-hidden="false"
                                                        style={{ width: 112 }}
                                                    >
                                                        <div>
                                                            <div style={{ width: '100%', display: 'inline-block' }}>
                                                                <img
                                                                    className="u-img-fluid"
                                                                    src="images/product/product-d-1.1ade8af621f424e959fa483d03d4f322.jpg"
                                                                    alt=""
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="slick-slide slick-active"
                                                        data-slick-index="1"
                                                        aria-hidden="false"
                                                        style={{ width: 112 }}
                                                    >
                                                        <div>
                                                            <div style={{ width: '100%', display: 'inline-block' }}>
                                                                <img
                                                                    className="u-img-fluid"
                                                                    src="images/product/product-d-2.69d0b1076353c1aa6a6f07ba752b762b.jpg"
                                                                    alt=""
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="slick-slide slick-active"
                                                        data-slick-index="2"
                                                        aria-hidden="false"
                                                        style={{ width: 112 }}
                                                    >
                                                        <div>
                                                            <div style={{ width: '100%', display: 'inline-block' }}>
                                                                <img
                                                                    className="u-img-fluid"
                                                                    src="images/product/product-d-3.cbe00bd2f53599119f5ce8620b274c09.jpg"
                                                                    alt=""
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="slick-slide slick-active"
                                                        data-slick-index="3"
                                                        aria-hidden="false"
                                                        style={{ width: 112 }}
                                                    >
                                                        <div>
                                                            <div style={{ width: '100%', display: 'inline-block' }}>
                                                                <img
                                                                    className="u-img-fluid"
                                                                    src="images/product/product-d-4.32280333b4f92bdb093fc569c61bb93a.jpg"
                                                                    alt=""
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="slick-slide"
                                                        data-slick-index="4"
                                                        aria-hidden="true"
                                                        style={{ width: 112 }}
                                                        tabindex="-1"
                                                    >
                                                        <div>
                                                            <div style={{ width: '100%', display: 'inline-block' }}>
                                                                <img
                                                                    className="u-img-fluid"
                                                                    src="images/product/product-d-5.09d1c09cfc871f96c471b756a71abab7.jpg"
                                                                    alt=""
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="pt-next slick-arrow" aria-disabled="false">
                                                <i className="fas fa-angle-right"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-7">
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
                                            <a data-click-scroll="#view-review">23 Reviews</a>
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
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
                                        standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
                                        make a type specimen book.
                                    </span>
                                </div>
                                <div className="u-s-m-b-15">
                                    <div className="pd-detail__inline">
                                        <span className="pd-detail__click-wrap">
                                            <i className="far fa-heart u-s-m-r-6"></i>

                                            <a href="signin.html">Add to Wishlist</a>

                                            <span className="pd-detail__click-count">(222)</span>
                                        </span>
                                    </div>
                                </div>
                                <div className="u-s-m-b-15">
                                    <div className="pd-detail__inline">
                                        <span className="pd-detail__click-wrap">
                                            <i className="far fa-envelope u-s-m-r-6"></i>

                                            <a href="signin.html">Email me When the price drops</a>

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
                                        <div className="u-s-m-b-15">
                                            <span className="pd-detail__label u-s-m-b-8">Color:</span>
                                            <div className="pd-detail__color">
                                                <div className="color__radio">
                                                    <input type="radio" id="jet" name="color" checked="" />

                                                    <label
                                                        className="color__radio-label"
                                                        htmlFor="jet"
                                                        style={{ backgroundColor: '#333333' }}
                                                    ></label>
                                                </div>
                                                <div className="color__radio">
                                                    <input type="radio" id="folly" name="color" />

                                                    <label
                                                        className="color__radio-label"
                                                        htmlFor="folly"
                                                        style={{ backgroundColor: '#FF0055' }}
                                                    ></label>
                                                </div>
                                                <div className="color__radio">
                                                    <input type="radio" id="yellow" name="color" />

                                                    <label
                                                        className="color__radio-label"
                                                        htmlFor="yellow"
                                                        style={{ backgroundColor: '#FFFF00' }}
                                                    ></label>
                                                </div>
                                                <div className="color__radio">
                                                    <input type="radio" id="granite-gray" name="color" />

                                                    <label
                                                        className="color__radio-label"
                                                        htmlFor="granite-gray"
                                                        style={{ backgroundColor: '#605F5E' }}
                                                    ></label>
                                                </div>
                                                <div className="color__radio">
                                                    <input type="radio" id="space-cadet" name="color" />

                                                    <label
                                                        className="color__radio-label"
                                                        htmlFor="space-cadet"
                                                        style={{ backgroundColor: '#1D3461' }}
                                                    ></label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="u-s-m-b-15">
                                            <span className="pd-detail__label u-s-m-b-8">Size:</span>
                                            <div className="pd-detail__size">
                                                <div className="size__radio">
                                                    <input type="radio" id="xs" name="size" checked="" />

                                                    <label className="size__radio-label" htmlFor="xs">
                                                        XS
                                                    </label>
                                                </div>
                                                <div className="size__radio">
                                                    <input type="radio" id="small" name="size" />

                                                    <label className="size__radio-label" htmlFor="xxl">
                                                        Small
                                                    </label>
                                                </div>
                                                <div className="size__radio">
                                                    <input type="radio" id="medium" name="size" />

                                                    <label className="size__radio-label" htmlFor="medium">
                                                        Medium
                                                    </label>
                                                </div>
                                                <div className="size__radio">
                                                    <input type="radio" id="large" name="size" />

                                                    <label className="size__radio-label" htmlFor="xxl">
                                                        Large
                                                    </label>
                                                </div>
                                                <div className="size__radio">
                                                    <input type="radio" id="xl" name="size" />

                                                    <label className="size__radio-label" htmlFor="xl">
                                                        XL
                                                    </label>
                                                </div>
                                                <div className="size__radio">
                                                    <input type="radio" id="xxl" name="size" />

                                                    <label className="size__radio-label" htmlFor="xxl">
                                                        XXL
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="pd-detail-inline-2">
                                            <div className="u-s-m-b-15">
                                                <div className="input-counter">
                                                    <span className="input-counter__minus fas fa-minus"></span>

                                                    <input
                                                        className="input-counter__text input-counter--text-primary-style"
                                                        type="text"
                                                        value="1"
                                                        data-min="1"
                                                        data-max="1000"
                                                    />

                                                    <span className="input-counter__plus fas fa-plus"></span>
                                                </div>
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
                        </div>
                    </div>
                </div>
            </div>
            <div className="u-s-p-y-90">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="pd-tab">
                                <div className="u-s-m-b-30">
                                    <ul className="nav pd-tab__list">
                                        <li className="nav-item">
                                            <a className="nav-link active" data-toggle="tab" href="#pd-desc">
                                                DESCRIPTION
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" data-toggle="tab" href="#pd-tag">
                                                TAGS
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" id="view-review" data-toggle="tab" href="#pd-rev">
                                                REVIEWS
                                                <span>(23)</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="tab-content">
                                    <div className="tab-pane active" id="pd-desc">
                                        <div className="pd-tab__desc">
                                            <div className="u-s-m-b-15">
                                                <p>
                                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                                                    the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of
                                                    type and scrambled it to make a type specimen book. It has survived not only five centuries, but
                                                    also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in
                                                    the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently
                                                    with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                                </p>
                                            </div>
                                            <div className="u-s-m-b-30">
                                                <div className="fluid-width-video-wrapper">
                                                    <iframe
                                                        src="https://www.youtube.com/embed/qKqSBm07KZk"
                                                        allowfullscreen=""
                                                        name="fitvid0"
                                                    ></iframe>
                                                </div>
                                            </div>
                                            <div className="u-s-m-b-30">
                                                <ul>
                                                    <li>
                                                        <i className="fas fa-check u-s-m-r-8"></i>

                                                        <span>Buyer Protection.</span>
                                                    </li>
                                                    <li>
                                                        <i className="fas fa-check u-s-m-r-8"></i>

                                                        <span>Full Refund if you don't receive your order.</span>
                                                    </li>
                                                    <li>
                                                        <i className="fas fa-check u-s-m-r-8"></i>

                                                        <span>Returns accepted if product not as described.</span>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="u-s-m-b-15">
                                                <h4>PRODUCT INFORMATION</h4>
                                            </div>
                                            <div className="u-s-m-b-15">
                                                <div className="pd-table gl-scroll">
                                                    <table>
                                                        <tbody>
                                                            <tr>
                                                                <td>Main Material</td>
                                                                <td>Cotton</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Color</td>
                                                                <td>Green, Blue, Red</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Sleeves</td>
                                                                <td>Long Sleeve</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Top Fit</td>
                                                                <td>Regular</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Print</td>
                                                                <td>Not Printed</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Neck</td>
                                                                <td>Round Neck</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Pieces Count</td>
                                                                <td>1 Piece</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Occasion</td>
                                                                <td>Casual</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Shipping Weight (kg)</td>
                                                                <td>0.5</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane" id="pd-tag">
                                        <div className="pd-tab__tag">
                                            <h2 className="u-s-m-b-15">ADD YOUR TAGS</h2>
                                            <div className="u-s-m-b-15">
                                                <form>
                                                    <input className="input-text input-text--primary-style" type="text" />

                                                    <button className="btn btn--e-brand-b-2" type="submit">
                                                        ADD TAGS
                                                    </button>
                                                </form>
                                            </div>

                                            <span className="gl-text">Use spaces to separate tags. Use single quotes (') for phrases.</span>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="pd-rev">
                                        <div className="pd-tab__rev">
                                            <div className="u-s-m-b-30">
                                                <div className="pd-tab__rev-score">
                                                    <div className="u-s-m-b-8">
                                                        <h2>23 Reviews - 4.6 (Overall)</h2>
                                                    </div>
                                                    <div className="gl-rating-style-2 u-s-m-b-8">
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star-half-alt"></i>
                                                    </div>
                                                    <div className="u-s-m-b-8">
                                                        <h4>We want to hear from you!</h4>
                                                    </div>

                                                    <span className="gl-text">Tell us what you think about this item</span>
                                                </div>
                                            </div>
                                            <div className="u-s-m-b-30">
                                                <form className="pd-tab__rev-f1">
                                                    <div className="rev-f1__group">
                                                        <div className="u-s-m-b-15">
                                                            <h2>23 Review(s) for Man Ruched Floral Applique Tee</h2>
                                                        </div>
                                                        <div className="u-s-m-b-15">
                                                            <label htmlFor="sort-review"></label>
                                                            <select className="select-box select-box--primary-style" id="sort-review">
                                                                <option selected="">Sort by: Best Rating</option>
                                                                <option>Sort by: Worst Rating</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="rev-f1__review">
                                                        <div className="review-o u-s-m-b-15">
                                                            <div className="review-o__info u-s-m-b-8">
                                                                <span className="review-o__name">John Doe</span>

                                                                <span className="review-o__date">27 Feb 2018 10:57:43</span>
                                                            </div>
                                                            <div className="review-o__rating gl-rating-style u-s-m-b-8">
                                                                <i className="fas fa-star"></i>
                                                                <i className="fas fa-star"></i>
                                                                <i className="fas fa-star"></i>
                                                                <i className="fas fa-star"></i>
                                                                <i className="far fa-star"></i>

                                                                <span>(4)</span>
                                                            </div>
                                                            <p className="review-o__text">
                                                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                                                                has been the industry's standard dummy text ever since the 1500s, when an unknown
                                                                printer took a galley of type and scrambled it to make a type specimen book.
                                                            </p>
                                                        </div>
                                                        <div className="review-o u-s-m-b-15">
                                                            <div className="review-o__info u-s-m-b-8">
                                                                <span className="review-o__name">John Doe</span>

                                                                <span className="review-o__date">27 Feb 2018 10:57:43</span>
                                                            </div>
                                                            <div className="review-o__rating gl-rating-style u-s-m-b-8">
                                                                <i className="fas fa-star"></i>
                                                                <i className="fas fa-star"></i>
                                                                <i className="fas fa-star"></i>
                                                                <i className="fas fa-star"></i>
                                                                <i className="far fa-star"></i>

                                                                <span>(4)</span>
                                                            </div>
                                                            <p className="review-o__text">
                                                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                                                                has been the industry's standard dummy text ever since the 1500s, when an unknown
                                                                printer took a galley of type and scrambled it to make a type specimen book.
                                                            </p>
                                                        </div>
                                                        <div className="review-o u-s-m-b-15">
                                                            <div className="review-o__info u-s-m-b-8">
                                                                <span className="review-o__name">John Doe</span>

                                                                <span className="review-o__date">27 Feb 2018 10:57:43</span>
                                                            </div>
                                                            <div className="review-o__rating gl-rating-style u-s-m-b-8">
                                                                <i className="fas fa-star"></i>
                                                                <i className="fas fa-star"></i>
                                                                <i className="fas fa-star"></i>
                                                                <i className="fas fa-star"></i>
                                                                <i className="far fa-star"></i>

                                                                <span>(4)</span>
                                                            </div>
                                                            <p className="review-o__text">
                                                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                                                                has been the industry's standard dummy text ever since the 1500s, when an unknown
                                                                printer took a galley of type and scrambled it to make a type specimen book.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="u-s-m-b-30">
                                                <form className="pd-tab__rev-f2">
                                                    <h2 className="u-s-m-b-15">Add a Review</h2>

                                                    <span className="gl-text u-s-m-b-15">
                                                        Your email address will not be published. Required fields are marked *
                                                    </span>
                                                    <div className="u-s-m-b-30">
                                                        <div className="rev-f2__table-wrap gl-scroll">
                                                            <table className="rev-f2__table">
                                                                <thead>
                                                                    <tr>
                                                                        <th>
                                                                            <div className="gl-rating-style-2">
                                                                                <i className="fas fa-star"></i>

                                                                                <span>(1)</span>
                                                                            </div>
                                                                        </th>
                                                                        <th>
                                                                            <div className="gl-rating-style-2">
                                                                                <i className="fas fa-star"></i>
                                                                                <i className="fas fa-star-half-alt"></i>

                                                                                <span>(1.5)</span>
                                                                            </div>
                                                                        </th>
                                                                        <th>
                                                                            <div className="gl-rating-style-2">
                                                                                <i className="fas fa-star"></i>
                                                                                <i className="fas fa-star"></i>

                                                                                <span>(2)</span>
                                                                            </div>
                                                                        </th>
                                                                        <th>
                                                                            <div className="gl-rating-style-2">
                                                                                <i className="fas fa-star"></i>
                                                                                <i className="fas fa-star"></i>
                                                                                <i className="fas fa-star-half-alt"></i>

                                                                                <span>(2.5)</span>
                                                                            </div>
                                                                        </th>
                                                                        <th>
                                                                            <div className="gl-rating-style-2">
                                                                                <i className="fas fa-star"></i>
                                                                                <i className="fas fa-star"></i>
                                                                                <i className="fas fa-star"></i>

                                                                                <span>(3)</span>
                                                                            </div>
                                                                        </th>
                                                                        <th>
                                                                            <div className="gl-rating-style-2">
                                                                                <i className="fas fa-star"></i>
                                                                                <i className="fas fa-star"></i>
                                                                                <i className="fas fa-star"></i>
                                                                                <i className="fas fa-star-half-alt"></i>

                                                                                <span>(3.5)</span>
                                                                            </div>
                                                                        </th>
                                                                        <th>
                                                                            <div className="gl-rating-style-2">
                                                                                <i className="fas fa-star"></i>
                                                                                <i className="fas fa-star"></i>
                                                                                <i className="fas fa-star"></i>
                                                                                <i className="fas fa-star"></i>

                                                                                <span>(4)</span>
                                                                            </div>
                                                                        </th>
                                                                        <th>
                                                                            <div className="gl-rating-style-2">
                                                                                <i className="fas fa-star"></i>
                                                                                <i className="fas fa-star"></i>
                                                                                <i className="fas fa-star"></i>
                                                                                <i className="fas fa-star"></i>
                                                                                <i className="fas fa-star-half-alt"></i>

                                                                                <span>(4.5)</span>
                                                                            </div>
                                                                        </th>
                                                                        <th>
                                                                            <div className="gl-rating-style-2">
                                                                                <i className="fas fa-star"></i>
                                                                                <i className="fas fa-star"></i>
                                                                                <i className="fas fa-star"></i>
                                                                                <i className="fas fa-star"></i>
                                                                                <i className="fas fa-star"></i>

                                                                                <span>(5)</span>
                                                                            </div>
                                                                        </th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td>
                                                                            <div className="radio-box">
                                                                                <input type="radio" id="star-1" name="rating" />
                                                                                <div className="radio-box__state radio-box__state--primary">
                                                                                    <label className="radio-box__label" htmlFor="star-1"></label>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="radio-box">
                                                                                <input type="radio" id="star-1.5" name="rating" />
                                                                                <div className="radio-box__state radio-box__state--primary">
                                                                                    <label className="radio-box__label" htmlFor="star-1.5"></label>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="radio-box">
                                                                                <input type="radio" id="star-2" name="rating" />
                                                                                <div className="radio-box__state radio-box__state--primary">
                                                                                    <label className="radio-box__label" htmlFor="star-2"></label>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="radio-box">
                                                                                <input type="radio" id="star-2.5" name="rating" />
                                                                                <div className="radio-box__state radio-box__state--primary">
                                                                                    <label className="radio-box__label" htmlFor="star-2.5"></label>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="radio-box">
                                                                                <input type="radio" id="star-3" name="rating" />
                                                                                <div className="radio-box__state radio-box__state--primary">
                                                                                    <label className="radio-box__label" htmlFor="star-3"></label>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="radio-box">
                                                                                <input type="radio" id="star-3.5" name="rating" />
                                                                                <div className="radio-box__state radio-box__state--primary">
                                                                                    <label className="radio-box__label" htmlFor="star-3.5"></label>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="radio-box">
                                                                                <input type="radio" id="star-4" name="rating" />
                                                                                <div className="radio-box__state radio-box__state--primary">
                                                                                    <label className="radio-box__label" htmlFor="star-4"></label>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="radio-box">
                                                                                <input type="radio" id="star-4.5" name="rating" />
                                                                                <div className="radio-box__state radio-box__state--primary">
                                                                                    <label className="radio-box__label" htmlFor="star-4.5"></label>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="radio-box">
                                                                                <input type="radio" id="star-5" name="rating" />
                                                                                <div className="radio-box__state radio-box__state--primary">
                                                                                    <label className="radio-box__label" htmlFor="star-5"></label>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                    <div className="rev-f2__group">
                                                        <div className="u-s-m-b-15">
                                                            <label className="gl-label" htmlFor="reviewer-text">
                                                                YOUR REVIEW *
                                                            </label>
                                                            <textarea className="text-area text-area--primary-style" id="reviewer-text"></textarea>
                                                        </div>
                                                        <div>
                                                            <p className="u-s-m-b-30">
                                                                <label className="gl-label" htmlFor="reviewer-name">
                                                                    NAME *
                                                                </label>

                                                                <input
                                                                    className="input-text input-text--primary-style"
                                                                    type="text"
                                                                    id="reviewer-name"
                                                                />
                                                            </p>
                                                            <p className="u-s-m-b-30">
                                                                <label className="gl-label" htmlFor="reviewer-email">
                                                                    EMAIL *
                                                                </label>

                                                                <input
                                                                    className="input-text input-text--primary-style"
                                                                    type="text"
                                                                    id="reviewer-email"
                                                                />
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <button className="btn btn--e-brand-shadow" type="submit">
                                                            SUBMIT
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    \
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="u-s-p-b-90">
                <div className="section__intro u-s-m-b-46">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="section__text-wrap">
                                    <h1 className="section__heading u-c-secondary u-s-m-b-12">CUSTOMER ALSO VIEWED</h1>

                                    <span className="section__span u-c-grey">PRODUCTS THAT CUSTOMER VIEWED</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="section__content">
                    <div className="container">
                        <div>
                            <div className="owl-carousel product-slider owl-loaded owl-drag" data-item="4">
                                <div className="owl-stage-outer">
                                    <div
                                        className="owl-stage"
                                        style={{ transform: 'translate3d(0px, 0px, 0px)', transition: 'all 0s ease 0s', width: 1665 }}
                                    >
                                        <div className="owl-item active" style={{ width: 277.5 }}>
                                            <div className="u-s-m-b-30">
                                                <div className="product-o product-o--hover-on">
                                                    <div className="product-o__wrap">
                                                        <a className="aspect aspect--bg-grey aspect--square u-d-block" href="product-detail.html">
                                                            <img
                                                                className="aspect__img"
                                                                src="images/product/electronic/product1.08a132534e9a3d225f5d3c2b8ef690da.jpg"
                                                                alt=""
                                                            />
                                                        </a>
                                                        <div className="product-o__action-wrap">
                                                            <ul className="product-o__action-list">
                                                                <li>
                                                                    <a
                                                                        data-modal="modal"
                                                                        data-modal-id="#quick-look"
                                                                        data-tooltip="tooltip"
                                                                        data-placement="top"
                                                                        title=""
                                                                        data-original-title="Quick View"
                                                                    >
                                                                        <i className="fas fa-search-plus"></i>
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a
                                                                        data-modal="modal"
                                                                        data-modal-id="#add-to-cart"
                                                                        data-tooltip="tooltip"
                                                                        data-placement="top"
                                                                        title=""
                                                                        data-original-title="Add to Cart"
                                                                    >
                                                                        <i className="fas fa-plus-circle"></i>
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a
                                                                        href="signin.html"
                                                                        data-tooltip="tooltip"
                                                                        data-placement="top"
                                                                        title=""
                                                                        data-original-title="Add to Wishlist"
                                                                    >
                                                                        <i className="fas fa-heart"></i>
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a
                                                                        href="signin.html"
                                                                        data-tooltip="tooltip"
                                                                        data-placement="top"
                                                                        title=""
                                                                        data-original-title="Email me When the price drops"
                                                                    >
                                                                        <i className="fas fa-envelope"></i>
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>

                                                    <span className="product-o__category">
                                                        <a href="shop-side-version-2.html">Electronics</a>
                                                    </span>

                                                    <span className="product-o__name">
                                                        <a href="product-detail.html">Beats Bomb Wireless Headphone</a>
                                                    </span>
                                                    <div className="product-o__rating gl-rating-style">
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star"></i>

                                                        <span className="product-o__review">(20)</span>
                                                    </div>

                                                    <span className="product-o__price">
                                                        $125.00
                                                        <span className="product-o__discount">$160.00</span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="owl-item active" style={{ width: 277.5 }}>
                                            <div className="u-s-m-b-30">
                                                <div className="product-o product-o--hover-on">
                                                    <div className="product-o__wrap">
                                                        <a className="aspect aspect--bg-grey aspect--square u-d-block" href="product-detail.html">
                                                            <img
                                                                className="aspect__img"
                                                                src="images/product/electronic/product2.ea1932957badfdefe7e4a1e7d50f4ea9.jpg"
                                                                alt=""
                                                            />
                                                        </a>
                                                        <div className="product-o__action-wrap">
                                                            <ul className="product-o__action-list">
                                                                <li>
                                                                    <a
                                                                        data-modal="modal"
                                                                        data-modal-id="#quick-look"
                                                                        data-tooltip="tooltip"
                                                                        data-placement="top"
                                                                        title=""
                                                                        data-original-title="Quick View"
                                                                    >
                                                                        <i className="fas fa-search-plus"></i>
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a
                                                                        data-modal="modal"
                                                                        data-modal-id="#add-to-cart"
                                                                        data-tooltip="tooltip"
                                                                        data-placement="top"
                                                                        title=""
                                                                        data-original-title="Add to Cart"
                                                                    >
                                                                        <i className="fas fa-plus-circle"></i>
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a
                                                                        href="signin.html"
                                                                        data-tooltip="tooltip"
                                                                        data-placement="top"
                                                                        title=""
                                                                        data-original-title="Add to Wishlist"
                                                                    >
                                                                        <i className="fas fa-heart"></i>
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a
                                                                        href="signin.html"
                                                                        data-tooltip="tooltip"
                                                                        data-placement="top"
                                                                        title=""
                                                                        data-original-title="Email me When the price drops"
                                                                    >
                                                                        <i className="fas fa-envelope"></i>
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>

                                                    <span className="product-o__category">
                                                        <a href="shop-side-version-2.html">Electronics</a>
                                                    </span>

                                                    <span className="product-o__name">
                                                        <a href="product-detail.html">Red Wireless Headphone</a>
                                                    </span>
                                                    <div className="product-o__rating gl-rating-style">
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star"></i>

                                                        <span className="product-o__review">(20)</span>
                                                    </div>

                                                    <span className="product-o__price">
                                                        $125.00
                                                        <span className="product-o__discount">$160.00</span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="owl-item active" style={{ width: 277.5 }}>
                                            <div className="u-s-m-b-30">
                                                <div className="product-o product-o--hover-on">
                                                    <div className="product-o__wrap">
                                                        <a className="aspect aspect--bg-grey aspect--square u-d-block" href="product-detail.html">
                                                            <img
                                                                className="aspect__img"
                                                                src="images/product/electronic/product3.207dd89cb8b11937ace9524c6c84fb78.jpg"
                                                                alt=""
                                                            />
                                                        </a>
                                                        <div className="product-o__action-wrap">
                                                            <ul className="product-o__action-list">
                                                                <li>
                                                                    <a
                                                                        data-modal="modal"
                                                                        data-modal-id="#quick-look"
                                                                        data-tooltip="tooltip"
                                                                        data-placement="top"
                                                                        title=""
                                                                        data-original-title="Quick View"
                                                                    >
                                                                        <i className="fas fa-search-plus"></i>
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a
                                                                        data-modal="modal"
                                                                        data-modal-id="#add-to-cart"
                                                                        data-tooltip="tooltip"
                                                                        data-placement="top"
                                                                        title=""
                                                                        data-original-title="Add to Cart"
                                                                    >
                                                                        <i className="fas fa-plus-circle"></i>
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a
                                                                        href="signin.html"
                                                                        data-tooltip="tooltip"
                                                                        data-placement="top"
                                                                        title=""
                                                                        data-original-title="Add to Wishlist"
                                                                    >
                                                                        <i className="fas fa-heart"></i>
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a
                                                                        href="signin.html"
                                                                        data-tooltip="tooltip"
                                                                        data-placement="top"
                                                                        title=""
                                                                        data-original-title="Email me When the price drops"
                                                                    >
                                                                        <i className="fas fa-envelope"></i>
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>

                                                    <span className="product-o__category">
                                                        <a href="shop-side-version-2.html">Electronics</a>
                                                    </span>

                                                    <span className="product-o__name">
                                                        <a href="product-detail.html">Yellow Wireless Headphone</a>
                                                    </span>
                                                    <div className="product-o__rating gl-rating-style">
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star"></i>

                                                        <span className="product-o__review">(20)</span>
                                                    </div>

                                                    <span className="product-o__price">
                                                        $125.00
                                                        <span className="product-o__discount">$160.00</span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="owl-item active" style={{ width: 277.5 }}>
                                            <div className="u-s-m-b-30">
                                                <div className="product-o product-o--hover-on">
                                                    <div className="product-o__wrap">
                                                        <a className="aspect aspect--bg-grey aspect--square u-d-block" href="product-detail.html">
                                                            <img
                                                                className="aspect__img"
                                                                src="images/product/electronic/product23.0396d3b9726043121035dc21ca04667a.jpg"
                                                                alt=""
                                                            />
                                                        </a>
                                                        <div className="product-o__action-wrap">
                                                            <ul className="product-o__action-list">
                                                                <li>
                                                                    <a
                                                                        data-modal="modal"
                                                                        data-modal-id="#quick-look"
                                                                        data-tooltip="tooltip"
                                                                        data-placement="top"
                                                                        title=""
                                                                        data-original-title="Quick View"
                                                                    >
                                                                        <i className="fas fa-search-plus"></i>
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a
                                                                        data-modal="modal"
                                                                        data-modal-id="#add-to-cart"
                                                                        data-tooltip="tooltip"
                                                                        data-placement="top"
                                                                        title=""
                                                                        data-original-title="Add to Cart"
                                                                    >
                                                                        <i className="fas fa-plus-circle"></i>
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a
                                                                        href="signin.html"
                                                                        data-tooltip="tooltip"
                                                                        data-placement="top"
                                                                        title=""
                                                                        data-original-title="Add to Wishlist"
                                                                    >
                                                                        <i className="fas fa-heart"></i>
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a
                                                                        href="signin.html"
                                                                        data-tooltip="tooltip"
                                                                        data-placement="top"
                                                                        title=""
                                                                        data-original-title="Email me When the price drops"
                                                                    >
                                                                        <i className="fas fa-envelope"></i>
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>

                                                    <span className="product-o__category">
                                                        <a href="shop-side-version-2.html">Electronics</a>
                                                    </span>

                                                    <span className="product-o__name">
                                                        <a href="product-detail.html">Razor Gear Ultra Slim 8GB Ram</a>
                                                    </span>
                                                    <div className="product-o__rating gl-rating-style">
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star"></i>

                                                        <span className="product-o__review">(20)</span>
                                                    </div>

                                                    <span className="product-o__price">
                                                        $125.00
                                                        <span className="product-o__discount">$160.00</span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="owl-item" style={{ width: 277.5 }}>
                                            <div className="u-s-m-b-30">
                                                <div className="product-o product-o--hover-on">
                                                    <div className="product-o__wrap">
                                                        <a className="aspect aspect--bg-grey aspect--square u-d-block" href="product-detail.html">
                                                            <img
                                                                className="aspect__img"
                                                                src="images/product/electronic/product26.b73b22477f27a27e373fe484836e94a6.jpg"
                                                                alt=""
                                                            />
                                                        </a>
                                                        <div className="product-o__action-wrap">
                                                            <ul className="product-o__action-list">
                                                                <li>
                                                                    <a
                                                                        data-modal="modal"
                                                                        data-modal-id="#quick-look"
                                                                        data-tooltip="tooltip"
                                                                        data-placement="top"
                                                                        title=""
                                                                        data-original-title="Quick View"
                                                                    >
                                                                        <i className="fas fa-search-plus"></i>
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a
                                                                        data-modal="modal"
                                                                        data-modal-id="#add-to-cart"
                                                                        data-tooltip="tooltip"
                                                                        data-placement="top"
                                                                        title=""
                                                                        data-original-title="Add to Cart"
                                                                    >
                                                                        <i className="fas fa-plus-circle"></i>
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a
                                                                        href="signin.html"
                                                                        data-tooltip="tooltip"
                                                                        data-placement="top"
                                                                        title=""
                                                                        data-original-title="Add to Wishlist"
                                                                    >
                                                                        <i className="fas fa-heart"></i>
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a
                                                                        href="signin.html"
                                                                        data-tooltip="tooltip"
                                                                        data-placement="top"
                                                                        title=""
                                                                        data-original-title="Email me When the price drops"
                                                                    >
                                                                        <i className="fas fa-envelope"></i>
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>

                                                    <span className="product-o__category">
                                                        <a href="shop-side-version-2.html">Electronics</a>
                                                    </span>

                                                    <span className="product-o__name">
                                                        <a href="product-detail.html">Razor Gear Ultra Slim 12GB Ram</a>
                                                    </span>
                                                    <div className="product-o__rating gl-rating-style">
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star"></i>

                                                        <span className="product-o__review">(20)</span>
                                                    </div>

                                                    <span className="product-o__price">
                                                        $125.00
                                                        <span className="product-o__discount">$160.00</span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="owl-item" style={{ width: 277.5 }}>
                                            <div className="u-s-m-b-30">
                                                <div className="product-o product-o--hover-on">
                                                    <div className="product-o__wrap">
                                                        <a className="aspect aspect--bg-grey aspect--square u-d-block" href="product-detail.html">
                                                            <img
                                                                className="aspect__img"
                                                                src="images/product/electronic/product30.4a4450fc843892eecd4574ad549b11aa.jpg"
                                                                alt=""
                                                            />
                                                        </a>
                                                        <div className="product-o__action-wrap">
                                                            <ul className="product-o__action-list">
                                                                <li>
                                                                    <a
                                                                        data-modal="modal"
                                                                        data-modal-id="#quick-look"
                                                                        data-tooltip="tooltip"
                                                                        data-placement="top"
                                                                        title=""
                                                                        data-original-title="Quick View"
                                                                    >
                                                                        <i className="fas fa-search-plus"></i>
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a
                                                                        data-modal="modal"
                                                                        data-modal-id="#add-to-cart"
                                                                        data-tooltip="tooltip"
                                                                        data-placement="top"
                                                                        title=""
                                                                        data-original-title="Add to Cart"
                                                                    >
                                                                        <i className="fas fa-plus-circle"></i>
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a
                                                                        href="signin.html"
                                                                        data-tooltip="tooltip"
                                                                        data-placement="top"
                                                                        title=""
                                                                        data-original-title="Add to Wishlist"
                                                                    >
                                                                        <i className="fas fa-heart"></i>
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a
                                                                        href="signin.html"
                                                                        data-tooltip="tooltip"
                                                                        data-placement="top"
                                                                        title=""
                                                                        data-original-title="Email me When the price drops"
                                                                    >
                                                                        <i className="fas fa-envelope"></i>
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>

                                                    <span className="product-o__category">
                                                        <a href="shop-side-version-2.html">Electronics</a>
                                                    </span>

                                                    <span className="product-o__name">
                                                        <a href="product-detail.html">Razor Gear Ultra Slim 16GB Ram</a>
                                                    </span>
                                                    <div className="product-o__rating gl-rating-style">
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star"></i>

                                                        <span className="product-o__review">(20)</span>
                                                    </div>

                                                    <span className="product-o__price">
                                                        $125.00
                                                        <span className="product-o__discount">$160.00</span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="owl-nav">
                                    <div className="p-prev">
                                        <i className="fas fa-long-arrow-alt-left"></i>
                                    </div>
                                    <div className="p-next">
                                        <i className="fas fa-long-arrow-alt-right"></i>
                                    </div>
                                </div>
                                <div className="owl-dots disabled"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <MetaData title={product.name} />
                    <MinCategory />
                    <main className="mt-12 sm:mt-0">
                        {/* <!-- product image & description container --> */}
                        <div className="w-full flex flex-col sm:flex-row bg-white sm:p-2 relative">
                            {/* <!-- image wrapper --> */}
                            <div className="w-full sm:w-2/5 sm:sticky top-16 sm:h-screen">
                                {/* <!-- imgbox --> */}
                                <div className="flex flex-col gap-3 m-3">
                                    <div className="w-full h-full pb-6 border relative">
                                        <Slider {...settings}>
                                            {product.images &&
                                                product.images.map((item, i) => (
                                                    <img
                                                        draggable="false"
                                                        className="w-full h-96 object-contain"
                                                        src={item.url}
                                                        alt={product.name}
                                                        key={i}
                                                    />
                                                ))}
                                        </Slider>
                                        <div className="absolute top-4 right-4 shadow-lg bg-white w-9 h-9 border flex items-center justify-center rounded-full">
                                            <span
                                                onClick={addToWishlistHandler}
                                                className={`${itemInWishlist ? 'text-red-500' : 'hover:text-red-500 text-gray-300'} cursor-pointer`}
                                            >
                                                <FavoriteIcon sx={{ fontSize: '18px' }} />
                                            </span>
                                        </div>
                                    </div>

                                    <div className="w-full flex gap-3">
                                        {/* <!-- add to cart btn --> */}
                                        {product.stock > 0 && (
                                            <button
                                                onClick={itemInCart ? goToCart : addToCartHandler}
                                                className="p-4 w-1/2 flex items-center justify-center gap-2 text-white bg-primary-yellow rounded-sm shadow hover:shadow-lg"
                                            >
                                                <ShoppingCartIcon />
                                                {itemInCart ? 'GO TO CART' : 'ADD TO CART'}
                                            </button>
                                        )}
                                        <button
                                            onClick={buyNow}
                                            disabled={product.stock < 1 ? true : false}
                                            className={
                                                product.stock < 1
                                                    ? 'p-4 w-full flex items-center justify-center gap-2 text-white bg-red-600 cursor-not-allowed rounded-sm shadow hover:shadow-lg'
                                                    : 'p-4 w-1/2 flex items-center justify-center gap-2 text-white bg-primary-orange rounded-sm shadow hover:shadow-lg'
                                            }
                                        >
                                            <FlashOnIcon />
                                            {product.stock < 1 ? 'OUT OF STOCK' : 'BUY NOW'}
                                        </button>
                                        {/* <!-- add to cart btn --> */}
                                    </div>
                                </div>
                                {/* <!-- imgbox --> */}
                            </div>
                            {/* <!-- image wrapper --> */}

                            {/* <!-- product desc wrapper --> */}
                            <div className="flex-1 py-2 px-3">
                                {/* <!-- whole product description --> */}
                                <div className="flex flex-col gap-2 mb-4">
                                    <h2 className="text-xl">{product.name}</h2>
                                    {/* <!-- rating badge --> */}
                                    <span className="text-sm text-gray-500 font-medium flex gap-2 items-center">
                                        <span className="text-xs px-1.5 py-0.5 bg-primary-green rounded-sm text-white flex items-center gap-0.5">
                                            {product.ratings && product.ratings.toFixed(1)} <StarIcon sx={{ fontSize: '12px' }} />
                                        </span>
                                        <span>{product.numOfReviews} Reviews</span>
                                    </span>
                                    {/* <!-- rating badge --> */}

                                    {/* <!-- price desc --> */}
                                    <span className="text-primary-green text-sm font-medium">Special Price</span>
                                    <div className="flex items-baseline gap-2 text-3xl font-medium">
                                        <span className="text-gray-800">₹{product.price?.toLocaleString()}</span>
                                        <span className="text-base text-gray-500 line-through">₹{product.cuttedPrice?.toLocaleString()}</span>
                                        <span className="text-base text-primary-green">
                                            {getDiscount(product.price, product.cuttedPrice)}%&nbsp;off
                                        </span>
                                    </div>
                                    {product.stock <= 10 && product.stock > 0 && (
                                        <span className="text-red-500 text-sm font-medium">Hurry, Only {product.stock} left!</span>
                                    )}
                                    {/* <!-- price desc --> */}

                                    {/* <!-- banks offers --> */}
                                    <p className="text-md font-medium">Available offers</p>
                                    {Array(3)
                                        .fill('')
                                        .map((el, i) => (
                                            <p className="text-sm flex items-center gap-1" key={i}>
                                                <span className="text-primary-lightGreen">
                                                    <LocalOfferIcon sx={{ fontSize: '20px' }} />
                                                </span>
                                                <span className="font-medium ml-2">Bank Offer</span> 15% Instant discount on first Omjinshop Pay Later
                                                order of 500 and above{' '}
                                                <Link className="text-primary-blue font-medium" to="/">
                                                    T&C
                                                </Link>
                                            </p>
                                        ))}
                                    {/* <!-- banks offers --> */}

                                    {/* <!-- warranty & brand --> */}
                                    <div className="flex gap-8 mt-2 items-center text-sm">
                                        <img
                                            draggable="false"
                                            className="w-20 h-8 p-0.5 border object-contain"
                                            src={product.brand?.logo.url}
                                            alt={product.brand && product.brand.name}
                                        />
                                        <span>
                                            {product.warranty} Year Warranty{' '}
                                            <Link className="font-medium text-primary-blue" to="/">
                                                Know More
                                            </Link>
                                        </span>
                                    </div>
                                    {/* <!-- warranty & brand --> */}

                                    {/* <!-- delivery details --> */}
                                    <div className="flex gap-16 mt-4 items-center text-sm font-medium">
                                        <p className="text-gray-500">Delivery</p>
                                        <span>Delivery by {getDeliveryDate()}</span>
                                    </div>
                                    {/* <!-- delivery details --> */}

                                    {/* <!-- highlights & services details --> */}
                                    <div className="flex flex-col sm:flex-row justify-between">
                                        {/* <!-- highlights details --> */}
                                        <div className="flex gap-16 mt-4 items-stretch text-sm">
                                            <p className="text-gray-500 font-medium">Highlights</p>

                                            <ul className="list-disc flex flex-col gap-2 w-64">
                                                {product.highlights?.map((highlight, i) => (
                                                    <li key={i}>
                                                        <p>{highlight}</p>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        {/* <!-- highlights details --> */}

                                        {/* <!-- services details --> */}
                                        <div className="flex gap-16 mt-4 mr-6 items-stretch text-sm">
                                            <p className="text-gray-500 font-medium">Services</p>
                                            <ul className="flex flex-col gap-2">
                                                <li>
                                                    <p className="flex items-center gap-3">
                                                        <span className="text-primary-blue">
                                                            <VerifiedUserIcon sx={{ fontSize: '18px' }} />
                                                        </span>{' '}
                                                        {product.warranty} Year
                                                    </p>
                                                </li>
                                                <li>
                                                    <p className="flex items-center gap-3">
                                                        <span className="text-primary-blue">
                                                            <CachedIcon sx={{ fontSize: '18px' }} />
                                                        </span>{' '}
                                                        7 Days Replacement Policy
                                                    </p>
                                                </li>
                                                <li>
                                                    <p className="flex items-center gap-3">
                                                        <span className="text-primary-blue">
                                                            <CurrencyRupeeIcon sx={{ fontSize: '18px' }} />
                                                        </span>{' '}
                                                        Cash on Delivery available
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        {/* <!-- services details --> */}
                                    </div>
                                    {/* <!-- highlights & services details --> */}

                                    {/* <!-- seller details --> */}
                                    <div className="flex gap-16 mt-4 items-center text-sm font-medium">
                                        <p className="text-gray-500">Seller</p>
                                        <Link className="font-medium text-primary-blue ml-3" to="/">
                                            {product.brand && product.brand.name}
                                        </Link>
                                    </div>
                                    {/* <!-- seller details --> */}

                                    {/* <!-- omjinshop plus banner --> */}
                                    <div className="sm:w-1/2 mt-4 border">
                                        <img
                                            draggable="false"
                                            className="w-full h-full object-contain"
                                            src="https://rukminim1.flixcart.com/lockin/763/305/images/promotion_banner_v2_active.png"
                                            alt=""
                                        />
                                    </div>
                                    {/* <!-- omjinshop plus banner --> */}

                                    {/* <!-- description details --> */}
                                    <div className="flex flex-col sm:flex-row gap-1 sm:gap-14 mt-4 items-stretch text-sm">
                                        <p className="text-gray-500 font-medium">Description</p>
                                        <span>{product.description}</span>
                                    </div>
                                    {/* <!-- description details --> */}

                                    {/* <!-- border box --> */}
                                    <div className="w-full mt-6 rounded-sm border flex flex-col">
                                        <h1 className="px-6 py-4 border-b text-2xl font-medium">Product Description</h1>
                                        <div className="p-6">
                                            <p className="text-sm">{product.description}</p>
                                        </div>
                                    </div>
                                    {/* <!-- border box --> */}

                                    {/* <!-- specifications border box --> */}
                                    <div className="w-full mt-4 pb-4 rounded-sm border flex flex-col">
                                        <h1 className="px-6 py-4 border-b text-2xl font-medium">Specifications</h1>
                                        <h1 className="px-6 py-3 text-lg">General</h1>

                                        {/* <!-- specs list --> */}
                                        {product.specifications?.map((spec, i) => (
                                            <div className="px-6 py-2 flex items-center text-sm" key={i}>
                                                <p className="text-gray-500 w-3/12">{spec.title}</p>
                                                <p className="flex-1">{spec.description}</p>
                                            </div>
                                        ))}
                                        {/* <!-- specs list --> */}
                                    </div>
                                    {/* <!-- specifications border box --> */}

                                    {/* <!-- reviews border box --> */}
                                    <div className="w-full mt-4 rounded-sm border flex flex-col">
                                        <div className="flex justify-between items-center border-b px-6 py-4">
                                            <h1 className="text-2xl font-medium">Ratings & Reviews</h1>
                                            <button
                                                onClick={handleDialogClose}
                                                className="shadow bg-primary-yellow text-white px-4 py-2 rounded-sm hover:shadow-lg"
                                            >
                                                Rate Product
                                            </button>
                                        </div>

                                        <Dialog aria-labelledby="review-dialog" open={open} onClose={handleDialogClose}>
                                            <DialogTitle className="border-b">Submit Review</DialogTitle>
                                            <DialogContent className="flex flex-col m-1 gap-4">
                                                <Rating onChange={(e) => setRating(e.target.value)} value={rating} size="large" precision={0.5} />
                                                <TextField
                                                    label="Review"
                                                    multiline
                                                    rows={3}
                                                    sx={{ width: 400 }}
                                                    size="small"
                                                    variant="outlined"
                                                    value={comment}
                                                    onChange={(e) => setComment(e.target.value)}
                                                />
                                            </DialogContent>
                                            <DialogActions>
                                                <button
                                                    onClick={handleDialogClose}
                                                    className="py-2 px-6 rounded shadow bg-white border border-red-500 hover:bg-red-100 text-red-600 uppercase"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    onClick={reviewSubmitHandler}
                                                    className="py-2 px-6 rounded bg-green-600 hover:bg-green-700 text-white shadow uppercase"
                                                >
                                                    Submit
                                                </button>
                                            </DialogActions>
                                        </Dialog>

                                        <div className="flex items-center border-b">
                                            <h1 className="px-6 py-3 text-3xl font-semibold">
                                                {product.ratings && product.ratings.toFixed(1)}
                                                <StarIcon />
                                            </h1>
                                            <p className="text-lg text-gray-500">({product.numOfReviews}) Reviews</p>
                                        </div>

                                        {viewAll
                                            ? product.reviews
                                                  ?.map((rev, i) => (
                                                      <div className="flex flex-col gap-2 py-4 px-6 border-b" key={i}>
                                                          <Rating name="read-only" value={rev.rating} readOnly size="small" precision={0.5} />
                                                          <p>{rev.comment}</p>
                                                          <span className="text-sm text-gray-500">by {rev.name}</span>
                                                      </div>
                                                  ))
                                                  .reverse()
                                            : product.reviews
                                                  ?.slice(-3)
                                                  .map((rev, i) => (
                                                      <div className="flex flex-col gap-2 py-4 px-6 border-b" key={i}>
                                                          <Rating name="read-only" value={rev.rating} readOnly size="small" precision={0.5} />
                                                          <p>{rev.comment}</p>
                                                          <span className="text-sm text-gray-500">by {rev.name}</span>
                                                      </div>
                                                  ))
                                                  .reverse()}
                                        {product.reviews?.length > 3 && (
                                            <button
                                                onClick={() => setViewAll(!viewAll)}
                                                className="w-1/3 m-2 rounded-sm shadow hover:shadow-lg py-2 bg-primary-blue text-white"
                                            >
                                                {viewAll ? 'View Less' : 'View All'}
                                            </button>
                                        )}
                                    </div>
                                    {/* <!-- reviews border box --> */}
                                </div>
                            </div>
                            {/* <!-- product desc wrapper --> */}
                        </div>
                        {/* <!-- product image & description container --> */}

                        {/* Sliders */}
                        {/* <div className="flex flex-col gap-3 mt-6">
                            <ProductSlider title={'Similar Products'} tagline={'Based on the category'} />
                        </div> */}
                    </main>
                </>
            )}
        </>
    );
};

export default ProductDetails;
