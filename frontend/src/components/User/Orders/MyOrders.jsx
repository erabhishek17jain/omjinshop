import { useEffect, useState } from 'react';
import { myOrders, clearErrors } from '../../../middleware/actions/orderAction';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import MetaData from '../../Layouts/MetaData';
import React from 'react';
import OrderSideBar from '../Orders/OrderDetails/OrderSideBar';
import Sidebar from '../../Layouts/Sidebar';
import { formatDate, getNavigation } from '../../../utils/services';
import { FormControl, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import Loader from '../../Layouts/Loader';
import OrderItem from '../../User/Orders/OrderDetails/OrderItem';
import SearchIcon from '@mui/icons-material/Search';

const orderStatus = ['Processing', 'Shipped', 'Delivered'];
const dt = new Date();
const ordertime = [dt.getMonth(), dt.getFullYear() - 1, dt.getFullYear() - 2];

const MyOrders = () => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const [status, setStatus] = useState('');
    const [orderTime, setOrderTime] = useState(0);
    const [search, setSearch] = useState('');
    const [filteredOrders, setFilteredOrders] = useState([]);
    const { pathItems } = useSelector((state) => state.path);
    const { orders, loading, error } = useSelector((state) => state.myOrders);

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: 'error' });
            dispatch(clearErrors());
        }
        dispatch(myOrders());
    }, [dispatch, error, enqueueSnackbar]);

    useEffect(() => {
        if (loading === false) {
            setFilteredOrders(orders);
        }
    }, [loading, orders]);

    useEffect(() => {
        setSearch('');
        if (!status && +orderTime === 0) {
            setFilteredOrders(orders);
            return;
        }
        if (status && orderTime) {
            if (+orderTime === dt.getMonth()) {
                const filteredArr = orders.filter((order) => order.orderStatus === status && new Date(order.createdAt).getMonth() === +orderTime);
                setFilteredOrders(filteredArr);
            } else {
                const filteredArr = orders.filter((order) => order.orderStatus === status && new Date(order.createdAt).getFullYear() === +orderTime);
                setFilteredOrders(filteredArr);
            }
        } else if (!status) {
            if (+orderTime === dt.getMonth()) {
                const filteredArr = orders.filter((order) => new Date(order.createdAt).getMonth() === +orderTime);
                setFilteredOrders(filteredArr);
            } else {
                const filteredArr = orders.filter((order) => new Date(order.createdAt).getFullYear() === +orderTime);
                setFilteredOrders(filteredArr);
            }
        } else {
            const filteredArr = orders.filter((order) => order.orderStatus === status);
            setFilteredOrders(filteredArr);
        }
    }, [status, orderTime]);

    const searchOrders = (e) => {
        e.preventDefault();
        if (!search.trim()) {
            enqueueSnackbar('Empty Input', { variant: 'warning' });
            return;
        }
        const arr = orders.map((el) => ({
            ...el,
            orderItems: el.orderItems.filter((order) => order.name.toLowerCase().includes(search.toLowerCase())),
        }));
        setFilteredOrders(arr);
    };

    const clearFilters = () => {
        setStatus('');
        setOrderTime(0);
    };

    return (
        <>
            <MetaData title="My Orders" />
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
                                    <div className="dash__box dash__box--shadow dash__box--radius dash__box--bg-white u-s-m-b-30">
                                        <div className="dash__pad-2">
                                            <h1 className="dash__h1 u-s-m-b-14">My Orders</h1>
                                            <span className="dash__text u-s-m-b-30">Here you can see all products that have been delivered.</span>
                                            <form className="m-order u-s-m-b-30">
                                                <div className="m-order__select-wrapper">
                                                    <label className="u-s-m-r-8" htmlFor="my-order-sort">
                                                        Show:
                                                    </label>
                                                    <select className="select-box select-box--primary-style" id="my-order-sort">
                                                        <option selected="">Last 5 orders</option>
                                                        <option>Last 15 days</option>
                                                        <option>Last 30 days</option>
                                                        <option>Last 6 months</option>
                                                        <option>Orders placed in 2018</option>
                                                        <option>All Orders</option>
                                                    </select>
                                                </div>
                                            </form>
                                            <div className="m-order__list">
                                                {orders &&
                                                    orders.forEach((order) => {
                                                        <div className="m-order__get">
                                                            <div className="manage-o__header u-s-m-b-30">
                                                                <div className="dash-l-r">
                                                                    <div>
                                                                        <div className="manage-o__text-2 u-c-secondary">Order #305423126</div>
                                                                        <div className="manage-o__text u-c-silver">
                                                                            Placed on {formatDate(order.createdAt)}
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        <div className="dash__link dash__link--brand">
                                                                            <a href="#">MANAGE</a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="manage-o__description">
                                                                <div className="description__container">
                                                                    <div className="description__img-wrap">
                                                                        <img
                                                                            className="u-img-fluid"
                                                                            src="images/product/electronic/product3.207dd89cb8b11937ace9524c6c84fb78.jpg"
                                                                            alt=""
                                                                        />
                                                                    </div>
                                                                    <div className="description-title">Yellow Wireless Headphone</div>
                                                                </div>
                                                                <div className="description__info-wrap">
                                                                    <div>
                                                                        <span className="manage-o__badge badge--processing">{order.orderStatus}</span>
                                                                    </div>
                                                                    <div>
                                                                        <span className="manage-o__text-2 u-c-silver">
                                                                            Quantity:
                                                                            <span className="manage-o__text-2 u-c-secondary">
                                                                                {order.orderItems.length}
                                                                            </span>
                                                                        </span>
                                                                    </div>
                                                                    <div>
                                                                        <span className="manage-o__text-2 u-c-silver">
                                                                            Total:
                                                                            <span className="manage-o__text-2 u-c-secondary">{order.totalPrice}</span>
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>;
                                                    })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <main className="w-full mt-16 sm:mt-0">
                <div className="flex gap-3.5 mt-2 sm:mt-6 sm:mx-3 m-auto mb-7">
                    <div className="hidden sm:flex flex-col w-1/5 px-1">
                        <div className="flex flex-col bg-white rounded-sm shadow">
                            <div className="flex items-center justify-between gap-5 px-4 py-2 border-b">
                                <p className="text-lg font-medium">Filters</p>
                                <span
                                    onClick={clearFilters}
                                    className="text-blue-600 font-medium text-sm uppercase cursor-pointer hover:text-blue-700"
                                >
                                    clear all
                                </span>
                            </div>
                            <div className="flex flex-col py-3 text-sm">
                                <span className="font-medium px-4">ORDER STATUS</span>

                                <div className="flex flex-col gap-3 px-4 mt-1 pb-3 border-b">
                                    <FormControl>
                                        <RadioGroup
                                            aria-labelledby="orderstatus-radio-buttons-group"
                                            onChange={(e) => setStatus(e.target.value)}
                                            name="orderstatus-radio-buttons"
                                            value={status}
                                        >
                                            {orderStatus.map((el, i) => (
                                                <FormControlLabel
                                                    value={el}
                                                    control={<Radio size="small" />}
                                                    key={i}
                                                    label={<span className="text-sm">{el}</span>}
                                                />
                                            ))}
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                            </div>
                            <div className="flex flex-col pb-2 text-sm">
                                <span className="font-medium px-4">ORDER TIME</span>
                                <div className="flex flex-col gap-3 mt-1 px-4 pb-3">
                                    <FormControl>
                                        <RadioGroup
                                            aria-labelledby="ordertime-radio-buttons-group"
                                            onChange={(e) => setOrderTime(e.target.value)}
                                            name="ordertime-radio-buttons"
                                            value={orderTime}
                                        >
                                            {ordertime.map((el, i) => (
                                                <FormControlLabel
                                                    value={el}
                                                    control={<Radio size="small" />}
                                                    key={i}
                                                    label={<span className="text-sm">{i === 0 ? 'This Month' : el}</span>}
                                                />
                                            ))}
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1">
                        {loading ? (
                            <Loader />
                        ) : (
                            <div className="flex flex-col gap-3 sm:mr-4 overflow-hidden">
                                <form
                                    onSubmit={searchOrders}
                                    className="flex items-center justify-between mx-1 sm:mx-0 sm:w-10/12 bg-white border rounded hover:shadow"
                                >
                                    <input
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        type="search"
                                        name="search"
                                        placeholder="Search your orders here"
                                        className="p-2 text-sm outline-none flex-1 rounded-l"
                                    />
                                    <button
                                        type="submit"
                                        className="h-full text-sm px-1 sm:px-4 py-2.5 text-white bg-primary-blue hover:bg-blue-600 rounded-r flex items-center gap-1"
                                    >
                                        <SearchIcon sx={{ fontSize: '22px' }} />
                                        Search Orders
                                    </button>
                                </form>

                                {orders && filteredOrders.length === 0 && (
                                    <div className="flex items-center flex-col gap-2 p-8 bg-white">
                                        <img
                                            draggable="false"
                                            src="https://rukminim1.flixcart.com/www/100/100/promos/23/08/2020/c5f14d2a-2431-4a36-b6cb-8b5b5e283d4f.png"
                                            alt="Empty Orders"
                                        />
                                        <span className="text-lg font-medium">Sorry, no results found</span>
                                        <p>Edit search or clear all filters</p>
                                    </div>
                                )}

                                {orders &&
                                    filteredOrders
                                        .map((order) => {
                                            const { _id, orderStatus, orderItems, createdAt, deliveredAt } = order;

                                            return orderItems.map((item, index) => (
                                                <OrderItem
                                                    {...item}
                                                    key={index}
                                                    orderId={_id}
                                                    orderStatus={orderStatus}
                                                    createdAt={createdAt}
                                                    deliveredAt={deliveredAt}
                                                />
                                            ));
                                        })
                                        .reverse()}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </>
    );
};

export default MyOrders;
