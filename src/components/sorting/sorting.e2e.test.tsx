import * as React from "react";
import {mount} from "enzyme";
import {SortType} from "../../consts";
import {Sorting} from "./sorting";

it(`Should sorting be toggled`, () => {

  const div = document.createElement(`div`);
  document.body.appendChild(div);

  const toggleChangeHandler = jest.fn();
  const setSortTypeHandler = jest.fn();
  const isToggled = false;
  const sortType = SortType.POPULAR;
  const changedSortType = SortType.PRICE_LH;

  const sortingComponent = mount(<Sorting sortType={sortType} isToggled={isToggled} setSortType={setSortTypeHandler} onToggleChange={toggleChangeHandler}/>, {attachTo: div});

  const placesSorting = sortingComponent.find(`span.places__sorting-type`);
  placesSorting.simulate(`click`);

  expect(toggleChangeHandler).toHaveBeenCalledTimes(1);

  const placesOption = sortingComponent.find(`li.places__option`).at(1);
  placesOption.simulate(`click`);

  expect(setSortTypeHandler).toHaveBeenCalledTimes(1);
  expect(setSortTypeHandler).toHaveBeenCalledWith(changedSortType);

});
