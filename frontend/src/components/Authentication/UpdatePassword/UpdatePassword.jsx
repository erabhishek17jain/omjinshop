import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { useSnackbar } from 'notistack';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, loadUser, updatePassword } from '../../../middleware/actions/userAction';
import { UPDATE_PASSWORD_RESET } from '../../../middleware/constants/userConstants';
import BackdropLoader from '../../Layouts/BackdropLoader';
import MetaData from '../../Layouts/MetaData';
import FormSidebar from '../../../components/Layouts/FormSidebar';
import OrderSideBar from '../../User/Orders/OrderDetails/OrderSideBar';
import Sidebar from '../../Layouts/Sidebar';
import { getNavigation } from '../../../utils/services';
import { setPath } from '../../../middleware/actions/pathAction';

const UpdatePassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const { error, isUpdated, loading } = useSelector((state) => state.profile);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { pathItems } = useSelector((state) => state.path);
    const profile = { title: 'Profile', path: '/account/profile', tab: 'profile' };

    const updatePasswordSubmitHandler = (e) => {
        e.preventDefault();

        if (newPassword.length < 8) {
            enqueueSnackbar('Password length must be atleast 8 characters', { variant: 'warning' });
            return;
        }
        if (newPassword !== confirmPassword) {
            enqueueSnackbar("Password Doesn't Match", { variant: 'error' });
            return;
        }

        const formData = new FormData();
        formData.set('oldPassword', oldPassword);
        formData.set('newPassword', newPassword);
        formData.set('confirmPassword', confirmPassword);

        dispatch(updatePassword(formData)).then(() => {
            redirectTo('', profile, profile.path.split('/').length - 1);
        });
    };

    const redirectTo = (e, path, i) => {
        if (e !== '') e.preventDefault();
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

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: 'error' });
            dispatch(clearErrors());
        }
        if (isUpdated) {
            enqueueSnackbar('Password Updated Successfully', { variant: 'success' });
            dispatch(loadUser());
            navigate('/account/profile');
            dispatch({ type: UPDATE_PASSWORD_RESET });
        }
    }, [dispatch, error, isUpdated, navigate, enqueueSnackbar]);

    return (
        <>
            <MetaData title='Password Update' />
            {loading && <BackdropLoader />}
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
                                <div className='col-lg-9 col-md-8 u-s-m-b-30'>
                                    <div className='l-f-o'>
                                        <div className='l-f-o__pad-box'>
                                            <h1 className='gl-h1'>CHANGE PASSWORD</h1>
                                            <span className='gl-text u-s-m-b-30'>
                                                Looks like you want to update password! Enter your current and new password to update
                                            </span>
                                            <form className='l-f-o__form' onSubmit={updatePasswordSubmitHandler}>
                                                <div className='u-s-m-b-30'>
                                                    <label className='gl-label' for='current'>
                                                        CURRENT PASSWORD *
                                                    </label>
                                                    <input
                                                        required
                                                        id='current'
                                                        type='password'
                                                        name='oldPassword'
                                                        value={oldPassword}
                                                        placeholder='Enter Current Password'
                                                        onChange={(e) => setOldPassword(e.target.value)}
                                                        className='input-text input-text--primary-style'
                                                    />
                                                </div>
                                                <div className='u-s-m-b-30'>
                                                    <label className='gl-label' for='new'>
                                                        NEW PASSWORD *
                                                    </label>
                                                    <input
                                                        required
                                                        id='new'
                                                        type='password'
                                                        name='newPassword'
                                                        value={newPassword}
                                                        placeholder='Enter New Password'
                                                        onChange={(e) => setNewPassword(e.target.value)}
                                                        className='input-text input-text--primary-style'
                                                    />
                                                </div>
                                                <div className='u-s-m-b-30'>
                                                    <label className='gl-label' for='confirm'>
                                                        CONFIRM PASSWORD *
                                                    </label>
                                                    <input
                                                        required
                                                        id='confirm'
                                                        type='password'
                                                        name='confirmPassword'
                                                        value={confirmPassword}
                                                        placeholder='Enter Confirm Password'
                                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                                        className='input-text input-text--primary-style'
                                                    />
                                                </div>
                                                <button className='btn btn--e-brand-b-2' type='submit'>
                                                    SAVE
                                                </button>
                                                <a
                                                    href='#'
                                                    onClick={(e) => redirectTo(e, profile, profile.path.split('/').length - 1)}
                                                    className='btn btn--e-transparent-brand-b-2 u-s-m-l-15'
                                                >
                                                    CANCEL
                                                </a>
                                            </form>
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

export default UpdatePassword;
