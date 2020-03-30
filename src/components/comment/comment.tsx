import * as React from "react";
import {getRatingPercents} from "../../utils.js";
import {Review} from '../../types';
import * as moment from "moment";

interface Props {
  review: Review;
}

const Comment: React.FC<Props> = (props) => {

  const {user: {name, avatar}, rating, comment, date} = props.review;

  const displayDate = moment(date).format(`MMMM dd, YYYY`);
  const ratingPercent = getRatingPercents(rating);

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
          {comment}
        </p>
        <time className="reviews__time" dateTime="2019-04-24">{displayDate}</time>
      </div>
    </li>
  );
};

export default Comment;
