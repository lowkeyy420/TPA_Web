import ActionButton from "@/components/actions/button/ActionButton";
import Layout from "@/components/layout/Layout";
import { useAxiosPost } from "@/hooks/useAxiosPost";
import AuthContext from "@/store/Authcontext";
import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import style from "../../components/styles/UI.module.scss";

function VoucherPage() {
  const authCtx: any = useContext(AuthContext);

  const codeInputRef = useRef<any>();

  let url = process.env.BASE_URL + `use-voucher`;

  const [loading, success, error, request] = useAxiosPost({
    method: "POST",
    url: url,
  });

  function useVoucherHandler(e: FormEvent) {
    e.preventDefault();

    const email = authCtx.user["Email"];
    const code = codeInputRef.current.value;

    request({
      Email: email,
      Code: code,
    });
  }

  return (
    <Layout>
      <main className={style.account_container}>
        <form className={style.password} onSubmit={useVoucherHandler}>
          <h3>Redeem Voucher</h3>
          <div>
            <label htmlFor="voucher">Code</label>
            <input id="voucher" type="text" ref={codeInputRef} required />
          </div>
          <button>Use</button>
        </form>

        {loading && <p>loading..</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p>{success.message}</p>}
      </main>
    </Layout>
  );
}

export default VoucherPage;
