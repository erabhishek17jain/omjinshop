import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRatings, getDiscount } from '../../../utils/services';
import { addToWishlist, removeFromWishlist } from '../../../middleware/actions/wishlistAction';
import { useSnackbar } from 'notistack';
import { addItemsToCart } from '../../../middleware/actions/cartAction';
import { saveForLater } from '../../../middleware/actions/saveForLaterAction';
import AddToCartModal from '../../Layouts/Modals/AddToCartModal';
import QuickLookModal from '../../Layouts/Modals/QuickLookModal';
import { Link } from 'react-router-dom';
import PriceTag from '../../Layouts/PriceTag';
import Ratings from '../../Layouts/Ratings';

const FeaturedProduct = ({ _id, name, images, ratings, numOfReviews, price, category, cuttedPrice }) => {
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

    const moveToCartHandler = () => {
        if (itemInCart[0].quantity < 10) {
            dispatch(addItemsToCart(_id, itemInCart[0].quantity + 1)).then(function (result) {
                setAddToCartModal(true);
            });
        } else {
            enqueueSnackbar('Sorry we dont allow more then 10 units', { variant: 'warning' });
        }
    };

    const saveForLaterHandler = () => {
        dispatch(saveForLater(_id));
        enqueueSnackbar('Saved For Later', { variant: 'success' });
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
                                <a
                                    id="#quick-look"
                                    title="Quick View"
                                    onClick={() => {
                                        setQuickLookModal(true);
                                    }}
                                >
                                    <i className="fas fa-search-plus"></i>
                                </a>
                            </li>
                            <li>
                                <a title="Add to Cart" onClick={moveToCartHandler}>
                                    <i className="fas fa-plus-circle"></i>
                                </a>
                            </li>
                            <li>
                                <a title="Add to Wishlist" onClick={addToWishlistHandler}>
                                    <i className="fas fa-heart"></i>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    data-tooltip="tooltip"
                                    data-placement="top"
                                    title="Email me When the price drops"
                                    onClick={saveForLaterHandler}
                                >
                                    <i className="fas fa-save"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <Link to={`/product/${_id}`}>
                    <span className="product-o__category">
                        <Link to={`/products/${category}`}>{category}</Link>
                    </span>
                    <span className="product-o__name">
                        <Link to={`/product/${_id}`}>{name.length > 50 ? `${name.substring(0, 50)}...` : name}</Link>
                    </span>
                    <Ratings ratings={ratings} numOfReviews={numOfReviews} starCount={5} />
                    <PriceTag type={'feature'} price={price} cuttedPrice={cuttedPrice} />
                </Link>
            </div>
            {addToCartModal && (
                <AddToCartModal
                    _id={_id}
                    name={name}
                    images={images[0].url}
                    cuttedPrice={cuttedPrice}
                    quantity={itemInCart[0].quantity}
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

export default FeaturedProduct;
