import FeaturedProduct from '../FeatureProducts/FeaturedProduct';
import { useSelector } from 'react-redux';
import BestDealProduct from './BestDealProduct';
import React from 'react';

const BestDeals = () => {
    const { loading, products } = useSelector((state) => state.products);
    return (
        <div className="u-s-p-b-60">
            <div className="section__intro u-s-m-b-46">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="section__text-wrap">
                                <h1 className="section__heading u-c-secondary u-s-m-b-12">DEAL OF THE DAY</h1>
                                <span className="section__span u-c-silver">BUY DEAL OF THE DAY, HURRY UP! THESE NEW PRODUCTS WILL EXPIRE SOON.</span>
                                <span className="section__span u-c-silver">ADD THESE ON YOUR CART.</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="section__content">
                <div className="container">
                    <div className="row">
                        {products && products.map((product, index) => index < 2 && <BestDealProduct {...product} key={product._id} />)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BestDeals;
