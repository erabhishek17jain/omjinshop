import React, { useEffect, useState } from 'react';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import { useSnackbar } from 'notistack';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, signUpUser } from '../../middleware/actions/userAction';
import BackdropLoader from '../Layouts/BackdropLoader';
import MetaData from '../Layouts/MetaData';
import { getNavigation } from '../../utils/services';
import Datetime from 'react-datetime';
import './../../../node_modules/react-datetime/css/react-datetime.css';
import { setPath } from '../../middleware/actions/pathAction';

const SignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const [birthDate, setBirthDate] = useState(new Date());
    const [dateView, setDateView] = useState(false);
    const { loading, isAuthenticated, error } = useSelector((state) => state.user);

    const signIn = { title: 'Sign In', path: '/signIn/', tab: 'signIn' };
    const signUp = { title: 'Sign Up', path: '/signUp/', tab: 'signUp' };

    const [user, setUser] = useState({
        name: '',
        email: '',
        mobile: '',
        gender: '',
        password: '',
        cpassword: '',
    });

    const { name, email, mobile, gender, password, cpassword } = user;

    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState('preview.png');
    const { pathItems } = useSelector((state) => state.path);

    const handleSignUp = (e) => {
        e.preventDefault();
        if (password.length < 8) {
            enqueueSnackbar('Password length must be atleast 8 characters', { variant: 'warning' });
            return;
        }
        if (password !== cpassword) {
            enqueueSnackbar("Password Doesn't Match", { variant: 'error' });
            return;
        }
        if (!avatar) {
            enqueueSnackbar('Select Avatar', { variant: 'error' });
            return;
        }

        const formData = new FormData();
        formData.set('name', name);
        formData.set('email', email);
        formData.set('mobile', mobile);
        formData.set('gender', gender);
        formData.set('password', password);
        formData.set('birthDate', birthDate);
        formData.set('avatar', avatar);
        dispatch(signUpUser(formData));
    };

    const handleDataChange = (e) => {
        if (e.target.name === 'avatar') {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };

            reader.readAsDataURL(e.target.files[0]);
        } else {
            setUser({ ...user, [e.target.name]: e.target.value });
        }
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
        if (isAuthenticated) {
            navigate('/');
        }
    }, [dispatch, error, isAuthenticated, navigate, enqueueSnackbar]);

    return (
        <>
            <MetaData title='Sign Up' />
            {getNavigation(pathItems)}
            {loading && <BackdropLoader />}
            <div className='u-s-p-b-60'>
                <div className='section__content'>
                    <div className='container'>
                        <div className='row row--center'>
                            <div className='col-lg-11 col-md-8 u-s-m-b-30'>
                                <div className='l-f-o'>
                                    <div className='l-f-o__pad-box'>
                                        <h1 className='gl-h1 s-option'>CREATE AN ACCOUNT</h1>
                                        <div className='row row--center'>
                                            <form className='l-f-o__form' onSubmit={handleSignUp} encType='multipart/form-data'>
                                                <div className='row row--center'>
                                                    <div className='col-lg-1 col-md-8 u-s-m-b-30'></div>
                                                    <div className='col-lg-10 col-md-8 u-s-m-b-30'>
                                                        <div className='row row--center'>
                                                            <div className='col-lg-6 col-md-8 u-s-m-b-30'>
                                                                <div className='u-s-m-b-30'>
                                                                    <label className='gl-label' htmlFor='name'>
                                                                        FULL NAME *
                                                                    </label>
                                                                    <input
                                                                        type='text'
                                                                        id='name'
                                                                        name='name'
                                                                        value={name}
                                                                        onChange={handleDataChange}
                                                                        placeholder='First Name'
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
                                                                        name='password'
                                                                        value={password}
                                                                        required
                                                                        onChange={handleDataChange}
                                                                        placeholder='Enter Password'
                                                                        className='input-text input-text--primary-style'
                                                                    />
                                                                </div>
                                                                <div className='gl-inline1'>
                                                                    <div className='u-s-m-b-30'>
                                                                        <label className='gl-label'>BIRTHDAY</label>
                                                                        <div className='gl-dob'>
                                                                            <Datetime
                                                                                locale='en-US'
                                                                                dateFormat
                                                                                closeOnSelect
                                                                                timeFormat={false}
                                                                                value={birthDate}
                                                                                defaultValue={birthDate}
                                                                                onClose={() => setDateView(false)}
                                                                                isValidDate={(current) => {
                                                                                    return current.isBefore();
                                                                                }}
                                                                                onChange={(val) => {
                                                                                    setBirthDate(val);
                                                                                }}
                                                                                inputProps={{
                                                                                    placeholder: 'DD/MM/YYYY',
                                                                                    disabled: true,
                                                                                }}
                                                                                renderInput={(props, openCalendar, closeCalendar) => {
                                                                                    return (
                                                                                        <>
                                                                                            <input
                                                                                                height={45}
                                                                                                id='birth-date'
                                                                                                value={birthDate ? props.value : ''}
                                                                                                placeholder='Enter E-mail'
                                                                                                className='input-text birth-date-input input-text--primary-style'
                                                                                            />
                                                                                            <i
                                                                                                className='birth-date-icon fa fa-calendar'
                                                                                                onClick={() => {
                                                                                                    dateView ? closeCalendar() : openCalendar();
                                                                                                    setDateView(!dateView);
                                                                                                }}
                                                                                            ></i>
                                                                                        </>
                                                                                    );
                                                                                }}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className='u-s-m-b-30'>
                                                                        <label className='gl-label' htmlFor='gender'>
                                                                            GENDER
                                                                        </label>
                                                                        <select
                                                                            required
                                                                            id='gender'
                                                                            name='gender'
                                                                            value={gender}
                                                                            onChange={handleDataChange}
                                                                            className='select-box select-box--primary-style u-w-100'
                                                                        >
                                                                            <option value=''>Select</option>
                                                                            <option value='Male'>Male</option>
                                                                            <option value='Female'>Female</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className='u-s-m-b-5'>
                                                                    <div className='description__container'>
                                                                        <Avatar alt='Avatar preview' src={avatarPreview} sx={{ width: 56, height: 56 }} />
                                                                        <label className='btn btn--e-transparent-platinum-b-2 u-w-100 u-s-m-l-10'>
                                                                            <input
                                                                                type='file'
                                                                                name='avatar'
                                                                                accept='image/*'
                                                                                onChange={handleDataChange}
                                                                                className='hidden'
                                                                                style={{ display: 'none' }}
                                                                            />
                                                                            CHOOSE FILE
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='col-lg-6 col-md-8 u-s-m-b-30'>
                                                                <div className='u-s-m-b-30'>
                                                                    <label className='gl-label' htmlFor='email'>
                                                                        E-MAIL *
                                                                    </label>
                                                                    <input
                                                                        type='email'
                                                                        id='email'
                                                                        name='email'
                                                                        value={email}
                                                                        required
                                                                        onChange={handleDataChange}
                                                                        placeholder='Enter E-mail'
                                                                        className='input-text input-text--primary-style'
                                                                    />
                                                                </div>
                                                                <div className='u-s-m-b-30'>
                                                                    <label className='gl-label' htmlFor='cpassword'>
                                                                        CONFIRM PASSWORD *
                                                                    </label>

                                                                    <input
                                                                        type='password'
                                                                        id='cpassword'
                                                                        name='cpassword'
                                                                        required
                                                                        value={cpassword}
                                                                        onChange={handleDataChange}
                                                                        placeholder='Enter Password'
                                                                        className='input-text input-text--primary-style'
                                                                    />
                                                                </div>
                                                                <div className='u-s-m-b-30'>
                                                                    <label className='gl-label' htmlFor='mobile'>
                                                                        MOBILE NO. *
                                                                    </label>
                                                                    <input
                                                                        type='text'
                                                                        id='mobile'
                                                                        name='mobile'
                                                                        value={mobile}
                                                                        required
                                                                        onChange={handleDataChange}
                                                                        placeholder='Enter Mobile no.'
                                                                        className='input-text input-text--primary-style'
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='shop-p__tool-style'>
                                                            <button className='btn btn--e-transparent-brand-b-2' type='submit'>
                                                                CREATE
                                                            </button>
                                                            <a
                                                                className='gl-link'
                                                                href='#'
                                                                onClick={(e) => redirectTo(e, signIn, signIn.path.split('/').length - 1)}
                                                            >
                                                                Existing User? Sign In
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className='col-lg-1 col-md-8 u-s-m-b-30'></div>
                                                </div>
                                                <div className='row row--center'>
                                                    <div className='col-lg-1 col-md-8 u-s-m-b-15'></div>
                                                    <div className='col-lg-10 col-md-8 u-s-m-b-15'>
                                                        <div className='u-s-m-b-20'>
                                                            <Divider />
                                                        </div>
                                                        <div className='gl-s-api'>
                                                            <div className='u-s-m-b-15'>
                                                                <span className='gl-text u-s-m-b-30'>
                                                                    By creating an account with our store, you will be able to move through the checkout process
                                                                    faster, store shipping addresses, view and track your orders in your account and more.
                                                                </span>
                                                                <button className='gl-s-api__btn gl-s-api__btn--fb' type='button'>
                                                                    <i className='fab fa-facebook-f'></i>

                                                                    <span>Signup with Facebook</span>
                                                                </button>
                                                            </div>
                                                            <div className='u-s-m-b-30'>
                                                                <button className='gl-s-api__btn gl-s-api__btn--gplus' type='button'>
                                                                    <i className='fab fa-google'></i>

                                                                    <span>Signup with Google</span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='col-lg-1 col-md-8 u-s-m-b-15'></div>
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
        </>
    );
};

export default SignUp;
