import SendAlertButton from "@/components/actions/button/SendAletrButton";
import Layout from "@/components/layout/Layout";
import style from "@/components/styles/UI.module.scss";
import Loading from "@/components/ui/Loading";
import UserGrid from "@/components/ui/UserGrid";
import { useAxios } from "@/hooks/useAxios";

function ManageUser() {
  const url = process.env.BASE_URL + "admin/get-all-user";
  const [loading, user, error, request] = useAxios({
    method: "GET",
    url: url,
  });

  return (
    <Layout>
      <main className={style.mu_container}>
        {loading && <Loading />}
        {error && error}
        {user && <UserGrid data={user} reload={request} />}
      </main>
    </Layout>
  );
}

export default ManageUser;
