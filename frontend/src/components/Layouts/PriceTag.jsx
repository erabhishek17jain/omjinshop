import { getDiscount } from '../../utils/services';

const PriceTag = (props) => {
    return (
        <div className="pd-detail__inline">
            <span className={props.type === 'feature' ? 'fr-detail__price' : 'pd-detail__price'}>₹{props.cuttedPrice?.toLocaleString()}</span>
            <span className="pd-detail__discount">({getDiscount(props.price, props.cuttedPrice)}% OFF)</span>
            <del className="pd-detail__del">₹{props.price?.toLocaleString()}</del>
        </div>
    );
};
export default PriceTag;
