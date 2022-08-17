import React from 'react';
import OurProductItems from './OurProductItems';

const OurProducts = () => {
    return (
        <div className="u-s-p-b-60">
            <div className="section__content">
                <div className="container">
                    <div className="row">
                        <OurProductItems title={'SPECIAL PRODUCTS'} count={3} type={'special'} />
                        <OurProductItems title={'WEEKLY PRODUCTS'} count={3} type={'weekly'} />
                        <OurProductItems title={'FLASH PRODUCTS'} count={3} type={'flash'} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OurProducts;
