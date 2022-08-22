import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword, clearErrors } from '../../../middleware/actions/userAction';
import { useSnackbar } from 'notistack';
import BackdropLoader from '../../Layouts/BackdropLoader';
import MetaData from '../../Layouts/MetaData';
import FormSidebar from '../../../components/Layouts/FormSidebar';
import React from 'react';
import { setPath } from '../../../middleware/actions/pathAction';
import { getNavigation } from '../../../utils/services';

const ResetPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const params = useParams();

    const { error, success, loading } = useSelector((state) => state.forgotPassword);
    const { pathItems } = useSelector((state) => state.path);
    const signIn = { title: 'Sign In', path: '/signIn/', tab: 'signIn' };
    const signUp = { title: 'Sign Up', path: '/signUp/', tab: 'signUp' };

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e) => {
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
        formData.set('password', newPassword);
        formData.set('confirmPassword', confirmPassword);
        dispatch(resetPassword(params.token, formData));
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
        if (success) {
            enqueueSnackbar('Password Updated Successfully', {
                variant: 'success',
            });
            navigate('/signIn');
        }
    }, [dispatch, error, success, navigate, enqueueSnackbar]);

    return (
        <>
            <MetaData title='Password Reset' />
            {loading && <BackdropLoader />}
            {getNavigation(pathItems)}
            <div className='u-s-p-b-60'>
                <div className='section__content'>
                    <div className='container'>
                        <div className='row row--center'>
                            <div className='col-lg-6 col-md-8 u-s-m-b-30'>
                                <div className='l-f-o'>
                                    <div className='l-f-o__pad-box'>
                                        <h1 className='gl-h1'>RESET PASSWORD</h1>
                                        <span className='gl-text u-s-m-b-30'>
                                            Select New Password to get access to your Orders, Wishlist and Recommendations.
                                        </span>
                                        <form className='l-f-o__form' onSubmit={handleSubmit}>
                                            <div className='u-s-m-b-30'>
                                                <label className='gl-label' htmlFor='reset-pass'>
                                                    NEW PASSWORD *
                                                </label>
                                                <input
                                                    required
                                                    id='reset-pass'
                                                    placeholder='New Password'
                                                    type='password'
                                                    name='newPassword'
                                                    value={newPassword}
                                                    onChange={(e) => setNewPassword(e.target.value)}
                                                    className='input-text input-text--primary-style'
                                                />
                                            </div>
                                            <div className='u-s-m-b-30'>
                                                <label className='gl-label' htmlFor='reset-cpass'>
                                                    CONFIRM PASSWORD *
                                                </label>
                                                <input
                                                    required
                                                    id='reset-cpass'
                                                    placeholder='Confirm New Password'
                                                    type='password'
                                                    name='confirmPassword'
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                    className='input-text input-text--primary-style'
                                                />
                                            </div>
                                            <div className='u-s-m-b-30'>
                                                <button className='btn btn--e-transparent-brand-b-2' type='submit'>
                                                    SUBMIT
                                                </button>
                                            </div>
                                            <div className='u-s-m-b-30'>
                                                <a className='gl-link' href='#' onClick={(e) => redirectTo(e, signIn, signIn.path.split('/').length - 1)}>
                                                    Back to Sign In{' '}
                                                </a>
                                                <a className='gl-link' href='#' onClick={(e) => redirectTo(e, signUp, signUp.path.split('/').length - 1)}>
                                                    | Create New Account
                                                </a>
                                            </div>
                                        </form>
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

export default ResetPassword;
