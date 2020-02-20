import React from "react";
import PropTypes from "prop-types";
import {MAX_RATING} from "../../consts.js";
import {ReviewShape} from '../../settings.js';
import moment from "moment";

const Review = ({review}) => {

  const {name, avatar, rating, description, date} = review;

  const displayDate = moment(date).format(`MMMM YYYY`);
  const ratingPercent = Math.floor(rating) * 100 / MAX_RATING;

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={avatar} width="54" height="54" alt="Reviews avatar" />
        </div>
        <span className="reviews__user-name">
          {name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: `${ratingPercent}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {description}
        </p>
        <time className="reviews__time" dateTime="2019-04-24">{displayDate}</time>
      </div>
    </li>
  );
};

Review.propTypes = {
  review: PropTypes.shape(ReviewShape)
};

export default Review;
