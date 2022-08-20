import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { orderColumns } from '../../../../utils/constants';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { formatDate } from '../../../../utils/services';

const RecentOrders = () => {
    const rows = [];
    const [pageSize, setPageSize] = useState(10);
    const { orders, error } = useSelector((state) => state.allOrders);

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

    return (
        <div className="dash__box dash__box--bg-white dash__box--shadow dash__box--w dash__box--radius u-s-m-b-30">
            <div className="dash__pad-1" style={{ height: '576px' }}>
                <DataGrid
                    rows={rows}
                    columns={orderColumns}
                    pagination
                    pageSize={pageSize}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    rowsPerPageOptions={[10, 20]}
                    disableSelectionOnClick
                    // components={{ Toolbar: GridToolbar }}
                    sx={{
                        boxShadow: 0,
                        border: 0,
                    }}
                />
            </div>
        </div>
    );
};

export default RecentOrders;
