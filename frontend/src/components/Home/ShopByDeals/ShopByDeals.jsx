import React from 'react';
import { Link } from 'react-router-dom';
import coll1 from '../../../assets/images/collection/coll-1.jpg';

const ShopByDeals = () => {
    return (
        <div className="u-s-p-y-60">
            <div className="section__intro u-s-m-b-46">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="section__text-wrap">
                                <h1 className="section__heading u-c-secondary u-s-m-b-12">SHOP BY DEALS</h1>

                                <span className="section__span u-c-silver">BROWSE FAVOURITE DEALS BY C</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="section__content">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5 col-md-5 u-s-m-b-30">
                            <Link to={`/products/${'Electronics'}`} className="collection" href="#">
                                <div className="aspect aspect--bg-grey aspect--square">
                                    <img className="aspect__img collection__img" src={coll1} alt="" />
                                </div>
                            </Link>
                        </div>
                        <div className="col-lg-7 col-md-7 u-s-m-b-30">
                            <Link to={`/products/${'Fashion'}`} className="collection" href="#">
                                <div className="aspect aspect--bg-grey aspect--1286-890">
                                    <img className="aspect__img collection__img" src={coll1} alt="" />
                                </div>
                            </Link>
                        </div>
                        <div className="col-lg-7 col-md-7 u-s-m-b-30">
                            <Link to={`/products/${'Sports'}`} className="collection" href="#">
                                <div className="aspect aspect--bg-grey aspect--1286-890">
                                    <img className="aspect__img collection__img" src={coll1} alt="" />
                                </div>
                            </Link>
                        </div>
                        <div className="col-lg-5 col-md-5 u-s-m-b-30">
                            <Link to={`/products/${'Home Decor'}`} className="collection" href="#">
                                <div className="aspect aspect--bg-grey aspect--square">
                                    <img className="aspect__img collection__img" src={coll1} alt="" />
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShopByDeals;
