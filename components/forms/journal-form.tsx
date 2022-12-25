import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import PrimaryButton from "../buttons/primary-button";
import { useRouter } from "next/router";
import { useSnackbar } from "../../context/snackbar-context";

function JournalForm() {
  const { setSnackbarMessage } = useSnackbar();
  const router = useRouter();
  return (
    <Formik
      initialValues={{ journalTitle: "", journalBody: "" }}
      validationSchema={Yup.object({
        journalTitle: Yup.string().required("A title is required"),
        journalBody: Yup.string().required("Body is required"),
      })}
      onSubmit={async (values, { setSubmitting, setErrors }) => {
        try {
          const response = await fetch("/api/journals/create", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          });

          const jsonData = await response.json();

          setSubmitting(false);
          console.log(jsonData);

          // if (
          //   response.status === 201 &&
          //   jsonData.message === "Successfully logged in"
          // ) {
          //   router.push("/");
          //   setSnackbarMessage("You have successfully signed in!", "success");
          // } else if (
          //   response.status === 400 &&
          //   jsonData.message === "Invalid username or password"
          // ) {
          //   setErrors({
          //     userName: "Invalid username or password",
          //     password: "Invalid username or password",
          //   });
          // }
        } catch (err) {
          console.log("Unknown error: ", err);
        }
      }}
    >
      {({ isSubmitting, resetForm }) => (
        <Form className="form-styles  w-full">
          <div>
            <label htmlFor="journalTitle" className="label-styles">
              Title
            </label>
            <Field name="journalTitle" type="text" className="input-styles" />
            <ErrorMessage
              component="div"
              className="py-2 text-sm text-red-700"
              name="journalTitle"
            />
          </div>

          <div>
            <label htmlFor="journalBody" className="label-styles">
              Body
            </label>
            <Field
              name="journalBody"
              component="textarea"
              className="block w-full rounded-lg border border-gray-300  bg-gray-50  p-2.5 text-gray-900  "
              rows={5}
            />
            <ErrorMessage
              component="div"
              className="py-2 text-sm text-red-700"
              name="journalBody"
            />
          </div>

          <div className="flex flex-col space-y-2 custom-sm:flex-row custom-sm:space-y-0 custom-sm:space-x-3">
            <PrimaryButton
              loading={isSubmitting}
              type="submit"
              text="Save Journal"
              iconUrl="/svg-icons/floppy-disk.svg"
            />
            <Link href="/">
              <PrimaryButton
                danger
                text="Discard"
                iconUrl="/svg-icons/go-back.svg"
                onClick={() => resetForm()}
              />
            </Link>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default JournalForm;
