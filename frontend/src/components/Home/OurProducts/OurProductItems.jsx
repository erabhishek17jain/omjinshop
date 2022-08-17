import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { getRandomProducts } from '../../../utils/functions';
import { settings } from '../DealSlider/DealSlider';
import OurProduct from './OurProduct';

const OurProductItems = ({ title, count, type }) => {
    const { loading, products } = useSelector((state) => state.products);
    return (
        <div className="col-lg-4 col-md-6 col-sm-6 u-s-m-b-30">
            <div className="column-product">
                <span className="column-product__title u-c-secondary u-s-m-b-25">{title}</span>
                <ul className="column-product__list">
                    {products && products.map((product, index) => index < count && <OurProduct {...product} key={product._id} type={type} />)}
                </ul>
                <Link to="/products" className="gl-tag btn--e-brand-shadow our-product" href="#">
                    Show more
                </Link>
            </div>
        </div>
    );
};

export default OurProductItems;
