import { Formik, Field, Form, ErrorMessage } from "formik";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { useSnackbar } from "../../context/snackbar-context";
import PrimaryButton from "../buttons/primary-button";

function SignUpForm() {
  const router = useRouter();
  const { setSnackbarMessage } = useSnackbar();
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
      onSubmit={async (values, { setSubmitting, setErrors }) => {
        try {
          const response = await fetch("/api/sign-up", {
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
            jsonData.message === "Success: A new user has been created"
          ) {
            router.push("/sign-in");
            setSnackbarMessage(
              "You have successfully created a new user account!",
              "success"
            );
          } else if (
            response.status === 400 &&
            jsonData.message === "Username is already taken"
          ) {
            setErrors({
              userName:
                "That username has already been taken, please try a different one.",
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
