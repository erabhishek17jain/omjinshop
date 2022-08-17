import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { useSnackbar } from 'notistack';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, registerUser } from '../../actions/userAction';
import BackdropLoader from '../Layouts/BackdropLoader';
import MetaData from '../Layouts/MetaData';
import FormSidebar from './FormSidebar';
import React from 'react';

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

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

        const formData = new FormData();
        formData.set('name', name);
        formData.set('email', email);
        formData.set('gender', gender);
        formData.set('password', password);
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
        <div className="app-content">
            {/* Section 1 */}
            <div className="u-s-p-y-60">
                {/* Section Content */}
                <div className="section__content">
                    <div className="container">
                        <div className="breadcrumb">
                            <div className="breadcrumb__wrap">
                                <ul className="breadcrumb__list">
                                    <li className="has-separator">
                                        <a href="#">Home</a>
                                    </li>
                                    <li className="is-marked">
                                        <a href="#">Signup</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* End - Section 1 */}

            {/* Section 2 */}
            <div className="u-s-p-b-60">
                {/* Section Intro */}
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
                {/* End - Section Intro */}

                {/* Section Content */}
                <div className="section__content">
                    <div className="container">
                        <div className="row row--center">
                            <div className="col-lg-6 col-md-8 u-s-m-b-30">
                                <div className="l-f-o">
                                    <div className="l-f-o__pad-box">
                                        <h1 className="gl-h1">PERSONAL INFORMATION</h1>
                                        <form className="l-f-o__form">
                                            <div className="gl-s-api">
                                                <div className="u-s-m-b-15">
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
                                            <div className="u-s-m-b-30">
                                                <label className="gl-label" htmlFor="reg-fname">
                                                    FIRST NAME *
                                                </label>

                                                <input
                                                    className="input-text input-text--primary-style"
                                                    type="text"
                                                    id="reg-fname"
                                                    placeholder="First Name"
                                                />
                                            </div>
                                            <div className="u-s-m-b-30">
                                                <label className="gl-label" htmlFor="reg-lname">
                                                    LAST NAME *
                                                </label>

                                                <input
                                                    className="input-text input-text--primary-style"
                                                    type="text"
                                                    id="reg-lname"
                                                    placeholder="Last Name"
                                                />
                                            </div>
                                            <div className="gl-inline">
                                                <div className="u-s-m-b-30">
                                                    {/* Date of Birth Select-Box */}

                                                    <span className="gl-label">BIRTHDAY</span>
                                                    <div className="gl-dob">
                                                        <select className="select-box select-box--primary-style">
                                                            <option selected>Month</option>
                                                            <option value="male">January</option>
                                                            <option value="male">February</option>
                                                            <option value="male">March</option>
                                                            <option value="male">April</option>
                                                        </select>
                                                        <select className="select-box select-box--primary-style">
                                                            <option selected>Day</option>
                                                            <option value="01">01</option>
                                                            <option value="02">02</option>
                                                            <option value="03">03</option>
                                                            <option value="04">04</option>
                                                        </select>
                                                        <select className="select-box select-box--primary-style">
                                                            <option selected>Year</option>
                                                            <option value="1991">1991</option>
                                                            <option value="1992">1992</option>
                                                            <option value="1993">1993</option>
                                                            <option value="1994">1994</option>
                                                        </select>
                                                    </div>
                                                    {/* End - Date of Birth Select-Box */}
                                                </div>
                                                <div className="u-s-m-b-30">
                                                    <label className="gl-label" htmlFor="gender">
                                                        GENDER
                                                    </label>
                                                    <select className="select-box select-box--primary-style u-w-100" id="gender">
                                                        <option selected>Select</option>
                                                        <option value="male">Male</option>
                                                        <option value="male">Female</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="u-s-m-b-30">
                                                <label className="gl-label" htmlFor="reg-email">
                                                    E-MAIL *
                                                </label>

                                                <input
                                                    className="input-text input-text--primary-style"
                                                    type="text"
                                                    id="reg-email"
                                                    placeholder="Enter E-mail"
                                                />
                                            </div>
                                            <div className="u-s-m-b-30">
                                                <label className="gl-label" htmlFor="reg-password">
                                                    PASSWORD *
                                                </label>

                                                <input
                                                    className="input-text input-text--primary-style"
                                                    type="password"
                                                    id="reg-password"
                                                    placeholder="Enter Password"
                                                />
                                            </div>
                                            <div className="u-s-m-b-15">
                                                <button className="btn btn--e-transparent-brand-b-2" type="submit">
                                                    CREATE
                                                </button>
                                            </div>

                                            <a className="gl-link" href="#">
                                                Return to Store
                                            </a>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* End - Section Content */}
            </div>
            {/* End - Section 2 */}
        </div>
        // <>
        //     <MetaData title="Register | Omjinshop" />

        //     {loading && <BackdropLoader />}
        //     <main className="w-full mt-12 sm:pt-20 sm:mt-0">

        //         {/* <!-- row --> */}
        //         <div className="flex sm:w-4/6 sm:mt-4 m-auto mb-7 bg-white shadow-lg">

        //             <FormSidebar
        //                 title="Looks like you're new here!"
        //                 tag="Sign up with your mobile number to get started"
        //             />

        //             {/* <!-- signup column --> */}
        //             <div className="flex-1 overflow-hidden">

        //                 {/* <!-- personal info procedure container --> */}
        //                 <form
        //                     onSubmit={handleRegister}
        //                     encType="multipart/form-data"
        //                     className="p-5 sm:p-10"
        //                 >
        //                     <div className="flex flex-col gap-4 items-start">

        //                         {/* <!-- input container column --> */}
        //                         <div className="flex flex-col w-full justify-between sm:flex-col gap-3 items-center">
        //                             <TextField
        //                                 fullWidth
        //                                 id="full-name"
        //                                 label="Full Name"
        //                                 name="name"
        //                                 value={name}
        //                                 onChange={handleDataChange}
        //                                 required
        //                             />
        //                             <TextField
        //                                 fullWidth
        //                                 id="email"
        //                                 label="Email"
        //                                 type="email"
        //                                 name="email"
        //                                 value={email}
        //                                 onChange={handleDataChange}
        //                                 required
        //                             />
        //                         </div>
        //                         {/* <!-- input container column --> */}

        //                         {/* <!-- gender input --> */}
        //                         <div className="flex gap-4 items-center">
        //                             <h2 className="text-md">Your Gender :</h2>
        //                             <div className="flex items-center gap-6" id="radioInput">
        //                                 <RadioGroup
        //                                     row
        //                                     aria-labelledby="radio-buttons-group-label"
        //                                     name="radio-buttons-group"
        //                                 >
        //                                     <FormControlLabel name="gender" value="male" onChange={handleDataChange} control={<Radio required />} label="Male" />
        //                                     <FormControlLabel name="gender" value="female" onChange={handleDataChange} control={<Radio required />} label="Female" />
        //                                 </RadioGroup>
        //                             </div>
        //                         </div>
        //                         {/* <!-- gender input --> */}

        //                         {/* <!-- input container column --> */}
        //                         <div className="flex flex-col w-full justify-between sm:flex-row gap-3 items-center">
        //                             <TextField
        //                                 id="password"
        //                                 label="Password"
        //                                 type="password"
        //                                 name="password"
        //                                 value={password}
        //                                 onChange={handleDataChange}
        //                                 required
        //                             />
        //                             <TextField
        //                                 id="confirm-password"
        //                                 label="Confirm Password"
        //                                 type="password"
        //                                 name="cpassword"
        //                                 value={cpassword}
        //                                 onChange={handleDataChange}
        //                                 required
        //                             />
        //                         </div>
        //                         {/* <!-- input container column --> */}

        //                         <div className="flex flex-col w-full justify-between sm:flex-row gap-3 items-center">
        //                             <Avatar
        //                                 alt="Avatar Preview"
        //                                 src={avatarPreview}
        //                                 sx={{ width: 56, height: 56 }}
        //                             />
        //                             <label className="rounded font-medium bg-gray-400 text-center cursor-pointer text-white w-full py-2 px-2.5 shadow hover:shadow-lg">
        //                                 <input
        //                                     type="file"
        //                                     name="avatar"
        //                                     accept="image/*"
        //                                     onChange={handleDataChange}
        //                                     className="hidden"
        //                                 />
        //                                 Choose File
        //                             </label>
        //                         </div>
        //                         <button type="submit" className="text-white py-3 w-full bg-primary-orange shadow hover:shadow-lg rounded-sm font-medium">Signup</button>
        //                         <Link to="/login" className="hover:bg-gray-50 text-primary-blue text-center py-3 w-full shadow border rounded-sm font-medium">Existing User? Log in</Link>
        //                     </div>

        //                 </form>
        //                 {/* <!-- personal info procedure container --> */}

        //             </div>
        //             {/* <!-- signup column --> */}
        //         </div>
        //         {/* <!-- row --> */}

        //     </main>
        // </>
    );
};

export default Register;
