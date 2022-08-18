import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, loginUser } from '../../middleware/actions/userAction';
import { useSnackbar } from 'notistack';
import BackdropLoader from '../Layouts/BackdropLoader';
import MetaData from '../Layouts/MetaData';
import { getNavigation } from '../../utils/services';
import CryptoJS from 'crypto-js';
import Divider from '@mui/material/Divider';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const location = useLocation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);

    const [navigation] = useState([
        { title: 'Home', path: '/' },
        { title: 'Sign In', path: '/login' },
    ]);

    const handleLogin = (e) => {
        e.preventDefault();
        if (remember) {
            let encryptedPass = CryptoJS.AES.encrypt(password, 'omjinshop').toString();
            setWithExpiry('rememberMe', { remember, email, encryptedPass }, 3600000);
        }
        dispatch(loginUser(email, password));
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
            <MetaData title="Login" />
            {loading && <BackdropLoader />}
            {getNavigation(navigation)}
            <div className="u-s-p-b-60">
                <div className="section__intro u-s-m-b-60">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="section__text-wrap">
                                    <h1 className="section__heading u-c-secondary">ALREADY REGISTERED?</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="section__content">
                    <div className="container">
                        <div className="row row--center">
                            <div className="col-lg-11 col-md-12 u-s-m-b-12">
                                <div className="l-f-o">
                                    <div className="l-f-o__pad-box">
                                        <div className="row row--center">
                                            <div className="col-lg-5 col-md-8 u-s-m-b-30">
                                                <h1 className="gl-h1">I'M NEW CUSTOMER</h1>
                                                <span className="gl-text u-s-m-b-30">
                                                    By creating an account with our store, you will be able to move through the checkout process
                                                    faster, store shipping addresses, view and track your orders in your account and more.
                                                </span>
                                                <div className="u-s-m-b-15">
                                                    <Link to="/register" className="l-f-o__create-link btn--e-transparent-brand-b-2">
                                                        CREATE AN ACCOUNT
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="col-lg-1 col-md-8 u-s-m-b-30"></div>
                                            <div className="col-lg-5 col-md-8 u-s-m-b-30">
                                                <h1 className="gl-h1">SIGNIN</h1>
                                                <form className="l-f-o__form" onSubmit={handleLogin}>
                                                    <div className="u-s-m-b-30">
                                                        <label className="gl-label" htmlFor="email">
                                                            E-MAIL *
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id="email"
                                                            required
                                                            value={email}
                                                            placeholder="Enter E-mail"
                                                            onChange={(e) => setEmail(e.target.value)}
                                                            className="input-text input-text--primary-style"
                                                        />
                                                    </div>
                                                    <div className="u-s-m-b-30">
                                                        <label className="gl-label" htmlFor="password">
                                                            PASSWORD *
                                                        </label>
                                                        <input
                                                            type="password"
                                                            id="password"
                                                            required
                                                            value={password}
                                                            placeholder="Enter Password"
                                                            onChange={(e) => setPassword(e.target.value)}
                                                            className="input-text input-text--primary-style"
                                                        />
                                                    </div>
                                                    <div className="gl-inline">
                                                        <div className="u-s-m-b-30">
                                                            <button className="btn btn--e-transparent-brand-b-2" type="submit">
                                                                LOGIN
                                                            </button>
                                                        </div>
                                                        <div className="u-s-m-b-30">
                                                            <Link to="/password/forgot" className="gl-link">
                                                                Lost Your Password?
                                                            </Link>
                                                        </div>
                                                    </div>
                                                    <div className="u-s-m-b-20">
                                                        <div className="check-box">
                                                            <input
                                                                type="checkbox"
                                                                id="remember-me"
                                                                checked={remember}
                                                                onChange={(e) => setRemember(e.target.checked)}
                                                            />
                                                            <div className="check-box__state check-box__state--primary">
                                                                <label className="check-box__label" htmlFor="remember-me">
                                                                    Remember Me
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="u-s-m-b-20">
                                                        <Divider />
                                                    </div>
                                                    <span className="gl-text u-s-m-b-30">If you have an account with us, please log in.</span>
                                                    <div className="gl-s-api">
                                                        <div className="u-s-m-b-15">
                                                            <button className="gl-s-api__btn gl-s-api__btn--fb" type="button">
                                                                <i className="fab fa-facebook-f"></i>

                                                                <span>Signin with Facebook</span>
                                                            </button>
                                                        </div>
                                                        <div className="u-s-m-b-15">
                                                            <button className="gl-s-api__btn gl-s-api__btn--gplus" type="button">
                                                                <i className="fab fa-google"></i>

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
            {/* <main className="w-full mt-12 sm:pt-20 sm:mt-0">
        <div className="flex sm:w-4/6 sm:mt-4 m-auto mb-7 bg-white shadow-lg">
          <div className="loginSidebar bg-primary-blue p-10 pr-12 hidden sm:flex flex-col gap-4 w-2/5">
            <h1 className="font-medium text-white text-3xl">Login</h1>
            <p className="text-gray-200 text-lg">
              Get access to your Orders, Wishlist and Recommendations
            </p>
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="text-center py-10 px-4 sm:px-14">
              <form onSubmit={handleLogin}>
                <div className="flex flex-col w-full gap-4">
                  <TextField
                    fullWidth
                    id="email"
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <TextField
                    fullWidth
                    id="password"
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <div className="flex flex-col gap-2.5 mt-2 mb-32">
                    <p className="text-xs text-primary-grey text-left">
                      By continuing, you agree to Omjinshop's{' '}
                      <a
                        href="https://www.omjinshop.com/pages/terms"
                        className="text-primary-blue"
                      >
                        {' '}
                        Terms of Use
                      </a>{' '}
                      and{' '}
                      <a
                        href="https://www.omjinshop.com/pages/privacypolicy"
                        className="text-primary-blue"
                      >
                        {' '}
                        Privacy Policy.
                      </a>
                    </p>
                    <button
                      type="submit"
                      className="text-white py-3 w-full bg-primary-orange shadow hover:shadow-lg rounded-sm font-medium"
                    >
                      Login
                    </button>
                    <Link
                      to="/password/forgot"
                      className="hover:bg-gray-50 text-primary-blue text-center py-3 w-full shadow border rounded-sm font-medium"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                </div>
              </form>

              <Link
                to="/register"
                className="font-medium text-sm text-primary-blue"
              >
                New to Omjinshop? Create an account
              </Link>
            </div>
          </div>
        </div>
      </main> */}
        </>
    );
};

export default Login;
