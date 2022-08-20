import React from 'react';
import { useSelector } from 'react-redux';
import Ratings from '../../../Layouts/Ratings';

const ReviewTitle = () => {
    const { product } = useSelector((state) => state.productDetails);
    return (
        <div className="u-s-m-b-30">
            <div className="pd-tab__rev-score">
                <div className="u-s-m-b-8">
                    <h2>
                        {product.numOfReviews} Reviews - {product.ratings} (Overall)
                    </h2>
                </div>
                <div className="u-s-m-b-8">
                    <Ratings ratings={product.ratings} starCount={5} />
                </div>
                <div className="u-s-m-b-8">
                    <h4>We want to hear from you!</h4>
                </div>
                <span className="gl-text">Tell us what you think about this item</span>
            </div>
        </div>
    );
};

export default ReviewTitle;
