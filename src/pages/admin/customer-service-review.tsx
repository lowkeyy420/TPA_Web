import Layout from "@/components/layout/Layout";
import style from "@/components/styles/UI.module.scss";
import Loading from "@/components/ui/Loading";
import { useAxios } from "@/hooks/useAxios";

function CustomerReview() {
  let url = process.env.BASE_URL + "admin/get-customer-service-review";

  const [loading, review, error, request] = useAxios({
    method: "GET",
    url: url,
  });

  return (
    <Layout>
      {loading && <Loading />}
      <div className={style.customer_review_container}>
        <table className={style.cr_table}>
          <thead>
            <tr>
              <th>Customer</th>
              <th rowSpan={2} colSpan={2}>
                Review
              </th>
            </tr>
          </thead>
          <tbody>
            {review &&
              review.reviews.map((item: any, i: any) => {
                return (
                  <tr key={item["id"]}>
                    <td>
                      {item["first_name"]} {item["last_name"]}
                    </td>
                    <td>{item["content"]}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default CustomerReview;
