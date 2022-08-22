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
    const [mobile, setMobile] = useState('');
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
        formData.set('mobile', mobile);
        formData.set('gender', gender);
        formData.set('avatar', avatar);
        formData.set('birthDate', birthDate);

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
            setMobile(user.mobile);
            setBirthDate(user.birthDate);
            setAvatarPreview(user.avatar.url);
        }
        if (error) {
            enqueueSnackbar(error, { variant: 'error' });
            dispatch(clearErrors());
        }
        if (isUpdated) {
            enqueueSnackbar('Profile Updated Successfully', { variant: 'success' });
            dispatch(loadUser());
            redirectTo('', profile, profile.path.split('/').length - 1);
            dispatch({ type: UPDATE_PROFILE_RESET });
        }
    }, [dispatch, error, user, isUpdated, navigate, enqueueSnackbar]);

    return (
        <>
            <MetaData title='Edit Profile' />
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
                                <div className='col-lg-9 col-md-12'>
                                    <div className='dash__box dash__box--shadow dash__box--radius dash__box--bg-white'>
                                        <div className='dash__pad-2'>
                                            <h1 className='dash__h1 u-s-m-b-14'>Edit Profile</h1>
                                            <span className='dash__text u-s-m-b-30'>Looks like you haven't update your profile</span>
                                            <div className='row'>
                                                <div className='col-lg-12 col-md-12 col-sm-12'>
                                                    <form className='dash-edit-p' onSubmit={updateProfileHandler} encType='multipart/form-data'>
                                                        <div className='gl-inline'>
                                                            <div className='u-s-m-b-30'>
                                                                <label className='gl-label' htmlFor='name'>
                                                                    FULL NAME
                                                                </label>
                                                                <input
                                                                    type='text'
                                                                    id='name'
                                                                    placeholder='Full Name'
                                                                    value={name}
                                                                    required
                                                                    onChange={(e) => setName(e.target.value)}
                                                                    className='input-text input-text--primary-style'
                                                                />
                                                            </div>
                                                            <div className='u-s-m-b-30'>
                                                                <label className='gl-label' htmlFor='email'>
                                                                    CONTACT NUMBER
                                                                </label>
                                                                <input
                                                                    type='text'
                                                                    placeholder='Contact Number'
                                                                    id='mobile'
                                                                    name='mobile'
                                                                    value={mobile}
                                                                    required
                                                                    onChange={(e) => setMobile(e.target.value)}
                                                                    className='input-text input-text--primary-style'
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className='gl-inline'>
                                                            <div className='u-s-m-b-30'>
                                                                <label className='gl-label'>BIRTHDAY</label>
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
                                                            <div className='u-s-m-b-30'>
                                                                <label className='gl-label' htmlFor='gender'>
                                                                    GENDER
                                                                </label>
                                                                <select
                                                                    id='gender'
                                                                    name='gender'
                                                                    value={gender}
                                                                    onChange={(e) => setGender(e.target.value)}
                                                                    className='select-box select-box--primary-style u-w-100'
                                                                >
                                                                    <option selected=''>Select</option>
                                                                    <option value='male'>Male</option>
                                                                    <option value='male'>Female</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className='gl-inline'>
                                                            <div className='u-s-m-b-30'>
                                                                <label className='gl-label' htmlFor='email'>
                                                                    E-MAIL
                                                                </label>
                                                                <input
                                                                    type='text'
                                                                    placeholder='example@domain.com'
                                                                    id='email'
                                                                    name='email'
                                                                    value={email}
                                                                    required
                                                                    disabled
                                                                    onChange={(e) => setEmail(e.target.value)}
                                                                    className='input-text input-text--primary-style'
                                                                />
                                                            </div>
                                                            <div className='u-s-m-b-30'>
                                                                <div className='description__container u-s-m-t-11'>
                                                                    <Avatar alt='Avatar preview' src={avatarPreview} sx={{ width: 56, height: 56 }} />
                                                                    <label className='btn btn--e-transparent-platinum-b-2 avatar-label'>
                                                                        <input
                                                                            type='file'
                                                                            name='avatar'
                                                                            accept='image/*'
                                                                            onChange={handleUpdateDataChange}
                                                                            className='hidden'
                                                                            style={{ display: 'none' }}
                                                                        />
                                                                        CHOOSE FILE
                                                                    </label>
                                                                </div>
                                                            </div>
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
                </div>
            </div>
        </>
    );
};

export default UpdateProfile;
