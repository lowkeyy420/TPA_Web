import { useAxiosPost } from "@/hooks/useAxiosPost";
import { IUserLogin } from "@/interfaces/IUserData";
import { useRouter } from "next/router";
import { FormEvent, useRef } from "react";

function Login() {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const url = process.env.BASE_URL + "login";
  const nav = useRouter();

  const [loading, response, error, request] = useAxiosPost<IUserLogin>(
    {
      method: "POST",
      url: url,
    },
    "login"
  );

  function submitHandler(e: FormEvent) {
    e.preventDefault();
    const email = emailInputRef.current?.value;
    const pass = passwordInputRef.current?.value;

    request({
      email: email,
      password: pass,
    });
  }

  return (
    <>
      <form onSubmit={submitHandler}>
        <h3>Sign In</h3>
        <input type="email" required ref={emailInputRef} />
        <input type="password" required ref={passwordInputRef} />
        <button type="submit">Login</button>
      </form>
      {error && <h1>{error}</h1>}
      {loading && <h1>loading...</h1>}
      {response.token && <h1>Successfully Logged In {response.token}</h1>}
    </>
  );
}

export default Login;
