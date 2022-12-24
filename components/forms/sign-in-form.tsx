import { Formik, Field, Form, ErrorMessage } from "formik";
import { useRouter } from "next/router";
import * as Yup from "yup";
import PrimaryButton from "../buttons/primary-button";

function SignInForm() {
  const router = useRouter();
  return (
    <Formik
      initialValues={{ userName: "", password: "" }}
      validationSchema={Yup.object({
        userName: Yup.string().required("A username is required"),
        password: Yup.string().required("A password is required"),
      })}
      onSubmit={async (values, { setSubmitting, setErrors }) => {
        try {
          const response = await fetch("/api/sign-in", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          });

          const jsonData = await response.json();

          setSubmitting(false);

          if (
            response.status === 201 &&
            jsonData.message === "Successfully logged in"
          ) {
            router.push("/");
          } else if (
            response.status === 400 &&
            jsonData.message === "Invalid username or password"
          ) {
            setErrors({
              userName: "Invalid username or password",
              password: "Invalid username or password",
            });
          }
        } catch (err) {
          console.log("Unknown error: ", err);
        }
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

          <PrimaryButton loading={isSubmitting} type="submit" text="Sign In" />
        </Form>
      )}
    </Formik>
  );
}

export default SignInForm;
