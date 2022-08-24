import { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { ADMIN_PRODUCTS_REQUEST, NEW_PRODUCT_RESET } from '../../../middleware/constants/productConstants';
import { createProduct, clearErrors } from '../../../middleware/actions/productAction';
import MetaData from '../../Layouts/MetaData';
import BackdropLoader from '../../Layouts/BackdropLoader';
import React from 'react';
import Sidebar from '../../Layouts/Sidebar';
import { getNavigation } from '../../../utils/services';
import { getAdminCategory } from '../../../middleware/actions/categoryAction';
import { setPath } from '../../../middleware/actions/pathAction';

const NewProduct = () => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const { loading, success, error } = useSelector((state) => state.newProduct);
    const { category } = useSelector((state) => state.category);
    const { pathItems } = useSelector((state) => state.path);

    const products = { title: 'Products', path: '/admin/products', tab: 'adProducts' };

    const [highlights, setHighlights] = useState([]);
    const [highlightInput, setHighlightInput] = useState('');
    const [specs, setSpecs] = useState([]);
    const [specsInput, setSpecsInput] = useState({
        title: '',
        description: '',
    });

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [cuttedPrice, setCuttedPrice] = useState(0);
    const [main, setMain] = useState('');
    const [sub1, setsub1] = useState('');
    const [sub1List, setsub1List] = useState([]);
    const [sub1Data, setsub1Data] = useState([]);
    const [sub2, setSubsub1] = useState('');
    const [subsub1List, setSubsub1List] = useState([]);
    const [stock, setStock] = useState(0);
    const [warranty, setWarranty] = useState(0);
    const [brand, setBrand] = useState('');
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const [avatarPreview] = useState('preview.png');
    const [logo, setLogo] = useState(null);
    const [logoPreview, setLogoPreview] = useState(null);

    const handleSpecsChange = (e) => {
        setSpecsInput({ ...specsInput, [e.target.name]: e.target.value });
    };

    const addSpecs = (e) => {
        e.preventDefault();
        if (!specsInput.title.trim() || !specsInput.title.trim()) return;
        setSpecs([...specs, specsInput]);
        setSpecsInput({ title: '', description: '' });
    };

    const addHighlight = (e) => {
        e.preventDefault();
        if (!highlightInput.trim()) return;
        setHighlights([...highlights, highlightInput]);
        setHighlightInput('');
    };

    const deleteHighlight = (index) => {
        setHighlights(highlights.filter((h, i) => i !== index));
    };

    const deleteSpec = (index) => {
        setSpecs(specs.filter((s, i) => i !== index));
    };

    const handleLogoChange = (e) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setLogoPreview(reader.result);
                setLogo(reader.result);
            }
        };

        reader.readAsDataURL(e.target.files[0]);
    };

    const handleProductImageChange = (e) => {
        const files = Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((oldImages) => [...oldImages, reader.result]);
                    setImages((oldImages) => [...oldImages, reader.result]);
                }
            };
            reader.readAsDataURL(file);
        });
    };

    const newProductSubmitHandler = () => {
        // required field checks
        if (highlights.length <= 0) {
            enqueueSnackbar('Add Highlights', { variant: 'warning' });
            return;
        }
        if (!logo) {
            enqueueSnackbar('Add Brand Logo', { variant: 'warning' });
            return;
        }
        if (specs.length <= 1) {
            enqueueSnackbar('Add Minimum 2 Specifications', { variant: 'warning' });
            return;
        }
        if (images.length <= 0) {
            enqueueSnackbar('Add Product Images', { variant: 'warning' });
            return;
        }

        const formData = new FormData();

        formData.set('name', name);
        formData.set('description', description);
        formData.set('price', price);
        formData.set('cuttedPrice', cuttedPrice);
        formData.set('category', main + '=' + sub1 + '=' + sub2);
        formData.set('stock', stock);
        formData.set('warranty', warranty);
        formData.set('brandname', brand);
        formData.set('logo', logo);

        images.forEach((image) => {
            formData.append('images', image);
        });

        highlights.forEach((h) => {
            formData.append('highlights', h);
        });

        specs.forEach((s) => {
            formData.append('specifications', JSON.stringify(s));
        });

        dispatch(createProduct(formData));
    };

    const redirectTo = (e, path, i) => {
        if (e !== '') e.preventDefault();
        let newPath = pathItems;
        newPath.splice(i, newPath.length - 1);
        newPath[newPath.length - 1] = path;
        dispatch(setPath(newPath)).then(() => {
            navigate(path.path);
        });
    };

    useEffect(() => {
        if (main !== '') {
            const found = category.filter((item) => {
                return item.main === main;
            });
            const sub1 = found[0].sub1.map((item) => {
                return item.name;
            });
            setsub1Data(found[0].sub1);
            setsub1List(sub1);
        }
    }, [main]);

    useEffect(() => {
        if (sub1 !== '') {
            const found = sub1Data.filter((item) => {
                return item.name === sub1;
            });
            setSubsub1List(found[0].sub2);
        }
    }, [sub1]);

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: 'error' });
            dispatch(clearErrors());
        }
        if (success) {
            enqueueSnackbar('Product Created', { variant: 'success' });
            dispatch({ type: ADMIN_PRODUCTS_REQUEST });
            navigate('/admin/products');
        }
        dispatch(getAdminCategory());
    }, [dispatch, error, success, navigate, enqueueSnackbar]);

    return (
        <>
            <MetaData title='Admin: New Product' />

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
                                <div className='col-lg-9 col-md-12 pd-detail__form ad-product'>
                                    <form id='mainform' onSubmit={newProductSubmitHandler} encType='multipart/form-data' className='row pd-new'>
                                        <div className='row'>
                                            <div className='col-lg-6 col-md-8 u-s-m-b-15'>
                                                <div className='u-s-m-b-15'>
                                                    <label className='gl-label' htmlFor='name'>
                                                        PRODUCT NAME *
                                                    </label>
                                                    <input
                                                        type='text'
                                                        id='name'
                                                        name='name'
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                        placeholder='Product Name'
                                                        className='input-text input-text--primary-style'
                                                    />
                                                </div>
                                                <div className='u-s-m-b-15'>
                                                    <label className='gl-label' htmlFor='description'>
                                                        DESCRIPTION *
                                                    </label>
                                                    <textarea
                                                        id='description'
                                                        value={description}
                                                        placeholder='Description'
                                                        onChange={(e) => setDescription(e.target.value)}
                                                        className='text-area text-area--primary-style'
                                                    ></textarea>
                                                </div>
                                                <div className='u-s-m-b-15'>
                                                    <div style={{ display: 'flex' }}>
                                                        <div>
                                                            <label className='gl-label' htmlFor='price'>
                                                                PRICE *
                                                            </label>
                                                            <input
                                                                type='text'
                                                                id='price'
                                                                name='price'
                                                                min={0}
                                                                value={price}
                                                                onChange={(e) => setPrice(e.target.value)}
                                                                placeholder='First Name'
                                                                className='input-text input-text--primary-style'
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className='gl-label' htmlFor='cuttedPrice'>
                                                                CUTTED PRICE *
                                                            </label>
                                                            <input
                                                                type='text'
                                                                id='cuttedPrice'
                                                                name='cuttedPrice'
                                                                value={cuttedPrice}
                                                                placeholder='Price'
                                                                min={0}
                                                                onChange={(e) => setCuttedPrice(e.target.value)}
                                                                className='input-text input-text--primary-style'
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='u-s-m-b-15'>
                                                    <div style={{ display: 'flex' }}>
                                                        <div style={{ marginRight: 4, width: '-webkit-fill-available' }}>
                                                            <label className='gl-label' htmlFor='category'>
                                                                CATEGORY *
                                                            </label>
                                                            <select
                                                                required
                                                                id='category'
                                                                name='category'
                                                                value={main}
                                                                onChange={(e) => setMain(e.target.value)}
                                                                className='select-box select-box--primary-style u-w-100'
                                                            >
                                                                <option value=''>Select Category</option>
                                                                {category &&
                                                                    category.map((i) => {
                                                                        return <option value={i.main}>{i.main}</option>;
                                                                    })}
                                                            </select>
                                                        </div>

                                                        <div style={{ marginRight: 4, width: '-webkit-fill-available' }}>
                                                            <label className='gl-label' htmlFor='sub1'>
                                                                SUB CATEGORY
                                                            </label>
                                                            <select
                                                                required
                                                                id='sub1'
                                                                name='sub1'
                                                                value={sub1}
                                                                disabled={!(sub1List && sub1List.length > 0)}
                                                                onChange={(e) => setsub1(e.target.value)}
                                                                className='select-box select-box--primary-style u-w-100'
                                                            >
                                                                <option value=''>Select Category</option>
                                                                {sub1List.map((i) => {
                                                                    return <option value={i}>{i}</option>;
                                                                })}
                                                            </select>
                                                        </div>
                                                        <div style={{ width: '-webkit-fill-available' }}>
                                                            <label className='gl-label' htmlFor='sub2'>
                                                                SUB SUB CATEGORY
                                                            </label>
                                                            <select
                                                                required
                                                                id='sub2'
                                                                name='sub2'
                                                                value={sub2}
                                                                disabled={!(subsub1List && subsub1List.length > 0)}
                                                                onChange={(e) => setSubsub1(e.target.value)}
                                                                className='select-box select-box--primary-style u-w-100'
                                                            >
                                                                <option value=''>Select Category</option>
                                                                {subsub1List.map((i) => {
                                                                    return <option value={i}>{i}</option>;
                                                                })}
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='u-s-m-b-15'>
                                                    <div className=''>
                                                        <div style={{ display: 'flex' }}>
                                                            <div>
                                                                <label className='gl-label' htmlFor='stock'>
                                                                    STOCK *
                                                                </label>
                                                                <input
                                                                    type='text'
                                                                    id='stock'
                                                                    name='stock'
                                                                    value={stock}
                                                                    placeholder='Stock'
                                                                    onChange={(e) => setStock(e.target.value)}
                                                                    className='input-text input-text--primary-style'
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className='gl-label' htmlFor='warranty'>
                                                                    WARRANTY *
                                                                </label>
                                                                <input
                                                                    type='text'
                                                                    id='warranty'
                                                                    name='warranty'
                                                                    placeholder='Warranty'
                                                                    value={warranty}
                                                                    onChange={(e) => setWarranty(e.target.value)}
                                                                    className='input-text input-text--primary-style'
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='u-s-m-b-15'>
                                                    <label className='gl-label' htmlFor='name'>
                                                        HIGHLIGHTS *
                                                    </label>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                        <div style={{ width: '-webkit-fill-available', marginRight: '2px' }}>
                                                            <input
                                                                type='text'
                                                                id='name'
                                                                name='name'
                                                                placeholder='Highlights'
                                                                value={highlightInput}
                                                                onChange={(e) => setHighlightInput(e.target.value)}
                                                                className='input-text input-text--primary-style'
                                                            />
                                                        </div>
                                                        <button className='btn btn--e-brand-b-2' onClick={(e) => addHighlight(e)}>
                                                            Add
                                                        </button>
                                                    </div>
                                                    <ul style={{ padding: 0, margin: 0 }}>
                                                        {highlights?.map((h, i) => (
                                                            <li key={i} className='pd-new-highlight'>
                                                                <span>
                                                                    <i className='fas fa-check u-s-m-r-8'></i>
                                                                    {h}
                                                                </span>
                                                                <span onClick={() => deleteHighlight(i)}>
                                                                    <i className='fas fa-trash'></i>
                                                                </span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className='col-lg-6 col-md-8 u-s-m-b-15 '>
                                                <div className='u-s-m-b-15'>
                                                    <label className='gl-label' htmlFor='brand'>
                                                        BRAND DETAILS *
                                                    </label>
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                        <div style={{ width: '-webkit-fill-available', marginRight: '2px' }}>
                                                            <input
                                                                type='text'
                                                                id='brand'
                                                                name='brand'
                                                                placeholder='Brand'
                                                                value={brand}
                                                                onChange={(e) => setBrand(e.target.value)}
                                                                className='input-text input-text--primary-style'
                                                            />
                                                        </div>
                                                        <div style={{ marginRight: '2px', display: 'flex' }}>
                                                            <div style={{ margin: '0px 6px 0px 4px' }}>
                                                                <Avatar
                                                                    alt='Avatar preview'
                                                                    src={logoPreview ? logoPreview : avatarPreview}
                                                                    sx={{ width: 45, height: 45 }}
                                                                />
                                                            </div>
                                                            <label
                                                                className='btn btn btn--e-brand-b-2 u-w-100'
                                                                style={{ display: 'flex', justifyContent: 'center' }}
                                                            >
                                                                <input
                                                                    type='file'
                                                                    name='logo'
                                                                    className='hidden'
                                                                    accept='image/*'
                                                                    style={{ display: 'none' }}
                                                                    onChange={handleLogoChange}
                                                                />
                                                                FILE
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='u-s-m-b-15'>
                                                    <label className='gl-label' htmlFor='name'>
                                                        PRODUCT IMAGES *
                                                    </label>
                                                    <div className='pd-new-image'>
                                                        {imagesPreview.map((image, i) => (
                                                            <img draggable='false' src={image} alt='Product' key={i} className='w-full h-full object-contain' />
                                                        ))}
                                                    </div>
                                                    <label className='btn btn btn--e-brand-b-2 u-w-100' style={{ display: 'flex', justifyContent: 'center' }}>
                                                        <input
                                                            type='file'
                                                            name='images'
                                                            accept='image/*'
                                                            style={{ display: 'none' }}
                                                            onChange={handleProductImageChange}
                                                            className='hidden'
                                                        />
                                                        FILE
                                                    </label>
                                                </div>
                                                <div className='u-s-m-b-15'>
                                                    <label className='gl-label' htmlFor='specification'>
                                                        SPECIFICATIONS *
                                                    </label>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                        <div style={{ width: '-webkit-fill-available', marginRight: '2px' }}>
                                                            <input
                                                                type='text'
                                                                id='title'
                                                                name='title'
                                                                placeholder='Ex: Model No'
                                                                value={specsInput.title}
                                                                onChange={handleSpecsChange}
                                                                className='input-text input-text--primary-style'
                                                            />
                                                        </div>
                                                        <div style={{ width: '-webkit-fill-available', marginRight: '2px' }}>
                                                            <input
                                                                type='text'
                                                                id='description'
                                                                name='description'
                                                                placeholder='Ex: WJDK42DF5'
                                                                value={specsInput.description}
                                                                onChange={handleSpecsChange}
                                                                className='input-text input-text--primary-style'
                                                            />
                                                        </div>
                                                        <button className='btn btn--e-brand-b-2' onClick={(e) => addSpecs(e)}>
                                                            Add
                                                        </button>
                                                    </div>
                                                    <ul style={{ padding: 0, margin: 0 }}>
                                                        {specs?.map((s, i) => (
                                                            <li key={i} className='pd-new-highlight'>
                                                                <span>
                                                                    <i className='fas fa-check u-s-m-r-8'></i>
                                                                    {s.title} : {s.description}
                                                                </span>
                                                                <span onClick={() => deleteSpec(i)}>
                                                                    <i className='fas fa-trash'></i>
                                                                </span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className='col-lg-12 col-md-12 col-sm-12 flex justify-end' style={{ flex: '0 0 100%' }}>
                                                <button className='btn btn--e-brand-b-2' style={{ marginRight: 16 }} type='submit'>
                                                    SUBMIT
                                                </button>
                                                <a
                                                    href='#'
                                                    onClick={(e) => redirectTo(e, products, products.path.split('/').length - 1)}
                                                    className='btn btn--e-transparent-brand-b-2 u-s-m-l-15'
                                                >
                                                    CANCEL
                                                </a>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NewProduct;
