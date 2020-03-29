import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {CommentForm} from "./comment-form.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

it(`CommentForm snapshot`, () => {

  const div = document.createElement(`div`);
  document.body.appendChild(div);

  const commentForm = mount(
      <CommentForm isFormValid={true}
        numeric={1}
        text={``}
        offerId={1}
        isLoading={false}
        clearStatus={jest.fn()}
        onValuesReset={jest.fn()}
        onValueChanged={jest.fn()}
        onFormSubmit={jest.fn()}
        sendComment={jest.fn()} />, {attachTo: div}
  );
  expect(commentForm.getDOMNode()).toMatchSnapshot();
});
