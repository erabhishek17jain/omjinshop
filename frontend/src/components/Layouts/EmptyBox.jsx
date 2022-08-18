import React from 'react';
import { Link } from 'react-router-dom';

const EmptyBox = (props) => {
    return (
        <>
            <div className={props.type === 'cartPopup' ? '' : 'u-s-p-y-60'}>
                <div className="section__content">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 u-s-m-b-30">
                                <div className="empty">
                                    <div className="empty__wrap">
                                        <span className="empty__big-text">EMPTY</span>
                                        <span className="empty__text-1">{`No items found on your ${props.title}.`}</span>
                                        <Link to="/products" className="empty__redirect-link btn--e-brand">
                                            CONTINUE SHOPPING
                                        </Link>
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

export default EmptyBox;
