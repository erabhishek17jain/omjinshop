import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, signInUser } from '../../middleware/actions/userAction';
import { useSnackbar } from 'notistack';
import BackdropLoader from '../Layouts/BackdropLoader';
import MetaData from '../Layouts/MetaData';
import { getNavigation } from '../../utils/services';
import CryptoJS from 'crypto-js';
import Divider from '@mui/material/Divider';
import { setPath } from '../../middleware/actions/pathAction';

const SignIn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const location = useLocation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const { pathItems } = useSelector((state) => state.path);

    const reset = { title: 'Reset Password', path: '/password/reset', tab: 'reset' };
    const signUp = { title: 'SignUp', path: '/signUp/', tab: 'signUp' };

    const handleSignIn = (e) => {
        e.preventDefault();
        if (remember) {
            let encryptedPass = CryptoJS.AES.encrypt(password, 'omjinshop').toString();
            setWithExpiry('rememberMe', { remember, email, encryptedPass }, 3600000);
        }
        dispatch(signInUser(email, password));
    };

    const { loading, isAuthenticated, error } = useSelector((state) => state.user);
    const redirect = location.search ? location.search.split('=')[1] : 'account';

    function setWithExpiry(key, value, ttl) {
        const now = new Date();
        const item = {
            value: value,
            expiry: now.getTime() + ttl,
        };
        localStorage.setItem(key, JSON.stringify(item));
    }

    function getWithExpiry(key) {
        const itemStr = localStorage.getItem(key);
        if (!itemStr) {
            return null;
        }
        const item = JSON.parse(itemStr);
        const now = new Date();
        if (now.getTime() > item.expiry) {
            localStorage.removeItem(key);
            return null;
        }
        return item.value;
    }

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
        if (isAuthenticated) {
            navigate(`/${redirect}`);
        }
    }, [dispatch, error, isAuthenticated, redirect, navigate, enqueueSnackbar]);

    useEffect(() => {
        const val = getWithExpiry('rememberMe');
        if (val) {
            let bytes = CryptoJS.AES.decrypt(val.encryptedPass, 'omjinshop');
            let password = bytes.toString(CryptoJS.enc.Utf8);
            setEmail(val.email);
            setRemember(val.remember);
            setPassword(password);
        }
    }, []);

    return (
        <>
            <MetaData title='Sign In' />
            {loading && <BackdropLoader />}
            {getNavigation(pathItems)}
            <div className='u-s-p-b-60'>
                <div className='section__intro u-s-m-b-60'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-lg-12 col-md-12 col-sm-12'>
                                <div className='section__text-wrap'>
                                    <h1 className='section__heading u-c-secondary'>ALREADY REGISTERED?</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='section__content'>
                    <div className='container'>
                        <div className='row row--center'>
                            <div className='col-lg-11 col-md-12 u-s-m-b-12'>
                                <div className='l-f-o'>
                                    <div className='l-f-o__pad-box'>
                                        <div className='row row--center'>
                                            <div className='col-lg-5 col-md-8 u-s-m-b-30'>
                                                <h1 className='gl-h1'>I'M NEW CUSTOMER</h1>
                                                <span className='gl-text u-s-m-b-30'>
                                                    By creating an account with our store, you will be able to move through the checkout process faster, store
                                                    shipping addresses, view and track your orders in your account and more.
                                                </span>
                                                <div className='u-s-m-b-15'>
                                                    <a
                                                        href='#'
                                                        onClick={(e) => redirectTo(e, signUp, signUp.path.split('/').length - 1)}
                                                        className='btn btn--e-transparent-brand-b-2 u-s-m-l-15'
                                                    >
                                                        CREATE AN ACCOUNT
                                                    </a>
                                                </div>
                                            </div>
                                            <div className='col-lg-1 col-md-8 u-s-m-b-30'></div>
                                            <div className='col-lg-5 col-md-8 u-s-m-b-30'>
                                                <h1 className='gl-h1'>SIGNIN</h1>
                                                <form className='l-f-o__form' onSubmit={handleSignIn}>
                                                    <div className='u-s-m-b-30'>
                                                        <label className='gl-label' htmlFor='email'>
                                                            E-MAIL *
                                                        </label>
                                                        <input
                                                            type='text'
                                                            id='email'
                                                            required
                                                            value={email}
                                                            placeholder='Enter E-mail'
                                                            onChange={(e) => setEmail(e.target.value)}
                                                            className='input-text input-text--primary-style'
                                                        />
                                                    </div>
                                                    <div className='u-s-m-b-30'>
                                                        <label className='gl-label' htmlFor='password'>
                                                            PASSWORD *
                                                        </label>
                                                        <input
                                                            type='password'
                                                            id='password'
                                                            required
                                                            value={password}
                                                            placeholder='Enter Password'
                                                            onChange={(e) => setPassword(e.target.value)}
                                                            className='input-text input-text--primary-style'
                                                        />
                                                    </div>
                                                    <div className='u-s-m-b-20'>
                                                        <div className='check-box'>
                                                            <input
                                                                type='checkbox'
                                                                id='remember-me'
                                                                checked={remember}
                                                                onChange={(e) => setRemember(e.target.checked)}
                                                            />
                                                            <div className='check-box__state check-box__state--primary'>
                                                                <label className='check-box__label' htmlFor='remember-me'>
                                                                    Remember Me
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className='gl-inline'>
                                                        <div className='u-s-m-b-30'>
                                                            <button className='btn btn--e-transparent-brand-b-2' type='submit'>
                                                                LOGIN
                                                            </button>
                                                        </div>
                                                        <div className='u-s-m-b-30'>
                                                            <a
                                                                className='gl-link'
                                                                href='#'
                                                                onClick={(e) => redirectTo(e, reset, reset.path.split('/').length - 1)}
                                                            >
                                                                Lost Your Password?
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className='u-s-m-b-20'>
                                                        <Divider />
                                                    </div>
                                                    <span className='gl-text u-s-m-b-30'>If you have an account with us, please log in.</span>
                                                    <div className='gl-s-api'>
                                                        <div className='u-s-m-b-15'>
                                                            <button className='gl-s-api__btn gl-s-api__btn--fb' type='button'>
                                                                <i className='fab fa-facebook-f'></i>

                                                                <span>Signin with Facebook</span>
                                                            </button>
                                                        </div>
                                                        <div className='u-s-m-b-15'>
                                                            <button className='gl-s-api__btn gl-s-api__btn--gplus' type='button'>
                                                                <i className='fab fa-google'></i>

                                                                <span>Signin with Google</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </form>
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

export default SignIn;
