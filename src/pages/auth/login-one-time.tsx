import LoginTypeButton from "@/components/actions/button/LoginTypeButton";
import AuthInputField from "@/components/input/AuthInputField";
import AuthFooter from "@/components/layout/AuthFooter";
import Logo from "@/components/ui/Logo";
import { useAxiosPost } from "@/hooks/useAxiosPost";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useRef } from "react";
import style from "../../components/styles/auth/AuthPage.module.scss";
import btn from "../../components/styles/Button.module.scss";

function Login() {
  const router = useRouter();
  const email = router.query.email;
  const codeInputRef = useRef<HTMLInputElement>(null);
  const url = process.env.BASE_URL + "login-otc";
  const url2 = process.env.BASE_URL + "get-otc";

  const [loginLoading, loginResponse, loginError, loginRequest] = useAxiosPost(
    {
      method: "POST",
      url: url,
    },
    "login"
  );

  const [codeLoading, codeResponse, codeError, codeRequest] = useAxiosPost({
    method: "POST",
    url: url2,
  });

  function loginHandler(e: FormEvent) {
    e.preventDefault();
    const code = codeInputRef.current?.value;

    loginRequest({
      Email: email,
      Code: code,
    });
  }

  function requestCodeHandler() {
    codeRequest({
      Email: email,
    });
  }

  useEffect(() => {
    if (codeResponse) {
      alert("Code : " + codeResponse.data["Code"]);
    } else if (codeError) {
      alert(codeError);
    }
  }, [codeResponse, codeError]);

  return (
    <>
      <Head>
        <title>Sign In</title>
        <meta name="description" content="OldEgg PC Ecommerce" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className={style.outerFormContainer_regis}>
        <form onSubmit={loginHandler} className={style.formContainer_regis}>
          <Logo height={65} />
          <p className={style.signup_header}>Sign In With Code</p>

          <p>Login Code For : {email}</p>
          {loginError && <p className={style.errormsg}>{loginError}</p>}
          {loginLoading && <p className={style.statusmsg}>loading...</p>}
          {loginResponse.token && (
            <p className={style.statusmsg}>Successfully Logged In</p>
          )}
          <AuthInputField
            height="40px"
            width="100%"
            type="code"
            placeholder="Code"
            required
            ref={codeInputRef}
          />

          <LoginTypeButton
            text="GET ONE TIME CODE"
            onClick={requestCodeHandler}
          />
          <button type="submit" className={btn.authBtn}>
            SIGN IN
          </button>

          <Link href="#">{"What's"} The One Time Code?</Link>
          <div className={style.toggleAuthContainer}>
            New to Newegg? <Link href="/auth/register">Sign Up</Link>
          </div>
        </form>
      </main>
      <AuthFooter />
    </>
  );
}

export default Login;
