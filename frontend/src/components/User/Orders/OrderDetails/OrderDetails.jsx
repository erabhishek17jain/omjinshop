import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { clearErrors, getOrderDetails } from '../../../../middleware/actions/orderAction';
import Loader from '../../../Layouts/Loader';
import TrackStepper from '../../../Layouts/TrackStepper';
import MinCategory from '../../../Layouts/MinCategory';
import MetaData from '../../../Layouts/MetaData';

const OrderDetails = () => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const params = useParams();

    const { order, error, loading } = useSelector((state) => state.orderDetails);

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: 'error' });
            dispatch(clearErrors());
        }
        dispatch(getOrderDetails(params.id));
    }, [dispatch, error, params.id, enqueueSnackbar]);

    return (
        <>
            <div className="col-lg-9 col-md-12">
                <h1 className="dash__h1 u-s-m-b-30">Order Details</h1>
                <div className="dash__box dash__box--shadow dash__box--radius dash__box--bg-white u-s-m-b-30">
                    <div className="dash__pad-2">
                        <div className="dash-l-r">
                            <div>
                                <div className="manage-o__text-2 u-c-secondary">Order #305423126</div>
                                <div className="manage-o__text u-c-silver">Placed on 26 Oct 2016 09:08:37</div>
                            </div>
                            <div>
                                <div className="manage-o__text-2 u-c-silver">
                                    Total:
                                    <span className="manage-o__text-2 u-c-secondary">$16.00</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="dash__box dash__box--shadow dash__box--radius dash__box--bg-white u-s-m-b-30">
                    <div className="dash__pad-2">
                        <div className="manage-o">
                            <div className="manage-o__header u-s-m-b-30">
                                <div className="manage-o__icon">
                                    <i className="fas fa-box u-s-m-r-5"></i>

                                    <span className="manage-o__text">Package 1</span>
                                </div>
                            </div>
                            <div className="dash-l-r">
                                <div className="manage-o__text u-c-secondary">Delivered on 26 Oct 2016</div>
                                <div className="manage-o__icon">
                                    <i className="fas fa-truck u-s-m-r-5"></i>

                                    <span className="manage-o__text">Standard</span>
                                </div>
                            </div>
                            <div className="manage-o__timeline">
                                <div className="timeline-row">
                                    <div className="col-lg-4 u-s-m-b-30">
                                        <div className="timeline-step">
                                            <div className="timeline-l-i timeline-l-i--finish">
                                                <span className="timeline-circle"></span>
                                            </div>

                                            <span className="timeline-text">Processing</span>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 u-s-m-b-30">
                                        <div className="timeline-step">
                                            <div className="timeline-l-i timeline-l-i--finish">
                                                <span className="timeline-circle"></span>
                                            </div>

                                            <span className="timeline-text">Shipped</span>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 u-s-m-b-30">
                                        <div className="timeline-step">
                                            <div className="timeline-l-i">
                                                <span className="timeline-circle"></span>
                                            </div>

                                            <span className="timeline-text">Delivered</span>
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
                                        <span className="manage-o__text-2 u-c-silver">
                                            Quantity:
                                            <span className="manage-o__text-2 u-c-secondary">1</span>
                                        </span>
                                    </div>
                                    <div>
                                        <span className="manage-o__text-2 u-c-silver">
                                            Total:
                                            <span className="manage-o__text-2 u-c-secondary">$16.00</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <div className="dash__box dash__box--bg-white dash__box--shadow u-s-m-b-30">
                            <div className="dash__pad-3">
                                <h2 className="dash__h2 u-s-m-b-8">Shipping Address</h2>
                                <h2 className="dash__h2 u-s-m-b-8">John Doe</h2>

                                <span className="dash__text-2">4247 Ashford Drive Virginia - VA-20006 - USA</span>

                                <span className="dash__text-2">(+0) 900901904</span>
                            </div>
                        </div>
                        <div className="dash__box dash__box--bg-white dash__box--shadow dash__box--w">
                            <div className="dash__pad-3">
                                <h2 className="dash__h2 u-s-m-b-8">Billing Address</h2>
                                <h2 className="dash__h2 u-s-m-b-8">John Doe</h2>

                                <span className="dash__text-2">4247 Ashford Drive Virginia - VA-20006 - USA</span>

                                <span className="dash__text-2">(+0) 900901904</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="dash__box dash__box--bg-white dash__box--shadow u-h-100">
                            <div className="dash__pad-3">
                                <h2 className="dash__h2 u-s-m-b-8">Total Summary</h2>
                                <div className="dash-l-r u-s-m-b-8">
                                    <div className="manage-o__text-2 u-c-secondary">Subtotal</div>
                                    <div className="manage-o__text-2 u-c-secondary">$16.00</div>
                                </div>
                                <div className="dash-l-r u-s-m-b-8">
                                    <div className="manage-o__text-2 u-c-secondary">Shipping Fee</div>
                                    <div className="manage-o__text-2 u-c-secondary">$16.00</div>
                                </div>
                                <div className="dash-l-r u-s-m-b-8">
                                    <div className="manage-o__text-2 u-c-secondary">Total</div>
                                    <div className="manage-o__text-2 u-c-secondary">$30.00</div>
                                </div>

                                <span className="dash__text-2">Paid by Cash on Delivery</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <MetaData title="Order Details | Omjinshop" />
            <MinCategory />
            <main className="w-full mt-14 sm:mt-4">
                {loading ? (
                    <Loader />
                ) : (
                    <>
                        {order && order.user && order.shippingInfo && (
                            <div className="flex flex-col gap-4 max-w-6xl mx-auto">
                                <div className="flex bg-white shadow rounded-sm min-w-full">
                                    <div className="sm:w-1/2 border-r">
                                        <div className="flex flex-col gap-3 my-8 mx-10">
                                            <h3 className="font-medium text-lg">Delivery Address</h3>
                                            <h4 className="font-medium">{order.user.name}</h4>
                                            <p className="text-sm">{`${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state} - ${order.shippingInfo.pincode}`}</p>
                                            <div className="flex gap-2 text-sm">
                                                <p className="font-medium">Email</p>
                                                <p>{order.user.email}</p>
                                            </div>
                                            <div className="flex gap-2 text-sm">
                                                <p className="font-medium">Phone Number</p>
                                                <p>{order.shippingInfo.phoneNo}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {order.orderItems &&
                                    order.orderItems.map((item) => {
                                        const { _id, image, name, price, quantity } = item;

                                        return (
                                            <div className="flex flex-col sm:flex-row min-w-full shadow rounded-sm bg-white px-2 py-5" key={_id}>
                                                <div className="flex flex-col sm:flex-row sm:w-1/2 gap-2">
                                                    <div className="w-full sm:w-32 h-20">
                                                        <img draggable="false" className="h-full w-full object-contain" src={image} alt={name} />
                                                    </div>
                                                    <div className="flex flex-col gap-1 overflow-hidden">
                                                        <p className="text-sm">{name.length > 60 ? `${name.substring(0, 60)}...` : name}</p>
                                                        <p className="text-xs text-gray-600 mt-2">Quantity: {quantity}</p>
                                                        <p className="text-xs text-gray-600">Price: ₹{price.toLocaleString()}</p>
                                                        <span className="font-medium">Total: ₹{(quantity * price).toLocaleString()}</span>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col w-full sm:w-1/2">
                                                    <h3 className="font-medium sm:text-center">Order Status</h3>
                                                    <TrackStepper
                                                        orderOn={order.createdAt}
                                                        shippedAt={order.shippedAt}
                                                        deliveredAt={order.deliveredAt}
                                                        activeStep={order.orderStatus === 'Delivered' ? 2 : order.orderStatus === 'Shipped' ? 1 : 0}
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>
                        )}
                    </>
                )}
            </main>
        </>
    );
};

export default OrderDetails;
