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

const UpdatePassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const { error, isUpdated, loading } = useSelector((state) => state.profile);

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { pathItems } = useSelector((state) => state.path);

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

        dispatch(updatePassword(formData));
    };

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: 'error' });
            dispatch(clearErrors());
        }
        if (isUpdated) {
            enqueueSnackbar('Password Updated Successfully', { variant: 'success' });
            dispatch(loadUser());
            navigate('/account');

            dispatch({ type: UPDATE_PASSWORD_RESET });
        }
    }, [dispatch, error, isUpdated, navigate, enqueueSnackbar]);

    return (
        <>
            <MetaData title="Password Update" />
            {getNavigation(pathItems)}
            <div class="u-s-p-b-60">
                <div class="section__intro u-s-m-b-60">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="section__text-wrap">
                                    <h1 class="section__heading u-c-secondary">FORGOT PASSWORD?</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="section__content">
                    <div className="dash">
                        <div class="container">
                            <div class="row">
                                <div className="col-lg-3 col-md-12">
                                    <Sidebar activeTab={'profile'} />
                                    <OrderSideBar />
                                </div>
                                <div class="col-lg-9 col-md-8 u-s-m-b-30">
                                    <div class="l-f-o">
                                        <div class="l-f-o__pad-box">
                                            <h1 class="gl-h1">PASSWORD RESET</h1>

                                            <span class="gl-text u-s-m-b-30">
                                                Enter your email or username below and we will send you a link to reset your password.
                                            </span>
                                            <form class="l-f-o__form">
                                                <div class="u-s-m-b-30">
                                                    <label class="gl-label" for="reset-email">
                                                        E-MAIL *
                                                    </label>

                                                    <input
                                                        class="input-text input-text--primary-style"
                                                        type="text"
                                                        id="reset-email"
                                                        placeholder="Enter E-mail"
                                                    />
                                                </div>
                                                <div class="u-s-m-b-30">
                                                    <button class="btn btn--e-transparent-brand-b-2" type="submit">
                                                        SUBMIT
                                                    </button>
                                                </div>
                                                <div class="u-s-m-b-30">
                                                    <a class="gl-link" href="#">
                                                        Back to SignIn
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
            </div>
            {loading && <BackdropLoader />}
            <main className="w-full mt-12 sm:pt-20 sm:mt-0">
                {/* <!-- row --> */}
                <div className="flex sm:w-4/6 sm:mt-4 m-auto mb-7 bg-white shadow-lg">
                    <FormSidebar title="Looks like you want to update password!" tag="Enter your current and new password to update" />

                    {/* <!-- signUp column --> */}
                    <div className="flex-1 overflow-hidden">
                        <h2 className="text-center text-2xl font-medium mt-6 text-gray-800">Update Password</h2>
                        {/* <!-- personal info procedure container --> */}
                        <form onSubmit={updatePasswordSubmitHandler} className="p-5 sm:p-14">
                            <div className="flex flex-col gap-4 items-start">
                                {/* <!-- input container column --> */}
                                <div className="flex flex-col w-full justify-between sm:flex-col gap-3 items-center">
                                    <TextField
                                        fullWidth
                                        label="Current Password"
                                        type="password"
                                        name="oldPassword"
                                        value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                        required
                                    />
                                    <TextField
                                        fullWidth
                                        label="New Password"
                                        type="password"
                                        name="newPassword"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        required
                                    />
                                    <TextField
                                        fullWidth
                                        label="Confirm New Password"
                                        type="password"
                                        name="confirmPassword"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                {/* <!-- input container column --> */}
                                <button
                                    type="submit"
                                    className="text-white py-3 w-full bg-primary-orange shadow hover:shadow-lg rounded-sm font-medium"
                                >
                                    Update
                                </button>
                                <Link
                                    className="hover:bg-gray-50 text-primary-blue text-center py-3 w-full shadow border rounded-sm font-medium mb-8"
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

export default UpdatePassword;
