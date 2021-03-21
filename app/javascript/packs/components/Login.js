import React from "react";
import { NpaContext } from "../Context";

export default function Login() {
  const {
    loginCredentials,
    handleChangeLoginForm,
    handleSubmitLoginForm,
    errorMessage,
  } = React.useContext(NpaContext);

  return (
    <div>
      <p>{errorMessage}</p>
      <form>
        <label>
          <p>Username</p>
          <input type="text" name="email" onChange={handleChangeLoginForm} />
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            name="password"
            onChange={handleChangeLoginForm}
          />
        </label>
        <div>
          <button type="submit" onClick={handleSubmitLoginForm}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
