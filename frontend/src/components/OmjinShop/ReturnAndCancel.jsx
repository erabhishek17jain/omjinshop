import React, { useState } from 'react';
import MetaData from '../Layouts/MetaData';
import OrderSideBar from '../User/Orders/OrderDetails/OrderSideBar';
import Sidebar from '../Layouts/Sidebar';
import { getNavigation } from '../../utils/services';
import { useSelector } from 'react-redux';

const ReturnAndCancel = () => {
    const { pathItems } = useSelector((state) => state.path);

    return (
        <>
            <MetaData title="Wishlist" />
            {getNavigation(pathItems)}
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
