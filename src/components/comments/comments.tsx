import * as React from "react";
import {Review} from '../../types';
import Comment from "../comment/comment";
import {MAX_REVIEWS_DISPLAY_COUNT} from "../../consts";

interface Props{
  reviews: Review[];
}

const Comments: React.FC<Props> = ({reviews}) => {

  const totalCount = reviews.length;

  const displayReviews = reviews.slice(0, MAX_REVIEWS_DISPLAY_COUNT).sort((prev, next) => {
    if (prev.date > next.date) {
      return -1;
    } else if (prev.date < next.date) {
      return 1;
    }
    return 0;
  });

  return (
    <React.Fragment>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{totalCount}</span></h2>
      <ul className="reviews__list">
        {displayReviews.map((review) => <Comment key={review.id} review={review} />)}
      </ul>
    </React.Fragment>
  );
};

export default Comments;
