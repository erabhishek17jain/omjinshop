import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { clearErrors, deleteUser, getAllUsers } from '../../../middleware/actions/userAction';
import { DELETE_USER_RESET } from '../../../middleware/constants/userConstants';
import Actions from '../Actions';
import MetaData from '../../Layouts/MetaData';
import BackdropLoader from '../../Layouts/BackdropLoader';
import Sidebar from '../../Layouts/Sidebar';
import { getNavigation } from '../../../utils/services';
const UserTable = () => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const { users, error } = useSelector((state) => state.users);
    const { loading, isDeleted, error: deleteError } = useSelector((state) => state.profile);
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
            enqueueSnackbar('User Deleted Successfully', { variant: 'success' });
            dispatch({ type: DELETE_USER_RESET });
        }
        dispatch(getAllUsers());
    }, [dispatch, error, deleteError, isDeleted, enqueueSnackbar]);

    const deleteUserHandler = (id) => {
        dispatch(deleteUser(id));
    };

    const columns = [
        {
            field: 'name',
            headerName: 'Name',
            minWidth: 200,
            flex: 1,
            renderCell: (params) => {
                return (
                    <div className='flex items-center gap-2'>
                        <div className='w-10 h-10 rounded-full'>
                            <img
                                width={45}
                                height={45}
                                draggable='false'
                                src={params.row.avatar}
                                alt={params.row.name}
                                className='w-full h-full rounded-full object-cover'
                            />
                        </div>
                        {params.row.name}
                    </div>
                );
            },
        },
        {
            field: 'email',
            headerName: 'Email',
            minWidth: 200,
            flex: 0.2,
        },
        {
            field: 'gender',
            headerName: 'Gender',
            minWidth: 100,
            flex: 0.1,
        },
        {
            field: 'role',
            headerName: 'Role',
            minWidth: 100,
            flex: 0.2,
            renderCell: (params) => {
                return (
                    <>
                        {params.row.role === 'admin' ? (
                            <span className='text-sm bg-green-100 p-1 px-2 font-medium rounded-full text-green-800 capitalize'>{params.row.role}</span>
                        ) : (
                            <span className='text-sm bg-purple-100 p-1 px-2 font-medium rounded-full text-purple-800 capitalize'>{params.row.role}</span>
                        )}
                    </>
                );
            },
        },
        {
            field: 'signUpedOn',
            headerName: 'Sign Up On',
            type: 'date',
            minWidth: 150,
            flex: 0.2,
        },
        {
            field: 'actions',
            headerName: 'Actions',
            minWidth: 200,
            flex: 0.3,
            type: 'number',
            sortable: false,
            renderCell: (params) => {
                return <Actions editRoute={'user'} deleteHandler={deleteUserHandler} id={params.row.id} name={params.row.name} />;
            },
        },
    ];

    const rows = [];

    users &&
        users.forEach((item) => {
            rows.unshift({
                id: item._id,
                name: item.name,
                avatar: item.avatar.url,
                email: item.email,
                gender: item.gender.toUpperCase(),
                role: item.role,
                signUpedOn: new Date(item.createdAt).toISOString().substring(0, 10),
            });
        });

    return (
        <>
            <MetaData title='Admin Users' />

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
                                <div className='col-lg-9 col-md-12 pd-detail__form'>
                                    <div className='ad-product'>
                                        <h1 className='shop-w__h' style={{ border: 'none', paddingLeft: 0 }}>
                                            USERS
                                        </h1>
                                    </div>
                                    <DataGrid
                                        rows={rows}
                                        columns={columns}
                                        pageSize={10}
                                        disableSelectionOnClick
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

export default UserTable;
