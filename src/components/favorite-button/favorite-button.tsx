import * as React from "react";
import {connect} from "react-redux";
import history from "../../history.js";
import {FavoriteButtonType, AppRoute, FavoriteState} from "../../consts";
import {isUserAuthorized} from "../../reducer/user/selectors.js";
import {Operation as DataOperation} from "../../reducer/data/data.js";

interface Props{
  isAuthorized: boolean;
  isMarked: boolean;
  viewType: FavoriteButtonType;
  offerId: number;
  setFavorite: (offerId, state) => void;
}

class FavoriteButton extends React.PureComponent<Props> {
  constructor(props) {
    super(props);

    this.onButtonClick = this.onButtonClick.bind(this);
  }

  onButtonClick(evt) {
    evt.preventDefault();

    const {isAuthorized} = this.props;

    if (!isAuthorized) {
      history.push(AppRoute.LOGIN);
      return;
    }

    const {offerId, isMarked, setFavorite} = this.props;

    const markedValue = isMarked ? FavoriteState.UNMARKED : FavoriteState.MARKED;

    setFavorite(offerId, markedValue);
  }


  render() {
    const {viewType, isMarked} = this.props;

    const buttonClass = viewType === FavoriteButtonType.PROPERTY ? `property__bookmark-button` : `place-card__bookmark-button`;
    const iconClass = viewType === FavoriteButtonType.PROPERTY ? `property__bookmark-icon` : `place-card__bookmark-icon`;
    const iconWidth = viewType === FavoriteButtonType.PROPERTY ? 31 : 18;
    const iconHeight = viewType === FavoriteButtonType.PROPERTY ? 33 : 19;

    return (
      <button className={`${buttonClass} button ${isMarked ? `${buttonClass}--active` : ``}`} type="button" onClick={this.onButtonClick}>
        <svg className={iconClass} width={iconWidth} height={iconHeight}>
          <use xlinkHref="#icon-bookmark"></use>
        </svg>
        <span className="visually-hidden">To bookmarks</span>
      </button>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthorized: isUserAuthorized(state),
});

const mapDispatchToProps = {
  setFavorite: DataOperation.setFavorite
};

export {FavoriteButton};
export default connect(mapStateToProps, mapDispatchToProps)(FavoriteButton);
