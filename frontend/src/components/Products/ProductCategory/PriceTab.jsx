import React, { useState } from 'react';

const PriceTab = (props) => {
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(200000);
    return (
        <div className='shop-w shop-w--style'>
            <div className='shop-w__intro-wrap'>
                <h1 className='shop-w__h'>PRICE</h1>
                <span className='fas fa-minus shop-w__toggle' data-target='#s-price' data-toggle='collapse'></span>
            </div>
            <div className='shop-w__wrap collapse show' id='s-price'>
                <div className='shop-w__form-p-wrap'>
                    <div>
                        <label htmlFor='price-min'></label>
                        <input
                            className='input-text input-text--primary-style'
                            type='text'
                            id='price-min'
                            placeholder='Min'
                            value={minPrice}
                            onChange={(e) => setMinPrice(parseInt(e.target.value))}
                        />
                    </div>
                    <div>
                        <label htmlFor='price-max'></label>
                        <input
                            className='input-text input-text--primary-style'
                            type='text'
                            id='price-max'
                            placeholder='Max'
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                        />
                    </div>
                    <div>
                        <button
                            className='btn btn--icon fas fa-angle-right btn--e-transparent-platinum-b-2'
                            onClick={() => props.setFilters('price', [minPrice, maxPrice])}
                        ></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PriceTab;
