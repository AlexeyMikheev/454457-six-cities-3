import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import CommentForm from "./comment-form.jsx";


Enzyme.configure({
  adapter: new Adapter(),
});


it(`Should login submit`, () => {

  const onNumericChanged = jest.fn();
  const onTextChanged = jest.fn();
  const onFormSubmit = jest.fn();
  const loginComponent = shallow(<CommentForm isFormValid={true} onNumericChanged={onNumericChanged} onTextChanged={onTextChanged} onFormSubmit={onFormSubmit}/>);

  const form = loginComponent.find(`form.reviews__form`);
  const textarea = form.find(`textarea.reviews__textarea`);
  const input = form.find(`input.form__rating-input[id='1-stars']`);

  input.simulate(`change`);
  expect(onNumericChanged).toHaveBeenCalledTimes(1);

  textarea.simulate(`change`, {target: {value: ``}});
  expect(onTextChanged).toHaveBeenCalledTimes(1);

  form.simulate(`submit`, {preventDefault: () => {}});
  expect(onFormSubmit).toHaveBeenCalledTimes(1);
});
