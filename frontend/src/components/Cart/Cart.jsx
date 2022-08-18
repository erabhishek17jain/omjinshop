import React, { useState } from 'react';
import { getNavigation } from '../../utils/services';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MetaData from '../Layouts/MetaData';
import CartItem from './CartItem/CartItem';
import EmptyBox from '../Layouts/EmptyBox';
import PriceSidebar from '../User/Orders/Shipping/PriceSidebar';
import SaveForLater from './SaveForLater/SaveForLater';

const Cart = () => {
    const navigate = useNavigate();
    const { cartItems } = useSelector((state) => state.cart);
    const { saveForLaterItems } = useSelector((state) => state.saveForLater);

    const placeOrderHandler = () => {
        navigate('/login?redirect=shipping');
    };

    const [navigation] = useState([
        { title: 'Home', path: '/' },
        { title: 'Checkout', path: '/cart' },
    ]);

    return (
        <>
            <MetaData title="Shopping Cart | Omjinshop" />
            {getNavigation(navigation)}
            <div className="u-s-p-b-60">
                <div className="section__content">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 u-s-m-b-30">
                                {cartItems && cartItems.length === 0 && <EmptyBox />}
                                {cartItems && (
                                    <div className="table-responsive">
                                        <table className="table-p">
                                            <tbody>
                                                {Array.from(cartItems).map((item) => (
                                                    <CartItem {...item} inCart={true} />
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                            <div className="col-lg-12 u-s-m-b-30">
                                <div className="route-box">
                                    <div className="route-box__g1">
                                        <a className="route-box__link" href="#">
                                            <i className="fas fa-long-arrow-alt-left"></i>
                                            <span>CONTINUE SHOPPING</span>
                                        </a>
                                    </div>
                                    <div className="route-box__g2">
                                        <a className="route-box__link" href="#">
                                            <i className="fas fa-trash"></i>
                                            <span>CLEAR CART</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="row">
                                    <div className="col-lg-12 col-md-12 col-sm-12 u-s-m-b-30">
                                        {saveForLaterItems && saveForLaterItems.length === 0 && <EmptyBox />}
                                        {saveForLaterItems && (
                                            <div className="table-responsive">
                                                <table className="table-p">
                                                    <tbody>{saveForLaterItems && saveForLaterItems.map((item) => <SaveForLater {...item} />)}</tbody>
                                                </table>
                                            </div>
                                        )}
                                    </div>
                                    <div className="col-lg-12 u-s-m-b-30">
                                        <div className="route-box">
                                            <div className="route-box__g1">
                                                <a className="route-box__link" href="#">
                                                    <i className="fas fa-sync"></i>
                                                    <span>SAVED FOR LATER ({saveForLaterItems.length})</span>
                                                </a>
                                            </div>
                                            <div className="route-box__g2">
                                                <a className="route-box__link" href="#">
                                                    <i className="fas fa-trash"></i>
                                                    <span>CLEAR ALL</span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 u-s-m-b-30">
                                <PriceSidebar cartItems={cartItems} placeOrderHandler={placeOrderHandler} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <main className="w-full mt-20">
        <div className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-11/12 mt-0 sm:mt-4 m-auto sm:mb-7">
          <div className="flex-1">
            <div className="flex flex-col shadow bg-white">
              <span className="font-medium text-lg px-2 sm:px-8 py-4 border-b">My Cart ({cartItems.length})</span>

              {cartItems && cartItems.length === 0 && <EmptyBox />}

              {cartItems && cartItems.map((item) => <CartItem {...item} inCart={true} />)}
              <div className="flex justify-end">
                <button
                  onClick={placeOrderHandler}
                  disabled={cartItems.length < 1 ? true : false}
                  className={`${
                    cartItems.length < 1 ? 'bg-primary-grey cursor-not-allowed' : 'bg-primary-orange'
                  } w-full sm:w-1/3 mx-2 sm:mx-6 my-4 py-3 font-medium text-white shadow hover:shadow-lg rounded-sm`}
                >
                  PLACE ORDER
                </button>
              </div>
            </div>
            <div className="flex flex-col mt-5 shadow bg-white">
              <span className="font-medium text-lg px-2 sm:px-8 py-4 border-b">Saved For Later ({saveForLaterItems.length})</span>
              {saveForLaterItems && saveForLaterItems.map((item) => <SaveForLater {...item} />)}
            </div>
          </div>
          <PriceSidebar cartItems={cartItems} />
        </div>
      </main> */}
        </>
    );
};

export default Cart;
