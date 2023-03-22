import ActionButton from "@/components/actions/button/ActionButton";
import Layout from "@/components/layout/Layout";
import { useAxiosPost } from "@/hooks/useAxiosPost";
import { FormEvent, useEffect, useRef } from "react";
import style from "../../components/styles/UI.module.scss";

function AddVoucher() {
  const url = process.env.BASE_URL + "admin/add-voucher";

  const codeInputRef = useRef<HTMLInputElement>(null);
  const balanceInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLInputElement | any>(null);
  const countInputRef = useRef<HTMLInputElement>(null);

  const [voucherLoading, successVoucher, errorVoucher, voucherRequest] =
    useAxiosPost({
      method: "POST",
      url: url,
    });

  useEffect(() => {
    if (successVoucher) {
      alert("Successfuly Added Voucher..");
      clearInput();
    } else if (errorVoucher) {
      alert("Failed To Add Voucher...");
    }
  }, [successVoucher, errorVoucher]);

  function clearInput() {
    if (
      codeInputRef.current &&
      balanceInputRef.current &&
      descriptionInputRef.current &&
      countInputRef.current
    ) {
      codeInputRef.current.value = "";
      balanceInputRef.current.value = "";
      descriptionInputRef.current.value = "";
      countInputRef.current.value = "";
    }
  }

  function addHandler(e: FormEvent) {
    e.preventDefault();

    const code = codeInputRef.current?.value;
    const balance: any = balanceInputRef.current?.value;
    const description = descriptionInputRef.current?.value;
    const count: any = countInputRef.current?.value;

    console.log({
      code: code,
      balance: parseInt(balance, 10),
      description: description,
      count: parseInt(count, 10),
    });

    voucherRequest({
      code: code,
      balance: parseInt(balance, 10),
      description: description,
      count: parseInt(count, 10),
    });
  }

  return (
    <Layout>
      <div className={style.add_voucher_outercontainer}>
        <form className={style.add_voucher_container} onSubmit={addHandler}>
          <h2>Add New Voucher</h2>
          <div className={style.add_voucher_input}>
            <label htmlFor="code">Code</label>
            <input type="text" id="code" required ref={codeInputRef} />
          </div>

          <div className={style.add_voucher_input}>
            <label htmlFor="balance">Balance</label>
            <input type="number" id="balance" required ref={balanceInputRef} />
          </div>

          <div className={style.add_voucher_input}>
            <label htmlFor="code">Description</label>
            <textarea id="description" required ref={descriptionInputRef} />
          </div>

          <div className={style.add_voucher_input}>
            <label htmlFor="code">Limit Use</label>
            <input type="number" id="count" required ref={countInputRef} />
          </div>

          <ActionButton text="Add" />
        </form>
      </div>
    </Layout>
  );
}

export default AddVoucher;
