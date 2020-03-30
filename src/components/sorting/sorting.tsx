import * as React from "react";
import {connect} from "react-redux";
import {SORTTYPES, SortType} from "../../consts";
import {ActionCreator} from "../../reducer/data/data.js";
import {getSortType} from "../../reducer/data/selectors";
import {EmptyFunction} from "../../types";


interface Props{
  sortType: SortType;
  isToggled: boolean;
  setSortType: (sortType: SortType) => void;
  onToggleChange: EmptyFunction;
}

const Sorting = (props) => {
  const {sortType, setSortType, isToggled, onToggleChange} = props;

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" tabIndex={0} onClick={onToggleChange}>
        {sortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isToggled ? `places__options--opened` : ``}`}>
        {SORTTYPES.map((type) => <li key={type} className={`places__option ${sortType === type ? `places__option--active` : ``}`} tabIndex={0} onClick={() => {
          setSortType(type);
        }}>{type}</li>)}
      </ul>
    </form>
  );
};

const mapStateToProps = (state) => ({
  sortType: getSortType(state)
});

const mapDispatchToProps = {
  setSortType: ActionCreator.setSortType
};

export {Sorting};
export default connect(mapStateToProps, mapDispatchToProps)(Sorting);
