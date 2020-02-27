import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {SORTTYPES} from "../../consts.js";
import {extendObject} from "../../utils.js";
import {ActionCreator} from "../../reducer.js";

class Sorting extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isOpened: false
    };
  }

  render() {
    const {sortType, sortOffers} = this.props;
    const {isOpened} = this.state;

    const altIsOpened = !isOpened;
    return (
      <form className="places__sorting" action="#" method="get">
        <span className="places__sorting-caption">Sort by </span>
        <span className="places__sorting-type" tabIndex="0" onClick={
          () => {
            this.setState(extendObject(this.state, {isOpened: altIsOpened}));
          }
        }>
          {sortType}
          <svg className="places__sorting-arrow" width="7" height="4">
            <use xlinkHref="#icon-arrow-select"></use>
          </svg>
        </span>
        <ul className={`places__options places__options--custom ${isOpened ? `places__options--opened` : ``}`}>
          {SORTTYPES.map((type) => <li key={type} className={`places__option ${sortType === type ? `places__option--active` : ``}`} tabIndex="0" onClick={() => {
            sortOffers(type);
          }}>{type}</li>)}
        </ul>
      </form>
    );
  }
}

Sorting.propTypes = {
  sortType: PropTypes.oneOf(SORTTYPES).isRequired,
  sortOffers: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  sortType: state.sortType
});

const mapDispatchToProps = {
  sortOffers: ActionCreator.sortOffers
};

export {Sorting};
export default connect(mapStateToProps, mapDispatchToProps)(Sorting);
