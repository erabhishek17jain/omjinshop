import React from 'react';
import { useSelector } from 'react-redux';

const OrderSideBar = () => {
    const delivered = 0;
    const shipped = 0;
    const inProcess = 0;

    const { orders, error } = useSelector((state) => state.allOrders);

    const boxdata = [
        { title: 'Total Orders', value: orders?.length, icon: 'fa fa-shopping-cart' },
        { title: 'Orders Shipped', value: shipped, icon: 'fab fa-first-order' },
        { title: 'Orders In Process', value: inProcess, icon: 'fa fa-spinner' },
        { title: 'Orders Delivered', value: delivered, icon: 'fas fa-times' },
    ];
    return (
        <div className="dash__box dash__box--bg-white dash__box--shadow dash__box--w">
            <div className="dash__pad-1">
                <ul className="dash__w-list">
                    {boxdata.map((el, index) => (
                        <li>
                            <div className="dash__w-wrap">
                                <span className={`dash__w-icon dash__w-icon-style-${index + 1}`}>
                                    <i className={el.icon}></i>
                                </span>
                                <span className="dash__w-text">₹{el.value}</span>
                                <span className="dash__w-name">{el.title}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default OrderSideBar;
