import AuthInputField from "@/components/input/AuthInputField";
import AuthFooter from "@/components/layout/AuthFooter";
import Logo from "@/components/ui/Logo";
import { useAxiosPost } from "@/hooks/useAxiosPost";
import { IUserData } from "@/interfaces/IUserData";
import Head from "next/head";
import Link from "next/link";
import React, { FormEvent, useRef } from "react";
import style from "../../components/styles/auth/AuthPage.module.scss";
import btn from "../../components/styles/Button.module.scss";

function Register() {
  const firstNameInputRef = useRef<HTMLInputElement>(null);
  const lastNameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const subscribeInputRef = useRef<HTMLInputElement>(null);

  const url = process.env.BASE_URL + "signup";

  const [loading, response, error, request] = useAxiosPost<IUserData>(
    {
      method: "POST",
      url: url,
    },
    "register"
  );

  function clearInput() {
    if (
      firstNameInputRef.current &&
      lastNameInputRef.current &&
      emailInputRef.current &&
      phoneInputRef.current &&
      passwordInputRef.current &&
      subscribeInputRef.current
    ) {
      firstNameInputRef.current.value = "";
      lastNameInputRef.current.value = "";
      emailInputRef.current.value = "";
      phoneInputRef.current.value = "";
      passwordInputRef.current.value = "";
      subscribeInputRef.current.checked = false;
    }
  }

  function submitHandler(e: FormEvent) {
    e.preventDefault();

    const firstName = firstNameInputRef.current?.value;
    const lastName = lastNameInputRef.current?.value;
    const email = emailInputRef.current?.value;
    const phone = phoneInputRef.current?.value;
    const pass = passwordInputRef.current?.value;
    const subscribe = subscribeInputRef.current?.checked;

    const user: IUserData = {
      First_name: firstName,
      Last_name: lastName,
      Email: email,
      Phone: phone,
      Password: pass,
      SubscribeToEmail: subscribe,
    };

    request(user);

    clearInput();
  }

  return (
    <>
      <Head>
        <title>Sign Up</title>
        <meta name="description" content="OldEgg PC Ecommerce" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main className={style.outerFormContainer_regis}>
        <form onSubmit={submitHandler} className={style.formContainer_regis}>
          <Logo height={65} />
          <p className={style.signup_header}>Create Account</p>
          <p className={style.signup_business}>
            Shopping for your business?
            <Link
              className={style.signup_businesslink}
              href="https://secure.neweggbusiness.com/new/newmyaccount/b2baccountregistration.aspx?event=b2c&cm_sp=newegg_sign_up"
            >
              {" "}
              Create a free business account.
            </Link>
          </p>
          <AuthInputField
            height="40px"
            width="100%"
            placeholder="First Name"
            ref={firstNameInputRef}
            required
          />
          <AuthInputField
            required
            height="40px"
            width="100%"
            placeholder="Last Name"
            ref={lastNameInputRef}
          />
          <AuthInputField
            required
            height="40px"
            width="100%"
            placeholder="Email Address"
            type="email"
            ref={emailInputRef}
          />
          <AuthInputField
            height="40px"
            width="100%"
            ref={phoneInputRef}
            type="number"
            placeholder="Mobile Phone Number (Optional)"
          />
          <AuthInputField
            height="40px"
            width="100%"
            type="password"
            placeholder="Password"
            required
            ref={passwordInputRef}
          />
          <div className={style.subscribeContainer}>
            <AuthInputField
              id="subscribeTick"
              type="checkbox"
              ref={subscribeInputRef}
              label="Subscribe for exclusive e-mail offers and discounts"
            />
          </div>

          <div className={style.termscontainer}>
            By creating an account, you agree to {"Newegg's "}
            <Link href="https://kb.newegg.com/knowledge-base/privacy-policy-newegg/">
              Privacy Notice
            </Link>
            {" and "}
            <Link href="https://kb.newegg.com/knowledge-base/policy-agreement/">
              Terms Of Use
            </Link>
          </div>

          <button type="submit" className={btn.authBtn}>
            SIGN UP
          </button>

          <div className={style.toggleAuthContainer}>
            Have an account ? <Link href="/auth/login">Sign In </Link>
          </div>
        </form>
        {error && <h1>{error}</h1>}
        {loading && <h1>loading...</h1>}
        {response.email && <h3>Successfully Registered {response.email}</h3>}
      </main>
      <AuthFooter />
    </>
  );
}

export default Register;
