import FeaturedProduct from './FeaturedProduct';
import { useSelector } from 'react-redux';
import React from 'react';

const FeaturedProducts = () => {
    const { loading, products } = useSelector((state) => state.products);
    return (
        <div className="u-s-p-y-60">
            <div className="section__intro u-s-m-b-46">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section__text-wrap">
                                <h1 className="section__heading u-c-secondary u-s-m-b-12">FEATURED PRODUCTS</h1>
                                <span className="section__span u-c-silver">FIND NEW FEATURED PRODUCTS</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="section__content">
                <div className="container">
                    <div className="row">
                        {products &&
                            products.map((product, index) => index < 4 && <FeaturedProduct {...product} key={product._id} type={'feature'} />)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeaturedProducts;
