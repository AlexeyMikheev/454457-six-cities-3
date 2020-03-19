import React from "react";
import PropTypes from "prop-types";
import {Redirect} from "react-router-dom";
import {FavoriteButtonTypes, FavoriteButtonType, AppRoute} from "../../consts.js";

const FavoriteButton = ({viewType, isMarked, isRedirect, onButtonClick}) => {

  const buttonClass = viewType === FavoriteButtonType.PROPERTY ? `property__bookmark-button` : `place-card__bookmark-button`;
  const iconClass = viewType === FavoriteButtonType.PROPERTY ? `property__bookmark-icon` : `place-card__bookmark-icon`;
  const iconWidth = viewType === FavoriteButtonType.PROPERTY ? 31 : 18;
  const iconHeight = viewType === FavoriteButtonType.PROPERTY ? 33 : 19;

  if (isRedirect) {
    return <Redirect to={AppRoute.LOGIN} />;
  }

  return (
    <button className={`${buttonClass} button ${isMarked ? `${buttonClass}--active` : ``}`} type="button" onClick={onButtonClick}>
      <svg className={iconClass} width={iconWidth} height={iconHeight}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
};

FavoriteButton.propTypes = {
  isMarked: PropTypes.bool.isRequired,
  onButtonClick: PropTypes.func.isRequired,
  isRedirect: PropTypes.bool.isRequired,
  viewType: PropTypes.oneOf(FavoriteButtonTypes)
};

export default React.memo(FavoriteButton);
