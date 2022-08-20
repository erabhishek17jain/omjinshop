import React, { useState } from 'react';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import CategoryHerirarcy from '../../Products/ProductDetails/CategoryHerirarcy';
import ProductSlider from '../../Products/ProductDetails/ProductSlider';
import PriceTag from '../PriceTag';
import Ratings from '../Ratings';
import { getDeliveryDate } from '../../../utils/services';
import { addToWishlist, removeFromWishlist } from '../../../middleware/actions/wishlistAction';
import { addItemsToCart } from '../../../middleware/actions/cartAction';

const QuickLookModal = (props) => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const params = useParams();
    const { wishlistItems } = useSelector((state) => state.wishlist);
    const { product } = useSelector((state) => state.productDetails);
    const productId = params.id;
    const itemInWishlist = wishlistItems.some((i) => i.product === productId);
    const [quantity, setQuantity] = useState(1);

    const addToWishlistHandler = (e) => {
        e.preventDefault();
        alert('wishlist');
        if (itemInWishlist) {
            dispatch(removeFromWishlist(productId));
            enqueueSnackbar('Remove From Wishlist', { variant: 'success' });
        } else {
            dispatch(addToWishlist(productId));
            enqueueSnackbar('Added To Wishlist', { variant: 'success' });
        }
    };

    const moveToCartHandler = (e, id) => {
        e.preventDefault();
        if (quantity > 0 && quantity >= product.stock) {
            enqueueSnackbar('Maximum Order Quantity', { variant: 'warning' });
            return;
        }
        dispatch(addItemsToCart(id, quantity));
    };

    return (
        <>
            <div className="modal fade show" id="quick-look" style={{ display: 'block' }}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content modal--shadow">
                        <button
                            className="btn dismiss-button fas fa-times"
                            type="button"
                            data-dismiss="modal"
                            onClick={() => props.closeModal()}
                        ></button>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-lg-5">
                                    <div class="pd-breadcrumb u-s-m-b-30">
                                        <ul class="pd-breadcrumb__list">
                                            <CategoryHerirarcy catgories={[product.category]} />
                                        </ul>
                                    </div>
                                    <ProductSlider images={product.images} />
                                </div>
                                <div class="col-lg-7">
                                    <div class="pd-detail">
                                        <Link to={`/product/${product._id}`} className="pd-detail__name">
                                            {product.name}
                                        </Link>
                                        <PriceTag price={product.price} cuttedPrice={product.cuttedPrice}></PriceTag>
                                        <div className="u-s-m-b-15">
                                            <Ratings ratings={product.ratings} numOfReviews={product.numOfReviews} starCount={5} />
                                        </div>
                                        <div className="u-s-m-b-15">
                                            <div className="pd-detail__inline">
                                                {product.stock <= 10 && product.stock > 0 && (
                                                    <span className="pd-detail__left">Only {product.stock} left</span>
                                                )}
                                                {product.stock > 10 && <span className="pd-detail__stock">{product.stock} in stock</span>}
                                            </div>
                                        </div>
                                        <div className="u-s-m-b-15">
                                            <span className="pd-detail__preview-desc">{product.description}</span>
                                        </div>
                                        <div className="u-s-m-b-15">
                                            <div className="pd-detail__inline">
                                                <span className="pd-detail__click-wrap">
                                                    <i
                                                        className={`${itemInWishlist ? 'fa fa-heart' : 'far fa-heart'} u-s-m-r-6`}
                                                        style={{ color: 'red' }}
                                                    ></i>
                                                    <a href="#" title="Add to Wishlist" onclick={() => addToWishlistHandler}>
                                                        Add to Wishlist
                                                    </a>
                                                    {/* <span className="pd-detail__click-count">(222)</span> */}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="u-s-m-b-15">
                                            <div class="pd-detail__inline">
                                                <span class="pd-detail__click-wrap">
                                                    <img
                                                        draggable="false"
                                                        className="w-20 h-8 p-0.5 border object-contain branch-img"
                                                        src={product.brand?.logo.url}
                                                        alt={product.brand && product.brand.name}
                                                    />
                                                    <a href="#">
                                                        {product.warranty} Year Warranty{' '}
                                                        <Link className="font-medium text-primary-blue" to="/">
                                                            Know More
                                                        </Link>
                                                    </a>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="u-s-m-b-15 highlights">
                                            <span class="pd-detail__label u-s-m-b-8">Highlights:</span>
                                            <ul>
                                                {product.highlights?.map((highlight, i) => (
                                                    <li key={i}>
                                                        <i className="fas fa-check u-s-m-r-8"></i>
                                                        <span>{highlight}</span>
                                                    </li>
                                                ))}
                                            </ul>
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
                                            <div className="pd-detail__form">
                                                <div className="u-s-m-b-15">
                                                    <div className="flex gap-16 mt-4 items-center text-sm font-medium">
                                                        <p className="text-gray-500">Delivery</p>
                                                        <span>Delivery by {getDeliveryDate()}</span>
                                                    </div>
                                                </div>
                                                <div className="pd-detail-inline-2">
                                                    <div className="u-s-m-b-15">
                                                        <div className="input-counter">
                                                            <span
                                                                className="input-counter__minus fas fa-minus"
                                                                onClick={() => setQuantity(quantity--)}
                                                            ></span>
                                                            <input
                                                                className="input-counter__text input-counter--text-primary-style"
                                                                type="text"
                                                                value={quantity}
                                                                data-min="1"
                                                                data-max="1000"
                                                            />
                                                            <span
                                                                className="input-counter__plus fas fa-plus"
                                                                onClick={() => setQuantity(quantity++)}
                                                            ></span>
                                                        </div>
                                                    </div>
                                                    <div className="u-s-m-b-15">
                                                        <button className="btn btn--e-brand-b-2" onClick={moveToCartHandler}>
                                                            Add to Cart
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="u-s-m-b-15 highlights">
                                            <span class="pd-detail__label u-s-m-b-8">Services:</span>
                                            <ul>
                                                <li>
                                                    <i className="fas fa-check-circle u-s-m-r-8"></i>
                                                    <span>{product.warranty} Year</span>
                                                </li>
                                                <li>
                                                    <i className="fas fa-sync u-s-m-r-8"></i>
                                                    <span> 7 Days Replacement Policy</span>
                                                </li>
                                                <li>
                                                    <i className="fa fa-inr u-s-m-r-8"></i>
                                                    <span>Cash on Delivery available</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-backdrop fade show"></div>
        </>
    );
};

export default QuickLookModal;