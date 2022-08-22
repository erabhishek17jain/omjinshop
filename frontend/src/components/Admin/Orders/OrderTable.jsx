import React, { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { clearErrors, deleteOrder, getAllOrders } from '../../../middleware/actions/orderAction';
import { DELETE_ORDER_RESET } from '../../../middleware/constants/orderConstants';
import { formatDate, getNavigation } from '../../../utils/services';
import MetaData from '../../Layouts/MetaData';
import BackdropLoader from '../../Layouts/BackdropLoader';
import Sidebar from '../../Layouts/Sidebar';
import { orderColumns } from '../../../utils/constants';

const OrderTable = () => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const [pageSize, setPageSize] = useState(10);
    const { orders, error } = useSelector((state) => state.allOrders);
    const { loading, isDeleted, error: deleteError } = useSelector((state) => state.order);
    const { pathItems } = useSelector((state) => state.path);

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: 'error' });
            dispatch(clearErrors());
        }
        if (deleteError) {
            enqueueSnackbar(deleteError, { variant: 'error' });
            dispatch(clearErrors());
        }
        if (isDeleted) {
            enqueueSnackbar('Deleted Successfully', { variant: 'success' });
            dispatch({ type: DELETE_ORDER_RESET });
        }
        dispatch(getAllOrders());
    }, [dispatch, error, deleteError, isDeleted, enqueueSnackbar]);

    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id));
    };

    const rows = [];

    orders &&
        orders.forEach((order) => {
            rows.unshift({
                id: order._id,
                itemsQty: order.orderItems.length,
                amount: order.totalPrice,
                orderOn: formatDate(order.createdAt),
                status: order.orderStatus,
            });
        });

    const delivered = 0;
    const shipped = 0;
    const inProcess = 0;

    const boxdata = [
        { title: 'Total Orders', value: orders?.length, icon: 'fa fa-shopping-cart' },
        { title: 'Orders Shipped', value: shipped, icon: 'fab fa-first-order' },
        { title: 'Orders In Process', value: inProcess, icon: 'fa fa-spinner' },
        { title: 'Orders Delivered', value: delivered, icon: 'fas fa-times' },
    ];
    return (
        <>
            <MetaData title='Admin Orders' />

            {loading && <BackdropLoader />}
            {getNavigation(pathItems)}
            <div className='u-s-p-b-60'>
                <div className='section__content'>
                    <div className='dash'>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-lg-3 col-md-12'>
                                    <Sidebar activeTab={'adDashboard'} />
                                </div>
                                <div className='col-lg-9 col-md-12'>
                                    <div className='dash__box dash__box--bg-white dash__box--shadow dash__box--w dash__box--radius u-s-m-b-30'>
                                        <div className='dash__pad-1'>
                                            <ul className='dash__w-list row'>
                                                {boxdata.map((el, index) => (
                                                    <div className='col-lg-3 col-md-12'>
                                                        <li>
                                                            <div className='dash__w-wrap'>
                                                                <span className={`dash__w-icon dash__w-icon-style-${index + 1}`}>
                                                                    <i className={el.icon}></i>
                                                                </span>
                                                                <span className='dash__w-text'>₹{el.value}</span>
                                                                <span className='dash__w-name'>{el.title}</span>
                                                            </div>
                                                        </li>
                                                    </div>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                    <div className='dash__box dash__box--bg-white dash__box--shadow dash__box--w dash__box--radius u-s-m-b-30'>
                                        <div className='dash__pad-1' style={{ height: '576px' }}>
                                            <DataGrid
                                                rows={rows}
                                                columns={orderColumns}
                                                pagination
                                                pageSize={pageSize}
                                                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                                                rowsPerPageOptions={[10, 20]}
                                                disableSelectionOnClick
                                                components={{ Toolbar: GridToolbar }}
                                                sx={{
                                                    boxShadow: 0,
                                                    border: 0,
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OrderTable;
