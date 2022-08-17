import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import EmptyBox from '../EmptyBox';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';

const CartPopup = () => {
    const { cartItems } = useSelector((state) => state.cart);

    return (
        <>
            <span className="js-menu-toggle"></span>
            <div className="mini-cart">
                <div className="mini-product-container gl-scroll u-s-m-b-15">
                    {cartItems && cartItems.length === 0 && <EmptyBox />}
                    {cartItems && Array.from(cartItems).map((item, index) => <CartPopupItem {...item} key={index} />)}
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

const CartPopupItem = (item) => {
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
            <a className="mini-product__delete-link far fa-trash-alt"></a>
        </div>
    );
};

export default CartPopup;
