import { useAxios } from "@/hooks/useAxios";
import { IUserLogin } from "@/interfaces/IUserData";
import { FormEvent, SyntheticEvent, useRef } from "react";

function Login() {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const [loading, data, error, request] = useAxios<IUserLogin>(
    {
      method: "GET",
      url: "http://localhost:3000/",
    },
    false
  );

  function submitHandler(e: FormEvent) {
    e.preventDefault();
  }

  return (
    <>
      <form onSubmit={submitHandler}>
        <h3>Sign In</h3>
        <input type="email" required ref={emailInputRef} />
        <input type="password" required ref={passwordInputRef} />
        <button type="submit">Login</button>
      </form>
    </>
  );
}

export default Login;
