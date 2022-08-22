import React, { useEffect, useState } from 'react';
import Banner from './Banner/Banner';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getSliderProducts } from '../../middleware/actions/productAction';
import { setPath } from '../../middleware/actions/pathAction';
import { useSnackbar } from 'notistack';
import MetaData from '../Layouts/MetaData';
import '../../assets/css/vendor.css';
import '../../assets/css/utility.css';
import '../../assets/css/app.css';
import TopTrending from './TopTrending/TopTrending';
import BestDeals from './BestDeals/BestDeals';
import ShopByDeals from './ShopByDeals/ShopByDeals';
import NewArrival from './NewArrival/NewArrival';
import GlobalOffer from './GlobalOffer/GlobalOffer';
import FeaturedProducts from './FeatureProducts/FeaturedProducts';
import InformationSection from './InformationSection/InformationSection';
import EveryDayProducts from './EveryDayProducts/EveryDayProducts';
import OurProducts from './OurProducts/OurProducts';
import { getAllCategory } from '../../middleware/actions/categoryAction';

const Home = () => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const { error } = useSelector((state) => state.products);

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: 'error' });
            dispatch(clearErrors());
        }
        dispatch(getSliderProducts());
    }, [dispatch, error, enqueueSnackbar]);

    useEffect(() => {
        dispatch(setPath([{ title: 'Home', path: '/' }]));
    }, {});

    return (
        <>
            <MetaData title='Online Shopping Site for Mobiles, Electronics, Furniture, Grocery, Lifestyle, Books & More. Best Offers!' />
            <div id='app'>
                <Banner />
                <ShopByDeals />
                <TopTrending />
                <BestDeals />
                <NewArrival />
                <GlobalOffer />
                <FeaturedProducts title={'FEATURED PRODUCTS'} subTitle={'FIND NEW FEATURED PRODUCTS'} />
                <EveryDayProducts />
                <OurProducts />
                <InformationSection />
                <a id='topScroll' href='#top' style={{ position: 'fixed', zIndex: 100 }}>
                    <i className='fas fa-long-arrow-alt-up'></i>
                </a>
            </div>
        </>
    );
};

export default Home;
