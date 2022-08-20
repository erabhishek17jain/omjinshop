import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { Link } from 'react-router-dom';
import { clearErrors, deleteProduct, getAdminProducts } from '../../../middleware/actions/productAction';
import Rating from '@mui/material/Rating';
import { DELETE_PRODUCT_RESET } from '../../../middleware/constants/productConstants';
import Actions from '../Actions';
import MetaData from '../../Layouts/MetaData';
import BackdropLoader from '../../Layouts/BackdropLoader';
import Sidebar from '../../Layouts/Sidebar';
import { getNavigation } from '../../../utils/services';

const ProductTable = () => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const { products, error } = useSelector((state) => state.products);
    const { loading, isDeleted, error: deleteError } = useSelector((state) => state.product);
    const [pageSize, setPageSize] = React.useState(5);
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
            enqueueSnackbar('Product Deleted Successfully', { variant: 'success' });
            dispatch({ type: DELETE_PRODUCT_RESET });
        }
        dispatch(getAdminProducts());
    }, [dispatch, error, deleteError, isDeleted, enqueueSnackbar]);

    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id));
    };

    const columns = [
        {
            field: 'id',
            headerName: 'Product ID',
            minWidth: 100,
            flex: 0.5,
        },
        {
            field: 'name',
            headerName: 'Name',
            minWidth: 200,
            flex: 1,
            renderCell: (params) => {
                return (
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full">
                            <img draggable="false" src={params.row.image} alt={params.row.name} className="w-full h-full rounded-full object-cover" />
                        </div>
                        {params.row.name}
                    </div>
                );
            },
        },
        {
            field: 'category',
            headerName: 'Category',
            minWidth: 100,
            flex: 0.1,
        },
        {
            field: 'stock',
            headerName: 'Stock',
            type: 'number',
            headerAlign: 'left',
            align: 'left',
            minWidth: 70,
            flex: 0.1,
            renderCell: (params) => {
                return (
                    <>
                        {params.row.stock < 10 ? (
                            <span className="font-medium text-red-700 rounded-full bg-red-200 p-1 w-6 h-6 flex items-center justify-center">
                                {params.row.stock}
                            </span>
                        ) : (
                            <span className="">{params.row.stock}</span>
                        )}
                    </>
                );
            },
        },
        {
            field: 'price',
            headerName: 'Price',
            type: 'number',
            minWidth: 100,
            headerAlign: 'left',
            align: 'left',
            flex: 0.2,
            renderCell: (params) => {
                return <span>₹{params.row.price.toLocaleString()}</span>;
            },
        },
        {
            field: 'cprice',
            headerName: 'Cutted Price',
            type: 'number',
            minWidth: 100,
            headerAlign: 'left',
            align: 'left',
            flex: 0.2,
            renderCell: (params) => {
                return <span>₹{params.row.cprice.toLocaleString()}</span>;
            },
        },
        {
            field: 'rating',
            headerName: 'Rating',
            type: 'number',
            minWidth: 100,
            flex: 0.1,
            align: 'left',
            headerAlign: 'left',
            renderCell: (params) => {
                return <Rating readOnly value={params.row.rating} size="small" precision={0.5} />;
            },
        },
        {
            field: 'actions',
            headerName: 'Actions',
            minWidth: 100,
            flex: 0.3,
            type: 'number',
            sortable: false,
            renderCell: (params) => {
                return <Actions editRoute={'product'} deleteHandler={deleteProductHandler} id={params.row.id} name={undefined} />;
            },
        },
    ];

    const rows = [];

    products &&
        products.forEach((item) => {
            rows.unshift({
                id: item._id,
                name: item.name,
                image: item.images[0].url,
                category: item.category,
                stock: item.stock,
                price: item.price,
                cprice: item.cuttedPrice,
                rating: item.ratings,
            });
        });

    return (
        <>
            <MetaData title="Admin Products" />

            {loading && <BackdropLoader />}

            {getNavigation(pathItems)}
            <div className="u-s-p-b-60">
                <div className="section__content">
                    <div className="dash">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-3 col-md-12">
                                    <Sidebar activeTab={'adDashboard'} />
                                </div>
                                <div className="col-lg-9 col-md-12 ad-product">
                                    <div style={{ textAlign: 'right' }}>
                                        <Link to="/admin/newProduct" class="btn btn--e-brand-b-2">
                                            Add to Cart
                                        </Link>
                                    </div>
                                    <DataGrid
                                        rows={rows}
                                        columns={columns}
                                        pagination
                                        pageSize={10}
                                        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                                        rowsPerPageOptions={[5, 10, 20]}
                                        disableSelectIconOnClick
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
        </>
    );
};

export default ProductTable;
