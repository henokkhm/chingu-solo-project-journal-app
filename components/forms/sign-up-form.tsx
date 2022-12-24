import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import PrimaryButton from "../buttons/primary-button";

function SignUpForm() {
  return (
    <Formik
      initialValues={{ userName: "", password: "", passwordConfirmation: "" }}
      validationSchema={Yup.object({
        userName: Yup.string()
          .min(5, "Username must be at least 5 characters")
          .max(15, "Username must be 15 characters or less")
          .required("A username is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("A password is required"),
        passwordConfirmation: Yup.string()
          .oneOf([Yup.ref("password"), null], "Passwords must match")
          .required("Please confirm your password"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="form-styles max-w-sm">
          <div>
            <label htmlFor="userName" className="label-styles">
              User Name
            </label>
            <Field name="userName" type="text" className="input-styles" />
            <ErrorMessage
              component="div"
              className="py-2 text-sm text-red-700"
              name="userName"
            />
          </div>

          <div>
            <label htmlFor="password" className="label-styles">
              Password
            </label>
            <Field name="password" type="password" className="input-styles" />
            <ErrorMessage
              component="div"
              className="py-2 text-sm text-red-700"
              name="password"
            />
          </div>

          <div>
            <label htmlFor="passwordConfirmation" className="label-styles">
              Confirm Password
            </label>
            <Field
              name="passwordConfirmation"
              type="password"
              className="input-styles"
            />
            <ErrorMessage
              component="div"
              className="py-2 text-sm text-red-700"
              name="passwordConfirmation"
            />
          </div>

          <PrimaryButton loading={isSubmitting} type="submit" text="Sign Up" />
        </Form>
      )}
    </Formik>
  );
}

export default SignUpForm;
