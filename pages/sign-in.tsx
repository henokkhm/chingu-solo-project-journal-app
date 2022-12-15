import SecondaryButton from "../components/buttons/secondary-button";
import SignInForm from "../components/forms/sign-in-form";

function SignIn() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center space-y-4">
      <h1 className="pb-8 text-3xl font-bold">Sign In</h1>
      <SignInForm />
      <div className="flex items-center space-y-0 text-sm text-gray-500">
        Don&#39;t have an account? <SecondaryButton text="Sign Up" />
      </div>
    </main>
  );
}

export default SignIn;
