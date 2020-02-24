import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Locations from "./locations.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

const mocks = [
  {
    id: 1,
    name: `Paris`
  },
  {
    id: 2,
    name: `Cologne`
  },
  {
    id: 3,
    name: `Brussels`
  },
  {
    id: 4,
    name: `Amsterdam`
  },
  {
    id: 5,
    name: `Hamburg`
  },
  {
    id: 6,
    name: `Dusseldorf`
  },
];

const mock = {
  id: 1,
  name: `Paris`
};

it(`Should city tab be pressed`, () => {
  const onCityClick = jest.fn();

  const placeComponent = shallow(<Locations offer={mock} cities={mocks} activeCity={mock} onCityClick={onCityClick}/>);

  const tabItem = placeComponent.find(`li.locations__item`);

  const firstLi = tabItem.first();
  if (firstLi) {
    firstLi.simulate(`click`, {preventDefault: () => {}});
  }

  expect(onCityClick).toHaveBeenCalledTimes(1);
  expect({value: onCityClick.mock.calls[0][0]}).toMatchObject({value: mock.id});

});
