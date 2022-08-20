import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';
import { Doughnut, Line, Pie, Bar } from 'react-chartjs-2';
import { getAdminProducts } from '../../middleware/actions/productAction';
import { useSelector, useDispatch } from 'react-redux';
import { getAllOrders } from '../../middleware/actions/orderAction';
import { getAllUsers } from '../../middleware/actions/userAction';
import { categories } from '../../utils/constants';
import MetaData from '../Layouts/MetaData';
import { Link } from 'react-router-dom';

const MainData = () => {
    const dispatch = useDispatch();

    const { products } = useSelector((state) => state.products);
    const { orders } = useSelector((state) => state.allOrders);
    const { users } = useSelector((state) => state.users);

    let outOfStock = 0;

    products?.forEach((item) => {
        if (item.stock === 0) {
            outOfStock += 1;
        }
    });

    useEffect(() => {
        dispatch(getAdminProducts());
        dispatch(getAllOrders());
        dispatch(getAllUsers());
    }, [dispatch]);

    let totalAmount = orders?.reduce((total, order) => total + order.totalPrice, 0);

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const date = new Date();
    const lineState = {
        labels: months,
        datasets: [
            {
                label: `Sales in ${date.getFullYear() - 2}`,
                borderColor: '#8A39E1',
                backgroundColor: '#8A39E1',
                data: months.map((m, i) =>
                    orders
                        ?.filter((od) => new Date(od.createdAt).getMonth() === i && new Date(od.createdAt).getFullYear() === date.getFullYear() - 2)
                        .reduce((total, od) => total + od.totalPrice, 0)
                ),
            },
            {
                label: `Sales in ${date.getFullYear() - 1}`,
                borderColor: 'orange',
                backgroundColor: 'orange',
                data: months.map((m, i) =>
                    orders
                        ?.filter((od) => new Date(od.createdAt).getMonth() === i && new Date(od.createdAt).getFullYear() === date.getFullYear() - 1)
                        .reduce((total, od) => total + od.totalPrice, 0)
                ),
            },
            {
                label: `Sales in ${date.getFullYear()}`,
                borderColor: '#4ade80',
                backgroundColor: '#4ade80',
                data: months.map((m, i) =>
                    orders
                        ?.filter((od) => new Date(od.createdAt).getMonth() === i && new Date(od.createdAt).getFullYear() === date.getFullYear())
                        .reduce((total, od) => total + od.totalPrice, 0)
                ),
            },
        ],
    };

    const statuses = ['Processing', 'Shipped', 'Delivered'];

    const pieState = {
        labels: statuses,
        datasets: [
            {
                backgroundColor: ['#9333ea', '#facc15', '#4ade80'],
                hoverBackgroundColor: ['#a855f7', '#fde047', '#86efac'],
                data: statuses.map((status) => orders?.filter((item) => item.orderStatus === status).length),
            },
        ],
    };

    const doughnutState = {
        labels: ['Out of Stock', 'In Stock'],
        datasets: [
            {
                backgroundColor: ['#ef4444', '#22c55e'],
                hoverBackgroundColor: ['#dc2626', '#16a34a'],
                data: [outOfStock, products.length - outOfStock],
            },
        ],
    };

    const barState = {
        labels: categories,
        datasets: [
            {
                label: 'Products',
                borderColor: '#9333ea',
                backgroundColor: '#9333ea',
                hoverBackgroundColor: '#6b21a8',
                data: categories.map((cat) => products?.filter((item) => item.category === cat).length),
            },
        ],
    };

    const boxdata = [
        { title: 'Total Sales Amount', value: totalAmount?.toLocaleString(), icon: 'fas fa-rupee-sign' },
        { title: 'Total Orders', value: orders?.length, icon: 'fa fa-shopping-cart' },
        { title: 'Total Products', value: products?.length, icon: 'far fa-list-alt' },
        { title: 'Total Users', value: users?.length, icon: 'fa fa-user' },
    ];

    return (
        <>
            <MetaData title="Admin Dashboard" />
            <div className="dash__box dash__box--bg-white dash__box--shadow dash__box--w dash__box--radius u-s-m-b-30">
                <div className="dash__pad-1">
                    <ul className="dash__w-list row">
                        {boxdata.map((el, index) => (
                            <div class="col-lg-3 col-md-12">
                                <li>
                                    <div className="dash__w-wrap">
                                        <span className={`dash__w-icon dash__w-icon-style-${index + 1}`}>
                                            <i className={el.icon}></i>
                                        </span>
                                        <span className="dash__w-text">
                                            {index == 0 && '₹'}
                                            {el.value}
                                        </span>
                                        <span className="dash__w-name">{el.title}</span>
                                    </div>
                                </li>
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="dash__box dash__box--bg-white dash__box--shadow dash__box--w dash__box--radius u-s-m-b-30">
                <div className="dash__pad-1 row">
                    <div class="col-lg-8 col-md-12">
                        <Bar data={barState} />
                    </div>
                    <div class="col-lg-4 col-md-12">
                        <Pie data={pieState} />
                    </div>
                    <div class="col-lg-8 col-md-12">
                        <Line data={lineState} />
                    </div>
                    <div class="col-lg-4 col-md-12">
                        <Doughnut data={doughnutState} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default MainData;
