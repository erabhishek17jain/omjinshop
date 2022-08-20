import { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { NEW_PRODUCT_RESET } from '../../../middleware/constants/productConstants';
import { createProduct, clearErrors } from '../../../middleware/actions/productAction';
import MetaData from '../../Layouts/MetaData';
import BackdropLoader from '../../Layouts/BackdropLoader';
import React from 'react';
import Sidebar from '../../Layouts/Sidebar';
import { getNavigation } from '../../../utils/services';

const NewProduct = () => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const { loading, success, error } = useSelector((state) => state.newProduct);
    const { pathItems } = useSelector((state) => state.path);

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
    const [category, setCategory] = useState('');
    const [stock, setStock] = useState(0);
    const [warranty, setWarranty] = useState(0);
    const [brand, setBrand] = useState('');
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const [avatarPreview, setAvatarPreview] = useState('preview.png');
    const [logo, setLogo] = useState(null);
    const [logoPreview, setLogoPreview] = useState(null);

    const handleSpecsChange = (e) => {
        setSpecsInput({ ...specsInput, [e.target.name]: e.target.value });
    };

    const addSpecs = () => {
        if (!specsInput.title.trim() || !specsInput.title.trim()) return;
        setSpecs([...specs, specsInput]);
        setSpecsInput({ title: '', description: '' });
    };

    const addHighlight = () => {
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

    const newProductSubmitHandler = (e) => {
        e.preventDefault();

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
        formData.set('category', category);
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

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: 'error' });
            dispatch(clearErrors());
        }
        if (success) {
            enqueueSnackbar('Product Created', { variant: 'success' });
            dispatch({ type: NEW_PRODUCT_RESET });
            navigate('/admin/products');
        }
    }, [dispatch, error, success, navigate, enqueueSnackbar]);

    return (
        <>
            <MetaData title="Admin: New Product" />

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
                                <div className="col-lg-9 col-md-12 pd-detail__form ad-product">
                                    <form id="mainform" onSubmit={newProductSubmitHandler} encType="multipart/form-data" className="row pd-new">
                                        <div className="row">
                                            <div className="col-lg-6 col-md-8 u-s-m-b-15">
                                                <div className="u-s-m-b-15">
                                                    <label className="gl-label" htmlFor="name">
                                                        PRODUCT NAME *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="name"
                                                        name="name"
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                        placeholder="Product Name"
                                                        className="input-text input-text--primary-style"
                                                    />
                                                </div>
                                                <div className="u-s-m-b-15">
                                                    <label className="gl-label" htmlFor="description">
                                                        DESCRIPTION *
                                                    </label>
                                                    <textarea
                                                        id="description"
                                                        value={description}
                                                        placeholder="Description"
                                                        onChange={(e) => setDescription(e.target.value)}
                                                        className="text-area text-area--primary-style"
                                                    ></textarea>
                                                </div>
                                                <div className="u-s-m-b-15">
                                                    <div style={{ display: 'flex' }}>
                                                        <div>
                                                            <label className="gl-label" htmlFor="price">
                                                                PRICE *
                                                            </label>
                                                            <input
                                                                type="text"
                                                                id="price"
                                                                name="price"
                                                                value={price}
                                                                onChange={(e) => setPrice(e.target.value)}
                                                                placeholder="First Name"
                                                                className="input-text input-text--primary-style"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="gl-label" htmlFor="cuttedPrice">
                                                                CUTTED PRICE *
                                                            </label>
                                                            <input
                                                                type="text"
                                                                id="cuttedPrice"
                                                                name="cuttedPrice"
                                                                value={cuttedPrice}
                                                                placeholder="Price"
                                                                onChange={(e) => setCuttedPrice(e.target.value)}
                                                                className="input-text input-text--primary-style"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="u-s-m-b-15">
                                                    <label className="gl-label" htmlFor="category">
                                                        CATEGORY
                                                    </label>
                                                    <select
                                                        required
                                                        id="category"
                                                        name="category"
                                                        value={category}
                                                        onChange={(e) => setCategory(e.target.value)}
                                                        className="select-box select-box--primary-style u-w-100"
                                                    >
                                                        <option value="">Select</option>
                                                        <option value="male">Male</option>
                                                        <option value="female">Female</option>
                                                    </select>
                                                </div>
                                                <div className="u-s-m-b-15">
                                                    <div className="">
                                                        <div style={{ display: 'flex' }}>
                                                            <div>
                                                                <label className="gl-label" htmlFor="stock">
                                                                    STOCK *
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    id="stock"
                                                                    name="stock"
                                                                    value={stock}
                                                                    placeholder="Stock"
                                                                    onChange={(e) => setStock(e.target.value)}
                                                                    className="input-text input-text--primary-style"
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="gl-label" htmlFor="warranty">
                                                                    WARRANTY *
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    id="warranty"
                                                                    name="warranty"
                                                                    placeholder="Warranty"
                                                                    value={warranty}
                                                                    onChange={(e) => setWarranty(e.target.value)}
                                                                    className="input-text input-text--primary-style"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="u-s-m-b-15 ad-product">
                                                    <label className="gl-label" htmlFor="name">
                                                        HIGHLIGHTS *
                                                    </label>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                        <div style={{ width: '-webkit-fill-available', marginRight: '2px' }}>
                                                            <input
                                                                type="text"
                                                                id="name"
                                                                name="name"
                                                                placeholder="Highlights"
                                                                value={highlightInput}
                                                                onChange={(e) => setHighlightInput(e.target.value)}
                                                                className="input-text input-text--primary-style"
                                                            />
                                                        </div>
                                                        <button class="btn btn--e-brand-b-2" onClick={() => addHighlight()}>
                                                            Add
                                                        </button>
                                                    </div>
                                                    <ul>
                                                        {highlights?.map((h, i) => (
                                                            <li key={i} className="pd-new-highlight">
                                                                <span>
                                                                    <i className="fas fa-check u-s-m-r-8"></i>
                                                                    {h}
                                                                </span>
                                                                <span onClick={() => deleteHighlight(i)}>
                                                                    <i className="fas fa-trash"></i>
                                                                </span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-8 u-s-m-b-15 ">
                                                <div className="u-s-m-b-15">
                                                    <label className="gl-label" htmlFor="brand">
                                                        BRAND DETAILS*
                                                    </label>
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                        <div style={{ width: '-webkit-fill-available', marginRight: '2px' }}>
                                                            <input
                                                                type="text"
                                                                id="brand"
                                                                name="brand"
                                                                placeholder="Brand"
                                                                value={brand}
                                                                onChange={(e) => setBrand(e.target.value)}
                                                                className="input-text input-text--primary-style"
                                                            />
                                                        </div>
                                                        <div style={{ width: '-webkit-fill-available', marginRight: '2px', display: 'flex' }}>
                                                            <div style={{ margin: '0px 6px 0px 4px' }}>
                                                                <Avatar
                                                                    alt="Avatar preview"
                                                                    src={logoPreview ? logoPreview : avatarPreview}
                                                                    sx={{ width: 45, height: 45 }}
                                                                />
                                                            </div>
                                                            <label className="btn btn btn--e-brand-b-2 u-w-100">
                                                                <input
                                                                    type="file"
                                                                    name="logo"
                                                                    accept="image/*"
                                                                    onChange={handleLogoChange}
                                                                    class="hidden"
                                                                />
                                                                FILE
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="u-s-m-b-15">
                                                    <label className="gl-label" htmlFor="name">
                                                        PRODUCT IMAGES *
                                                    </label>
                                                    <div className="pd-new-image">
                                                        {imagesPreview.map((image, i) => (
                                                            <img
                                                                draggable="false"
                                                                src={image}
                                                                alt="Product"
                                                                key={i}
                                                                className="w-full h-full object-contain"
                                                            />
                                                        ))}
                                                    </div>
                                                    <label className="btn btn btn--e-brand-b-2 u-w-100" style={{ display: 'flex' }}>
                                                        <input
                                                            type="file"
                                                            name="images"
                                                            accept="image/*"
                                                            onChange={handleProductImageChange}
                                                            class="hidden"
                                                        />
                                                        FILE
                                                    </label>
                                                </div>
                                                <div className="u-s-m-b-15">
                                                    <label className="gl-label" htmlFor="specification">
                                                        SPECIFICATIONS *
                                                    </label>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                        <div style={{ width: '-webkit-fill-available', marginRight: '2px' }}>
                                                            <input
                                                                type="text"
                                                                id="title"
                                                                name="title"
                                                                placeholder="Ex: Model No"
                                                                value={specsInput.title}
                                                                onChange={handleSpecsChange}
                                                                className="input-text input-text--primary-style"
                                                            />
                                                        </div>
                                                        <div style={{ width: '-webkit-fill-available', marginRight: '2px' }}>
                                                            <input
                                                                type="text"
                                                                id="description"
                                                                name="description"
                                                                placeholder="Ex: WJDK42DF5"
                                                                value={specsInput.description}
                                                                onChange={handleSpecsChange}
                                                                className="input-text input-text--primary-style"
                                                            />
                                                        </div>
                                                        <button class="btn btn--e-brand-b-2" onClick={() => addSpecs()}>
                                                            Add
                                                        </button>
                                                    </div>
                                                    <ul>
                                                        {specs?.map((s, i) => (
                                                            <li key={i} className="pd-new-highlight">
                                                                <span>
                                                                    <i className="fas fa-check u-s-m-r-8"></i>
                                                                    {s.title} : {s.description}
                                                                </span>
                                                                <span onClick={() => deleteSpec(i)}>
                                                                    <i className="fas fa-trash"></i>
                                                                </span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="flex justify-end" style={{ flex: '0 0 100%' }}>
                                                <button class="btn btn--e-brand-b-2" type="submit">
                                                    SUBMIT
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                    {/* <form
                                        onSubmit={newProductSubmitHandler}
                                        encType="multipart/form-data"
                                        className="flex flex-col sm:flex-row bg-white rounded-lg shadow p-4"
                                        id="mainform"
                                    >
                                        <div className="flex flex-col gap-3 m-2 sm:w-1/2">
                                            <TextField
                                                label="Name"
                                                variant="outlined"
                                                size="small"
                                                required
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                            <TextField
                                                label="Description"
                                                multiline
                                                rows={3}
                                                required
                                                variant="outlined"
                                                size="small"
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                            />
                                            <div className="flex justify-between">
                                                <TextField
                                                    label="Price"
                                                    type="number"
                                                    variant="outlined"
                                                    size="small"
                                                    InputProps={{
                                                        inputProps: {
                                                            min: 0,
                                                        },
                                                    }}
                                                    required
                                                    value={price}
                                                    onChange={(e) => setPrice(e.target.value)}
                                                />
                                                <TextField
                                                    label="Cutted Price"
                                                    type="number"
                                                    variant="outlined"
                                                    size="small"
                                                    InputProps={{
                                                        inputProps: {
                                                            min: 0,
                                                        },
                                                    }}
                                                    required
                                                    value={cuttedPrice}
                                                    onChange={(e) => setCuttedPrice(e.target.value)}
                                                />
                                            </div>
                                            <div className="flex justify-between gap-4">
                                                <TextField
                                                    label="Category"
                                                    select
                                                    fullWidth
                                                    variant="outlined"
                                                    size="small"
                                                    required
                                                    value={category}
                                                    onChange={(e) => setCategory(e.target.value)}
                                                >
                                                    {categories.map((el, i) => (
                                                        <MenuItem value={el} key={i}>
                                                            {el}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                                <TextField
                                                    label="Stock"
                                                    type="number"
                                                    variant="outlined"
                                                    size="small"
                                                    InputProps={{
                                                        inputProps: {
                                                            min: 0,
                                                        },
                                                    }}
                                                    required
                                                    value={stock}
                                                    onChange={(e) => setStock(e.target.value)}
                                                />
                                                <TextField
                                                    label="Warranty"
                                                    type="number"
                                                    variant="outlined"
                                                    size="small"
                                                    InputProps={{
                                                        inputProps: {
                                                            min: 0,
                                                        },
                                                    }}
                                                    required
                                                    value={warranty}
                                                    onChange={(e) => setWarranty(e.target.value)}
                                                />
                                            </div>

                                            <div className="flex flex-col gap-2">
                                                <div className="flex justify-between items-center border rounded">
                                                    <input
                                                        value={highlightInput}
                                                        onChange={(e) => setHighlightInput(e.target.value)}
                                                        type="text"
                                                        placeholder="Highlight"
                                                        className="px-2 flex-1 outline-none border-none"
                                                    />
                                                    <span
                                                        onClick={() => addHighlight()}
                                                        className="py-2 px-6 bg-primary-blue text-white rounded-r hover:shadow-lg cursor-pointer"
                                                    >
                                                        Add
                                                    </span>
                                                </div>

                                                <div className="flex flex-col gap-1.5">
                                                    {highlights.map((h, i) => (
                                                        <div className="flex justify-between rounded items-center py-1 px-2 bg-green-50">
                                                            <p className="text-green-800 text-sm font-medium">{h}</p>
                                                            <span
                                                                onClick={() => deleteHighlight(i)}
                                                                className="text-red-600 hover:bg-red-100 p-1 rounded-full cursor-pointer"
                                                            >
                                                                <DeleteIcon />
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <h2 className="font-medium">Brand Details</h2>
                                            <div className="flex justify-between gap-4 items-start">
                                                <TextField
                                                    label="Brand"
                                                    type="text"
                                                    variant="outlined"
                                                    size="small"
                                                    required
                                                    value={brand}
                                                    onChange={(e) => setBrand(e.target.value)}
                                                />
                                                <div className="w-24 h-10 flex items-center justify-center border rounded-lg">
                                                    {!logoPreview ? (
                                                        <ImageIcon />
                                                    ) : (
                                                        <img
                                                            draggable="false"
                                                            src={logoPreview}
                                                            alt="Brand Logo"
                                                            className="w-full h-full object-contain"
                                                        />
                                                    )}
                                                </div>
                                                <label className="rounded bg-gray-400 text-center cursor-pointer text-white py-2 px-2.5 shadow hover:shadow-lg">
                                                    <input type="file" name="logo" accept="image/*" onChange={handleLogoChange} className="hidden" />
                                                    Choose Logo
                                                </label>
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-2 m-2 sm:w-1/2">
                                            <h2 className="font-medium">Specifications</h2>

                                            <div className="flex justify-evenly gap-2 items-center">
                                                <TextField
                                                    value={specsInput.title}
                                                    onChange={handleSpecsChange}
                                                    name="title"
                                                    label="Name"
                                                    placeholder="Model No"
                                                    variant="outlined"
                                                    size="small"
                                                />
                                                <TextField
                                                    value={specsInput.description}
                                                    onChange={handleSpecsChange}
                                                    name="description"
                                                    label="Description"
                                                    placeholder="WJDK42DF5"
                                                    variant="outlined"
                                                    size="small"
                                                />
                                                <span
                                                    onClick={() => addSpecs()}
                                                    className="py-2 px-6 bg-primary-blue text-white rounded hover:shadow-lg cursor-pointer"
                                                >
                                                    Add
                                                </span>
                                            </div>

                                            <div className="flex flex-col gap-1.5">
                                                {specs.map((spec, i) => (
                                                    <div className="flex justify-between items-center text-sm rounded bg-blue-50 py-1 px-2">
                                                        <p className="text-gray-500 font-medium">{spec.title}</p>
                                                        <p>{spec.description}</p>
                                                        <span
                                                            onClick={() => deleteSpec(i)}
                                                            className="text-red-600 hover:bg-red-200 bg-red-100 p-1 rounded-full cursor-pointer"
                                                        >
                                                            <DeleteIcon />
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>

                                            <h2 className="font-medium">Product Images</h2>
                                            <div className="pd-new-image">
                                                {imagesPreview.map((image, i) => (
                                                    <img
                                                        draggable="false"
                                                        src={image}
                                                        alt="Product"
                                                        key={i}
                                                        className="w-full h-full object-contain"
                                                    />
                                                ))}
                                            </div>
                                            <label className="pd-new-image">
                                                <input
                                                    type="file"
                                                    name="images"
                                                    accept="image/*"
                                                    multiple
                                                    onChange={handleProductImageChange}
                                                    className="hidden"
                                                />
                                                Choose Files
                                            </label>
                                            <div className="flex justify-end">
                                                <button class="btn btn--e-brand-b-2" type="submit">
                                                    SUBMIT
                                                </button>
                                            </div>
                                        </div>
                                    </form> */}
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
