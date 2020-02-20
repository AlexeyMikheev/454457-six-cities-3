import React from "react";
import PropTypes from "prop-types";
import {ReviewShape} from '../../settings.js';
import Review from "../review/review.jsx";

const Reviews = ({reviews}) => {

  const totlaCount = reviews.length;

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{totlaCount}</span></h2>
      <ul className="reviews__list">
        {reviews.map((review) => <Review key={review.id} review={review} />)}
      </ul>
    </section>
  );
};

Reviews.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.shape(ReviewShape))
};

export default Reviews;
