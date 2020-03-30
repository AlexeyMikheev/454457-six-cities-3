import * as React from "react";
import {mount} from "enzyme";
import {CommentForm} from "./comment-form";

it(`CommentForm snapshot`, () => {

  const div = document.createElement(`div`);
  document.body.appendChild(div);

  const commentForm = mount(
      <CommentForm
        isSuccess={true}
        disabled={true}
        error={``}
        rating={`1`}
        review={``}
        offerId={1}
        isLoading={false}
        clearStatus={jest.fn()}
        onValuesReset={jest.fn()}
        onValueChanged={jest.fn()}
        sendComment={jest.fn()} />, {attachTo: div}
  );
  expect(commentForm.getDOMNode()).toMatchSnapshot();
});
