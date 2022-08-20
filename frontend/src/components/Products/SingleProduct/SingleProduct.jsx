import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../../../middleware/actions/wishlistAction';
import { addItemsToCart } from '../../../middleware/actions/cartAction';
import { useSnackbar } from 'notistack';
import React from 'react';

const SingleProduct = ({ _id, name, images, ratings, numOfReviews, category, description, price, cuttedPrice }) => {
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
        <>
            {/* <div className="flex flex-col items-start gap-2 px-4 py-6 relative hover:shadow-lg rounded-sm">
        <Link to={`/product/${_id}`} className="flex flex-col items-center text-center group">
          <div className="w-44 h-48">
            <img draggable="false" className="w-full h-full object-contain" src={images && images[0].url} alt="" />
          </div>
          <h2 className="text-sm mt-4 group-hover:text-primary-blue text-left">{name.length > 85 ? `${name.substring(0, 85)}...` : name}</h2>
        </Link>
        <div className="flex flex-col gap-2 items-start">
          <span className="text-sm text-gray-500 font-medium flex gap-2 items-center">
            <span className="text-xs px-1.5 py-0.5 bg-primary-green rounded-sm text-white flex items-center gap-0.5">
              {ratings.toFixed(1)} <StarIcon sx={{ fontSize: '14px' }} />
            </span>
            <span>({numOfReviews})</span>
          </span>
          <div className="flex items-center gap-1.5 text-md font-medium">
            <span>₹{price.toLocaleString()}</span>
            <span className="text-gray-500 line-through text-xs">₹{cuttedPrice.toLocaleString()}</span>
            <span className="text-xs text-primary-green">{getDiscount(price, cuttedPrice)}%&nbsp;off</span>
          </div>
        </div>
        <span
          onClick={addToWishlistHandler}
          className={`${itemInWishlist ? 'text-red-500' : 'hover:text-red-500 text-gray-300'} absolute top-6 right-6 cursor-pointer`}
        >
          <FavoriteIcon sx={{ fontSize: '18px' }} />
        </span>
      </div> */}
            <div className="col-lg-4 col-md-6 col-sm-6">
                <div className="product-m">
                    <div className="product-m__thumb">
                        <Link to={`/product/${_id}`}>
                            <a className="aspect aspect--bg-grey aspect--square u-d-block" href="#">
                                <img className="aspect__img" src={images && images[0].url} alt="Product Image" />
                            </a>
                            <div className="product-m__quick-look">
                                <a
                                    className="fas fa-search"
                                    data-modal="modal"
                                    data-modal-id="#quick-look"
                                    data-tooltip="tooltip"
                                    data-placement="top"
                                    title="Quick Look"
                                ></a>
                            </div>
                        </Link>
                        <div className="product-m__add-cart">
                            <a className="btn--e-brand" data-modal="modal" data-modal-id="#add-to-cart" onClick={() => moveToCartHandler(_id, 1)}>
                                Add to Cart
                            </a>
                        </div>
                    </div>
                    <div className="product-m__content">
                        <div className="product-m__category">
                            <Link to={`/product/${category}`}>{category}</Link>
                        </div>
                        <div className="product-m__name">
                            <Link to={`/product/${_id}`} href="#">
                                {name.length > 85 ? `${name.substring(0, 85)}...` : name}
                            </Link>
                        </div>
                        <div className="product-m__rating gl-rating-style">
                            {setRatings(ratings)}
                            <span className="product-m__review">({numOfReviews})</span>
                        </div>
                        <span className="product-l__price">
                            ₹{cuttedPrice.toLocaleString()}
                            <span className="product-l__discount">₹{price.toLocaleString()}</span>
                        </span>
                        <div className="product-m__hover">
                            <div className="product-m__preview-description">
                                <span>{description}</span>
                            </div>
                            <div className={itemInWishlist ? 'product-m__wishlist-heart' : 'product-m__wishlist'}>
                                <a
                                    href="#"
                                    className={itemInWishlist ? 'fa fa-heart' : 'far fa-heart'}
                                    color="yellow"
                                    data-tooltip="tooltip"
                                    data-placement="top"
                                    title="Add to Wishlist"
                                    onClick={addToWishlistHandler}
                                ></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SingleProduct;
