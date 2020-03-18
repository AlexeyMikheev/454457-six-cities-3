import React from "react";
import renderer from "react-test-renderer";
import CommentForm from "./comment-form.jsx";


it(`Render CommentForm`, () => {

  const tree = renderer
      .create(<CommentForm isFormValid={true} onNumericChanged={() => {}} onTextChanged={() => {}} onFormSubmit={() => {}}/>)
      .toJSON();
  expect(tree).toMatchSnapshot();
});
