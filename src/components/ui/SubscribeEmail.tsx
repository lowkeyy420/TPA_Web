import { useAxiosPost } from "@/hooks/useAxiosPost";
import AuthContext from "@/store/Authcontext";
import React, { useContext, useEffect } from "react";
import style from "../styles/Action.module.scss";

function SubscribeEmail() {
  const authCtx: any = useContext(AuthContext);

  const url = process.env.BASE_URL + "subscribe-email";

  const [loading, response, error, request] = useAxiosPost({
    method: "POST",
    url: url,
  });

  useEffect(() => {
    if (response) {
      alert(response.message);
    }
  }, [response]);

  function subscribeHandler() {
    if (authCtx.user["SubscribeToEmail"]) {
      alert("You are already subscribed!");
      return;
    }

    request({
      ID: authCtx.user["ID"],
    });
  }

  return (
    <div className={style.subscribe_email_container}>
      {authCtx.user["ID"] &&
        authCtx.user["RoleID"] != 2 &&
        !authCtx.user["SubscribeToEmail"] && (
          <>
            <p>Subcribe to our email for exclusive promo and offers !</p>
            <button onClick={subscribeHandler}>Subscribe</button>
          </>
        )}

      {authCtx.user["ID"] &&
        authCtx.user["RoleID"] != 2 &&
        authCtx.user["SubscribeToEmail"] && (
          <>
            <p>Thank you for subscribing to our email !</p>
          </>
        )}

      {!authCtx.user["ID"] && <p>Log In First</p>}
    </div>
  );
}

export default SubscribeEmail;
