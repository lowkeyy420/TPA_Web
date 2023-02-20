import { useAxiosPost } from "@/hooks/useAxiosPost";
import { IUserData } from "@/interfaces/IUserData";
import Head from "next/head";
import Link from "next/link";
import React, { FormEvent, useRef } from "react";

function Register() {
  const firstNameInputRef = useRef<HTMLInputElement>(null);
  const lastNameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const url = process.env.BASE_URL + "signup";

  const [loading, response, error, request] = useAxiosPost<IUserData>(
    {
      method: "POST",
      url: url,
    },
    "register"
  );

  function submitHandler(e: FormEvent) {
    e.preventDefault();

    const firstName = firstNameInputRef.current?.value;
    const lastName = lastNameInputRef.current?.value;
    const email = emailInputRef.current?.value;
    const phone = phoneInputRef.current?.value;
    const pass = passwordInputRef.current?.value;

    const user: IUserData = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone: phone,
      password: pass,
    };

    request(user);
  }

  return (
    <>
      <Head>
        <title>Sign Up</title>
        <meta name="description" content="OldEgg PC Ecommerce" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <form onSubmit={submitHandler}>
        <h3>Sign Up</h3>
        <br />
        first
        <input type="text" required ref={firstNameInputRef} />
        <br />
        last
        <input type="text" required ref={lastNameInputRef} />
        <br />
        email
        <input type="email" required ref={emailInputRef} />
        <br />
        phone
        <input type="number" ref={phoneInputRef} placeholder="optional" />
        <br />
        password
        <input type="password" ref={passwordInputRef} />
        <button type="submit">Sign Up</button>
        <br />
        <Link href="/auth/login">Login</Link>
      </form>
      {error && <h1>{error}</h1>}
      {loading && <h1>loading...</h1>}
      {response.token && <h1>Successfully Logged In {response.token}</h1>}
    </>
  );
}

export default Register;
