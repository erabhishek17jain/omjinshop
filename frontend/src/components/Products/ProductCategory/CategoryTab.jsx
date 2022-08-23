import { useSelector } from 'react-redux';

const CategoryTab = (props) => {
    const { category } = useSelector((state) => state.category);

    const setFilters = (e, val) => {
        e.preventDefault();
        props.setFilters('category', val);
    };

    return (
        <div className='shop-w shop-w--style'>
            <div className='shop-w__intro-wrap'>
                <h1 className='shop-w__h'>CATEGORY</h1>
                {!props.catList && <span className='fas fa-minus shop-w__toggle' data-target='#s-category' data-toggle='collapse'></span>}
            </div>
            <div className='shop-w__wrap collapse show' id='s-category'>
                <ul className={`shop-w__category-list gl-scroll ${props.catList}`}>
                    {category &&
                        category.map((i) => {
                            return (
                                <li className='has-list' key={i.main}>
                                    <a href='#' onClick={(e) => setFilters(e, i.main)}>
                                        {i.main}
                                    </a>
                                    <span className='category-list__text u-s-m-l-6'>({i.sub1.length})</span>
                                    <span className='js-shop-category-span is-expanded fas fa-plus u-s-m-l-6'></span>
                                    <span className='js-shop-category-span u-s-m-l-6'>
                                        <i class='fa fa-window-close'></i>
                                    </span>
                                    <ul style={{ display: 'block' }}>
                                        {i.sub1.map((item) => {
                                            return (
                                                <li className='has-list' key={item.name}>
                                                    <a href='#' onClick={(e) => setFilters(e, item.name)}>
                                                        {item.name}
                                                        <span className='category-list__text u-s-m-l-6'>({item.sub2.length})</span>
                                                    </a>
                                                    <span className='js-shop-category-span fas fa-plus u-s-m-l-6'></span>
                                                    <span className='js-shop-category-span u-s-m-l-6'>
                                                        <i class='fa fa-window-close'></i>
                                                    </span>
                                                    <ul style={{ display: 'block' }}>
                                                        {item.sub2.map((item) => {
                                                            return (
                                                                <li key={item}>
                                                                    <a href='#' onClick={(e) => setFilters(e, item)}>
                                                                        {item}
                                                                    </a>
                                                                </li>
                                                            );
                                                        })}
                                                    </ul>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </li>
                            );
                        })}
                </ul>
            </div>
        </div>
    );
};

export default CategoryTab;
