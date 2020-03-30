import * as React from "react";
import {connect} from "react-redux";
import {isLoadingStatus, isSuccessStatus, getCommentError} from "../../reducer/comment/selectors.js";
import {Operation as commentOperation} from "../../reducer/comment/comment.js";
import {getCurrentOfferId} from "../../reducer/data/selectors.js";
import {RatingValues, MIN_COMMENT_LENGTH} from "../../consts";
import {EmptyFunction, SendCommentFunction, FormValueChangeFunction} from "../../types";

interface Props{
  error: string;
  offerId: number;
  isLoading: boolean;
  sendComment: SendCommentFunction;
  clearStatus: EmptyFunction;
  disabled: boolean;
  isSuccess: boolean;
  rating: string;
  review: string;
  onValueChanged: FormValueChangeFunction;
  onValuesReset: EmptyFunction;
}

class CommentForm extends React.PureComponent<Props> {
  constructor(props) {
    super(props);

    this.submitFormHandler = this.submitFormHandler.bind(this);
  }

  get isFormValid() {
    const {rating, review} = this.props;
    return rating !== undefined && review !== undefined && review.length > MIN_COMMENT_LENGTH;
  }

  componentDidUpdate() {
    const {isSuccess, clearStatus, onValuesReset} = this.props;
    if (isSuccess) {
      onValuesReset();
      clearStatus();
    }
  }

  submitFormHandler(evt) {
    evt.preventDefault();

    const {rating, review, sendComment, isLoading, offerId} = this.props;

    if (isLoading || !this.isFormValid) {
      return;
    }

    sendComment(offerId, {rating, comment: review});
  }

  render() {
    const {rating, review, isLoading: disabled, error, onValueChanged} = this.props;

    const isFormValid = this.isFormValid;

    return (
      <form className="reviews__form form" action="#" method="post" onSubmit={this.submitFormHandler}>
        <label className="reviews__label form__label" htmlFor="review">Your review</label>
        <div className="reviews__rating-form form__rating">
          {RatingValues.map((ratingValue) =>
            <React.Fragment key={ratingValue}>
              <input className="form__rating-input visually-hidden" name="rating" value={`${ratingValue}`} id={`${ratingValue}-stars`} type="radio" disabled={disabled} checked={ratingValue === rating} onChange={onValueChanged} />
              <label htmlFor={`${ratingValue}-stars`} className="reviews__rating-label form__rating-label" title="perfect">
                <svg className="form__star-image" width="37" height="33">
                  <use xlinkHref="#icon-star"></use>
                </svg>
              </label>
            </React.Fragment>
          )}
        </div>
        <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved" onChange={onValueChanged} value={review} disabled={disabled}></textarea>
        <div className="reviews__button-wrapper">
          <p className="reviews__help">
            To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
          </p>
          <button className="reviews__submit form__submit button" type="submit" disabled={disabled || !isFormValid}>Submit</button>
        </div>
        <div className="reviews__error">{error}</div>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  error: getCommentError(state),
  isLoading: isLoadingStatus(state),
  isSuccess: isSuccessStatus(state),
  offerId: getCurrentOfferId(state)
});

const mapDispatchToProps = {
  sendComment: commentOperation.sendComment,
  clearStatus: commentOperation.clearStatus
};

export {CommentForm};
export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);
