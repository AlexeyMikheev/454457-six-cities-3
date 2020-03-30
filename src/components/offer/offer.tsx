import * as React from 'react';
import {Link} from "react-router-dom";
import {getRatingPercents} from '../../utils.js';
import {FavoriteButtonType, AppRoute, ViewMode, ImageCardWidth} from "../../consts";
import {Offer as OfferType, OfferHoveredChangeFunction, OfferChangeFunction} from '../../types';
import FavoriteButton from "../favorite-button/favorite-button";

interface Props{
  offer: OfferType;
  onHeaderClick: OfferChangeFunction;
  onHoveredChange: OfferHoveredChangeFunction;
  viewMode: ViewMode;
}

class Offer extends React.PureComponent<Props> {
  constructor(props) {
    super(props);

    this.cardHeaderClickHandler = this.cardHeaderClickHandler.bind(this);
    this.cardMouseOverHandler = this.cardMouseOverHandler.bind(this);
    this.cardMouseLeaveHandler = this.cardMouseLeaveHandler.bind(this);
  }

  cardHeaderClickHandler(evt) {
    evt.preventDefault();

    const {onHeaderClick, offer} = this.props;

    onHeaderClick(offer.id);
  }

  cardMouseOverHandler() {
    const {onHoveredChange, offer} = this.props;

    onHoveredChange(offer.id);
  }

  cardMouseLeaveHandler() {
    const {onHoveredChange} = this.props;

    onHoveredChange(null);
  }

  renderOfferContent(imagesCardWidth, imagesCardHeight, imagesCardClass, infoCardClass = ``) {
    const {offer} = this.props;
    const {cost, isMarked, rating, name, type, image} = offer;

    const ratingPercent = getRatingPercents(rating);

    return (
      <React.Fragment>
        <div className={`place-card__image-wrapper ${imagesCardClass}`}>
          <a href="#">
            <img className="place-card__image" src={image} width={imagesCardWidth} height={imagesCardHeight} alt="Place image" />
          </a>
        </div>
        <div className={`place-card__info ${infoCardClass}`}>
          <div className="place-card__price-wrapper">
            <div className="place-card__price">
              <b className="place-card__price-value">&euro;{cost}</b>
              <span className="place-card__price-text">&#47;&nbsp;night</span>
            </div>
            <FavoriteButton viewType={FavoriteButtonType.CARD} offerId={offer.id} isMarked={isMarked} />
          </div>
          <div className="place-card__rating rating">
            <div className="place-card__stars rating__stars">
              <span style={{width: `${ratingPercent}%`}}></span>
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <h2 className="place-card__name" onClick={this.cardHeaderClickHandler}>
            <Link to={`${AppRoute.OFFER}/${offer.id}`}>{name}</Link>
          </h2>
          <p className="place-card__type">{type}</p>
        </div>
      </React.Fragment>
    );
  }

  renderMainOfferContent() {
    const {offer} = this.props;

    const {isPremium} = offer;

    return (
      <article className="place-card cities__place-card" onMouseOver={this.cardMouseOverHandler} onMouseLeave={this.cardMouseLeaveHandler}>
        {isPremium &&
          <div className="place-card__mark">
            <span>Premium</span>
          </div>
        }
        {this.renderOfferContent(ImageCardWidth.CARD_WIDTH, ImageCardWidth.CARD_HEIGHT, `cities__image-wrapper`)}
      </article>
    );
  }

  renderPropertyOfferContent() {
    const {offer} = this.props;
    const {isPremium} = offer;

    return (
      <article className="place-card near-places__card">
        {isPremium &&
          <div className="place-card__mark">
            <span>Premium</span>
          </div>
        }
        {this.renderOfferContent(ImageCardWidth.CARD_WIDTH, ImageCardWidth.CARD_HEIGHT, `near-places__image-wrapper`)}
      </article>
    );
  }

  renderFavoriteOfferContent() {
    return (
      <article className="place-card favorites__card">
        {
          this.renderOfferContent(ImageCardWidth.FAVORITE_WIDTH, ImageCardWidth.FAVORITE_HEIGHT, `favorites__image-wrapper`, `favorites__card-info`)
        }
      </article>
    );
  }

  render() {
    const {viewMode} = this.props;

    switch (viewMode) {
      case ViewMode.Main:
        return (
          this.renderMainOfferContent()
        );
      case ViewMode.Property:
        return (
          this.renderPropertyOfferContent()
        );
      case ViewMode.Favorite:
        return (
          this.renderFavoriteOfferContent()
        );
      default: return null;
    }
  }
}
export default Offer;
