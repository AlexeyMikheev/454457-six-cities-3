import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {SORTTYPES} from "../../consts.js";

import {ActionCreator} from "../../reducer.js";

const Sorting = (props) => {
  const {sortType, sortOffers, isToggled, onToggleChange} = props;

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" tabIndex="0" onClick={onToggleChange}>
        {sortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isToggled ? `places__options--opened` : ``}`}>
        {SORTTYPES.map((type) => <li key={type} className={`places__option ${sortType === type ? `places__option--active` : ``}`} tabIndex="0" onClick={() => {
          sortOffers(type);
        }}>{type}</li>)}
      </ul>
    </form>
  );
};

Sorting.propTypes = {
  sortType: PropTypes.oneOf(SORTTYPES).isRequired,
  isToggled: PropTypes.bool.isRequired,
  sortOffers: PropTypes.func.isRequired,
  onToggleChange: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  sortType: state.sortType
});

const mapDispatchToProps = {
  sortOffers: ActionCreator.sortOffers
};

export {Sorting};
export default connect(mapStateToProps, mapDispatchToProps)(Sorting);
