import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useParams } from 'react-router-dom';
import { newReview } from '../../../../middleware/actions/productAction';

const AddReview = () => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const params = useParams();
    const [existReview, setExistReview] = useState({});
    const [newReview, setNewReview] = useState({ rating: 0, comment: '', name: '', email: '', reviewDate: new Date() });
    // const [name, setName] = useState('');
    // const [email, setEmail] = useState('');
    // const [comment, setComment] = useState('');
    // const [rating, setRating] = useState(0);

    const { user } = useSelector((state) => state.user);
    const { product } = useSelector((state) => state.productDetails);

    const reviewSubmitHandler = (e) => {
        e.preventDefault();
        if (newReview.rating === 0 || !newReview.comment.trim()) {
            enqueueSnackbar('Empty Review', { variant: 'error' });
            return;
        }
        const formData = new FormData();
        formData.set('rating', newReview.rating);
        formData.set('comment', newReview.comment);
        formData.set('name', newReview.name);
        formData.set('email', newReview.email);
        formData.set('reviewdate', new Date());
        formData.set('productId', params.id);
        dispatch(newReview(formData));
    };

    useEffect(() => {
        var review = product.reviews.filter((el) => {
            return el.email === user.email;
        });
        if (review && review.length > 0) {
            setExistReview(review);
            setNewReview(review);
        }
    }, []);
    return (
        existReview && (
            <div className="u-s-m-b-30">
                <form className="pd-tab__rev-f2">
                    <h2 className="u-s-m-b-15">Add a Review</h2>
                    <span className="gl-text u-s-m-b-15">Your email address will not be published. Required fields are marked *</span>
                    <div className="u-s-m-b-30">
                        <div className="rev-f2__table-wrap gl-scroll">
                            <table className="rev-f2__table">
                                <thead>
                                    <tr>
                                        {Array(10)
                                            .fill('')
                                            .map((el, index) => (
                                                <th>
                                                    <div className="gl-rating-style-2">
                                                        <i className="fas fa-star"></i>
                                                        <span>({index + 1 * 0.5})</span>
                                                    </div>
                                                </th>
                                            ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        {Array(10)
                                            .fill('')
                                            .map((el, index) => (
                                                <td>
                                                    <div className="radio-box">
                                                        <input
                                                            type="radio"
                                                            name="rating"
                                                            value={index + 1 * 0.5}
                                                            id={`star-${index + 1 * 0.5}`}
                                                            onChange={(e) =>
                                                                setNewReview({ ...newReview, email: e.target.value(parseFloat(e.target.value)) })
                                                            }
                                                        />
                                                        <div className="radio-box__state radio-box__state--primary">
                                                            <label className="radio-box__label" htmlFor={`star-${index + 1 * 0.5}`}></label>
                                                        </div>
                                                    </div>
                                                </td>
                                            ))}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="rev-f2__group">
                        <div className="u-s-m-b-15">
                            <label className="gl-label" htmlFor="reviewer-text">
                                YOUR REVIEW *
                            </label>
                            <textarea
                                id="reviewer-text"
                                value={newReview.comment}
                                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                                className="text-area text-area--primary-style"
                            ></textarea>
                        </div>
                        <div>
                            <p className="u-s-m-b-30">
                                <label className="gl-label" htmlFor="reviewer-name">
                                    NAME *
                                </label>
                                <input
                                    type="text"
                                    id="reviewer-name"
                                    value={newReview.name}
                                    disabled={newReview.name !== ''}
                                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                                    className="input-text input-text--primary-style"
                                />
                            </p>
                            <p className="u-s-m-b-30">
                                <label className="gl-label" htmlFor="reviewer-email">
                                    EMAIL *
                                </label>
                                <input
                                    type="text"
                                    id="reviewer-email"
                                    value={newReview.email}
                                    disabled={newReview.email !== ''}
                                    onChange={(e) => setNewReview({ ...newReview, email: e.target.value })}
                                    className="input-text input-text--primary-style"
                                />
                            </p>
                        </div>
                    </div>
                    <div>
                        <button className="btn btn--e-brand-shadow" type="submit" onClick={reviewSubmitHandler}>
                            SUBMIT
                        </button>
                    </div>
                </form>
            </div>
        )
    );
};

export default AddReview;
