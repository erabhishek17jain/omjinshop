import React from 'react';
import MetaData from '../../Layouts/MetaData';
import OrderSideBar from '../Orders/OrderDetails/OrderSideBar';
import Sidebar from '../../Layouts/Sidebar';
import { getNavigation } from '../../../utils/services';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setPath } from '../../../middleware/actions/pathAction';

const MyProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);
    const { pathItems } = useSelector((state) => state.path);
    const changePass = { title: 'Change Password', path: '/account/profile/update', tab: 'passwordUpdate' };
    const editProfile = { title: 'Edit Profile', path: '/account/profile/edit', tab: 'editProfile' };

    const redirectTo = (e, path, i) => {
        e.preventDefault();
        let newPath = pathItems;
        if (newPath.length === i) {
            newPath[newPath.length - 1] = path;
        } else if (newPath.length < i) {
            newPath.pop();
            if (path.path.indexOf('order') !== -1) {
                newPath.push({ title: 'Orders', path: '/account/orders', tab: 'adOrders' });
            } else if (path.path.indexOf('profile') !== -1) {
                newPath.push({ title: 'Profile', path: '/account/profile', tab: 'profile' });
            } else if (path.path.indexOf('addressBook') !== -1) {
                newPath.push({ title: 'Address Book', path: '/account/addressBook', tab: 'adReviews' });
            }
            newPath.push(path);
        } else if (newPath.length > i) {
            newPath.splice(i, newPath.length - 1);
            newPath[newPath.length - 1] = path;
        }
        dispatch(setPath(newPath)).then(() => {
            navigate(path.path);
        });
    };
    return (
        <>
            <MetaData title='Profile' />
            {getNavigation(pathItems)}
            <div className='u-s-p-b-60'>
                <div className='section__content'>
                    <div className='dash'>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-lg-3 col-md-12'>
                                    <Sidebar activeTab={'profile'} />
                                    <OrderSideBar />
                                </div>
                                <div className='col-lg-9 col-md-12'>
                                    <div className='section__content'>
                                        <div className='container'>
                                            <div className='row'>
                                                <div className='col-lg-12 col-md-12 col-sm-12'>
                                                    <div className='dash__box dash__box--shadow dash__box--radius dash__box--bg-white u-s-m-b-30'>
                                                        <div className='dash__pad-2'>
                                                            <h1 className='dash__h1 u-s-m-b-14'>Profile</h1>
                                                            <span className='dash__text u-s-m-b-30'>Look all your info, you could customize your profile.</span>
                                                            <div className='row'>
                                                                <div className='col-lg-4 u-s-m-b-30'>
                                                                    <h2 className='dash__h2 u-s-m-b-8'>Full Name</h2>
                                                                    <span className='dash__text'>{user.name}</span>
                                                                </div>
                                                                <div className='col-lg-4 u-s-m-b-30'>
                                                                    <h2 className='dash__h2 u-s-m-b-8'>E-mail</h2>
                                                                    <span className='dash__text'>{user.email}</span>
                                                                </div>
                                                                <div className='col-lg-4 u-s-m-b-30'>
                                                                    <h2 className='dash__h2 u-s-m-b-8'>Phone</h2>
                                                                    <span className='dash__text'>{user.mobile}</span>
                                                                </div>
                                                                <div className='col-lg-4 u-s-m-b-30'>
                                                                    <h2 className='dash__h2 u-s-m-b-8'>Birthday</h2>
                                                                    <span className='dash__text'>{new Date(user.birthDate).toLocaleDateString('en-GB')}</span>
                                                                </div>
                                                                <div className='col-lg-4 u-s-m-b-30'>
                                                                    <h2 className='dash__h2 u-s-m-b-8'>Gender</h2>
                                                                    <span className='dash__text'>{user.gender}</span>
                                                                </div>
                                                            </div>
                                                            <div className='row'>
                                                                <div className='u-s-m-b-16'>
                                                                    <a
                                                                        href='#'
                                                                        onClick={(e) => redirectTo(e, editProfile, editProfile.path.split('/').length - 1)}
                                                                        className='dash__custom-link btn--e-transparent-brand-b-2'
                                                                    >
                                                                        Edit Profile
                                                                    </a>
                                                                </div>
                                                                <div className='u-s-m-l-16'>
                                                                    <a
                                                                        href='#'
                                                                        onClick={(e) => redirectTo(e, changePass, changePass.path.split('/').length - 1)}
                                                                        className='dash__custom-link btn--e-brand-b-2'
                                                                    >
                                                                        Change Password
                                                                    </a>
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
