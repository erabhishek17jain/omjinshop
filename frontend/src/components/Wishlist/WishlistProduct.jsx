import { Link } from 'react-router-dom';
import { getDiscount } from '../../utils/functions';
import DeleteIcon from '@mui/icons-material/Delete';
import StarIcon from '@mui/icons-material/Star';
import { removeFromWishlist } from '../../actions/wishlistAction';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { addItemsToCart } from '../../actions/cartAction';
import React from 'react';

const WishlistProduct = (props) => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const { product, name, price, cuttedPrice, image, ratings, reviews, category } = props;

    const removeFromWishlistHandler = (product) => {
        dispatch(removeFromWishlist(product));
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
            <div className="w-r u-s-m-b-30">
                <div className="w-r__container">
                    <div className="w-r__wrap-1">
                        <div className="w-r__img-wrap">
                            <img className="u-img-fluid" src={image} alt={name} />
                        </div>
                        <div className="w-r__info">
                            <div className="product-l__rating gl-rating-style">
                                {setRatings()}
                                <span className="product-o__review">({reviews})</span>
                            </div>
                            <span className="w-r__name">
                                <a href="#">{name.length > 85 ? `${name.substring(0, 85)}...` : name}</a>
                            </span>
                            <span className="w-r__category">
                                <a href="#">{category}</a>
                            </span>
                            <span className="w-r__price">
                                ₹{cuttedPrice.toLocaleString()}
                                <span className="w-r__discount">₹{price.toLocaleString()}</span>
                            </span>
                        </div>
                    </div>
                    <div className="w-r__wrap-2">
                        <a
                            className="w-r__link btn--e-brand-b-2"
                            data-modal="modal"
                            data-modal-id="#add-to-cart"
                            onClick={() => moveToCartHandler(product, 1)}
                        >
                            ADD TO CART
                        </a>
                        <Link to={`/product/${product}`} className="w-r__link btn--e-transparent-platinum-b-2" href="#">
                            VIEW
                        </Link>
                        <a className="w-r__link btn--e-transparent-platinum-b-2" href="#" onClick={() => removeFromWishlistHandler(product)}>
                            REMOVE
                        </a>
                    </div>
                </div>
            </div>
            {/* <div className="flex gap-4 border-b p-4 sm:pb-8 w-full group overflow-hidden">
        <div className="w-1/6 h-28 flex-shrink-0">
          <img draggable="false" className="h-full w-full object-contain" src={image} alt={name} />
        </div>
        <div className="flex flex-col gap-5 w-full p-1">
          <div className="flex justify-between items-start sm:pr-5">
            <Link to={`/product/${product}`} className="flex flex-col gap-0.5">
              <p className="group-hover:text-primary-blue w-56 sm:w-full truncate">{name.length > 85 ? `${name.substring(0, 85)}...` : name}</p>
              <span className="text-sm text-gray-500 font-medium flex gap-2 items-center">
                <span className="text-xs px-1.5 py-0.5 bg-primary-green rounded-sm text-white flex items-center gap-0.5">
                  {ratings} <StarIcon sx={{ fontSize: '14px' }} />
                </span>
                <span>({reviews.toLocaleString()})</span>
              </span>
            </Link>
            <button onClick={removeFromWishlistHandler} className="text-gray-400 hover:text-red-500">
              <span>
                <DeleteIcon />
              </span>
            </button>
          </div>
          <div className="flex items-center gap-2 text-2xl font-medium">
            <span>₹{price.toLocaleString()}</span>
            <span className="text-sm text-gray-500 line-through font-normal mt-1">₹{cuttedPrice.toLocaleString()}</span>
            <span className="text-sm text-primary-green mt-1">{getDiscount(price, cuttedPrice)}%&nbsp;off</span>
          </div>
        </div>
      </div> */}
        </>
    );
};

export default WishlistProduct;
