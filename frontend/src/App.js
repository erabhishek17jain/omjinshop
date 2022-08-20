import React from 'react';
import WebFont from 'webfontloader';
import Footer from './components/Layouts/Footer/Footer';
import Header from './components/Layouts/Header/Header';
import SignIn from './components/Authentication/SignIn';
import SignUp from './components/Authentication/SignUp';
import { Routes, Route, useLocation } from 'react-router-dom';
import { loadUser } from './middleware/actions/userAction';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import UpdateProfile from './components/User/Accounts/UpdateProfile';
import UpdatePassword from './components/Authentication/UpdatePassword/UpdatePassword';
import ForgotPassword from './components/Authentication/UpdatePassword/ForgotPassword';
import ResetPassword from './components/Authentication/UpdatePassword/ResetPassword';
import Account from './components/User/Account';
import ProtectedRoute from './Routes/ProtectedRoute';
import Home from './components/Home/Home';
import ProductDetails from './components/Products/ProductDetails/ProductDetails';
import Products from './components/Products/Products';
import Cart from './components/Cart/Cart';
import Shipping from './components/User/Orders/Shipping/Shipping';
import OrderConfirm from './components/User/Orders/OrderStatus/OrderConfirm';
import Payment from './components//User/Payments/Payment';
import OrderStatus from './components/User/Orders/OrderStatus/OrderStatus';
import OrderSuccess from './components/User/Orders/OrderStatus/OrderSuccess';
import MyOrders from './components/User/Orders/MyOrders';
import OrderDetails from './components/User/Orders/OrderDetails/OrderDetails';
import OrderTable from './components/Admin/Orders/OrderTable';
import UpdateOrder from './components/Admin/Orders/UpdateOrder';
import ProductTable from './components/Admin/Products/ProductTable';
import NewProduct from './components/Admin/Products/NewProduct';
import UpdateProduct from './components/Admin/Products/UpdateProduct';
import UserTable from './components/Admin/Users/UserTable';
import UpdateUser from './components/Admin/Users/UpdateUser';
import ReviewsTable from './components/Admin/Reviews/ReviewsTable';
import Wishlist from './components/Wishlist/Wishlist';
import NotFound from './components/Layouts/NotFound';
import TodaysOffers from './components/Home/TodaysOffers/TodaysOffers';
import TopOffers from './components/Home/TopOffers/TopOffers';
import TrackOrder from './components/User/Orders/TrackOrder/TrackOrder';
import AddressBook from './components/Home/AddressBook/AddressBook';
import AddEditAddress from './components/Home/AddressBook/AddEditAddress';
import DefaultAddress from './components/Home/AddressBook/DefaultAddress';
import AboutUs from './components/OmjinShop/AboutUs';
import ContactUs from './components/OmjinShop/ContactUs';
import FAQs from './components/OmjinShop/FAQs';
import MyProfile from './components/User/Accounts/MyProfile';
import PaymentOptions from './components/User/Payments/PaymentOptions';
import ReturnAndCancel from './components/OmjinShop/ReturnAndCancel';
import Dashboard from './components/Admin/Dashboard';

