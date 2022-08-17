import React from 'react';
import { useSelector } from 'react-redux';
import MetaData from '../Layouts/MetaData';
import MinCategory from '../Layouts/MinCategory';
import Sidebar from '../User/Sidebar';
import WishlistProduct from './WishlistProduct';

const Wishlist = () => {
    const { wishlistItems } = useSelector((state) => state.wishlist);

    return (
        <>
            <MetaData title="Wishlist | Omjinshop" />
            <div className="col-lg-9 col-md-12">
                <div className="section__content">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12">
                                {wishlistItems.map((item, index) => <WishlistProduct {...item} key={index} />).reverse()}
                            </div>
                            <div className="col-lg-12">
                                <div className="route-box">
                                    <div className="route-box__g">
                                        <a className="route-box__link" href="#">
                                            <i className="fas fa-long-arrow-alt-left"></i>
                                            <span>CONTINUE SHOPPING</span>
                                        </a>
                                    </div>
                                    <div className="route-box__g">
                                        <a className="route-box__link" href="#">
                                            <i className="fas fa-trash"></i>
                                            <span>CLEAR WISHLIST</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <main className="w-full mt-12 sm:mt-0">
        <div className="flex gap-3.5 sm:w-11/12 sm:mt-4 m-auto mb-7">
          <Sidebar activeTab={'wishlist'} />
          <div className="flex-1 shadow bg-white">
            <div className="flex flex-col">
              <span className="font-medium text-lg px-4 sm:px-8 py-4 border-b">My Wishlist ({wishlistItems.length})</span>
              {wishlistItems.length === 0 && (
                <div className="flex items-center flex-col gap-2 m-6">
                  <img
                    draggable="false"
                    className="object-contain"
                    src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/mywishlist-empty_39f7a5.png"
                    alt="Empty Wishlist"
                  />
                  <span className="text-lg font-medium mt-6">Empty Wishlist</span>
                  <p>You have no items in your wishlist. Start adding!</p>
                </div>
              )}
              {wishlistItems.map((item, index) => <WishlistProduct {...item} key={index} />).reverse()}
            </div>
          </div>
        </div>
      </main> */}
        </>
    );
};

export default Wishlist;
