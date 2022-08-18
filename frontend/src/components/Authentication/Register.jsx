import React, { useEffect, useState } from 'react';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import { useSnackbar } from 'notistack';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, registerUser } from '../../middleware/actions/userAction';
import BackdropLoader from '../Layouts/BackdropLoader';
import MetaData from '../Layouts/MetaData';
import { getNavigation } from '../../utils/services';
import Datetime from 'react-datetime';
import './../../../node_modules/react-datetime/css/react-datetime.css';

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const [birthDate, setBirthDate] = useState(new Date());
    const [dateView, setDateView] = useState(false);
    const { loading, isAuthenticated, error } = useSelector((state) => state.user);

    const [user, setUser] = useState({
        name: '',
        email: '',
        gender: '',
        password: '',
        cpassword: '',
    });

    const { name, email, gender, password, cpassword } = user;

    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState('preview.png');

    const [navigation] = useState([
        { title: 'Home', path: '/' },
        { title: 'Track Order', path: '/account/trackOrder' },
    ]);

    const handleRegister = (e) => {
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

        if (isNaN(email)) {
        }

        const formData = new FormData();
        formData.set('name', name);
        formData.set('email', email);
        formData.set('gender', gender);
        formData.set('password', password);
        formData.set('birthDate', birthDate);
        formData.set('avatar', avatar);
        dispatch(registerUser(formData));
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
            <MetaData title="Register" />
            {getNavigation(navigation)}
            {loading && <BackdropLoader />}
            <div className="u-s-p-b-60">
                <div className="section__intro u-s-m-b-60">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="section__text-wrap">
                                    <h1 className="section__heading u-c-secondary">CREATE AN ACCOUNT</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="section__content">
                    <div className="container">
                        <div className="row row--center">
                            <div className="col-lg-11 col-md-8 u-s-m-b-30">
                                <div className="l-f-o">
                                    <div className="l-f-o__pad-box">
                                        <h1 className="gl-h1 s-option">PERSONAL INFORMATION</h1>
                                        <div className="row row--center">
                                            <form className="l-f-o__form" onSubmit={handleRegister} encType="multipart/form-data">
                                                <div className="row row--center">
                                                    <div className="col-lg-1 col-md-8 u-s-m-b-30"></div>
                                                    <div className="col-lg-10 col-md-8 u-s-m-b-30">
                                                        <div className="row row--center">
                                                            <div className="col-lg-6 col-md-8 u-s-m-b-30">
                                                                <div className="u-s-m-b-30">
                                                                    <label className="gl-label" htmlFor="name">
                                                                        FULL NAME *
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        id="name"
                                                                        name="name"
                                                                        value={name}
                                                                        onChange={handleDataChange}
                                                                        placeholder="First Name"
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
                                                                        name="password"
                                                                        value={password}
                                                                        required
                                                                        onChange={handleDataChange}
                                                                        placeholder="Enter Password"
                                                                        className="input-text input-text--primary-style"
                                                                    />
                                                                </div>
                                                                <div className="gl-inline1">
                                                                    <div className="u-s-m-b-30">
                                                                        <label className="gl-label">BIRTHDAY</label>
                                                                        <div className="gl-dob">
                                                                            <Datetime
                                                                                locale="en-US"
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
                                                                                                id="birth-date"
                                                                                                value={birthDate ? props.value : ''}
                                                                                                placeholder="Enter E-mail"
                                                                                                className="input-text birth-date-input input-text--primary-style"
                                                                                            />
                                                                                            <i
                                                                                                className="birth-date-icon fa fa-calendar"
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
                                                                    <div className="u-s-m-b-30">
                                                                        <label className="gl-label" htmlFor="gender">
                                                                            GENDER
                                                                        </label>
                                                                        <select
                                                                            required
                                                                            id="gender"
                                                                            name="gender"
                                                                            value={gender}
                                                                            onChange={handleDataChange}
                                                                            className="select-box select-box--primary-style u-w-100"
                                                                        >
                                                                            <option value="">Select</option>
                                                                            <option value="male">Male</option>
                                                                            <option value="female">Female</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6 col-md-8 u-s-m-b-30">
                                                                <div className="u-s-m-b-30">
                                                                    <label className="gl-label" htmlFor="email">
                                                                        MOBILE NO / E-MAIL *
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        id="email"
                                                                        name="email"
                                                                        value={email}
                                                                        required
                                                                        onChange={handleDataChange}
                                                                        placeholder="Enter E-mail or Mobile no."
                                                                        className="input-text input-text--primary-style"
                                                                    />
                                                                </div>
                                                                <div className="u-s-m-b-30">
                                                                    <label className="gl-label" htmlFor="cpassword">
                                                                        CONFIRM PASSWORD *
                                                                    </label>

                                                                    <input
                                                                        type="password"
                                                                        id="cpassword"
                                                                        name="cpassword"
                                                                        required
                                                                        value={cpassword}
                                                                        onChange={handleDataChange}
                                                                        placeholder="Enter Password"
                                                                        className="input-text input-text--primary-style"
                                                                    />
                                                                </div>
                                                                <div className="u-s-m-b-30">
                                                                    <div className="description__container u-s-m-t-50">
                                                                        <Avatar
                                                                            alt="Avatar preview"
                                                                            src={avatarPreview}
                                                                            sx={{ width: 56, height: 56 }}
                                                                        />
                                                                        <label className="btn btn--e-transparent-platinum-b-2 u-w-100">
                                                                            <input
                                                                                type="file"
                                                                                name="avatar"
                                                                                accept="image/*"
                                                                                onChange={handleDataChange}
                                                                                className="hidden"
                                                                            />
                                                                            CHOOSE FILE
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="shop-p__tool-style">
                                                            <button className="btn btn--e-transparent-brand-b-2" type="submit">
                                                                CREATE
                                                            </button>
                                                            <Link to="/login" className="gl-link">
                                                                Existing User? Sign In
                                                            </Link>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-1 col-md-8 u-s-m-b-30"></div>
                                                </div>
                                                <div className="row row--center">
                                                    <div className="col-lg-1 col-md-8 u-s-m-b-15"></div>
                                                    <div className="col-lg-10 col-md-8 u-s-m-b-15">
                                                        <div className="u-s-m-b-20">
                                                            <Divider />
                                                        </div>
                                                        <div className="gl-s-api">
                                                            <div className="u-s-m-b-15">
                                                                <span className="gl-text u-s-m-b-30">
                                                                    By creating an account with our store, you will be able to move through the
                                                                    checkout process faster, store shipping addresses, view and track your orders in
                                                                    your account and more.
                                                                </span>
                                                                <button className="gl-s-api__btn gl-s-api__btn--fb" type="button">
                                                                    <i className="fab fa-facebook-f"></i>

                                                                    <span>Signup with Facebook</span>
                                                                </button>
                                                            </div>
                                                            <div className="u-s-m-b-30">
                                                                <button className="gl-s-api__btn gl-s-api__btn--gplus" type="button">
                                                                    <i className="fab fa-google"></i>

                                                                    <span>Signup with Google</span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-1 col-md-8 u-s-m-b-15"></div>
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
            {/* <main className="w-full mt-12 sm:pt-20 sm:mt-0">
                <div className="flex sm:w-4/6 sm:mt-4 m-auto mb-7 bg-white shadow-lg">
                    <FormSidebar title="Looks like you're new here!" tag="Sign up with your mobile number to get started" />
                    <div className="flex-1 overflow-hidden">
                        <form onSubmit={handleRegister} encType="multipart/form-data" className="p-5 sm:p-10">
                            <div className="flex flex-col gap-4 items-start">
                                <div className="flex flex-col w-full justify-between sm:flex-col gap-3 items-center">
                                    <TextField
                                        fullWidth
                                        id="full-name"
                                        label="Full Name"
                                        name="name"
                                        value={name}
                                        onChange={handleDataChange}
                                        required
                                    />
                                    <TextField
                                        fullWidth
                                        id="email"
                                        label="Email"
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={handleDataChange}
                                        required
                                    />
                                </div>
                                <div className="flex gap-4 items-center">
                                    <h2 className="text-md">Your Gender :</h2>
                                    <div className="flex items-center gap-6" id="radioInput">
                                        <RadioGroup row aria-labelledby="radio-buttons-group-label" name="radio-buttons-group">
                                            <FormControlLabel
                                                name="gender"
                                                value="male"
                                                onChange={handleDataChange}
                                                control={<Radio required />}
                                                label="Male"
                                            />
                                            <FormControlLabel
                                                name="gender"
                                                value="female"
                                                onChange={handleDataChange}
                                                control={<Radio required />}
                                                label="Female"
                                            />
                                        </RadioGroup>
                                    </div>
                                </div>
                                <div className="flex flex-col w-full justify-between sm:flex-row gap-3 items-center">
                                    <TextField
                                        id="password"
                                        label="Password"
                                        type="password"
                                        name="password"
                                        value={password}
                                        onChange={handleDataChange}
                                        required
                                    />
                                    <TextField
                                        id="confirm-password"
                                        label="Confirm Password"
                                        type="password"
                                        name="cpassword"
                                        value={cpassword}
                                        onChange={handleDataChange}
                                        required
                                    />
                                </div>

                                <div className="flex flex-col w-full justify-between sm:flex-row gap-3 items-center">
                                    <Avatar alt="Avatar Preview" src={avatarPreview} sx={{ width: 56, height: 56 }} />
                                    <label className="rounded font-medium bg-gray-400 text-center cursor-pointer text-white w-full py-2 px-2.5 shadow hover:shadow-lg">
                                        <input type="file" name="avatar" accept="image/*" onChange={handleDataChange} className="hidden" />
                                        Choose File
                                    </label>
                                </div>
                                <button
                                    type="submit"
                                    className="text-white py-3 w-full bg-primary-orange shadow hover:shadow-lg rounded-sm font-medium"
                                >
                                    Signup
                                </button>
                                <Link
                                    to="/login"
                                    className="hover:bg-gray-50 text-primary-blue text-center py-3 w-full shadow border rounded-sm font-medium"
                                >
                                    Existing User? Log in
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </main> */}
        </>
    );
};

export default Register;
