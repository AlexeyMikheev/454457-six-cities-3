import React from "react";
import PropTypes from "prop-types";
import {ReviewShape} from '../../settings.js';
import Review from "../review/review.jsx";
import {MAX_REVIEWS_DISPLAY_COUNT} from "../../consts.js";

const Reviews = ({reviews}) => {

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
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{totalCount}</span></h2>
      <ul className="reviews__list">
        {displayReviews.map((review) => <Review key={review.id} review={review} />)}
      </ul>
    </section>
  );
};

Reviews.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.shape(ReviewShape))
};

export default Reviews;
