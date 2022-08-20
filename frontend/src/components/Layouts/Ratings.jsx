import { setRatings } from '../../utils/services';

const Ratings = (props) => {
    return (
        <div className="pd-detail__rating gl-rating-style">
            {props.ratings !== undefined && setRatings(props.ratings, props.starCount)}
            <span className="pd-detail__review u-s-m-l-4">
                <a data-click-scroll="#view-review">{props.numOfReviews} Reviews</a>
            </span>
        </div>
    );
};
export default Ratings;
