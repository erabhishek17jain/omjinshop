import React from 'react';
import { Link } from 'react-router-dom';

const NavigationBar = (navgation) => {
    return (
        <div className="u-s-p-y-60">
            <div className="section__content">
                <div className="container">
                    <div className="breadcrumb">
                        <div className="breadcrumb__wrap">
                            <ul className="breadcrumb__list">
                                {navgation &&
                                    Array.from(navgation).map((item, index) => (
                                        <li className={navgation.length === index ? 'is-marked' : 'has-separator'}>
                                            <Link to={`/${item.path}`}>{item.title}</Link>
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavigationBar;
