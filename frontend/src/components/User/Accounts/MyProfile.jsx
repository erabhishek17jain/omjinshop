import React, { useState } from 'react';
import MetaData from '../../Layouts/MetaData';
import OrderSideBar from '../Orders/OrderDetails/OrderSideBar';
import Sidebar from '../Accounts/Sidebar';
import { getNavigation } from '../../../utils/services';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const MyProfile = () => {
    const { user } = useSelector((state) => state.user);
    const [navigation] = useState([
        { title: 'Home', path: '/' },
        { title: 'Profile', path: '/account/profile' },
    ]);
    return (
        <>
            <MetaData title="Profile" />
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
                                    <div className="section__content">
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-lg-12 col-md-12">
                                                    <div className="dash__box dash__box--shadow dash__box--radius dash__box--bg-white u-s-m-b-30">
                                                        <div className="dash__pad-2">
                                                            <h1 className="dash__h1 u-s-m-b-14">Profile</h1>
                                                            <span className="dash__text u-s-m-b-30">
                                                                Look all your info, you could customize your profile.
                                                            </span>
                                                            <div className="row">
                                                                <div className="col-lg-4 u-s-m-b-30">
                                                                    <h2 className="dash__h2 u-s-m-b-8">Full Name</h2>
                                                                    <span className="dash__text">{user.name}</span>
                                                                </div>
                                                                <div className="col-lg-4 u-s-m-b-30">
                                                                    <h2 className="dash__h2 u-s-m-b-8">E-mail</h2>
                                                                    <span className="dash__text">{user.email}</span>
                                                                </div>
                                                                <div className="col-lg-4 u-s-m-b-30">
                                                                    <h2 className="dash__h2 u-s-m-b-8">Phone</h2>
                                                                    <span className="dash__text">{user.name}</span>
                                                                </div>
                                                                <div className="col-lg-4 u-s-m-b-30">
                                                                    <h2 className="dash__h2 u-s-m-b-8">Birthday</h2>
                                                                    <span className="dash__text">{user.name}</span>
                                                                </div>
                                                                <div className="col-lg-4 u-s-m-b-30">
                                                                    <h2 className="dash__h2 u-s-m-b-8">Gender</h2>
                                                                    <span className="dash__text">{user.gender}</span>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-lg-12">
                                                                    <div className="dash__link dash__link--secondary u-s-m-b-30">
                                                                        <a data-modal="modal" data-modal-id="#dash-newsletter">
                                                                            Subscribe Newsletter
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                                <div className="u-s-m-b-16">
                                                                    <Link
                                                                        to="/account/update"
                                                                        className="dash__custom-link btn--e-transparent-brand-b-2"
                                                                    >
                                                                        Edit Profile
                                                                    </Link>
                                                                </div>
                                                                <div className="u-s-m-l-16">
                                                                    <Link
                                                                        to="/password/update"
                                                                        className="dash__custom-link btn--e-brand-b-2"
                                                                        href="#"
                                                                    >
                                                                        Change Password
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
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
export default MyProfile;
