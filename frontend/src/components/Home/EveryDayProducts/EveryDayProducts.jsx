import React from 'react';
import SpecialProducts from '../OurProducts/OurProductItems';

const EveryDayProducts = () => {
    return (
        <div className="u-s-p-b-60">
            <div className="section__content">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-4 col-sm-6 u-s-m-b-30">
                            <a className="promotion" href="#">
                                <div className="aspect aspect--bg-grey aspect--square">
                                    <img
                                        className="aspect__img promotion__img"
                                        src="images/promo/promo-img-1.5f96cc043d8d56d909cf10e4e5aa15f1.jpg"
                                        alt=""
                                    />
                                </div>
                                <div className="promotion__content">
                                    <div className="promotion__text-wrap">
                                        <div className="promotion__text-1">
                                            <span className="u-c-secondary">ACCESSORIES FOR YOUR EVERYDAY</span>
                                        </div>
                                        <div className="promotion__text-2">
                                            <span className="u-c-secondary">GET IN</span>

                                            <span className="u-c-brand">TOUCH</span>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-6 u-s-m-b-30">
                            <a className="promotion" href="#">
                                <div className="aspect aspect--bg-grey aspect--square">
                                    <img
                                        className="aspect__img promotion__img"
                                        src="images/promo/promo-img-2.abd2eefacfe8993c75b7b2fa7b1255b9.jpg"
                                        alt=""
                                    />
                                </div>
                                <div className="promotion__content">
                                    <div className="promotion__text-wrap">
                                        <div className="promotion__text-1">
                                            <span className="u-c-secondary">SMARTPHONE</span>

                                            <span className="u-c-brand">2019</span>
                                        </div>
                                        <div className="promotion__text-2">
                                            <span className="u-c-secondary">NEW ARRIVALS</span>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-6 u-s-m-b-30">
                            <a className="promotion" href="#">
                                <div className="aspect aspect--bg-grey aspect--square">
                                    <img
                                        className="aspect__img promotion__img"
                                        src="images/promo/promo-img-3.d0917732e79dbe1ebd3f7faaa530e720.jpg"
                                        alt=""
                                    />
                                </div>
                                <div className="promotion__content">
                                    <div className="promotion__text-wrap">
                                        <div className="promotion__text-1">
                                            <span className="u-c-secondary">DSLR FOR NEW GENERATION</span>
                                        </div>
                                        <div className="promotion__text-2">
                                            <span className="u-c-brand">GET UP TO 10% OFF</span>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EveryDayProducts;
