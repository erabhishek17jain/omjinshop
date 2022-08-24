import FeaturedProduct from '../FeatureProducts/FeaturedProduct';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import React from 'react';

const TopTrending = ({ title }) => {
    const navigate = useNavigate();
    const { loading, products } = useSelector((state) => state.products);
    const { category } = useSelector((state) => state.category);
    return (
        <div className='u-s-p-b-60'>
            <div className='section__intro u-s-m-b-16'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-12 col-md-12 col-sm-12'>
                            <div className='section__text-wrap'>
                                <h1 className='section__heading u-c-secondary u-s-m-b-12'>TOP TRENDING</h1>
                                <span className='section__span u-c-silver'>CHOOSE CATEGORY</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='section__content'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-12 col-md-12 col-sm-12'>
                            <div className='filter-category-container'>
                                <div className='filter__category-wrapper'>
                                    <button className='btn filter__btn filter__btn--style-1 js-checked' type='button'>
                                        ALL
                                    </button>
                                </div>
                                {category &&
                                    category.map((item, index) => {
                                        return (
                                            index < 5 && (
                                                <div className='filter__category-wrapper'>
                                                    <Link to={`/products/${item.main}`} className='btn filter__btn filter__btn--style-1'>
                                                        {item.main.toUpperCase()}
                                                    </Link>
                                                </div>
                                            )
                                        );
                                    })}
                            </div>
                            <div className='filter__grid-wrapper u-s-m-t-30'>
                                <div className='row'>
                                    {products &&
                                        products.map((product, index) => index < 12 && <FeaturedProduct {...product} key={product._id} type={'feature'} />)}
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-12 col-md-12 col-sm-12'>
                            <div className='load-more'>
                                <button
                                    className='btn btn--e-brand'
                                    type='button'
                                    onClick={() => {
                                        navigate('/products');
                                    }}
                                >
                                    Load More
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopTrending;
