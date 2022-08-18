import React, { useState } from 'react';
import MetaData from '../Layouts/MetaData';
import { getNavigation } from '../../utils/services';

const AboutUs = () => {
    const [navigation] = useState([
        { title: 'Home', path: '/' },
        { title: 'Track Order', path: '/account/trackOrder' },
    ]);
    return (
        <>
            <MetaData title="Wishlist | Omjinshop" />
            {getNavigation(navigation)}
            <div className="u-s-p-b-60">
                <div className="section__content">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="about">
                                    <div className="about__container">
                                        <div className="about__info">
                                            <h2 className="about__h2">Welcome to Reshop Store!</h2>
                                            <div className="about__p-wrap">
                                                <p className="about__p">
                                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                                                    the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of
                                                    type and scrambled it to make a type specimen book. It has survived not only five centuries, but
                                                    also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in
                                                    the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently
                                                    with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                                </p>
                                            </div>

                                            <a className="about__link btn--e-secondary" href="index.html" target="_blank">
                                                Shop Now
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="u-s-p-b-60">
                <div className="section__intro u-s-m-b-46">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="section__text-wrap">
                                    <h1 className="section__heading u-c-secondary">Our Team Members</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="section__content">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3 col-md-4 col-sm-6 u-s-m-b-30">
                                <div className="team-member u-h-100">
                                    <div className="team-member__wrap">
                                        <div className="aspect aspect--bg-grey-fb aspect--square">
                                            <img
                                                className="aspect__img team-member__img"
                                                src="images/about/member-1.98740a2c08d20678ce3e0555423397f4.jpg"
                                                alt=""
                                            />
                                        </div>
                                        <div className="team-member__social-wrap">
                                            <ul className="team-member__social-list">
                                                <li>
                                                    <a className="s-tw--bgcolor-hover" href="#">
                                                        <i className="fab fa-twitter"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className="s-fb--bgcolor-hover" href="#">
                                                        <i className="fab fa-facebook-f"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className="s-insta--bgcolor-hover" href="#">
                                                        <i className="fab fa-instagram"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className="s-linked--bgcolor-hover" href="#">
                                                        <i className="fab fa-linkedin"></i>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="team-member__info">
                                        <span className="team-member__name">Ahnan Bashri</span>

                                        <span className="team-member__job-title">Manager</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-4 col-sm-6 u-s-m-b-30">
                                <div className="team-member u-h-100">
                                    <div className="team-member__wrap">
                                        <div className="aspect aspect--bg-grey-fb aspect--square">
                                            <img
                                                className="aspect__img team-member__img"
                                                src="images/about/member-2.1b1fafda5014018082f3af166ff99d31.jpg"
                                                alt=""
                                            />
                                        </div>
                                        <div className="team-member__social-wrap">
                                            <ul className="team-member__social-list">
                                                <li>
                                                    <a className="s-tw--bgcolor-hover" href="#">
                                                        <i className="fab fa-twitter"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className="s-fb--bgcolor-hover" href="#">
                                                        <i className="fab fa-facebook-f"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className="s-insta--bgcolor-hover" href="#">
                                                        <i className="fab fa-instagram"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className="s-linked--bgcolor-hover" href="#">
                                                        <i className="fab fa-linkedin"></i>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="team-member__info">
                                        <span className="team-member__name">Joseph Min</span>

                                        <span className="team-member__job-title">UI, Designer</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-4 col-sm-6 u-s-m-b-30">
                                <div className="team-member u-h-100">
                                    <div className="team-member__wrap">
                                        <div className="aspect aspect--bg-grey-fb aspect--square">
                                            <img
                                                className="aspect__img team-member__img"
                                                src="images/about/member-3.34f1bec9cd808c419b0af12e75675584.jpg"
                                                alt=""
                                            />
                                        </div>
                                        <div className="team-member__social-wrap">
                                            <ul className="team-member__social-list">
                                                <li>
                                                    <a className="s-tw--bgcolor-hover" href="#">
                                                        <i className="fab fa-twitter"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className="s-fb--bgcolor-hover" href="#">
                                                        <i className="fab fa-facebook-f"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className="s-insta--bgcolor-hover" href="#">
                                                        <i className="fab fa-instagram"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className="s-linked--bgcolor-hover" href="#">
                                                        <i className="fab fa-linkedin"></i>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="team-member__info">
                                        <span className="team-member__name">Mike Pipe</span>

                                        <span className="team-member__job-title">App, Architect</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-4 col-sm-6 u-s-m-b-30">
                                <div className="team-member u-h-100">
                                    <div className="team-member__wrap">
                                        <div className="aspect aspect--bg-grey-fb aspect--square">
                                            <img
                                                className="aspect__img team-member__img"
                                                src="images/about/member-4.0f52b7cc9d64e81322cf2f9f14913929.jpg"
                                                alt=""
                                            />
                                        </div>
                                        <div className="team-member__social-wrap">
                                            <ul className="team-member__social-list">
                                                <li>
                                                    <a className="s-tw--bgcolor-hover" href="#">
                                                        <i className="fab fa-twitter"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className="s-fb--bgcolor-hover" href="#">
                                                        <i className="fab fa-facebook-f"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className="s-insta--bgcolor-hover" href="#">
                                                        <i className="fab fa-instagram"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className="s-linked--bgcolor-hover" href="#">
                                                        <i className="fab fa-linkedin"></i>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="team-member__info">
                                        <span className="team-member__name">Klronr Jim</span>

                                        <span className="team-member__job-title">Team Leader</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="u-s-p-b-90 u-s-m-b-30">
                <div className="section__intro u-s-m-b-46">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="section__text-wrap">
                                    <h1 className="section__heading u-c-secondary u-s-m-b-12">CLIENTS FEEDBACK</h1>

                                    <span className="section__span u-c-silver">WHAT OUR CLIENTS SAY</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="section__content">
                    <div className="container">
                        <div>
                            <div className="owl-carousel owl-loaded owl-drag" id="testimonial-slider">
                                <div className="owl-stage-outer">
                                    <div
                                        className="owl-stage"
                                        style={{ transform: 'translate3d(0px, 0px, 0px)', transition: 'all 0s ease 0s', width: 4440 }}
                                    >
                                        <div className="owl-item active" style={{ width: 1110 }}>
                                            <div className="testimonial">
                                                <div className="testimonial__img-wrap">
                                                    <img
                                                        className="testimonial__img"
                                                        src="images/about/test-1.12a98a11f5a778835ddcf69b749c39a1.jpg"
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="testimonial__content-wrap">
                                                    <span className="testimonial__double-quote">
                                                        <i className="fas fa-quote-right"></i>
                                                    </span>
                                                    <blockquote className="testimonial__block-quote">
                                                        <p>
                                                            "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia,
                                                            there live the blind texts. Separated they live in Bookmarksgrove right at the coast of
                                                            the Semantics, a large language ocean."
                                                        </p>
                                                    </blockquote>

                                                    <span className="testimonial__author">John D. / DVNTR Inc.</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="owl-item" style={{ width: 1110 }}>
                                            <div className="testimonial">
                                                <div className="testimonial__img-wrap">
                                                    <img
                                                        className="testimonial__img"
                                                        src="images/about/test-2.edb7a8897dc97599314a3b1b116f89e3.jpg"
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="testimonial__content-wrap">
                                                    <span className="testimonial__double-quote">
                                                        <i className="fas fa-quote-right"></i>
                                                    </span>
                                                    <blockquote className="testimonial__block-quote">
                                                        <p>
                                                            "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia,
                                                            there live the blind texts. Separated they live in Bookmarksgrove right at the coast of
                                                            the Semantics, a large language ocean."
                                                        </p>
                                                    </blockquote>

                                                    <span className="testimonial__author">John D. / DVNTR Inc.</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="owl-item" style={{ width: 1110 }}>
                                            <div className="testimonial">
                                                <div className="testimonial__img-wrap">
                                                    <img
                                                        className="testimonial__img"
                                                        src="images/about/test-3.abe52d69f00303d9b5d00460f6c778ac.jpg"
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="testimonial__content-wrap">
                                                    <span className="testimonial__double-quote">
                                                        <i className="fas fa-quote-right"></i>
                                                    </span>
                                                    <blockquote className="testimonial__block-quote">
                                                        <p>
                                                            "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia,
                                                            there live the blind texts. Separated they live in Bookmarksgrove right at the coast of
                                                            the Semantics, a large language ocean."
                                                        </p>
                                                    </blockquote>

                                                    <span className="testimonial__author">John D. / DVNTR Inc.</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="owl-item" style={{ width: 1110 }}>
                                            <div className="testimonial">
                                                <div className="testimonial__img-wrap">
                                                    <img
                                                        className="testimonial__img"
                                                        src="images/about/test-4.01389a9387931b938602d882b584a9de.jpg"
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="testimonial__content-wrap">
                                                    <span className="testimonial__double-quote">
                                                        <i className="fas fa-quote-right"></i>
                                                    </span>
                                                    <blockquote className="testimonial__block-quote">
                                                        <p>
                                                            "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia,
                                                            there live the blind texts. Separated they live in Bookmarksgrove right at the coast of
                                                            the Semantics, a large language ocean."
                                                        </p>
                                                    </blockquote>

                                                    <span className="testimonial__author">John D. / DVNTR Inc.</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="owl-nav disabled">
                                    <button type="button" role="presentation" className="owl-prev">
                                        <span aria-label="Previous">‹</span>
                                    </button>
                                    <button type="button" role="presentation" className="owl-next">
                                        <span aria-label="Next">›</span>
                                    </button>
                                </div>
                                <div className="owl-dots">
                                    <button role="button" className="owl-dot active">
                                        <span></span>
                                    </button>
                                    <button role="button" className="owl-dot">
                                        <span></span>
                                    </button>
                                    <button role="button" className="owl-dot">
                                        <span></span>
                                    </button>
                                    <button role="button" className="owl-dot">
                                        <span></span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AboutUs;
