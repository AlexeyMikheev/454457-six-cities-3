import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {CommentForm} from "./comment-form.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should login submit`, () => {

  const mockTextChangeValue = {target: {value: ``}};
  const mockOfferId = 1;
  const mockRatingValue = 1;
  const mockEvt = {preventDefault: () => {}};

  const onNumericChanged = jest.fn();
  const onTextChanged = jest.fn();
  const onFormSubmit = jest.fn();
  const sendComment = jest.fn();

  const commentForm = shallow(
      <CommentForm isFormValid={true}
        numeric={mockRatingValue}
        text={mockTextChangeValue.target.value}
        offerId={mockOfferId}
        isLoading={false}
        clearStatus={() => {}}
        onClearState={() => {}}
        onNumericChanged={onNumericChanged}
        onTextChanged={onTextChanged}
        onFormSubmit={onFormSubmit}
        sendComment={sendComment} />)
  ;

  const form = commentForm.find(`form.reviews__form`);
  const textarea = form.find(`textarea.reviews__textarea`);
  const input = form.find(`input.form__rating-input[id='1-stars']`);

  input.simulate(`change`, mockRatingValue);
  expect(onNumericChanged).toHaveBeenCalledTimes(1);
  expect(onNumericChanged).toHaveBeenCalledWith(mockRatingValue);

  textarea.simulate(`change`, mockTextChangeValue);
  expect(onTextChanged).toHaveBeenCalledTimes(1);
  expect(onTextChanged).toHaveBeenCalledWith(mockTextChangeValue.target.value);

  form.simulate(`submit`, mockEvt);

  expect(sendComment).toHaveBeenCalledTimes(1);
  expect(sendComment).toHaveBeenCalledWith(mockOfferId, {rating: mockRatingValue, comment: mockTextChangeValue.target.value});
});
