import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {RatingValues} from "../../consts.js";
import {connect} from "react-redux";
import {isLoadingStatus, isSuccessStatus, getCommentError} from "../../reducer/comment/selectors.js";
import {Operation as commentOperation} from "../../reducer/comment/comment.js";
import {getCurrentOfferId} from "../../reducer/data/selectors.js";

class CommentForm extends PureComponent {
  constructor(props) {
    super(props);

    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  componentDidUpdate() {
    const {isSuccess, clearStatus, onClearState} = this.props;
    if (isSuccess) {
      onClearState();
      clearStatus();
    }
  }

  onFormSubmit(evt) {
    evt.preventDefault();

    const {numeric: rating, text: comment, isFormValid, sendComment, isLoading, offerId} = this.props;

    if (!isFormValid || isLoading) {
      return;
    }

    sendComment(offerId, {rating, comment});
  }

  render() {
    const {numeric, text, isLoading: disabled, error, isFormValid, onTextChanged: onMessageChanged, onNumericChanged: onRatingChanged} = this.props;
    return (
      <form className="reviews__form form" action="#" method="post" disabled={disabled} onSubmit={this.onFormSubmit}>
        <label className="reviews__label form__label" htmlFor="review">Your review</label>
        <div className="reviews__rating-form form__rating">
          {RatingValues.map((ratingValue) =>
            <React.Fragment key={ratingValue}>
              <input className="form__rating-input visually-hidden" name="rating" value={`${ratingValue}`} id={`${ratingValue}-stars`} type="radio" disabled={disabled} checked={ratingValue === numeric} onChange={() => {
                onRatingChanged(ratingValue);
              }} />
              <label htmlFor={`${ratingValue}-stars`} className="reviews__rating-label form__rating-label" title="perfect">
                <svg className="form__star-image" width="37" height="33">
                  <use xlinkHref="#icon-star"></use>
                </svg>
              </label>
            </React.Fragment>
          )}
        </div>
        <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved" onChange={(evt) => {
          onMessageChanged(evt.target.value);
        }} value={text} disabled={disabled}></textarea>
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

CommentForm.propTypes = {
  error: PropTypes.string,
  offerId: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
  sendComment: PropTypes.func.isRequired,
  clearStatus: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  isSuccess: PropTypes.bool,
  isFormValid: PropTypes.bool.isRequired,
  numeric: PropTypes.oneOf(RatingValues),
  text: PropTypes.string,
  onNumericChanged: PropTypes.func.isRequired,
  onTextChanged: PropTypes.func.isRequired,
  onClearState: PropTypes.func.isRequired

};

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
