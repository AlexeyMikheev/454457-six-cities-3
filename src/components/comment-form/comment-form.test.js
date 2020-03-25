import React from "react";
import renderer from "react-test-renderer";
import CommentForm from "./comment-form.jsx";


it(`CommentForm snapshot`, () => {

  const commentForm = renderer
    .create(
        <CommentForm isFormValid={true}
          numeric={1}
          text={``}
          offerId={1}
          isLoading={false}
          clearStatus={() => {}}
          onClearState={() => {}}
          onNumericChanged={() => {}}
          onTextChanged={() => {}}
          onFormSubmit={() => {}}
          sendComment={() => {}} />
    ).toJSON();
  expect(commentForm).toMatchSnapshot();
});
