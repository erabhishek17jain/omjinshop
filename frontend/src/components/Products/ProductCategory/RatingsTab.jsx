const RatingsTab = (props) => {
    return (
        <div className='shop-w shop-w--style'>
            <div className='shop-w__intro-wrap'>
                <h1 className='shop-w__h'>RATING</h1>
                <span className='fas fa-minus shop-w__toggle' data-target='#s-rating' data-toggle='collapse'></span>
            </div>
            <div className='shop-w__wrap collapse show' id='s-rating'>
                <ul className='shop-w__list gl-scroll'>
                    {Array(5)
                        .fill('')
                        .map((el, index) => (
                            <li>
                                <div className='rating__check'>
                                    <input
                                        type='radio'
                                        name='rating'
                                        onChange={() => {
                                            props.setFilters('ratings');
                                        }}
                                    />
                                    <div className='rating__check-star-wrap'>
                                        {Array(5)
                                            .fill('')
                                            .map((el, star) => (
                                                <i className={index < star ? 'far fa-star' : 'fas fa-star'}></i>
                                            ))}
                                        {index > 0 && <span>& Up</span>}
                                    </div>
                                </div>
                                <span className='shop-w__total-text'>({index + 1})</span>
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    );
};

export default RatingsTab;
