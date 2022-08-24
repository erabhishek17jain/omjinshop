import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { Link, useNavigate } from 'react-router-dom';
import { clearErrors, deleteProduct, getAdminProducts } from '../../../middleware/actions/productAction';
import Rating from '@mui/material/Rating';
import { DELETE_PRODUCT_RESET } from '../../../middleware/constants/productConstants';
import Actions from '../Actions';
import MetaData from '../../Layouts/MetaData';
import BackdropLoader from '../../Layouts/BackdropLoader';
import Sidebar from '../../Layouts/Sidebar';
import { getNavigation } from '../../../utils/services';
import DeleteConfirmModal from '../../Layouts/Modals/DeleteConfirmModal';
import { setPath } from '../../../middleware/actions/pathAction';

const ProductTable = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const { products, error } = useSelector((state) => state.products);
    const { loading, isDeleted, error: deleteError } = useSelector((state) => state.product);
    const [pageSize, setPageSize] = React.useState(5);
    const { pathItems } = useSelector((state) => state.path);

    const addProduct = { title: 'Edit Product', path: '/admin/product/newProduct', tab: 'editProduct' };
    const [details, setDetails] = useState({ id: '', name: '' });
    const [open, setOpen] = useState(false);

    const deleteItem = (e, id, name) => {
        e.preventDefault();
        setDetails({ id: id, name: name });
        setOpen(true);
    };

    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id));
    };

    const redirectTo = (e, path, i) => {
        if (e !== '') e.preventDefault();
        let newPath = pathItems;
        newPath.push(path);
        dispatch(setPath(newPath)).then(() => {
            navigate(path.path);
        });
    };

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

    const columns = [
        {
            field: 'name',
            headerName: 'Name',
            minWidth: 200,
            flex: 1,
            renderCell: (params) => {
                return (
                    <div className='admin-table-name'>
                        <img draggable='false' src={params.row.image} alt={params.row.name} className='admin-table-avatar' />
                        <span className='admin-table-avatar-span'>{params.row.name}</span>
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
                            <span className='font-medium text-red-700 rounded-full bg-red-200 p-1 w-6 h-6 flex items-center justify-center'>
                                {params.row.stock}
                            </span>
                        ) : (
                            <span className=''>{params.row.stock}</span>
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
                return <Rating readOnly value={params.row.rating} size='small' precision={0.5} />;
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
                const updateProduct = { title: 'Update Product', path: `/admin/product/${params.row.id}`, tab: 'updateProduct' };
                return (
                    <div className='flex justify-between items-center gap-3'>
                        <a href={'#'} className='table-p__delete-link' onClick={(e) => redirectTo(e, updateProduct, updateProduct.path.split('/').length - 1)}>
                            <i className='fas fa-edit'></i>
                        </a>
                        <a href='#' className='far fa-trash-alt table-p__delete-link' onClick={(e) => deleteItem(e, params.row.id, params.row.name)}></a>
                    </div>
                );
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
            <MetaData title='Admin Products' />
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
                                    <div className='ad-product'>
                                        <h1 className='shop-w__h' style={{ border: 'none', paddingLeft: 0 }}>
                                            PRODUCTS
                                        </h1>
                                        <a
                                            href={'#'}
                                            className='btn btn--e-brand-b-2'
                                            onClick={(e) => redirectTo(e, addProduct, addProduct.path.split('/').length - 1)}
                                        >
                                            Add Product
                                        </a>
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
                {open && (
                    <DeleteConfirmModal
                        id={details.id}
                        name={details.name}
                        closeModal={() => {
                            setOpen(false);
                        }}
                        deleteHandler={() => deleteProductHandler(details.id)}
                    />
                )}
            </div>
        </>
    );
};

export default ProductTable;
