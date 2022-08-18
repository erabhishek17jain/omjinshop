import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import EmptyBox from '../../Layouts/EmptyBox';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { removeItemsFromCart } from '../../../middleware/actions/cartAction';
import Divider from '@mui/material/Divider';

const HeaderCart = () => {
    const { cartItems } = useSelector((state) => state.cart);

    return (
        <>
            <span className="js-menu-toggle"></span>
            <div className="mini-cart">
                <div className="mini-product-container gl-scroll u-s-m-b-15">
                    {cartItems && cartItems.length === 0 && <EmptyBox type={'cartPopup'} title={'cart'} />}
                    {cartItems && Array.from(cartItems).map((item, index) => <HeaderCartItem {...item} key={index} />)}
                </div>
                <div className="u-s-m-b-20">
                    <Divider />
                </div>
                {cartItems && (
                    <div className="mini-product-stat">
                        <div className="mini-total">
                            <span className="subtotal-text">SUBTOTAL</span>
                            <span className="subtotal-value">
                                ₹
                                {cartItems.reduce((accumulator, item) => {
                                    return accumulator + item.cuttedPrice * item.quantity;
                                }, 0)}
                            </span>
                        </div>
                        <div className="mini-action">
                            <Link className="mini-link btn--e-brand-b-2" to="/login?redirect=shipping">
                                PROCEED TO CHECKOUT
                            </Link>
                            <Link to="/cart" className="mini-link btn--e-transparent-secondary-b-2">
                                VIEW CART
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

const HeaderCartItem = (item) => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const removeCartItem = (id) => {
        dispatch(removeItemsFromCart(id));
        enqueueSnackbar('Product Removed From Cart', { variant: 'success' });
    };
    return (
        <div className="card-mini-product">
            <div className="mini-product">
                <div className="mini-product__image-wrapper">
                    <a className="mini-product__link" href="product-#">
                        <img className="u-img-fluid" src={item.image} alt={item.name} />
                    </a>
                </div>
                <div className="mini-product__info-wrapper">
                    <span className="mini-product__category">
                        <a href="#">Electronics</a>
                    </span>
                    <span className="mini-product__name">
                        <a href="product-#">{item.name.length > 42 ? `${item.name.substring(0, 42)}...` : item.name}</a>
                    </span>
                    <span className="mini-product__quantity">{item.quantity} x</span>
                    <span className="mini-product__price">₹{item.cuttedPrice}</span>
                </div>
            </div>
            <a className="mini-product__delete-link far fa-trash-alt" onClick={() => removeCartItem(item.product)}></a>
        </div>
    );
};

export default HeaderCart;
