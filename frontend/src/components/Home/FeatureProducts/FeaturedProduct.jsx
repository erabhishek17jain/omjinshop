import { Link } from 'react-router-dom';
import { getDiscount } from '../../../utils/services';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../../../middleware/actions/wishlistAction';
import { useSnackbar } from 'notistack';
import { addItemsToCart } from '../../../middleware/actions/cartAction';
import { saveForLater } from '../../../middleware/actions/saveForLaterAction';
import React from 'react';

const FeaturedProduct = ({ _id, name, images, ratings, numOfReviews, price, category, cuttedPrice }) => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const { wishlistItems } = useSelector((state) => state.wishlist);
    const itemInWishlist = wishlistItems.some((i) => i.product === _id);

    const addToWishlistHandler = () => {
        if (itemInWishlist) {
            dispatch(removeFromWishlist(_id));
            enqueueSnackbar('Remove From Wishlist', { variant: 'success' });
        } else {
            dispatch(addToWishlist(_id));
            enqueueSnackbar('Added To Wishlist', { variant: 'success' });
        }
    };

    const moveToCartHandler = (id, quantity) => {
        dispatch(addItemsToCart(id, quantity));
        enqueueSnackbar('Product Added To Cart', { variant: 'success' });
    };

    const saveForLaterHandler = (id) => {
        dispatch(saveForLater(id));
        enqueueSnackbar('Saved For Later', { variant: 'success' });
    };

    const setRatings = () => {
        let ratingStar = [];
        let ratingInt = Math.trunc(ratings);
        let ratingDec = Number((ratings.toFixed(1) - ratingInt).toFixed(1));
        for (let star = 0; star < 5; star++) {
            ratingStar.push(
                star < ratingInt ? (
                    <i className="fas fa-star"></i>
                ) : ratingDec > 0 && ratingInt === star ? (
                    <i className="fas fa-star-half-alt"></i>
                ) : (
                    <i className="far fa-star"></i>
                )
            );
        }
        return ratingStar;
    };

    return (
        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 u-s-m-b-30">
            <div className="product-o product-o--hover-on u-h-100">
                <div className="product-o__wrap">
                    <a className="aspect aspect--bg-grey aspect--square u-d-block" href="#">
                        <img className="aspect__img" src={images[0].url} alt={name} />
                    </a>
                    <div className="product-o__action-wrap">
                        <ul className="product-o__action-list">
                            <li>
                                <a data-modal="modal" data-modal-id="#quick-look" data-tooltip="tooltip" data-placement="top" title="Quick View">
                                    <i className="fas fa-search-plus"></i>
                                </a>
                            </li>
                            <li>
                                <a
                                    data-modal="modal"
                                    data-modal-id="#add-to-cart"
                                    data-tooltip="tooltip"
                                    data-placement="top"
                                    title="Add to Cart"
                                    onClick={() => moveToCartHandler(_id, 1)}
                                >
                                    <i className="fas fa-plus-circle"></i>
                                </a>
                            </li>
                            <li>
                                <a href="#" data-tooltip="tooltip" data-placement="top" title="Add to Wishlist" onClick={addToWishlistHandler}>
                                    <i className="fas fa-heart"></i>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    data-tooltip="tooltip"
                                    data-placement="top"
                                    title="Email me When the price drops"
                                    onClick={() => saveForLaterHandler(_id)}
                                >
                                    <i className="fas fa-save"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <span className="product-o__category">
                    <a href="#">{category}</a>
                </span>
                <span className="product-o__name">
                    <a href="#">{name.length > 50 ? `${name.substring(0, 50)}...` : name}</a>
                </span>
                <div className="product-l__rating gl-rating-style">
                    {setRatings()}
                    <span className="product-o__review">({numOfReviews})</span>
                </div>
                <span className="product-o__price">
                    ₹{cuttedPrice.toLocaleString()}
                    <span className="product-o__discount">₹{price.toLocaleString()}</span>
                </span>
            </div>
        </div>
    );
};

export default FeaturedProduct;
