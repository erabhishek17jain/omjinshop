import { Link } from 'react-router-dom';
import { setRatings } from '../../../utils/services';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../../../middleware/actions/wishlistAction';
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

    return (
        <li className="column-product__item" key={_id}>
            <div className="product-l">
                <div className="product-l__img-wrap">
                    <Link to={`/product/${_id}`} className="aspect aspect--bg-grey aspect--square u-d-block product-l__link">
                        <img className="aspect__img" src={images[0].url} alt={name} />
                    </Link>
                </div>
                <div className="product-l__info-wrap">
                    {type === 'flash' && <div className="product-l__rating gl-rating-style">{setRatings(ratings)}</div>}
                    <span className="product-l__category">
                        <Link to={`/product/${category}`}>{category}</Link>
                    </span>
                    <span className="product-l__name">
                        <Link to={`/product/${_id}`}>{name.length > 50 ? `${name.substring(0, 50)}...` : name}</Link>
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
