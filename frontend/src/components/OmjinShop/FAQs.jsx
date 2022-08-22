import React, { useState } from 'react';
import MetaData from '../Layouts/MetaData';
import { getNavigation } from '../../utils/services';
import { useSelector } from 'react-redux';

const FAQs = () => {
    const { pathItems } = useSelector((state) => state.path);

    return (
        <>
            <MetaData title="Wishlist" />
            {getNavigation(pathItems)}
            <div className="u-s-p-b-60">
                <div className="section__content">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12">
                                <div className="faq">
                                    <h3 className="faq__heading">FREQUENTLY QUESTIONS</h3>
                                    <h3 className="faq__heading">What happens when I update my email address (or mobile number)?</h3>
                                    <p className="faq__text">
                                        Your signIn email id (or mobile number) changes, likewise. You'll receive all your account related
                                        communication on your updated email address (or mobile number).
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="u-s-p-b-60">
                <div className="section__content">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12">
                                <div id="faq-accordion-group">
                                    <div className="faq__list">
                                        <a className="faq__question collapsed" href="#faq-1" data-toggle="collapse">
                                            When will my Omjinshop account be updated with the new email address (or mobile number)?
                                        </a>
                                        <div className="faq__answer collapse" id="faq-1" data-parent="#faq-accordion-group">
                                            <p className="faq__text">
                                                It happens as soon as you confirm the verification code sent to your email (or mobile) and save the
                                                changes.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="faq__list">
                                        <a className="faq__question collapsed" href="#faq-2" data-toggle="collapse">
                                            What happens to my existing Omjinshop account when I update my email address (or mobile number)?
                                        </a>
                                        <div className="faq__answer collapse" id="faq-2" data-parent="#faq-accordion-group">
                                            <p className="faq__text">
                                                Updating your email address (or mobile number) doesn't invalidate your account. Your account remains
                                                fully functional. You'll continue seeing your Order history, saved information and personal details.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="faq__list">
                                        <a className="faq__question collapsed" href="#faq-3" data-toggle="collapse">
                                            Does my Seller account get affected when I update my email address?
                                        </a>
                                        <div className="faq__answer collapse" id="faq-3" data-parent="#faq-accordion-group">
                                            <p className="faq__text">
                                                Omjinshop has a 'single sign-on' policy. Any changes will reflect in your Seller account also.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="faq__list">
                                        <a className="faq__question collapsed" href="#faq-4" data-toggle="collapse">
                                            What is the payment security system ?
                                        </a>
                                        <div className="faq__answer collapse" id="faq-4" data-parent="#faq-accordion-group">
                                            <p className="faq__text">
                                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                                                industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                                                scrambled it to make a type specimen book.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="faq__list">
                                        <a className="faq__question collapsed" href="#faq-5" data-toggle="collapse">
                                            What policy do you have for product sell ?
                                        </a>
                                        <div className="faq__answer collapse" id="faq-5" data-parent="#faq-accordion-group">
                                            <p className="faq__text">
                                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                                                industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                                                scrambled it to make a type specimen book.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="faq__list">
                                        <a className="faq__question collapsed" href="#faq-6" data-toggle="collapse">
                                            How I Return back my product ?
                                        </a>
                                        <div className="faq__answer collapse" id="faq-6" data-parent="#faq-accordion-group">
                                            <p className="faq__text">
                                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                                                industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                                                scrambled it to make a type specimen book.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="faq__list">
                                        <a className="faq__question collapsed" href="#faq-7" data-toggle="collapse">
                                            What Payment Methods are Available ?
                                        </a>
                                        <div className="faq__answer collapse" id="faq-7" data-parent="#faq-accordion-group">
                                            <p className="faq__text">
                                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                                                industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                                                scrambled it to make a type specimen book.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="faq__list">
                                        <a className="faq__question collapsed" href="#faq-8" data-toggle="collapse">
                                            What Shipping Methods are Available ?
                                        </a>
                                        <div className="faq__answer collapse" id="faq-8" data-parent="#faq-accordion-group">
                                            <p className="faq__text">
                                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                                                industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                                                scrambled it to make a type specimen book.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FAQs;
