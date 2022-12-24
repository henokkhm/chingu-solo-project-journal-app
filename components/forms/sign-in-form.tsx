import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import PrimaryButton from "../buttons/primary-button";

function SignInForm() {
  return (
    <Formik
      initialValues={{ userName: "", password: "" }}
      validationSchema={Yup.object({
        userName: Yup.string().required("A username is required"),
        password: Yup.string().required("A password is required"),
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

          <PrimaryButton loading={isSubmitting} type="submit" text="Sign Up" />
        </Form>
      )}
    </Formik>
  );
}

export default SignInForm;
