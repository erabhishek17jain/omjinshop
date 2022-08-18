import React from 'react';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, forgotPassword } from '../../../middleware/actions/userAction';
import { useSnackbar } from 'notistack';
import BackdropLoader from '../../Layouts/BackdropLoader';
import MetaData from '../../Layouts/MetaData';
import FormSidebar from '../../../components/Layouts/FormSidebar';

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const { error, message, loading } = useSelector((state) => state.forgotPassword);

    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set('email', email);
        dispatch(forgotPassword(formData));
        setEmail('');
    };

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: 'error' });
            dispatch(clearErrors());
        }
        if (message) {
            enqueueSnackbar(message, { variant: 'success' });
        }
    }, [dispatch, error, message, enqueueSnackbar]);

    return (
        <>
            <div className="u-s-p-y-60">
                <div className="section__content">
                    <div className="container">
                        <div className="breadcrumb">
                            <div className="breadcrumb__wrap">
                                <ul className="breadcrumb__list">
                                    <li className="has-separator">
                                        <a href="#">Home</a>
                                    </li>
                                    <li className="is-marked">
                                        <a href="#">Reset</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="u-s-p-b-60">
                <div className="section__intro u-s-m-b-60">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="section__text-wrap">
                                    <h1 className="section__heading u-c-secondary">FORGOT PASSWORD?</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="section__content">
                    <div className="container">
                        <div className="row row--center">
                            <div className="col-lg-6 col-md-8 u-s-m-b-30">
                                <div className="l-f-o">
                                    <div className="l-f-o__pad-box">
                                        <h1 className="gl-h1">PASSWORD RESET</h1>

                                        <span className="gl-text u-s-m-b-30">
                                            Enter your email or username below and we will send you a link to reset your password.
                                        </span>
                                        <form className="l-f-o__form">
                                            <div className="u-s-m-b-30">
                                                <label className="gl-label" htmlFor="reset-email">
                                                    E-MAIL *
                                                </label>

                                                <input
                                                    className="input-text input-text--primary-style"
                                                    type="text"
                                                    id="reset-email"
                                                    placeholder="Enter E-mail"
                                                />
                                            </div>
                                            <div className="u-s-m-b-30">
                                                <button className="btn btn--e-transparent-brand-b-2" type="submit">
                                                    SUBMIT
                                                </button>
                                            </div>
                                            <div className="u-s-m-b-30">
                                                <a className="gl-link" href="#">
                                                    Back to Login
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
        // <>
        //     <MetaData title="Forgot Password" />

        //     {loading && <BackdropLoader />}
        //     <main className="w-full mt-12 sm:pt-20 sm:mt-0">

        //         {/* <!-- row --> */}
        //         <div className="flex sm:w-4/6 sm:mt-4 m-auto mb-7 bg-white shadow-lg">

        //             <FormSidebar
        //                 title="Forgot Your Password?"
        //                 tag="Enter the email address associated with your account."
        //             />

        //             {/* <!-- login column --> */}
        //             <div className="flex-1 overflow-hidden">
        //                 <h2 className="text-center text-2xl font-medium mt-6 text-gray-800">Forgot Password</h2>

        //                 {/* <!-- edit info container --> */}
        //                 <div className="text-center py-10 px-4 sm:px-14">

        //                     {/* <!-- input container --> */}
        //                     <form onSubmit={handleSubmit}>
        //                         <div className="flex flex-col w-full gap-4">

        //                             <TextField
        //                                 fullWidth
        //                                 label="Email"
        //                                 type="email"
        //                                 value={email}
        //                                 onChange={(e) => setEmail(e.target.value)}
        //                                 required
        //                             />

        //                             {/* <!-- button container --> */}
        //                             <div className="flex flex-col gap-2.5 mt-2 mb-32">
        //                                 <p className="text-xs text-primary-grey text-left">By continuing, you agree to Omjinshop's <a href="https://www.omjinshop.com/pages/terms" className="text-primary-blue"> Terms of Use</a> and <a href="https://www.omjinshop.com/pages/privacypolicy" className="text-primary-blue"> Privacy Policy.</a></p>
        //                                 <button type="submit" className="text-white py-3 w-full bg-primary-orange shadow rounded-sm font-medium">Submit</button>
        //                             </div>
        //                             {/* <!-- button container --> */}

        //                         </div>
        //                     </form>
        //                     {/* <!-- input container --> */}

        //                     <Link to="/register" className="font-medium text-sm text-primary-blue">New to Omjinshop? Create an account</Link>
        //                 </div>
        //                 {/* <!-- edit info container --> */}

        //             </div>
        //             {/* <!-- login column --> */}
        //         </div>
        //         {/* <!-- row --> */}

        //     </main>
        // </>
    );
};

export default ForgotPassword;
