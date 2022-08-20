import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { Avatar, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { useSnackbar } from 'notistack';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, loadUser, updateProfile } from '../../../middleware/actions/userAction';
import { UPDATE_PROFILE_RESET } from '../../../middleware/constants/userConstants';
import BackdropLoader from '../../Layouts/BackdropLoader';
import MetaData from '../../Layouts/MetaData';
import OrderSideBar from '../Orders/OrderDetails/OrderSideBar';
import Sidebar from '../../Layouts/Sidebar';
import { getNavigation } from '../../../utils/services';
import Datetime from 'react-datetime';
import './../../../../node_modules/react-datetime/css/react-datetime.css';
import { setPath } from '../../../middleware/actions/pathAction';

const UpdateProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [avatar, setAvatar] = useState('');
    const [avatarPreview, setAvatarPreview] = useState('');
    const [birthDate, setBirthDate] = useState(new Date());
    const [dateView, setDateView] = useState(false);
    const { pathItems } = useSelector((state) => state.path);

    const { user } = useSelector((state) => state.user);
    const { error, isUpdated, loading } = useSelector((state) => state.profile);
    const profile = { title: 'Profile', path: '/account/profile', tab: 'profile' };

    const updateProfileHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('email', email);
        formData.set('gender', gender);
        formData.set('avatar', avatar);

        dispatch(updateProfile(formData)).then(() => {
            redirectTo('', profile, profile.path.split('/').length - 1);
        });
    };

    const handleUpdateDataChange = (e) => {
        const reader = new FileReader();
        setAvatar('');
        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
            }
        };
        reader.readAsDataURL(e.target.files[0]);
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
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setGender(user.gender);
            setAvatarPreview(user.avatar.url);
        }
        if (error) {
            enqueueSnackbar(error, { variant: 'error' });
            dispatch(clearErrors());
        }
        if (isUpdated) {
            enqueueSnackbar('Profile Updated Successfully', { variant: 'success' });
            dispatch(loadUser());
            navigate('/account');

            dispatch({ type: UPDATE_PROFILE_RESET });
        }
    }, [dispatch, error, user, isUpdated, navigate, enqueueSnackbar]);

    return (
        <>
            <MetaData title="Edit Profile" />
            {loading && <BackdropLoader />}
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
                                            <h1 className="dash__h1 u-s-m-b-14">Edit Profile</h1>
                                            <span className="dash__text u-s-m-b-30">Looks like you haven't update your profile</span>
                                            <div className="dash__link dash__link--secondary u-s-m-b-30">
                                                <a data-modal="modal" data-modal-id="#dash-newsletter">
                                                    Subscribe Newsletter
                                                </a>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <form className="dash-edit-p" onSubmit={updateProfileHandler} encType="multipart/form-data">
                                                        <div className="gl-inline">
                                                            <div className="u-s-m-b-30">
                                                                <label className="gl-label" htmlFor="name">
                                                                    FULL NAME
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    id="name"
                                                                    placeholder="Full Name"
                                                                    value={name}
                                                                    required
                                                                    onChange={(e) => setName(e.target.value)}
                                                                    className="input-text input-text--primary-style"
                                                                />
                                                            </div>
                                                            <div className="u-s-m-b-30">
                                                                <label className="gl-label" htmlFor="email">
                                                                    E-MAIL
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    placeholder="Doe"
                                                                    id="email"
                                                                    name="email"
                                                                    value={email}
                                                                    required
                                                                    onChange={(e) => setEmail(e.target.value)}
                                                                    className="input-text input-text--primary-style"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="gl-inline">
                                                            <div className="u-s-m-b-30">
                                                                <label className="gl-label">BIRTHDAY</label>
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
                                                            <div className="u-s-m-b-30">
                                                                <label className="gl-label" htmlFor="gender">
                                                                    GENDER
                                                                </label>
                                                                <select
                                                                    id="gender"
                                                                    name="gender"
                                                                    value={gender}
                                                                    onChange={(e) => setGender(e.target.value)}
                                                                    className="select-box select-box--primary-style u-w-100"
                                                                >
                                                                    <option selected="">Select</option>
                                                                    <option value="male">Male</option>
                                                                    <option value="male">Female</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="gl-inline">
                                                            <div className="u-s-m-b-30">
                                                                <label className="gl-label" htmlFor="email">
                                                                    E-MAIL
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    placeholder="Doe"
                                                                    id="email"
                                                                    name="email"
                                                                    value={email}
                                                                    required
                                                                    onChange={(e) => setEmail(e.target.value)}
                                                                    className="input-text input-text--primary-style"
                                                                />
                                                            </div>
                                                            <div className="u-s-m-b-30">
                                                                <div className="description__container u-s-m-t-11">
                                                                    <Avatar alt="Avatar preview" src={avatarPreview} sx={{ width: 56, height: 56 }} />
                                                                    <label className="btn btn--e-transparent-platinum-b-2 avatar-label">
                                                                        <input
                                                                            type="file"
                                                                            name="avatar"
                                                                            accept="image/*"
                                                                            onChange={handleUpdateDataChange}
                                                                            className="hidden"
                                                                            style={{ display: 'none' }}
                                                                        />
                                                                        CHOOSE FILE
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <button className="btn btn--e-brand-b-2" type="submit">
                                                            SAVE
                                                        </button>
                                                        <a
                                                            href="#"
                                                            onClick={(e) => redirectTo(e, profile, profile.path.split('/').length - 1)}
                                                            className="btn btn--e-transparent-brand-b-2 u-s-m-l-15"
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
                </div>
            </div>

            {loading && <BackdropLoader />}
            <main className="w-full mt-12 sm:pt-20 sm:mt-0">
                {/* <!-- row --> */}
                <div className="flex sm:w-4/6 sm:mt-4 m-auto mb-7 bg-white shadow-lg">
                    {/* <!-- sidebar column  --> */}
                    <div className="signInSidebar bg-primary-blue px-9 py-10 hidden sm:flex flex-col gap-4 w-2/5">
                        <h1 className="font-medium text-white text-3xl">Looks like you're new here!</h1>
                        <p className="text-gray-200 text-lg pr-2">Sign up with your mobile number to get started</p>
                    </div>
                    {/* <!-- sidebar column  --> */}

                    {/* <!-- signUp column --> */}
                    <div className="flex-1 overflow-hidden">
                        <h2 className="text-center text-2xl font-medium mt-6 text-gray-800">Update Profile</h2>
                        {/* <!-- personal info procedure container --> */}
                        <form onSubmit={updateProfileHandler} encType="multipart/form-data" className="p-5 sm:p-10">
                            <div className="flex flex-col gap-4 items-start">
                                {/* <!-- input container column --> */}
                                <div className="flex flex-col w-full justify-between sm:flex-col gap-3 items-center">
                                    <TextField
                                        fullWidth
                                        label="Full Name"
                                        name="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                    <TextField
                                        fullWidth
                                        label="Email"
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
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
                                                checked={gender === 'male'}
                                                onChange={(e) => setGender(e.target.value)}
                                                control={<Radio required />}
                                                label="Male"
                                            />
                                            <FormControlLabel
                                                name="gender"
                                                value="female"
                                                checked={gender === 'female'}
                                                onChange={(e) => setGender(e.target.value)}
                                                control={<Radio required />}
                                                label="Female"
                                            />
                                        </RadioGroup>
                                    </div>
                                </div>
                                {/* <!-- gender input --> */}

                                <div className="flex flex-col w-full justify-between sm:flex-row gap-3 items-center">
                                    <Avatar alt="Avatar Preview" src={avatarPreview} sx={{ width: 56, height: 56 }} />
                                    <label className="rounded font-medium bg-gray-400 text-center cursor-pointer text-white w-full py-2 px-2.5 shadow hover:shadow-lg">
                                        <input type="file" name="avatar" accept="image/*" onChange={handleUpdateDataChange} className="hidden" />
                                        Choose File
                                    </label>
                                </div>
                                <button
                                    type="submit"
                                    className="text-white py-3 w-full bg-primary-orange shadow rounded-sm font-medium hover:shadow-lg"
                                >
                                    Update
                                </button>
                                <Link
                                    className="hover:bg-gray-100 text-primary-blue text-center py-3 w-full shadow border rounded-sm font-medium"
                                    to="/account"
                                >
                                    Cancel
                                </Link>
                            </div>
                        </form>
                        {/* <!-- personal info procedure container --> */}
                    </div>
                    {/* <!-- signUp column --> */}
                </div>
                {/* <!-- row --> */}
            </main>
        </>
    );
};

export default UpdateProfile;
