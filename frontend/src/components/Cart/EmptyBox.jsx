import React from 'react';
import { Link } from 'react-router-dom';

const EmptyBox = (type) => {
    return (
        <>
            {/* <div className="flex items-center flex-col gap-2 m-6">
        <div className="w-52 h-44">
          <img
            draggable="false"
            className="w-full h-full object-contain"
            src="https://rukminim1.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png"
            alt="Empty Cart"
          />
        </div>
        <span className="text-lg">Your cart is empty!</span>
        <p className="text-xs">Add items to it now.</p>
        <Link to="/products" className="bg-primary-blue text-sm text-white px-12 py-2 rounded-sm shadow mt-3">
          Shop Now
        </Link>
      </div> */}
            <div className="u-s-p-y-60">
                <div className="section__content">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 u-s-m-b-30">
                                <div className="empty">
                                    <div className="empty__wrap">
                                        <span className="empty__big-text">EMPTY</span>
                                        <span className="empty__text-1">No items found on your {type}.</span>
                                        <Link to="/products" className="empty__redirect-link btn--e-brand">
                                            CONTINUE SHOPPING
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EmptyBox;
