import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Ratings from '../../../Layouts/Ratings';

const ReviewList = () => {
    const [viewAll, setViewAll] = useState(false);
    const { product } = useSelector((state) => state.productDetails);

    return (
        <div className="u-s-m-b-30">
            <form className="pd-tab__rev-f1">
                <div className="rev-f1__group">
                    <div className="u-s-m-b-15">
                        <h2>
                            {product.numOfReviews} Review(s) for {product.name}
                        </h2>
                    </div>
                    <div className="u-s-m-b-15">
                        <label htmlFor="sort-review"></label>
                        <select className="select-box select-box--primary-style" id="sort-review">
                            <option selected="">Sort by: Best Rating</option>
                            <option>Sort by: Worst Rating</option>
                        </select>
                    </div>
                </div>
                <div className="rev-f1__review">
                    {viewAll
                        ? product.reviews
                              ?.map((rev, i) => (
                                  <div className="review-o u-s-m-b-15" key={i}>
                                      <div className="review-o__info u-s-m-b-8">
                                          <span className="review-o__name">{rev.name}</span>
                                          <span className="review-o__date">{rev.date}</span>
                                      </div>
                                      <div className="review-o__rating gl-rating-style u-s-m-b-8">
                                          <Ratings ratings={rev.rating} starCount={5} />
                                          <span>({rev.rating && rev.rating.toFixed()})</span>
                                      </div>
                                      <p className="review-o__text">{rev.comment}</p>
                                  </div>
                              ))
                              .reverse()
                        : product.reviews
                              ?.slice(-3)
                              .map((rev, i) => (
                                  <div className="review-o u-s-m-b-15" key={i}>
                                      <div className="review-o__info u-s-m-b-8">
                                          <span className="review-o__name">{rev.name}</span>
                                          <span className="review-o__date">{rev.date}</span>
                                      </div>
                                      <div className="review-o__rating gl-rating-style u-s-m-b-8">
                                          <Ratings ratings={rev.rating} starCount={5} />
                                          <span>({rev.rating && rev.rating.toFixed()})</span>
                                      </div>
                                      <p className="review-o__text">{rev.comment}</p>
                                  </div>
                              ))
                              .reverse()}
                    {product.reviews?.length > 3 && (
                        <a class="gl-tag btn--e-brand-shadow" href="#" onClick={() => setViewAll(!viewAll)}>
                            {viewAll ? 'VIEW LESS' : 'VIEW ALL'}
                        </a>
                    )}
                </div>
            </form>
        </div>
    );
};

export default ReviewList;
