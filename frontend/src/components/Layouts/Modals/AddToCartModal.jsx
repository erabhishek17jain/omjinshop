import { Link } from 'react-router-dom';

const AddToCartModal = (props) => {
    const { name, images, cuttedPrice, quantity } = props;
    return (
        <>
            <div className='modal fade show' style={{ display: 'block' }} id='add-to-cart'>
                <div className='modal-dialog modal-dialog-centered'>
                    <div className='modal-content modal-radius modal-shadow'>
                        <button className='btn dismiss-button fas fa-times' type='button' onClick={() => props.closeModal()}></button>
                        <div className='modal-body'>
                            <div className='row'>
                                <div className='col-lg-6 col-md-12'>
                                    <div className='success u-s-m-b-30'>
                                        <div className='success__text-wrap'>
                                            <i className='fas fa-check'></i>
                                            <span>Item is added successfully!</span>
                                        </div>
                                        <div className='success__img-wrap'>
                                            <img className='u-img-fluid' src={images} alt={name} />
                                        </div>
                                        <div className='success__info-wrap'>
                                            <span className='success__name'>{name}</span>
                                            <span className='success__quantity'>Quantity: {quantity}</span>
                                            <span className='success__price'>₹{cuttedPrice}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-lg-6 col-md-12'>
                                    <div className='s-option'>
                                        <span className='s-option__text'>{quantity} item (s) in your cart</span>
                                        <div className='s-option__link-box'>
                                            <Link to='/products' className='s-option__link btn--e-white-brand-shadow' data-dismiss='modal'>
                                                CONTINUE SHOPPING
                                            </Link>
                                            <Link to='/cart' className='s-option__link btn--e-white-brand-shadow' href='#'>
                                                VIEW CART
                                            </Link>
                                            <Link to='/signIn?redirect=account/shipping' className='s-option__link btn--e-brand-shadow' href='#'>
                                                PROCEED TO CHECKOUT
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='modal-backdrop fade show'></div>
        </>
    );
};

export default AddToCartModal;
