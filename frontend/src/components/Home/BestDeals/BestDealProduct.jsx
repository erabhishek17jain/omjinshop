import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../../../middleware/actions/wishlistAction';
import { useSnackbar } from 'notistack';
import { addItemsToCart } from '../../../middleware/actions/cartAction';
import { saveForLater } from '../../../middleware/actions/saveForLaterAction';
import AddToCartModal from '../../Layouts/Modals/AddToCartModal';
import QuickLookModal from '../../Layouts/Modals/QuickLookModal';
import { Link } from 'react-router-dom';

const BestDealProduct = ({ _id, name, images, ratings, numOfReviews, price, category, cuttedPrice }) => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const [quickLookModal, setQuickLookModal] = useState(false);
    const [addToCartModal, setAddToCartModal] = useState(false);

    const { cartItems } = useSelector((state) => state.cart);
    const itemInCart = cartItems.filter((i) => i.product === _id);
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
        if (itemInCart[0].quantity < 10) {
            dispatch(addItemsToCart(_id, itemInCart[0].quantity + 1)).then(function (result) {
                setAddToCartModal(true);
            });
        } else {
            enqueueSnackbar('Sorry we dont allow more then 10 units', { variant: 'warning' });
        }
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
        <div className='col-lg-6 col-md-6 u-s-m-b-30' key={_id}>
            <div className='product-o product-o--radius product-o--hover-off u-h-100'>
                <div className='product-o__wrap'>
                    <a className='aspect aspect--bg-grey aspect--square u-d-block' href='product-#'>
                        <img className='aspect__img' src={images[0].url} alt={name} />
                    </a>
                    <div className='product-o__special-count-wrap'>
                        <div className='countdown countdown--style-special' data-countdown='2020/05/01'>
                            <div className='countdown__content'>
                                <div>
                                    <span className='countdown__value'>00</span>
                                    <span className='countdown__key'>Days</span>
                                </div>
                            </div>
                            <div className='countdown__content'>
                                <div>
                                    <span className='countdown__value'>00</span>
                                    <span className='countdown__key'>Hours</span>
                                </div>
                            </div>
                            <div className='countdown__content'>
                                <div>
                                    <span className='countdown__value'>00</span>
                                    <span className='countdown__key'>Mins</span>
                                </div>
                            </div>
                            <div className='countdown__content'>
                                <div>
                                    <span className='countdown__value'>00</span>
                                    <span className='countdown__key'>Secs</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='product-o__action-wrap'>
                        <ul className='product-o__action-list'>
                            <li key={'quick-look'}>
                                <a
                                    id='#quick-look'
                                    title='Quick View'
                                    onClick={() => {
                                        setQuickLookModal(true);
                                    }}
                                >
                                    <i className='fas fa-search-plus' key={_id}></i>
                                </a>
                            </li>
                            <li key={'alltocart'}>
                                <a
                                    data-modal='modal'
                                    data-modal-id='#add-to-cart'
                                    data-tooltip='tooltip'
                                    data-placement='top'
                                    title='Add to Cart'
                                    onClick={() => moveToCartHandler(_id, 1)}
                                >
                                    <i className='fas fa-plus-circle' key={_id}></i>
                                </a>
                            </li>
                            <li key={'wishlist'}>
                                <a href='#' data-tooltip='tooltip' data-placement='top' title='Add to Wishlist' onClick={addToWishlistHandler}>
                                    <i className='fas fa-heart' key={_id}></i>
                                </a>
                            </li>
                            <li key={'saveforlater'}>
                                <a
                                    href='#'
                                    data-tooltip='tooltip'
                                    data-placement='top'
                                    title='Email me When the price drops'
                                    onClick={() => saveForLaterHandler(_id)}
                                >
                                    <i className='fas fa-save' key={_id}></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <span className='product-o__category'>
                    <Link to={`/products/${category}`}>{category}</Link>
                </span>
                <span className='product-o__name'>
                    <Link to={`/product/${_id}`}>{name.length > 50 ? `${name.substring(0, 50)}...` : name}</Link>
                </span>
                <div className='product-l__rating gl-rating-style'>
                    {setRatings(ratings)}
                    <span className='product-o__review'>({numOfReviews})</span>
                </div>
                <span className='product-o__price'>
                    ₹{cuttedPrice.toLocaleString()}
                    <span className='product-o__discount'>₹{price.toLocaleString()}</span>
                </span>
            </div>
            {addToCartModal && (
                <AddToCartModal
                    closeModal={() => {
                        setAddToCartModal(false);
                    }}
                />
            )}
            {quickLookModal && (
                <QuickLookModal
                    closeModal={() => {
                        setQuickLookModal(false);
                    }}
                />
            )}
        </div>
    );
};

export default BestDealProduct;
