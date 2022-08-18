import React from 'react';

const RecentOrders = () => {
    return (
        <div className="dash__box dash__box--shadow dash__box--bg-white dash__box--radius">
            <h2 className="dash__h2 u-s-p-xy-20">RECENT ORDERS</h2>
            <div className="dash__table-wrap gl-scroll">
                <table className="dash__table">
                    <thead>
                        <tr>
                            <th>Order #</th>
                            <th>Placed On</th>
                            <th>Items</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>3054231326</td>
                            <td>26/13/2016</td>
                            <td>
                                <div className="dash__table-img-wrap">
                                    <img
                                        className="u-img-fluid"
                                        src="images/product/electronic/product3.207dd89cb8b11937ace9524c6c84fb78.jpg"
                                        alt=""
                                    />
                                </div>
                            </td>
                            <td>
                                <div className="dash__table-total">
                                    <span>$126.00</span>
                                    <div className="dash__link dash__link--brand">
                                        <a href="">MANAGE</a>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>3054231326</td>
                            <td>26/13/2016</td>
                            <td>
                                <div className="dash__table-img-wrap">
                                    <img
                                        className="u-img-fluid"
                                        src="images/product/electronic/product14.46bbd6ed7b0726681ab8d21232aaab26.jpg"
                                        alt=""
                                    />
                                </div>
                            </td>
                            <td>
                                <div className="dash__table-total">
                                    <span>$126.00</span>
                                    <div className="dash__link dash__link--brand">
                                        <a href="">MANAGE</a>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>3054231326</td>
                            <td>26/13/2016</td>
                            <td>
                                <div className="dash__table-img-wrap">
                                    <img className="u-img-fluid" src="images/product/men/product8.fda61b76f0c528c66aaa2f5cd3865e69.jpg" alt="" />
                                </div>
                            </td>
                            <td>
                                <div className="dash__table-total">
                                    <span>$126.00</span>
                                    <div className="dash__link dash__link--brand">
                                        <a href="">MANAGE</a>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>3054231326</td>
                            <td>26/13/2016</td>
                            <td>
                                <div className="dash__table-img-wrap">
                                    <img className="u-img-fluid" src="images/product/women/product10.abd927893b11e83d808f6230a8cb997f.jpg" alt="" />
                                </div>
                            </td>
                            <td>
                                <div className="dash__table-total">
                                    <span>$126.00</span>
                                    <div className="dash__link dash__link--brand">
                                        <a href="">MANAGE</a>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RecentOrders;