function App() {
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    // const [stripeApiKey, setStripeApiKey] = useState("");

    // async function getStripeApiKey() {
    //   const { data } = await axios.get('/api/v1/stripeapikey');
    //   setStripeApiKey(data.stripeApiKey);
    // }

    useEffect(() => {
        WebFont.load({
            google: {
                families: ['Roboto:300,400,500,600,700'],
            },
        });
    });

    useEffect(() => {
        dispatch(loadUser());
        // getStripeApiKey();
    }, [dispatch]);

    // always scroll to top on route/path change
    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
    }, [pathname]);

    // disable right click
    window.addEventListener('contextmenu', (e) => e.preventDefault());
    window.addEventListener('keydown', (e) => {
        if (e.keyCode === 123) e.preventDefault();
        if (e.ctrlKey && e.shiftKey && e.keyCode === 73) e.preventDefault();
        if (e.ctrlKey && e.shiftKey && e.keyCode === 74) e.preventDefault();
    });

    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signIn" element={<SignIn />} />
                <Route path="/signUp" element={<SignUp />} />
                <Route path="/products" element={<Products />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/products/:keyword" element={<Products />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/todaysOffers" element={<TodaysOffers />} />
                <Route path="/topOffers" element={<TopOffers />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/faqs" element={<FAQs />} />
                <Route path="/returnPolicy" element={<ReturnAndCancel />} />
                <Route path="*" element={<NotFound />}></Route>

                {/* User account */}
                <Route
                    path="/account"
                    element={
                        <ProtectedRoute>
                            <Account />
                        </ProtectedRoute>
                    }
                ></Route>

                <Route
                    path="/account/profile"
                    element={
                        <ProtectedRoute>
                            <MyProfile />
                        </ProtectedRoute>
                    }
                ></Route>

                <Route
                    path="/account/profile/edit"
                    element={
                        <ProtectedRoute>
                            <UpdateProfile />
                        </ProtectedRoute>
                    }
                ></Route>

                <Route
                    path="/account/wishlist"
                    element={
                        <ProtectedRoute>
                            <Wishlist />
                        </ProtectedRoute>
                    }
                ></Route>

                <Route
                    path="/account/orders"
                    element={
                        <ProtectedRoute>
                            <MyOrders />
                        </ProtectedRoute>
                    }
                ></Route>

                <Route
                    path="/account/order/:id"
                    element={
                        <ProtectedRoute>
                            <OrderStatus />
                        </ProtectedRoute>
                    }
                ></Route>

                <Route
                    path="/account/order_details/:id"
                    element={
                        <ProtectedRoute>
                            <OrderDetails />
                        </ProtectedRoute>
                    }
                ></Route>

                <Route
                    path="/account/shipping"
                    element={
                        <ProtectedRoute>
                            <Shipping />
                        </ProtectedRoute>
                    }
                ></Route>

                <Route
                    path="/account/order/confirm"
                    element={
                        <ProtectedRoute>
                            <OrderConfirm />
                        </ProtectedRoute>
                    }
                ></Route>

                <Route
                    path="/account/trackOrder"
                    element={
                        <ProtectedRoute>
                            <TrackOrder />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/account/addressBook"
                    element={
                        <ProtectedRoute>
                            <AddressBook />
                        </ProtectedRoute>
                    }
                ></Route>

                <Route
                    path="/account/addressBook/addEdit"
                    element={
                        <ProtectedRoute>
                            <AddEditAddress />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/account/addressBook/default"
                    element={
                        <ProtectedRoute>
                            <DefaultAddress />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/account/paymentOption"
                    element={
                        <ProtectedRoute>
                            <PaymentOptions />
                        </ProtectedRoute>
                    }
                />

                <Route path="/orders/success" element={<OrderSuccess success={true} />} />
                <Route path="/orders/failed" element={<OrderSuccess success={false} />} />

                <Route
                    path="/process/payment"
                    element={
                        <ProtectedRoute>
                            {/* // stripeApiKey && ( */}
                            {/* // <Elements stripe={loadStripe(stripeApiKey)}> */}
                            <Payment />
                            {/* // </Elements> */}
                            {/* ) */}
                        </ProtectedRoute>
                    }
                ></Route>

                <Route
                    path="/account/profile/update"
                    element={
                        <ProtectedRoute>
                            <UpdatePassword />
                        </ProtectedRoute>
                    }
                ></Route>

                <Route path="/account/profile/forgot" element={<ForgotPassword />} />
                <Route path="/password/reset/:token" element={<ResetPassword />} />

                {/* Admin account */}
                <Route
                    path="/admin/dashboard"
                    element={
                        <ProtectedRoute isAdmin={true}>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                ></Route>

                <Route
                    path="/admin/orders"
                    element={
                        <ProtectedRoute isAdmin={true}>
                            <OrderTable />
                        </ProtectedRoute>
                    }
                ></Route>

                <Route
                    path="/admin/order/:id"
                    element={
                        <ProtectedRoute isAdmin={true}>
                            <UpdateOrder />
                        </ProtectedRoute>
                    }
                ></Route>

                <Route
                    path="/admin/products"
                    element={
                        <ProtectedRoute isAdmin={true}>
                            <ProductTable />
                        </ProtectedRoute>
                    }
                ></Route>

                <Route
                    path="/admin/newProduct"
                    element={
                        <ProtectedRoute isAdmin={true}>
                            <NewProduct />
                        </ProtectedRoute>
                    }
                ></Route>

                <Route
                    path="/admin/product/:id"
                    element={
                        <ProtectedRoute isAdmin={true}>
                            <UpdateProduct />
                        </ProtectedRoute>
                    }
                ></Route>

                <Route
                    path="/admin/users"
                    element={
                        <ProtectedRoute isAdmin={true}>
                            <UserTable />
                        </ProtectedRoute>
                    }
                ></Route>

                <Route
                    path="/admin/user/:id"
                    element={
                        <ProtectedRoute isAdmin={true}>
                            <UpdateUser />
                        </ProtectedRoute>
                    }
                ></Route>

                <Route
                    path="/admin/reviews"
                    element={
                        <ProtectedRoute isAdmin={true}>
                            <ReviewsTable />
                        </ProtectedRoute>
                    }
                ></Route>
            </Routes>
            <Footer />
        </>
    );
}

export default App;
