import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { clearErrors, createCategory, deleteCategory, getAdminCategory, updateCategory } from '../../../middleware/actions/categoryAction';
import { DELETE_CATEGORY_RESET } from '../../../middleware/constants/categoryConstants';
import MetaData from '../../Layouts/MetaData';
import BackdropLoader from '../../Layouts/BackdropLoader';
import Sidebar from '../../Layouts/Sidebar';
import { getNavigation } from '../../../utils/services';
import CategoryTab from '../../Products/ProductCategory/CategoryTab';

const CategoryTable = () => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const { category, error, loading, isDeleted, error: deleteError } = useSelector((state) => state.category);
    const { pathItems } = useSelector((state) => state.path);

    const [main, setMain] = useState('');
    const [sub1, setsub1] = useState('');
    const [sub2, setSub2] = useState('');

    const newCategorySubmitHandler = (e) => {
        e.preventDefault();
        if (main.length <= 0) {
            enqueueSnackbar('Add atleast Main Category', { variant: 'warning' });
            return;
        }

        const formData = new FormData();

        const mainCat = category.filter((item) => {
            return item.main === main;
        });
        if (mainCat.length > 0) {
            const subCat = mainCat[0].sub1.filter((item) => {
                return item.name === sub1;
            });
            if (subCat.length > 0) {
                const subSubCat = sub1[0].sub2.filter((item) => {
                    return item === sub2;
                });
                if (subSubCat.length > 0) {
                    enqueueSnackbar('Category already exists', { variant: 'warning' });
                } else {
                    formData.set('main', mainCat[0].main);
                    formData.set('sub1', [{ name: sub1, sub2: [...sub1[0].sub2, sub2] }]);
                    dispatch(updateCategory(mainCat[0]._id, formData));
                }
            } else {
                let s1 = [...mainCat[0].sub1, { name: sub1, sub2: [sub2] }];
                formData.set('main', mainCat[0].main);
                formData.set('sub1', s1);
                dispatch(updateCategory(mainCat[0]._id, formData));
            }
        } else {
            formData.set('main', main);
            formData.set('sub1', [{ name: sub1, sub2: [sub2] }]);
            dispatch(createCategory(formData));
        }
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
            enqueueSnackbar('Category Deleted Successfully', { variant: 'success' });
            dispatch({ type: DELETE_CATEGORY_RESET });
        }
        dispatch(getAdminCategory());
    }, [dispatch, error, deleteError, isDeleted, enqueueSnackbar]);

    const deleteCategoryHandler = (id) => {
        dispatch(deleteCategory(id));
    };

    return (
        <>
            <MetaData title='Admin Categorys' />
            {loading && <BackdropLoader />}

            {getNavigation(pathItems)}
            <div className='u-s-p-b-60'>
                <div className='section__content'>
                    <div className='dash'>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-lg-3 col-md-12'>
                                    <Sidebar activeTab={'adCategory'} />
                                </div>
                                <div className='col-lg-9 col-md-12 '>
                                    <div className='ad-category'>
                                        <form id='mainform' onSubmit={newCategorySubmitHandler} encType='multipart/form-data' className=' pd-new'>
                                            <div className='row' style={{ alignItems: 'end' }}>
                                                <div className='col-lg-3 col-md-12 col-sm-12'>
                                                    <div className='u-s-m-b-15'>
                                                        <label className='gl-label' htmlFor='category'>
                                                            MAIN CATEGORY *
                                                        </label>
                                                        <input
                                                            type='text'
                                                            id='name'
                                                            name='name'
                                                            value={main}
                                                            onChange={(e) => setMain(e.target.value)}
                                                            placeholder='Category Name'
                                                            className='input-text input-text--primary-style'
                                                        />
                                                    </div>
                                                </div>
                                                <div className='col-lg-3 col-md-12 col-sm-12'>
                                                    <div className='u-s-m-b-15'>
                                                        <label className='gl-label' htmlFor='category'>
                                                            SUB CATEGORY
                                                        </label>
                                                        <input
                                                            type='text'
                                                            id='name'
                                                            name='name'
                                                            value={sub1}
                                                            onChange={(e) => setsub1(e.target.value)}
                                                            placeholder='Category Name'
                                                            className='input-text input-text--primary-style'
                                                        />
                                                    </div>
                                                </div>
                                                <div className='col-lg-3 col-md-12 col-sm-12'>
                                                    <div className='u-s-m-b-15'>
                                                        <label className='gl-label' htmlFor='category'>
                                                            SUB SUB CATEGORY
                                                        </label>
                                                        <input
                                                            type='text'
                                                            id='name'
                                                            name='name'
                                                            value={sub2}
                                                            onChange={(e) => setSub2(e.target.value)}
                                                            placeholder='Category Name'
                                                            className='input-text input-text--primary-style'
                                                        />
                                                    </div>
                                                </div>
                                                <div className='col-lg-3 col-md-12 col-sm-12'>
                                                    <div className='u-s-m-b-15'>
                                                        <button className='btn btn--e-brand-b-2' type='submit'>
                                                            ADD CATEGORY
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <CategoryTab catList={'category-list'} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CategoryTable;
