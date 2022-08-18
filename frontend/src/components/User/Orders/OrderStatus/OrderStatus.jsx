import { useSnackbar } from 'notistack';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { emptyCart } from '../../../../middleware/actions/cartAction';
import { clearErrors, getPaymentStatus, newOrder } from '../../../../middleware/actions/orderAction';
import Loader from '../../../Layouts/Loader';

const OrderStatus = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const params = useParams();

    const { shippingInfo, cartItems } = useSelector((state) => state.cart);

    const { loading, txn, error } = useSelector((state) => state.paymentStatus);
    const { loading: orderLoading, order, error: orderError } = useSelector((state) => state.newOrder);

    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const orderData = {
        shippingInfo,
        orderItems: cartItems,
        totalPrice,
    };

    useEffect(() => {
        if (loading === false) {
            if (txn) {
                if (txn.status === 'TXN_SUCCESS') {
                    orderData.paymentInfo = {
                        id: txn.id,
                        status: txn.status,
                    };

                    dispatch(newOrder(orderData));
                } else {
                    enqueueSnackbar('Processing Payment Failed!', { variant: 'error' });
                    navigate('/account/orders/failed');
                }
            } else {
                navigate('/cart');
            }
        }
        // eslint-disable-next-line
    }, [loading]);

    useEffect(() => {
        if (orderLoading === false) {
            if (order) {
                enqueueSnackbar('Order Placed', { variant: 'success' });
                dispatch(emptyCart());
                navigate('/account/orders/success');
            } else {
                navigate('/account/orders');
            }
        }
        // eslint-disable-next-line
    }, [orderLoading]);

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: 'error' });
            dispatch(clearErrors());
        }
        if (orderError) {
            enqueueSnackbar(orderError, { variant: 'error' });
            dispatch(clearErrors());
        }
        dispatch(getPaymentStatus(params.id));
    }, [dispatch, error, orderError, params.id, enqueueSnackbar]);

    return <Loader />;
};

export default OrderStatus;
