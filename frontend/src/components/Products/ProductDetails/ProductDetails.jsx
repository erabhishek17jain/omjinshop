import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { clearErrors, getProductDetails, getSimilarProducts, newReview } from '../../../middleware/actions/productAction';
import { NextBtn, PreviousBtn } from '../../Home/Banner/Banner';
import Loader from '../../Layouts/Loader';
import { NEW_REVIEW_RESET } from '../../../middleware/constants/productConstants';
import { addItemsToCart } from '../../../middleware/actions/cartAction';
import { addToWishlist, removeFromWishlist } from '../../../middleware/actions/wishlistAction';
import MetaData from '../../Layouts/MetaData';
import ProductInfo from './ProductInfo';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import DescriptionTab from './DescriptionTab';
import TagsTab from './TagsTab';
import ReviewTab from './Reviews/ReviewTab';
import FeaturedProducts from '../../Home/FeatureProducts/FeaturedProducts';

const ProductDetails = () => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const params = useParams();
    const navigate = useNavigate();

    const [value, setValue] = React.useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const { product, loading, error } = useSelector((state) => state.productDetails);
    const { success, error: reviewError } = useSelector((state) => state.newReview);
    const { cartItems } = useSelector((state) => state.cart);
    const { wishlistItems } = useSelector((state) => state.wishlist);

    const settings = {
        autoplay: true,
        autoplaySpeed: 2000,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: <PreviousBtn />,
        nextArrow: <NextBtn />,
    };

    const productId = params.id;

    const addToCartHandler = () => {
        dispatch(addItemsToCart(productId));
        enqueueSnackbar('Product Added To Cart', { variant: 'success' });
    };

    const handleDialogClose = () => {
        setOpen(!open);
    };

    const itemInCart = cartItems.some((i) => i.product === productId);

    const goToCart = () => {
        navigate('/cart');
    };

    const buyNow = () => {
        addToCartHandler();
        navigate('/account/shipping');
    };

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: 'error' });
            dispatch(clearErrors());
        }
        if (reviewError) {
            enqueueSnackbar(reviewError, { variant: 'error' });
            dispatch(clearErrors());
        }
        if (success) {
            enqueueSnackbar('Review Submitted Successfully', { variant: 'success' });
            dispatch({ type: NEW_REVIEW_RESET });
        }
        dispatch(getProductDetails(productId));
        // eslint-disable-next-line
    }, [dispatch, productId, error, reviewError, success, enqueueSnackbar]);

    useEffect(() => {
        dispatch(getSimilarProducts(product?.category));
    }, [dispatch, product, product.category]);

    return loading ? (
        <Loader />
    ) : (
        <>
            <MetaData title={product.name} />
            <div className="u-s-p-t-90">
                <ProductInfo props={product} />
            </div>
            <div className="u-s-p-y-90">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <Box sx={{ width: '100%', typography: 'body1' }}>
                                <TabContext value={value}>
                                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                                            <Tab label={'DESCRIPTION'} value="1" />
                                            <Tab label={'TAGS'} value="2" />
                                            <Tab label={`REVIEWS( ${product.numOfReviews})`} value="3" />
                                        </TabList>
                                    </Box>
                                    <TabPanel value="1">
                                        <DescriptionTab product={product} />
                                    </TabPanel>
                                    <TabPanel value="2">
                                        <TagsTab />
                                    </TabPanel>
                                    <TabPanel value="3">
                                        <ReviewTab />
                                    </TabPanel>
                                </TabContext>
                            </Box>
                        </div>
                    </div>
                </div>
                <FeaturedProducts title={'CUSTOMER ALSO VIEWED'} subTitle={'PRODUCTS THAT CUSTOMER VIEWED'} />
            </div>
        </>
    );
};

export default ProductDetails;
