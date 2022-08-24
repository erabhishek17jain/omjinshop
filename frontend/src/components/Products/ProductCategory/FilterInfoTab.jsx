import { Link } from 'react-router-dom';

const FilterInfoTab = (props) => {
    return (
        <div className='shop-p__toolbar u-s-m-b-30'>
            <div className='shop-p__meta-wrap u-s-m-b-60'>
                <span className='shop-p__meta-text-1'>FOUND {props.prodCount} RESULTS</span>
                {props.filters.length > 0 && (
                    <div className='shop-p__meta-text-2'>
                        <span style={{ marginRight: 8 }}>Related Searches:</span>
                        {props.filters?.map((item) => (
                            <a className='gl-tag btn--e-brand-shadow' href='#'>
                                {item.name.charAt(0).toUpperCase() + item.name.slice(1)} :{' '}
                                {item.name === 'ratings'
                                    ? item.value + ' & Up'
                                    : item.name === 'price'
                                    ? item.value[0] + ' - ' + item.value[1]
                                    : item.value.charAt(0).toUpperCase() + item.value.slice(1)}
                            </a>
                        ))}
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
                            <select value={props.count} onChange={(e) => props.setCount(e.target.value)} className='select-box select-box--transparent-b-2'>
                                <option value='9'>Show: 9</option>
                                <option value='12' selected>
                                    Show: 12
                                </option>
                                <option value='18'>Show: 18</option>
                                <option value='24'>Show: 24</option>
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
