import { Link } from 'react-router-dom';

const CategoryHerirarcy = (props) => {
    const catHer = props.category ? props.category.split('=') : [];
    return (
        <ul className='pd-breadcrumb__list'>
            {catHer.map((item, i) => (
                <li className={i < catHer.length - 1 ? 'has-separator' : 'is-marked'} key={i}>
                    <Link to={`/products/${item}`}>{item}</Link>
                </li>
            ))}
        </ul>
    );
};
export default CategoryHerirarcy;
