import PrimaryButton from "../buttons/primary-button";

function SignInForm() {
  return (
    <form className="form-styles">
      <div>
        <label htmlFor="user_name" className="label-styles">
          User name:
        </label>
        <input type="text" id="user_name" className="input-styles" />
      </div>{" "}
      <div>
        <label htmlFor="password" className="label-styles">
          Password:
        </label>
        <input type="password" id="password" className="input-styles" />
      </div>
      <PrimaryButton text="Sign In" />
    </form>
  );
}

export default SignInForm;
