import React from 'react';
import CategoryTab from './CategoryTab';
import PriceTab from './PriceTab';
import RatingsTab from './RatingsTab';

const ProductCategory = (props) => {
    return (
        <div className='col-lg-3 col-md-12'>
            <div className='shop-w-master'>
                <h1 className='shop-w-master__heading u-s-m-b-30 gl-l-r'>
                    <div>
                        <i className='fas fa-filter u-s-m-r-8'></i>
                        <span>FILTERS</span>
                    </div>
                    <i className='fa fa-window-close u-s-m-r-8' style={{ fontSize: '20px' }} onClick={() => props.clearFilters()}></i>
                </h1>
                <div className='shop-w-master__sidebar'>
                    <div className='u-s-m-b-30'>
                        <CategoryTab setFilters={props.setFilters} />
                    </div>
                    <div className='u-s-m-b-30'>
                        <PriceTab setFilters={props.setFilters} />
                    </div>
                    <div className='u-s-m-b-30'>
                        <RatingsTab setFilters={props.setFilters} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCategory;
