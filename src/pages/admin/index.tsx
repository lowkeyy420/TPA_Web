import Selection from "@/components/ui/Selection";
import Layout from "@/components/layout/Layout";
import AuthContext from "@/store/Authcontext";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import DataVisualization from "@/components/ui/DataVisualization";

function AdminHomePage() {
  const authCtx: any = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (authCtx.user["RoleID"]) {
      if (authCtx.user["RoleID"] !== 4) {
        router.push("/");
      }
    }
  }, [authCtx.user]);

  return (
    <Layout>
      <DataVisualization />
      <Selection />
    </Layout>
  );
}
export default AdminHomePage;
