import Link from "next/link";
import SecondaryButton from "../components/buttons/secondary-button";
import SignUpForm from "../components/forms/sign-up-form";

function SignUp() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center space-y-4">
      <h1 className="pb-8 text-3xl font-bold">Sign Up</h1>
      <SignUpForm />
      <div className="flex items-center space-y-0 text-sm text-gray-500">
        Already have an account?{" "}
        <Link href="/sign-in">
          <SecondaryButton text="Sign In" />
        </Link>
      </div>
    </main>
  );
}

export default SignUp;
