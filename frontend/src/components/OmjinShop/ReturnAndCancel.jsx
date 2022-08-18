import React, { useState } from 'react';
import MetaData from '../Layouts/MetaData';
import OrderSideBar from '../User/Orders/OrderDetails/OrderSideBar';
import Sidebar from '../User/Accounts/Sidebar';
import { getNavigation } from '../../utils/services';

const ReturnAndCancel = () => {
    const [navigation] = useState([
        { title: 'Home', path: '/' },
        { title: 'Track Order', path: '/account/trackOrder' },
    ]);
    return (
        <>
            <MetaData title="Wishlist | Omjinshop" />
            {getNavigation(navigation)}
            <div className="u-s-p-b-60">
                <div className="section__content">
                    <div className="dash">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-3 col-md-12">
                                    <Sidebar activeTab={'profile'} />
                                    <OrderSideBar />
                                </div>
                                <div className="col-lg-9 col-md-12">
                                    <div className="dash__box dash__box--shadow dash__box--radius dash__box--bg-white">
                                        <div className="dash__pad-2">
                                            <h1 className="dash__h1 u-s-m-b-14">Return Policies</h1>

                                            <span className="dash__text">No policies for now</span>
                                        </div>
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

export default ReturnAndCancel;
