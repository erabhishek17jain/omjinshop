import { Link } from 'react-router-dom';

const FilterInfoTab = (props) => {
    return (
        <div className='shop-p__toolbar u-s-m-b-30'>
            <div className='shop-p__meta-wrap u-s-m-b-60'>
                <span className='shop-p__meta-text-1'>FOUND {props.count} RESULTS</span>
                {props.filters.length > 0 && (
                    <div className='shop-p__meta-text-2'>
                        <span>Related Searches:</span>
                        {props.filters.map((item) => {
                            <a className='gl-tag btn--e-brand-shadow' href='#'>
                                {item}
                            </a>;
                        })}
                    </div>
                )}
            </div>
            <div className='shop-p__tool-style'>
                <div className='tool-style__group u-s-m-b-8'>
                    <Link to='/products'>
                        <span className='js-shop-grid-target is-active'>Grid</span>
                    </Link>
                </div>
                <form>
                    <div className='tool-style__form-wrap'>
                        <div className='u-s-m-b-8'>
                            <select className='select-box select-box--transparent-b-2'>
                                <option>Show: 8</option>
                                <option selected>Show: 12</option>
                                <option>Show: 16</option>
                                <option>Show: 28</option>
                            </select>
                        </div>
                        <div className='u-s-m-b-8'>
                            <select className='select-box select-box--transparent-b-2'>
                                <option selected>Sort By: Newest Items</option>
                                <option>Sort By: Latest Items</option>
                                <option>Sort By: Best Selling</option>
                                <option>Sort By: Best Rating</option>
                                <option>Sort By: Lowest Price</option>
                                <option>Sort By: Highest Price</option>
                            </select>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FilterInfoTab;
