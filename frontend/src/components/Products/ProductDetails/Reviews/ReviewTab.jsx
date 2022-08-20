import React from 'react';
import ReviewTitle from './ReviewTitle';
import ReviewList from './ReviewList';
import AddReview from './AddReview';

const ReviewTab = () => {
    return (
        <div className="tab-pane">
            <div className="pd-tab__rev">
                <ReviewTitle />
                <ReviewList />
                <AddReview />
            </div>
        </div>
    );
};
export default ReviewTab;
