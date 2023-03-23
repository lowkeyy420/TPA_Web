import ActionButton from "@/components/actions/button/ActionButton";
import Layout from "@/components/layout/Layout";
import { useAxiosPost } from "@/hooks/useAxiosPost";
import AuthContext from "@/store/Authcontext";
import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import style from "../../components/styles/UI.module.scss";

function AccountSettingsPage() {
  const authCtx: any = useContext(AuthContext);

  const oldPasswordInputRef = useRef<any>();
  const newPasswordInputRef = useRef<any>();
  const phoneNumberInputRef = useRef<any>();

  const [first, setfirst] = useState(false);

  let url = process.env.BASE_URL + `change-password`;
  let url2 = process.env.BASE_URL + `update-phone`;
  let url3 = process.env.BASE_URL + `enable-2FA`;

  const [passloading, passsuccess, errorpass, passRequest] = useAxiosPost({
    method: "POST",
    url: url,
  });

  const [phoneloading, phonesuccess, errorphone, phoneRequest] = useAxiosPost({
    method: "POST",
    url: url2,
  });

  const [tfaloading, tfasuccess, errortfa, tfaRequest] = useAxiosPost({
    method: "POST",
    url: url3,
  });

  useEffect(() => {
    if (!passloading) {
      if (passsuccess) {
        alert(passsuccess.message);
      } else if (errorpass) {
        alert(errorpass);
      }
    }
  }, [passloading]);

  useEffect(() => {
    if (!phoneloading) {
      if (phonesuccess) {
        alert(phonesuccess.message);
      } else if (errorphone) {
        alert(errorphone);
      }
    }
  }, [phoneloading]);

  useEffect(() => {
    if (!tfaloading) {
      if (tfasuccess) {
        alert(tfasuccess.message);
      } else if (errortfa) {
        alert(errortfa);
      }
    }
  }, [tfaloading]);

  function updatePasswordHandler(e: FormEvent) {
    e.preventDefault();
    const email = authCtx.user["Email"];
    const oldPass = oldPasswordInputRef.current.value;
    const newPass = newPasswordInputRef.current.value;
    passRequest({
      Email: email,
      OldPassword: oldPass,
      NewPassword: newPass,
    });
  }

  function updatePhoneHandler(e: FormEvent) {
    e.preventDefault();
    const email = authCtx.user["Email"];
    const phone = phoneNumberInputRef.current.value;

    phoneRequest({
      Email: email,
      Phone: phone,
    });
  }

  function enable2FAHandler() {
    if (!first) {
      const email = authCtx.user["Email"];
      tfaRequest({
        Email: email,
      });
      setfirst(true);
      return;
    }

    alert("You Have already enabled !");
  }

  return (
    <Layout>
      <main className={style.account_container}>
        <div className={style.upper}>
          {authCtx && authCtx.user && <p>Full Name : {authCtx.user["Name"]}</p>}
          {authCtx && authCtx.user && <p>Email : {authCtx.user["Email"]}</p>}
          {authCtx && authCtx.user && <p>Phone : {authCtx.user["Phone"]}</p>}
        </div>
        <form className={style.password} onSubmit={updatePasswordHandler}>
          <h3>Update Password</h3>
          <div>
            <label htmlFor="oldpassword">Old Password</label>
            <input
              id="oldpassword"
              type="password"
              ref={oldPasswordInputRef}
              required
            />
          </div>
          <div>
            <label htmlFor="newpassword">New Password</label>
            <input
              id="newpassword"
              type="password"
              ref={newPasswordInputRef}
              required
            />
          </div>
          <button>Change Password</button>
        </form>
        <form className={style.phone} onSubmit={updatePhoneHandler}>
          <label htmlFor="phone">
            <h3>Update Phone Number</h3>
          </label>
          <input id="phone" type="number" ref={phoneNumberInputRef} required />
          <button>Update Phone</button>
        </form>

        <ActionButton onClick={enable2FAHandler} text="2FA" />
      </main>
    </Layout>
  );
}

export default AccountSettingsPage;
