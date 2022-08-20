import React, { useEffect } from 'react';
import Sidebar from '../Layouts/Sidebar';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from '../Layouts/Loader';
import MetaData from '../Layouts/MetaData';
import MyAccount from './Accounts/MyAccount';
import RecentOrders from './Orders/OrderDetails/RecentOrders';
import OrderSideBar from './Orders/OrderDetails/OrderSideBar';
import { getNavigation } from '../../utils/services';

const Account = () => {
    const navigate = useNavigate();
    const { loading, isAuthenticated } = useSelector((state) => state.user);
    const { pathItems } = useSelector((state) => state.path);

    useEffect(() => {
        if (isAuthenticated === false) {
            navigate('/signIn');
        }
    }, [isAuthenticated, navigate]);

    return (
        <>
            <MetaData title="Profile" />
            {loading ? (
                <Loader />
            ) : (
                <>
                    {getNavigation(pathItems)}
                    <div className="u-s-p-b-60">
                        <div className="section__content">
                            <div className="dash">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-lg-3 col-md-12">
                                            <Sidebar activeTab={'account'} />
                                            <OrderSideBar />
                                        </div>
                                        <div className="col-lg-9 col-md-12">
                                            <MyAccount />
                                            <RecentOrders />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default Account;
