import React, {PureComponent} from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {Operation as DataOperation} from "../../reducer/data/data.js";
import {FavoriteState} from '../../consts.js';
import {isUserAuthorized} from "../../reducer/user/selectors.js";
import {FavoriteButtonTypes} from "../../consts.js";


const withButtonState = (Component) => {
  class WithButtonState extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        redirect: false
      };

      this.onButtonClick = this.onButtonClick.bind(this);
    }

    onButtonClick(evt) {
      evt.preventDefault();

      const {isAuthorized} = this.props;

      if (!isAuthorized) {
        this.setState({redirect: true});
        return;
      }

      const {offerId, isMarked, setFavorite} = this.props;

      const markedValue = isMarked ? FavoriteState.UNMARKED : FavoriteState.MARKED;

      setFavorite(offerId, markedValue);
    }

    render() {
      const {isMarked, viewType} = this.props;
      const {redirect} = this.state;

      return <Component
        {...this.props}
        isRedirect={redirect}
        isMarked={isMarked}
        viewType={viewType}
        onButtonClick={this.onButtonClick}
      />;
    }
  }

  WithButtonState.propTypes = {
    isMarked: PropTypes.bool.isRequired,
    offerId: PropTypes.number.isRequired,
    isAuthorized: PropTypes.bool.isRequired,
    viewType: PropTypes.oneOf(FavoriteButtonTypes),
    setFavorite: PropTypes.func.isRequired
  };

  const mapStateToProps = (state) => ({
    isAuthorized: isUserAuthorized(state),
  });

  const mapDispatchToProps = {
    setFavorite: DataOperation.setFavorite
  };

  return connect(mapStateToProps, mapDispatchToProps)(WithButtonState);
};


export default withButtonState;
