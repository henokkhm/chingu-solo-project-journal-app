import PrimaryButton from "../buttons/primary-button";

function SignUpForm() {
  return (
    <form className="form-styles">
      <div>
        <label htmlFor="user_name" className="label-styles">
          User name:
        </label>
        <input type="text" id="user_name" className="input-styles" />
      </div>
      <div>
        <label htmlFor="password" className="label-styles">
          Password:
        </label>
        <input type="password" id="password" className="input-styles" />
      </div>
      <div>
        <label htmlFor="confirm-password" className="label-styles">
          Confirm Password:
        </label>
        <input type="password" id="confirm-password" className="input-styles" />
      </div>
      <PrimaryButton text="Sign Up" />
    </form>
  );
}

export default SignUpForm;
