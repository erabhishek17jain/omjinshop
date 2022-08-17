import { Link } from 'react-router-dom';
import { getDiscount } from '../../../utils/functions';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../../../actions/wishlistAction';
import { useSnackbar } from 'notistack';
import React from 'react';

const OurProduct = ({ _id, name, images, ratings, price, category, cuttedPrice, type }) => {
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
        <li className="column-product__item">
            <div className="product-l">
                <div className="product-l__img-wrap">
                    <a className="aspect aspect--bg-grey aspect--square u-d-block product-l__link" href="product-#">
                        <img className="aspect__img" src={images[0].url} alt={name} />
                    </a>
                </div>
                <div className="product-l__info-wrap">
                    {type === 'flash' && <div className="product-l__rating gl-rating-style">{setRatings()}</div>}
                    <span className="product-l__category">
                        <a href="#">{category}</a>
                    </span>
                    <span className="product-l__name">
                        <a href="product-#">{name.length > 50 ? `${name.substring(0, 50)}...` : name}</a>
                    </span>
                    <span className="product-l__price">
                        ₹{cuttedPrice.toLocaleString()}
                        {type === 'weekly' && <span className="product-l__discount">₹{price.toLocaleString()}</span>}
                    </span>
                </div>
            </div>
        </li>
    );
};

export default OurProduct;
