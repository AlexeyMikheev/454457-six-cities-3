import * as React from "react";
import {shallow} from "enzyme";
import {CommentForm} from "./comment-form";


it(`CommentForm e2e withOut submit`, () => {

  const mockCommentValue = `Comment`;
  const mockOfferId = 1;
  const mockRatingValue = `1`;
  const mockEvt = {preventDefault: jest.fn()};

  const valueChangedHandler = jest.fn();
  const sendComment = jest.fn();

  const commentForm = shallow(
      <CommentForm
        isSuccess={true}
        disabled={true}
        error={``}
        rating={mockRatingValue}
        review={mockCommentValue}
        offerId={mockOfferId}
        isLoading={false}
        clearStatus={jest.fn()}
        onValuesReset={jest.fn()}
        onValueChanged={valueChangedHandler}
        sendComment={sendComment} />
  );

  const form = commentForm.find(`form.reviews__form`);
  const textarea = form.find(`textarea.reviews__textarea`);
  const input = form.find(`input.form__rating-input[id='1-stars']`);

  input.simulate(`change`, mockRatingValue);
  expect(valueChangedHandler).toHaveBeenCalledTimes(1);
  expect(valueChangedHandler).toHaveBeenCalledWith(mockRatingValue);

  textarea.simulate(`change`, mockCommentValue);
  expect(valueChangedHandler).toHaveBeenCalledTimes(2);
  expect(valueChangedHandler).toHaveBeenCalledWith(mockCommentValue);

  form.simulate(`submit`, mockEvt);
  expect(sendComment).toHaveBeenCalledTimes(0);
});


it(`CommentForm e2e with submit`, () => {

  const mockCommentValue = `Peaceful studio in the most wanted area in town. 
  Quiet house Near of everything. Completely renovated. 
  Lovely neighbourhood, lot of trendy shops, 
  restaurants and bars in a walking distance.`;

  const mockOfferId = 1;
  const mockRatingValue = `1`;
  const mockEvt = {preventDefault: jest.fn()};

  const valueChangedHandler = jest.fn();
  const sendComment = jest.fn();

  const commentForm = shallow(
      <CommentForm
        isSuccess={true}
        disabled={true}
        error={``}
        rating={mockRatingValue}
        review={mockCommentValue}
        offerId={mockOfferId}
        isLoading={false}
        clearStatus={jest.fn()}
        onValuesReset={jest.fn()}
        onValueChanged={valueChangedHandler}
        sendComment={sendComment} />
  );

  const form = commentForm.find(`form.reviews__form`);
  const textarea = form.find(`textarea.reviews__textarea`);
  const input = form.find(`input.form__rating-input[id='1-stars']`);

  input.simulate(`change`, mockRatingValue);
  expect(valueChangedHandler).toHaveBeenCalledTimes(1);
  expect(valueChangedHandler).toHaveBeenCalledWith(mockRatingValue);

  textarea.simulate(`change`, mockCommentValue);
  expect(valueChangedHandler).toHaveBeenCalledTimes(2);
  expect(valueChangedHandler).toHaveBeenCalledWith(mockCommentValue);

  form.simulate(`submit`, mockEvt);
  expect(sendComment).toHaveBeenCalledTimes(1);
  expect(sendComment).toHaveBeenCalledWith(mockOfferId, {rating: mockRatingValue, comment: mockCommentValue});
});
