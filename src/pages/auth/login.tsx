import LoginTypeButton from "@/components/actions/button/LoginTypeButton";
import AuthInputField from "@/components/input/AuthInputField";
import AuthFooter from "@/components/layout/AuthFooter";
import Logo from "@/components/ui/Logo";
import { useAxiosPost } from "@/hooks/useAxiosPost";
import { IUserLogin } from "@/interfaces/IUser";
import Head from "next/head";
import Link from "next/link";
import { FormEvent, useRef } from "react";
import style from "../../components/styles/auth/AuthPage.module.scss";
import btn from "../../components/styles/Button.module.scss";

function Login() {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const url = process.env.BASE_URL + "login";

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
      Email: email,
      Password: pass,
    });
  }

  return (
    <>
      <Head>
        <title>Sign In</title>
        <meta name="description" content="OldEgg PC Ecommerce" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className={style.outerFormContainer_regis}>
        <form onSubmit={submitHandler} className={style.formContainer_regis}>
          <Logo height={65} />
          <p className={style.signup_header}>Sign In</p>
          <AuthInputField
            required
            height="40px"
            width="100%"
            placeholder="Email Address"
            type="email"
            ref={emailInputRef}
          />
          {error && <p className={style.errormsg}>{error}</p>}
          {loading && <p className={style.statusmsg}>loading...</p>}
          {response.token && (
            <p className={style.statusmsg}>Successfully Logged In</p>
          )}
          <AuthInputField
            height="40px"
            width="100%"
            type="password"
            placeholder="Password"
            required
            ref={passwordInputRef}
          />
          <button type="submit" className={btn.authBtn}>
            SIGN IN
          </button>
          <LoginTypeButton text="GET ONE TIME SIGN IN CODE" />
          <Link href="#">{"What's"} The One Time Code?</Link>
          <div className={style.toggleAuthContainer}>
            New to Newegg? <Link href="/auth/register">Sign Up</Link>
          </div>

          <div className={style.horizontal_line_container}>
            <hr />
            <p> OR </p>
            <hr />
          </div>

          <LoginTypeButton mode="GOOGLE" />
          <LoginTypeButton mode="APPLE" />
        </form>
      </main>
      <AuthFooter />
    </>
  );
}

export default Login;
