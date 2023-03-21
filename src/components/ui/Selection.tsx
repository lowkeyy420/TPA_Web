import Link from "next/link";
import React from "react";
import style from "../styles/Selection.module.scss";

const AdminSelections = [
  {
    title: "Manage User",
    link: "/admin/manage-user",
  },
  {
    title: "Manage Shop",
    link: "/admin/manage-shop",
  },
  {
    title: "Manage Promotions",
    link: "/admin/manage-promotion",
  },
  {
    title: "Add Voucher",
    link: "/admin/add-voucher",
  },
  {
    title: "Customer Service Review",
    link: "/admin/customer-service-review",
  },
];

function Selection() {
  return (
    <div className={style.admin_select_container}>
      {AdminSelections.map((item, i) => {
        return (
          <Link href={item.link} key={i} className={style.selection_wrapper}>
            {item.title}
          </Link>
        );
      })}
    </div>
  );
}

export default Selection;
