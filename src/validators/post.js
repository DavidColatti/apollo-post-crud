import * as yup from "yup";

const title = yup
  .string()
  .required("Title is required.")
  .min(3, "Title should have atleast 3 characters.")
  .max(100, "Title can have atmost 3000 characters.");

const content = yup
  .string()
  .required("Content of the post is required.")
  .min(10, "Content should have atleast 10 characters.")
  .max(3000, "Content can have atmost 3000 characters.");

export const postValidationRules = yup.object().shape({
  title,
  content,
});
