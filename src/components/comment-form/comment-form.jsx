import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {RatingValues} from "../../consts.js";

class CommentForm extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      rating: undefined,
      comment: undefined
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onRatingChanged = this.onRatingChanged.bind(this);
    this.onMessageChanged = this.onMessageChanged.bind(this);
  }

  get IsFormValid() {
    const {rating, comment} = this.state;

    return rating !== undefined && comment !== undefined && comment.length > 50;
  }

  onRatingChanged(rating) {
    this.setState({rating});
  }

  onMessageChanged(evt) {
    this.setState({
      comment: evt.target.value
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();

    const {onSubmit, disabled} = this.props;

    if (!this.IsFormValid || disabled) {
      return;
    }

    const {rating, comment} = this.state;

    onSubmit({rating, comment});
  }

  render() {
    const {disabled} = this.props;

    return (
      <form className="reviews__form form" action="#" method="post" disabled={disabled} onSubmit={this.handleSubmit}>
        <label className="reviews__label form__label" htmlFor="review">Your review</label>
        <div className="reviews__rating-form form__rating">
          {RatingValues.map((rating) =>
            <React.Fragment key={rating}>
              <input className="form__rating-input visually-hidden" name="rating" value={`${rating}`} id={`${rating}-stars`} type="radio" disabled={disabled} checked={this.state.rating === rating} onChange={() => {
                this.onRatingChanged(rating);
              }}/>
              <label htmlFor={`${rating}-stars`} className="reviews__rating-label form__rating-label" title="perfect">
                <svg className="form__star-image" width="37" height="33">
                  <use xlinkHref="#icon-star"></use>
                </svg>
              </label>
            </React.Fragment>
          )}
        </div>
        <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved" onChange={this.onMessageChanged}></textarea>
        <div className="reviews__button-wrapper">
          <p className="reviews__help">
            To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
          </p>
          <button className="reviews__submit form__submit button" type="submit" disabled={!this.IsFormValid || disabled}>Submit</button>
        </div>
      </form>
    );
  }
}

CommentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.string,
  disabled: PropTypes.bool
};


export default CommentForm;
